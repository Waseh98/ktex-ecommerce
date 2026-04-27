const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  { name: 'hero-banner-1.svg', text: 'Sherwani Edit', color1: '#1e293b', color2: '#0f172a' },
  { name: 'hero-banner-2.svg', text: 'Groomswear', color1: '#064e3b', color2: '#022c22' },
  { name: 'hero-banner-3.svg', text: 'New Arrivals', color1: '#4c0519', color2: '#22050e' },
  { name: 'hero.svg', text: 'K-TEX Men', color1: '#111827', color2: '#030712' },
  { name: 'top-picks.svg', text: 'Top Picks', color1: '#3f3f46', color2: '#18181b' },
  { name: 'bestseller-1.svg', text: 'Kurtas', color1: '#312e81', color2: '#1e1b4b' },
  { name: 'bestseller-2.svg', text: 'Waistcoats', color1: '#14532d', color2: '#052e16' },
  { name: 'bestseller-3.svg', text: 'Luxury Pret', color1: '#701a75', color2: '#4a044e' },
  { name: 'bestseller-4.svg', text: 'Accessories', color1: '#7f1d1d', color2: '#450a0a' }
];

const generateSVG = (text, color1, color2) => `
<svg width="800" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </radialGradient>
    <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="100%" height="100%" fill="url(#pattern)" />
  
  <rect x="50" y="50" width="700" height="1100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
  <rect x="60" y="60" width="680" height="1080" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
  
  <text x="50%" y="50%" font-family="Georgia, serif" font-size="48" font-style="italic" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">
    ${text}
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.5)" text-anchor="middle" dominant-baseline="middle" letter-spacing="8" text-transform="uppercase">
    K-TEX Menswear
  </text>
</svg>
`;

images.forEach(img => {
  const svgContent = generateSVG(img.text, img.color1, img.color2);
  const filePath = path.join(imagesDir, img.name);
  fs.writeFileSync(filePath, svgContent.trim());
  console.log('Created:', filePath);
  
  // also create the corresponding png file to avoid breaking Next.js Image caching if it expects the same file
  // wait, we can just replace .png with .svg in the codebase
});
