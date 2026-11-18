import { SITE_URL } from '../consts';

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
