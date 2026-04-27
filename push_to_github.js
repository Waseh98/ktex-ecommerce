const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = process.cwd();

// Patterns from .gitignore to skip
const IGNORE_PATTERNS = [
  '.git',
  'node_modules',
  '.next',
  'out',
  'build',
  'coverage',
  '.DS_Store',
  '.env',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
  '.vercel',
  '.pnp',
  'npm-debug.log',
  'yarn-debug.log',
  'yarn-error.log',
  '.pnpm-debug.log',
  'next-env.d.ts',
  'scratch',
];

function shouldIgnore(filePath) {
  const parts = filePath.split(/[\\/]/);
  for (const part of parts) {
    for (const pattern of IGNORE_PATTERNS) {
      if (part === pattern || part.startsWith(pattern)) return true;
    }
    if (part.endsWith('.pem')) return true;
    if (part.endsWith('.tsbuildinfo')) return true;
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
      const subFiles = await getAllFiles(path.join(dirPath, entry.name), relativePath);
      files.push(...subFiles);
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

// Custom HTTP client with longer timeout
const httpClient = {
  async request({ url, method, headers, body, onProgress }) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000); // 5 min timeout
    
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

async function pushToGithub() {
  const REPO_URL = 'https://github.com/Waseh98/ktex-ecommerce.git';
  const USERNAME = 'Waseh98';
  const TOKEN = process.env.GITHUB_TOKEN || process.argv[2];

  if (!TOKEN) {
    console.error('\n❌ ERROR: No GitHub token provided!');
    console.error('Usage: node push_to_github.js YOUR_GITHUB_PAT');
    process.exit(1);
  }

  try {
    // 1. Check if .git exists already (re-use previous commit)
    const gitExists = fs.existsSync(path.join(dir, '.git'));
    
    if (!gitExists) {
      console.log('🔧 Initializing git repository...');
      await git.init({ fs, dir });
    } else {
      console.log('🔧 Using existing git repository...');
    }

    // 2. Set default branch to main
    console.log('🌿 Setting default branch to main...');
    try {
      await git.branch({ fs, dir, ref: 'main', checkout: true });
    } catch(e) {
      // branch may already exist
    }

    // 3. Collect all files recursively
    console.log('📂 Scanning project files...');
    const allFiles = await getAllFiles(dir);
    console.log(`   Found ${allFiles.length} files to commit.`);

    // 4. Stage all files
    console.log('📦 Staging files...');
    let staged = 0;
    for (const filepath of allFiles) {
      try {
        await git.add({ fs, dir, filepath });
        staged++;
        if (staged % 50 === 0) {
          console.log(`   Staged ${staged}/${allFiles.length}...`);
        }
      } catch (err) {
        console.warn(`   ⚠ Skipped: ${filepath} (${err.message})`);
      }
    }
    console.log(`   ✅ Staged ${staged} files.`);

    // 5. Commit
    console.log('💾 Creating commit...');
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: 'Waseh98',
        email: 'waseh98@users.noreply.github.com',
      },
      message: 'K-TEX: Full-Stack Admin Panel + Local Image Upload System\n\n- Unified product database in scratch/products.json\n- Implemented CRUD API (/api/admin/products) for full inventory control\n- Added Local Image Upload API (/api/admin/upload) with filesystem storage\n- Completely redesigned Admin Inventory UI with real-time image previews\n- Fixed Modal scrolling and button visibility issues with bulletproof absolute positioning\n- Integrated frontend components (OccasionSlider, etc.) with the dynamic backend',
    });
    console.log(`   Commit SHA: ${sha.slice(0, 8)}`);

    // 6. Add remote
    console.log('🔗 Setting remote origin...');
    try {
      await git.deleteRemote({ fs, dir, remote: 'origin' }).catch(() => {});
      await git.addRemote({ fs, dir, remote: 'origin', url: REPO_URL });
    } catch (e) {}

    // 7. Push with longer timeout
    console.log('🚀 Pushing to GitHub (this may take a minute for large files)...');
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
          if (pct % 10 === 0) console.log(`   Pushing: ${pct}% (${p.loaded}/${p.total} bytes)`);
        } else {
          console.log(`   Pushing: ${p.loaded} bytes sent...`);
        }
      }
    });

    if (pushResult.ok) {
      console.log('\n✅ Successfully pushed to GitHub!');
      console.log(`   Repository: ${REPO_URL}`);
      console.log(`   Branch: main`);
      console.log(`   Files: ${staged}`);
    } else {
      console.log('\n⚠ Push result:', JSON.stringify(pushResult, null, 2));
    }

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (err.message.includes('401') || err.message.includes('403')) {
      console.error('\n💡 Authentication failed. Make sure your PAT is valid and has "repo" scope.');
    }
    process.exit(1);
  }
}

pushToGithub();
