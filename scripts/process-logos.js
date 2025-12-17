import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function processImage(inputPath, outputPath) {
  try {
    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Get raw pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process pixels: make black pixels transparent
    const channels = info.channels; // RGBA = 4 channels
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // If pixel is black (or very close to black), make it transparent
      // Using a threshold to catch near-black pixels too
      if (r < 30 && g < 30 && b < 30) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }

    // Save the processed image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: channels
      }
    })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);

    console.log(`✓ Processed ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
    throw error;
  }
}

async function processICO(inputPath, outputPath) {
  try {
    // ICO files are not directly supported by sharp
    // We'll need to use a different approach
    // For now, let's note that users should convert the processed PNG to ICO
    // or we can update the favicon to use PNG instead
    
    console.log(`⚠ ICO format not directly supported by sharp.`);
    console.log(`  The PNG version (complogo.png) has been processed successfully.`);
    console.log(`  Options:`);
    console.log(`    1. Use complogo.png as favicon (update BaseLayout.astro)`);
    console.log(`    2. Convert complogo.png to ICO using an online tool like:`);
    console.log(`       - https://convertio.co/png-ico/`);
    console.log(`       - https://www.icoconverter.com/`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('Processing logo files...\n');
  
  try {
    // Process PNG
    await processImage(
      join(publicDir, 'complogo.png'),
      join(publicDir, 'complogo.png')
    );
    
    // Process ICO (will convert to PNG)
    await processICO(
      join(publicDir, 'complogo.ico'),
      join(publicDir, 'complogo.ico')
    );
    
    console.log('\n✓ All images processed successfully!');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();

