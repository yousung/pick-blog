export const SITE_TITLE = '러비쥬 픽';
export const SITE_DESCRIPTION = '책상 장비, 생활·주방·인테리어·문구·건강용품, 육아템을 구매 기준과 실제 후기 흐름으로 비교해 고르는 상품 노트입니다.';
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
  living: { label: '생활', blurb: '수납, 계절가전, 정리용품', emoji: '🏠' },
  kitchen: { label: '주방', blurb: '조리가전, 텀블러, 주방 소품', emoji: '🍳' },
  interior: { label: '홈인테리어', blurb: '조명, 러그, 커튼, 방 분위기를 바꾸는 소품', emoji: '🛋️' },
  stationery: { label: '문구', blurb: '필기구, 노트, 라벨프린터, 책상 위 정리', emoji: '✏️' },
  health: { label: '헬스·건강', blurb: '홈트 용품, 자세·수면, 건강 관리 도구', emoji: '💪' },
  baby: { label: '육아', blurb: '신생아부터 외출까지, 아기용품 고르는 기준', emoji: '🍼' }
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const NAV_ITEMS = [
  { href: '/', label: '홈' },
  ...(Object.keys(CATEGORIES) as CategoryKey[]).map((k) => ({ href: `/categories/${k}/`, label: CATEGORIES[k].label })),
  { href: '/about/', label: '소개' }
];
