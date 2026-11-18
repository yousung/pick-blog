/**
 * - Affiliate links (Coupang Partners) get rel="sponsored nofollow noopener" and open in a new tab.
 * - Images get lazy loading, except the first one.
 * - Inline-styled CTA wrappers from the original posts get a class so CSS can restyle them.
 */
const AFFILIATE = /(^https?:\/\/)(link\.)?coupang\.com\//i;

export default function rehypeAffiliate() {
  return (tree) => {
    let imageIndex = 0;
    const walk = (node) => {
      if (node.type === 'element') {
        const props = (node.properties ??= {});
        if (node.tagName === 'a' && typeof props.href === 'string' && AFFILIATE.test(props.href)) {
          props.rel = ['sponsored', 'nofollow', 'noopener'];
          props.target = '_blank';
          delete props.style;
          props.className = [...(props.className ?? []), 'aff-link'];
        }
        if (node.tagName === 'img') {
          props.decoding = 'async';
          props.loading = imageIndex === 0 ? 'eager' : 'lazy';
          imageIndex += 1;
        }
        if (node.tagName === 'div' && typeof props.style === 'string' && /text-align:\s*center/.test(props.style)) {
          const hasAffiliate = JSON.stringify(node.children ?? []).includes('coupang.com');
          if (hasAffiliate) {
            delete props.style;
            props.className = [...(props.className ?? []), 'buy-box'];
          }
        }
        if (node.tagName === 'p' && 'dataPriceCheck' in props) {
          delete props.style;
          props.className = [...(props.className ?? []), 'price-box'];
        }
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}
