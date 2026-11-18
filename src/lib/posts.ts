import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, type CategoryKey } from '../consts';

export type Post = CollectionEntry<'posts'>;

export function getCategory(post: Post): CategoryKey {
  // The glob loader uses frontmatter `slug` as id, so read the folder from filePath.
  const dir = (post.filePath?.match(/content\/posts\/([^/]+)\//)?.[1] ?? '') as CategoryKey;
  return dir in CATEGORIES ? dir : 'living';
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => p.data.status === 'published');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Body images in document order (markdown and <img>). */
function bodyImages(post: Post): string[] {
  const body = post.body ?? '';
  const re = /!\[[^\]]*\]\(([^)\s]+)[^)]*\)|<img[^>]+src="([^"]+)"/g;
  return [...body.matchAll(re)].map((m) => m[1] ?? m[2]).filter(Boolean);
}

/** Decorative illustrations live under /images/posts/<slug>/illust-*. They never represent the product. */
export function isIllustration(src: string): boolean {
  return /\/illust[-_/]/.test(src);
}

/** Product image for cards and og:image: explicit thumbnail, then ogImage, then the first non-illustration body image. */
export function firstImage(post: Post): string | undefined {
  if (post.data.thumbnail) return post.data.thumbnail;
  if (post.data.ogImage && !isIllustration(post.data.ogImage)) return post.data.ogImage;
  const imgs = bodyImages(post);
  return imgs.find((src) => !isIllustration(src)) ?? imgs[0];
}

export function displayTags(post: Post): string[] {
  const hidden = new Set(['coupang', '제품리뷰', '리뷰', '라이프', '생활정보', 'it']);
  return post.data.tags.filter((t) => !hidden.has(t)).slice(0, 3);
}
