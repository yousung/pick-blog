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

export function firstImage(post: Post): string | undefined {
  if (post.data.ogImage) return post.data.ogImage;
  return post.body?.match(/!\[[^\]]*\]\(([^)\s]+)\)/)?.[1] ?? post.body?.match(/<img[^>]+src="([^"]+)"/)?.[1];
}

export function displayTags(post: Post): string[] {
  const hidden = new Set(['coupang', '제품리뷰', '리뷰', '라이프', '생활정보', 'it']);
  return post.data.tags.filter((t) => !hidden.has(t)).slice(0, 3);
}
