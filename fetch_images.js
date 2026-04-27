const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  { name: 'hero-banner-1.jpg', prompt: 'High fashion editorial photo of a handsome South Asian man wearing an opulent ivory silk Sherwani. Studio lighting, cinematic, photorealistic, luxurious mood.' },
  { name: 'hero-banner-2.jpg', prompt: 'High fashion editorial photo of a handsome South Asian man wearing a rich emerald green Velvet Prince Coat with intricate gold embroidery. Royal backdrop, cinematic lighting.' },
  { name: 'hero-banner-3.jpg', prompt: 'Fashion photography of a South Asian male model wearing a sleek modern black Kurta with a matching waistcoat. Minimalist background, high contrast.' },
  { name: 'hero.jpg', prompt: 'A breathtaking wide-angle fashion shot of two South Asian male models wearing luxurious matching ethnic wear including Kurtas and Waistcoats standing in an opulent setting. Golden hour.' },
  { name: 'top-picks.jpg', prompt: 'Fashion photography of a stylish South Asian man wearing a tailored suit jacket over a crisp white Kurta. Premium, sophisticated.' },
  { name: 'bestseller-1.jpg', prompt: 'Close-up portrait of a South Asian man wearing a simple yet elegant pastel peach Kurta with subtle thread work. Soft natural light, high fashion aesthetic.' },
  { name: 'bestseller-2.jpg', prompt: 'Fashion photo of a well-groomed South Asian man wearing a beautifully embroidered formal Waistcoat.' },
  { name: 'bestseller-3.jpg', prompt: 'High quality photography of a luxurious South Asian Sherwani on a hanger or worn, rich deep colors.' },
  { name: 'bestseller-4.jpg', prompt: 'Macro photography of premium mens traditional South Asian footwear Peshawari chappal in rich brown leather. High detail, photorealistic.' }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 302 || res.statusCode === 301) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function main() {
  for (const img of images) {
    const encodedPrompt = encodeURIComponent(img.prompt);
    // Add a random seed or parameters to ensure it's a good image, pollinations uses the prompt as seed sometimes
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=1200&nologo=true`;
    const filePath = path.join(imagesDir, img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await downloadImage(url, filePath);
      console.log(`Saved ${img.name}`);
    } catch (e) {
      console.error(`Failed to download ${img.name}:`, e);
    }
  }
}

main();
