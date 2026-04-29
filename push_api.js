const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = __dirname;
const USERNAME = 'Waseh98';
const REPO = 'ktex-ecommerce';
const BRANCH = 'main';
const TOKEN = process.argv[2];

if (!TOKEN) {
  console.error('❌ Usage: node push_api.js YOUR_GITHUB_PAT');
  process.exit(1);
}

const IGNORE_PATTERNS = [
  '.git', 'node_modules', '.next', 'out', 'build', 'coverage',
  '.DS_Store', '.env', '.env.local', '.vercel', '.pnp',
  'scratch', 'push_changes.js', 'push_api.js',
];

function shouldIgnore(filePath) {
  const parts = filePath.split(/[\\/]/);
  for (const part of parts) {
    for (const pattern of IGNORE_PATTERNS) {
      if (part === pattern || part.startsWith(pattern)) return true;
    }
    if (part.endsWith('.pem') || part.endsWith('.tsbuildinfo')) return true;
  }
  return false;
}

function getAllFiles(dirPath, basePath = '') {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (shouldIgnore(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...getAllFiles(path.join(dirPath, entry.name), relativePath));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

function apiRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${USERNAME}/${REPO}${endpoint}`,
      method,
      headers: {
        'Authorization': `token ${TOKEN}`,
        'User-Agent': 'ktex-push-script',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error('Request timeout')); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function pushViaAPI() {
  console.log('📂 Scanning project files...');
  const allFiles = getAllFiles(dir);
  console.log(`   Found ${allFiles.length} files.\n`);

  // 1. Get the current commit SHA on main (or handle empty repo)
  let parentSha = null;
  let baseTreeSha = null;
  
  try {
    const refRes = await apiRequest('GET', `/git/ref/heads/${BRANCH}`);
    if (refRes.status === 200) {
      parentSha = refRes.data.object.sha;
      const commitRes = await apiRequest('GET', `/git/commits/${parentSha}`);
      baseTreeSha = commitRes.data.tree.sha;
      console.log(`✅ Found existing branch '${BRANCH}' at ${parentSha.slice(0,8)}`);
    }
  } catch (e) { /* new repo, no branch yet */ }

  // 2. Create blobs for each file (batch in groups)
  console.log('📦 Creating file blobs...');
  const tree = [];
  let count = 0;

  for (const filePath of allFiles) {
    const fullPath = path.join(dir, filePath);
    const content = fs.readFileSync(fullPath);
    const base64 = content.toString('base64');

    try {
      const blobRes = await apiRequest('POST', '/git/blobs', {
        content: base64,
        encoding: 'base64',
      });

      if (blobRes.status === 201) {
        tree.push({
          path: filePath,
          mode: '100644',
          type: 'blob',
          sha: blobRes.data.sha,
        });
        count++;
        if (count % 20 === 0) console.log(`   Uploaded ${count}/${allFiles.length} files...`);
      } else {
        console.warn(`   ⚠ Failed: ${filePath} (${blobRes.status})`);
        if (blobRes.data?.message) console.warn(`     ${blobRes.data.message}`);
      }
    } catch (err) {
      console.warn(`   ⚠ Error: ${filePath} (${err.message})`);
    }
  }
  console.log(`   ✅ Uploaded ${count} files.\n`);

  // 3. Create tree
  console.log('🌲 Creating tree...');
  const treeBody = baseTreeSha 
    ? { base_tree: baseTreeSha, tree } 
    : { tree };
  const treeRes = await apiRequest('POST', '/git/trees', treeBody);
  
  if (treeRes.status !== 201) {
    console.error('❌ Failed to create tree:', treeRes.data?.message);
    process.exit(1);
  }
  const newTreeSha = treeRes.data.sha;
  console.log(`   Tree SHA: ${newTreeSha.slice(0,8)}\n`);

  // 4. Create commit
  console.log('💾 Creating commit...');
  const commitBody = {
    message: 'feat: Add WhatsApp chat button + auto-scrolling customer reviews\n\n- Added floating WhatsApp chat button (bottom-right) linked to business number\n- Chat popup styled like WhatsApp with greeting message\n- Enabled autoplay + loop on Customer Reviews slideshow\n- Button appears on all customer-facing pages, hidden on admin',
    tree: newTreeSha,
    parents: parentSha ? [parentSha] : [],
    author: {
      name: 'Waseh98',
      email: 'waseh98@users.noreply.github.com',
      date: new Date().toISOString(),
    },
  };
  const commitRes = await apiRequest('POST', '/git/commits', commitBody);
  
  if (commitRes.status !== 201) {
    console.error('❌ Failed to create commit:', commitRes.data?.message);
    process.exit(1);
  }
  const newCommitSha = commitRes.data.sha;
  console.log(`   Commit SHA: ${newCommitSha.slice(0,8)}\n`);

  // 5. Update ref (or create it)
  console.log('🚀 Updating branch ref...');
  let refRes;
  if (parentSha) {
    refRes = await apiRequest('PATCH', `/git/refs/heads/${BRANCH}`, {
      sha: newCommitSha,
      force: true,
    });
  } else {
    refRes = await apiRequest('POST', '/git/refs', {
      ref: `refs/heads/${BRANCH}`,
      sha: newCommitSha,
    });
  }

  if (refRes.status === 200 || refRes.status === 201) {
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log(`   🔗 https://github.com/${USERNAME}/${REPO}`);
  } else {
    console.error('❌ Failed to update ref:', refRes.data?.message);
  }
}

pushViaAPI().catch((err) => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
