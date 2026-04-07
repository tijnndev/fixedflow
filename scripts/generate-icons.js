const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

async function generateIcons() {
  console.log('🎨 Generating PNG icons from SVG files...\n');

  const conversions = [
    {
      input: 'icon.svg',
      output: 'icon.png',
      width: 1024,
      height: 1024,
      description: 'App Icon'
    },
    {
      input: 'adaptive-icon.svg',
      output: 'adaptive-icon.png',
      width: 1024,
      height: 1024,
      description: 'Android Adaptive Icon'
    },
    {
      input: 'splash.svg',
      output: 'splash.png',
      width: 1284,
      height: 2778,
      description: 'Splash Screen'
    },
    {
      input: 'icon.svg',
      output: 'favicon.png',
      width: 48,
      height: 48,
      description: 'Favicon'
    }
  ];

  for (const conversion of conversions) {
    const inputPath = path.join(assetsDir, conversion.input);
    const outputPath = path.join(assetsDir, conversion.output);

    try {
      await sharp(inputPath)
        .resize(conversion.width, conversion.height)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ ${conversion.description}: ${conversion.output} (${conversion.width}x${conversion.height})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${conversion.output}:`, error.message);
    }
  }

  console.log('\n✨ Icon generation complete!');
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  generateIcons().catch(console.error);
} catch (e) {
  console.error(`
❌ Error: 'sharp' package is not installed.

Please install it by running:
  npm install sharp

Then run this script again:
  node scripts/generate-icons.js
`);
  process.exit(1);
}
