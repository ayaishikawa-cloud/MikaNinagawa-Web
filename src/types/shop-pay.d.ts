// Shop Pay button web component の TypeScript 型定義
//
// Shopify 公式 docs:
//   https://shopify.dev/docs/storefronts/headless/additional-sdks/web-components
//
// Loader (ESM):
//   https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.pay-button.esm.js
//
// Custom element name: <shop-pay-button>

import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "shop-pay-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          /** ストア URL (スキーム https:// を含む。例: "https://mirror-mirror.myshopify.com") */
          "store-url": string;
          /**
           * Variant 指定。フォーマット: "VARIANT_ID[:QUANTITY][,VARIANT_ID[:QUANTITY]]"
           * gid プレフィックスは含めない (数値 ID のみ)。
           * 例: "12345" / "12345:1" / "12345:1,67890:2"
           */
          variants: string;
          disabled?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

export {};
