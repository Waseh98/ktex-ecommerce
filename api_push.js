const fs = require('fs');
const path = require('path');
const https = require('https');

const USERNAME = 'Waseh98';
const REPO = 'ktex-ecommerce';
const TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;
const DIR = __dirname;

if (!TOKEN) {
  console.error("❌ Error: No GitHub token provided. Usage: node api_push.js YOUR_TOKEN");
  process.exit(1);
}

const IGNORE = [
  '.git', 'node_modules', '.next', 'out', 'build', 'coverage', 
  '.DS_Store', '.env', 'api_push.js', 'push_to_github.js', 'scratch'
];

function shouldIgnore(p) {
  return IGNORE.some(i => p.includes(i) || p.endsWith(i));
}

async function getFiles(dir, basePath = '') {
  const files = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (shouldIgnore(relPath)) continue;
    if (entry.isDirectory()) {
      files.push(...await getFiles(path.join(dir, entry.name), relPath));
    } else {
      files.push({
        path: relPath,
        content: await fs.promises.readFile(path.join(dir, entry.name), 'base64'),
        mode: '100644',
        type: 'blob'
      });
    }
  }
  return files;
}

function request(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${USERNAME}/${REPO}${endpoint}`,
      method,
      headers: {
        'Authorization': `token ${TOKEN}`,
        'User-Agent': 'NodeJS',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API Error (${res.statusCode}): ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function push() {
  try {
    console.log("📂 Scanning files...");
    const files = await getFiles(DIR);
    console.log(`Found ${files.length} files.`);

    console.log("🔍 Getting current main branch...");
    const ref = await request('GET', '/git/refs/heads/main');
    const latestCommitSha = ref.object.sha;

    const commit = await request('GET', `/git/commits/${latestCommitSha}`);
    const baseTreeSha = commit.tree.sha;

    console.log("⬆️ Uploading files and creating tree...");
    // GitHub tree API limits to 100,000 items, but payload size can't exceed 100MB.
    // For safety, we upload tree in chunks if needed, but for now we try one request.
    const treePayload = {
      base_tree: baseTreeSha,
      tree: files.map(f => ({
        path: f.path,
        mode: f.mode,
        type: f.type,
        content: Buffer.from(f.content, 'base64').toString('utf8') // We try to send as utf8 strings for source code
      }))
    };
    
    // For binary files, we need to upload blobs first. Let's do that for all files to be safe against encoding issues.
    console.log("☁️ Uploading blobs (this bypasses timeout issues)...");
    const newTree = [];
    let count = 0;
    for (const f of files) {
      count++;
      if (count % 20 === 0) console.log(`   Uploaded ${count}/${files.length} files...`);
      const blob = await request('POST', '/git/blobs', {
        content: f.content,
        encoding: 'base64'
      });
      newTree.push({
        path: f.path,
        mode: f.mode,
        type: f.type,
        sha: blob.sha
      });
    }

    console.log("🌲 Creating new tree...");
    const createdTree = await request('POST', '/git/trees', {
      base_tree: baseTreeSha,
      tree: newTree
    });

    console.log("💾 Creating commit...");
    const newCommit = await request('POST', '/git/commits', {
      message: "K-TEX: Final Security Update & Dynamic Navigation (API Push)",
      tree: createdTree.sha,
      parents: [latestCommitSha]
    });

    console.log("🚀 Updating main branch...");
    await request('PATCH', '/git/refs/heads/main', {
      sha: newCommit.sha,
      force: true
    });

    console.log("✅ Success! Changes are live on GitHub!");

  } catch (err) {
    console.error("❌ Failed:", err.message);
  }
}

push();
