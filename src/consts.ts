export const SITE_TITLE = '러비쥬 픽';
export const SITE_DESCRIPTION = '책상 장비, 생활용품, 육아템을 구매 기준과 실제 후기 흐름으로 비교해 고르는 상품 노트입니다.';
export const SITE_URL = 'https://pick.lovizu.com';
export const SITE_AUTHOR = '감성개발자';

// No AdSense on this site: revenue comes from Coupang Partners only.
// Google Analytics 4 (러비쥬 account, property "pick.lovizu.com")
export const GA_MEASUREMENT_ID = 'G-VHVJQM4JR3';
// Naver Search Advisor / Google Search Console ownership metas for https://pick.lovizu.com
export const NAVER_SITE_VERIFICATION = '64e624576e67c8a3b418e0b8d81a4f2d663344ff';
export const GOOGLE_SITE_VERIFICATION = '';

export const PARTNERS_DISCLOSURE = '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';

export const CATEGORIES = {
  it: { label: 'IT·데스크', blurb: '개발자 책상, 충전기, 이어폰, 개발 서적', emoji: '💻' },
  living: { label: '생활', blurb: '수납, 계절가전, 주방, 정리용품', emoji: '🏠' },
  baby: { label: '육아', blurb: '신생아부터 외출까지, 아기용품 고르는 기준', emoji: '🍼' }
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/categories/it/', label: 'IT·데스크' },
  { href: '/categories/living/', label: '생활' },
  { href: '/categories/baby/', label: '육아' },
  { href: '/about/', label: '소개' }
];
