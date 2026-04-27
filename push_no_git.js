const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = process.cwd();

async function push() {
  console.log('Starting push process...');
  
  try {
    // 1. Initialize
    console.log('Initializing...');
    await git.init({ fs, dir });

    // 2. Add files
    console.log('Adding files...');
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
      if (file !== '.git' && file !== 'node_modules') {
        await git.add({ fs, dir, filepath: file });
      }
    }

    // 3. Commit
    console.log('Committing...');
    await git.commit({
      fs,
      dir,
      author: { name: 'Waseh98', email: 'waseh98@example.com' },
      message: 'Initial commit: K-TEX Premium E-commerce'
    });

    // 4. Push
    console.log('Pushing...');
    const url = 'https://github.com/Waseh98/ktex-ecommerce.git';
    
    // Note: This will likely fail without a PAT if 2FA is enabled
    const result = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      url: url,
      onAuth: () => ({ username: 'Waseh98', password: 'Waseh123@#$' }),
    });

    console.log('Push Result:', result);
  } catch (err) {
    console.error('Error during push:', err);
  }
}

push();
