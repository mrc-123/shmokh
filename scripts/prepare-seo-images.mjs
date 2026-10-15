import fs from 'node:fs';
import sharp from 'sharp';
// Separate small lossless thumbnails: full-size gallery images are untouched.
const directory = 'public/rentals';
for (const name of fs.readdirSync(directory).filter(name => /^(?:un)?furnished-\d+\.webp$/.test(name))) {
 await sharp(`${directory}/${name}`).resize({ width: 160, withoutEnlargement: true }).webp({ lossless: true }).toFile(`${directory}/${name.replace('.webp', '-thumb.webp')}`);
}
