const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let git, http;
try {
  git = require('isomorphic-git');
  http = require('isomorphic-git/http/node');
} catch (e) {
  console.log('📦 Installing isomorphic-git...');
  const npmCmd = fs.existsSync("C:\\Program Files\\nodejs\\npm.cmd")
    ? '"C:\\Program Files\\nodejs\\npm.cmd"'
    : 'npm';
  execSync(`${npmCmd} install isomorphic-git`, { stdio: 'inherit' });
  git = require('isomorphic-git');
  http = require('isomorphic-git/http/node');
}

const dir = __dirname;

const IGNORE_PATTERNS = [
  '.git', 'node_modules', '.next', 'out', 'build', 'coverage',
  '.DS_Store', '.env', '.env.local', '.vercel', '.pnp',
  'npm-debug.log', 'yarn-debug.log', 'scratch',
  'push_changes.js', // don't push this script itself
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

async function getAllFiles(dirPath, basePath = '') {
  const files = [];
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (shouldIgnore(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(path.join(dirPath, entry.name), relativePath));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

const httpClient = {
  async request({ url, method, headers, body, onProgress }) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3600000);
    try {
      const res = await http.request({ url, method, headers, body, onProgress, signal: controller.signal });
      clearTimeout(timeout);
      return res;
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  }
};

async function pushChanges() {
  const USERNAME = 'Waseh98';
  const TOKEN = process.env.GITHUB_TOKEN || process.argv[2];
  const REPO_URL = `https://${USERNAME}:${TOKEN}@github.com/Waseh98/ktex-ecommerce.git`;

  if (!TOKEN) {
    console.error('\n❌ ERROR: No GitHub token provided!');
    console.error('Usage: node push_changes.js YOUR_GITHUB_PAT');
    process.exit(1);
  }

  try {
    // 1. Init or reuse git repo
    if (!fs.existsSync(path.join(dir, '.git'))) {
      console.log('🔧 Initializing git repository...');
      await git.init({ fs, dir });
    } else {
      console.log('🔧 Using existing git repository...');
    }

    // 2. Ensure main branch
    try {
      await git.branch({ fs, dir, ref: 'main', checkout: true });
    } catch(e) { /* already exists */ }

    // 3. Scan and stage all files
    console.log('📂 Scanning project files...');
    const allFiles = await getAllFiles(dir);
    console.log(`   Found ${allFiles.length} files to commit.`);

    console.log('📦 Staging files...');
    let staged = 0;
    for (const filepath of allFiles) {
      try {
        await git.add({ fs, dir, filepath });
        staged++;
        if (staged % 50 === 0) console.log(`   Staged ${staged}/${allFiles.length}...`);
      } catch (err) {
        console.warn(`   ⚠ Skipped: ${filepath} (${err.message})`);
      }
    }
    console.log(`   ✅ Staged ${staged} files.`);

    // 4. Commit
    console.log('💾 Creating commit...');
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: 'Waseh98',
        email: 'waseh98@users.noreply.github.com',
      },
      message: 'feat: Add WhatsApp chat button + auto-scrolling customer reviews\n\n- Added floating WhatsApp chat button (bottom-right) linked to business number\n- Chat popup styled like WhatsApp with greeting message\n- Enabled autoplay + loop on Customer Reviews slideshow\n- Button appears on all customer-facing pages, hidden on admin',
    });
    console.log(`   Commit SHA: ${sha.slice(0, 8)}`);

    // 5. Set remote
    console.log('🔗 Setting remote origin...');
    try {
      await git.deleteRemote({ fs, dir, remote: 'origin' }).catch(() => {});
      await git.addRemote({ fs, dir, remote: 'origin', url: REPO_URL });
    } catch (e) {}

    // 6. Push
    console.log('🚀 Pushing to GitHub...');
    const pushResult = await git.push({
      fs,
      http: httpClient,
      dir,
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => ({ username: USERNAME, password: TOKEN }),
      onMessage: (msg) => console.log(`   ${msg}`),
      onProgress: (p) => {
        if (p.total) {
          const pct = Math.round((p.loaded / p.total) * 100);
          if (pct % 20 === 0) console.log(`   Pushing: ${pct}%`);
        }
      }
    });

    if (pushResult.ok) {
      console.log('\n✅ Successfully pushed to GitHub!');
      console.log('   https://github.com/Waseh98/ktex-ecommerce');
    } else {
      console.log('\n⚠ Push result:', JSON.stringify(pushResult, null, 2));
    }

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (err.message.includes('401') || err.message.includes('403')) {
      console.error('💡 Authentication failed. Make sure your PAT has "repo" scope.');
    }
    process.exit(1);
  }
}

pushChanges();
