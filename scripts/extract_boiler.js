import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const desktopPath = 'C:\\Users\\user\\Desktop';
const files = fs.readdirSync(desktopPath);
const boilerFileName = files.find(f => f.toLowerCase().includes('boiler') && f.endsWith('.mp4'));

if (!boilerFileName) {
  console.error('Could not find boiler video file on Desktop!');
  process.exit(1);
}

const src = path.join(desktopPath, boilerFileName);
const outDir = 'public/frames/boiler';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log(`Found source video: ${src}`);
console.log(`Extracting 4K/QHD WebP frames to: ${outDir}...`);

// Use 24 fps and 2560x1440 with lanczos scaling for optimal canvas performance and ultra-sharp 4K clarity
const cmd = `"${ffmpegPath}" -y -i "${src}" -vf "fps=24,scale=2560:1440:flags=lanczos" -c:v libwebp -quality 88 -compression_level 6 "${outDir}/frame_%04d.webp"`;
console.log('Running:', cmd);

execSync(cmd, { stdio: 'inherit' });

const extracted = fs.readdirSync(outDir).filter(f => f.endsWith('.webp'));
console.log(`Successfully extracted ${extracted.length} frames for boiler!`);
