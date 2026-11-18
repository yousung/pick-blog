import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/** Slugs of posts that declare an external canonical URL in frontmatter. */
export async function readCanonicalSlugs(dirUrl) {
  const root = fileURLToPath(dirUrl);
  const entries = await readdir(root, { recursive: true });
  const slugs = [];
  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    const text = await readFile(path.join(root, entry), 'utf8');
    const front = text.split(/^---$/m)[1] ?? '';
    if (!/^canonical:/m.test(front)) continue;
    const slug = front.match(/^slug:\s*["']?([^"'\n]+)["']?/m)?.[1];
    if (slug) slugs.push(slug.trim());
  }
  return slugs;
}
