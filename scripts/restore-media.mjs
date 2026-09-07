import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Small source parts keep repository uploads reliable. The website serves the
// original, byte-identical MP4 files after assembly; no transcoding takes place.
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(path.join(root, 'media-source/manifest.json'), 'utf8'));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
await mkdir(path.join(root, 'public/media'), { recursive: true });
for (const entry of manifest.files) {
  const target = path.join(root, 'public/media', entry.name);
  try {
    const existing = await readFile(target);
    if (existing.length === entry.bytes && digest(existing) === entry.sha256) continue;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const parts = await Promise.all(entry.parts.map(part => readFile(path.join(root, 'media-source', part))));
  const video = Buffer.concat(parts);
  if (video.length !== entry.bytes || digest(video) !== entry.sha256) throw new Error(`Media integrity check failed: ${entry.name}`);
  await writeFile(target + '.assembling', video);
  await rename(target + '.assembling', target);
}
console.log(`Verified ${manifest.files.length} portfolio videos.`);
