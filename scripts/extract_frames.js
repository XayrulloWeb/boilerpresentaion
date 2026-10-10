import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

console.log('Using ffmpeg from:', ffmpegPath);

const videos = [
  {
    name: 'boiler',
    src: 'C:\\Users\\user\\Desktop\\Industrial_solid-fuel_boiler_sys._1080p_20261010191642.mp4',
    outDir: 'public/frames/boiler',
    // 3840x2160 4K or 2560x1440 QHD with lanczos filter for crispness
    scale: 'scale=2560:1440:flags=lanczos',
    fps: 24, // smooth 24 fps sequence
    quality: 85
  },
  {
    name: 'auger',
    src: 'C:\\Users\\user\\Desktop\\Auger_reverses_to_dislodge_rock_20261010191753.mp4',
    outDir: 'public/frames/auger',
    scale: 'scale=2560:1440:flags=lanczos',
    fps: 24,
    quality: 85
  }
];

videos.forEach((v) => {
  if (!fs.existsSync(v.src)) {
    console.error(`Source video not found: ${v.src}`);
    return;
  }

  if (!fs.existsSync(v.outDir)) {
    fs.mkdirSync(v.outDir, { recursive: true });
  }

  console.log(`\n--- Extracting ${v.name} frames to ${v.outDir} (WebP High Quality) ---`);
  // ffmpeg command: extract frames as WebP with high quality
  const cmd = `"${ffmpegPath}" -y -i "${v.src}" -vf "fps=${v.fps},${v.scale}" -c:v libwebp -quality ${v.quality} -compression_level 6 "${v.outDir}/frame_%04d.webp"`;
  
  console.log('Running:', cmd);
  execSync(cmd, { stdio: 'inherit' });
  
  const files = fs.readdirSync(v.outDir).filter(f => f.endsWith('.webp'));
  console.log(`Extracted ${files.length} frames for ${v.name}!`);
});

console.log('\nAll video frames extracted successfully!');
