const https = require('https');

const data = JSON.stringify({
  name: 'ktex-ecommerce',
  description: 'Premium K-TEX E-commerce website'
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/user/repos',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from('Waseh98:Waseh123@#$').toString('base64'),
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'User-Agent': 'NodeJS-Script'
  }
};

const req = https.request(options, res => {
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
