// Shopify Storefront API クライアントと cartCreate mutation のラッパ
// 薄実装方針: useState 不要、ボタンクリック → cartCreate → checkoutUrl リダイレクト

import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN as string | undefined;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;

// dev のみ warning。prod では常に env が注入されるため不要、ノイズ削減。
if (import.meta.env.DEV && (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN)) {
  console.warn("[shopify] VITE_SHOPIFY_DOMAIN or VITE_SHOPIFY_STOREFRONT_TOKEN is not set");
}

const client = createStorefrontApiClient({
  storeDomain: SHOPIFY_DOMAIN ?? "",
  publicAccessToken: SHOPIFY_TOKEN ?? "",
  // Shopify API は stable version を 4 quarter (1 年) で sunset するため、
  // 直近の stable を指定して長く安定運用する。年 1 回見直し推奨。
  apiVersion: "2026-04",
});

export interface CartLineInput {
  /** Variant の gid (gid://shopify/ProductVariant/12345) */
  merchandiseId: string;
  quantity: number;
}

export interface CartCreateResult {
  id: string;
  checkoutUrl: string;
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

interface CartCreateResponse {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: Array<{
      code: string | null;
      field: string[] | null;
      message: string;
    }>;
  };
}

/**
 * Cart を作成して checkoutUrl を返す。
 * - 1 商品 / 即 checkout の薄実装。永続化なし、戻ってきても新規 cart 作成。
 * - userErrors があれば Error を throw。
 */
export async function cartCreate(lines: CartLineInput[]): Promise<CartCreateResult> {
  const { data, errors } = await client.request<CartCreateResponse>(CART_CREATE_MUTATION, {
    variables: { lines },
  });

  if (errors) {
    throw new Error(`[shopify] cartCreate failed: ${errors.message ?? JSON.stringify(errors)}`);
  }

  const userErrors = data?.cartCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    // code / field を含めて debug 価値を残す (Sentry 等での原因切り分け用)
    const detail = userErrors
      .map((e) => {
        const fieldPath = e.field?.join(".") ?? "n/a";
        const code = e.code ?? "n/a";
        return `${e.message} (code: ${code}, field: ${fieldPath})`;
      })
      .join("; ");
    throw new Error(`[shopify] cartCreate userErrors: ${detail}`);
  }

  const cart = data?.cartCreate?.cart;
  if (!cart) {
    throw new Error("[shopify] cartCreate returned no cart");
  }

  return { id: cart.id, checkoutUrl: cart.checkoutUrl };
}

/**
 * 数値 variant ID を Storefront API 用の gid 形式に変換。
 * 例: "12345" → "gid://shopify/ProductVariant/12345"
 */
export function variantIdToGid(numericId: string): string {
  return `gid://shopify/ProductVariant/${numericId}`;
}
