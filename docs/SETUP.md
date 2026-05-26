# MikaNinagawa-Web セットアップ手順 (Shopify 統合運用ガイド)

> Target: 本サイトの **deploy 先 GitHub repo** (本 fork or upstream) で Shopify 統合 (Phase 1 cartCreate + Phase 2-D Shop Pay button) を動かすための初期セットアップ手順。
>
> Audience: repo オーナー / 運用担当 (Shopify Admin と GitHub Settings の両方を操作できる権限保持者)。

---

## 0. 前提

| 項目 | 値 |
|---|---|
| deploy 先 | GitHub Pages (`https://<owner>.github.io/MikaNinagawa-Web/`) |
| preview 認証 | StatiCrypt (AES-256 暗号化、客観的に "no accidental visitors" gate) |
| 購入バックエンド | Shopify (hosted checkout) |
| 想定商品 | 特装版 1 種 (`mirror, mirror, mirror — mika ninagawa`、¥820,000、限定 30) |

実装は `feat(shopify): Phase 1 + Phase 2-D integration` PR に同梱済 (commit `ad465bb`)。本 SETUP.md は **その実装を動かす運用設定** をまとめる。

---

## 1. Shopify Admin 側準備

### 1-1. ストア / 商品状態の確認

- [ ] Shopify ストア開設済 (Basic plan 以上推奨)
- [ ] KYC (本人確認) 完了 — payout hold 回避
- [ ] **商品作成**: `mirror, mirror, mirror` 特装版
  - Price: `¥820,000` (税込)
  - Inventory: `30`、`Track quantity` ON、`Continue selling when out of stock` OFF
  - Variant: 1 個 (特装版)
- [ ] **Variant ID をメモ** (Admin → Products → 該当商品 → Variants → URL 末尾の数値)
  - 例: `https://admin.shopify.com/store/<name>/products/12345/variants/67890` の `67890`
  - **gid プレフィックスは含まない (数値のみ)**

### 1-2. Storefront API custom app 作成

`Settings → Apps and sales channels → Develop apps → Create an app`

| 項目 | 値 |
|---|---|
| App name | `MikaNinagawa-Web Storefront` (任意) |
| Storefront API access | **有効化** |
| 必須 scope | `unauthenticated_read_product_listings`<br>`unauthenticated_write_checkouts`<br>`unauthenticated_read_checkouts` |
| 任意 scope (在庫数表示するなら) | `unauthenticated_read_product_inventory` |

`Install app` → `API credentials` タブ → **Storefront API access token を生成しメモ**。

> ⚠️ Storefront API token は public 露出 OK だが、Admin API token は絶対に出さない。本実装では Admin API は使わない。

### 1-3. 公開設定 / Shop Pay / 配送 / 税

| 項目 | 設定 |
|---|---|
| **Settings → Domains** | サイト URL を登録 (`<owner>.github.io/MikaNinagawa-Web` or 独自ドメイン) |
| **Settings → Customer accounts** | **New Customer Accounts** を有効化 (2025+ 推奨) |
| **Settings → Checkout** | Shop Pay が **enabled** であることを確認 (デフォルト ON) |
| **Settings → Shipping and delivery** | 日本国内配送ゾーン + ¥820,000 商品の送料設定 |
| **Settings → Taxes and duties** | 内税表示 (`¥820,000 (税込)` 表示) |
| **Settings → Markets** | Japan が primary |

---

## 2. GitHub Secrets 登録 (4 個)

`Settings → Secrets and variables → Actions → New repository secret`

| Secret 名 | 値 | 取得元 |
|---|---|---|
| `STATICRYPT_PASSWORD` | プレビュー gate 用パスワード (任意の文字列) | 自由に決める |
| `VITE_SHOPIFY_DOMAIN` | `<store>.myshopify.com` (**スキームなし**) | Shopify Admin → Settings → Domains |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Storefront API public access token | §1-2 で生成 |
| `VITE_SHOPIFY_VARIANT_ID` | 数値 variant ID (**gid プレフィックスなし**) | §1-1 でメモ |

### 検証

- 全 4 個が `Repository secrets` に並んでいることを確認
- 名前は **大文字小文字を正確に** (`vite_shopify_domain` 等のタイポは workflow が拾わない)

---

## 3. 初回 deploy 実行

### 3-1. 失敗 run の re-run (PR #1 merge 後すでに失敗してる場合)

`Actions` タブ → 失敗した `Deploy preview to GitHub Pages` run を選択 → `Re-run failed jobs`

### 3-2. または workflow を手動 trigger

`Actions → Deploy preview to GitHub Pages → Run workflow → main → Run workflow`

### 3-3. 確認

build job:
- `Set up Node` ✅
- `npm install` ✅
- `npm run build` ✅ (`dist/index.js` 等が生成)
- `Encrypt index.html with StatiCrypt` ✅ (`STATICRYPT_PASSWORD` を消費)
- `actions/configure-pages` ✅
- `actions/upload-pages-artifact` ✅

deploy job:
- `actions/deploy-pages` ✅ → URL が page_url として出力

初回は ~2 分、2 回目以降は ~1 分。

### 3-4. Pages の有効化 (初回のみ)

`Settings → Pages`:
- **Build and deployment** → **Source** = **GitHub Actions**

設定後に push を 1 回しないと公開 URL が出ない場合あり (`workflow_dispatch` でも OK)。

---

## 4. 本番動作確認

### 4-1. StatiCrypt unlock

公開 URL (`https://<owner>.github.io/MikaNinagawa-Web/`) を開く:

- パスワード入力フォームが出る
- `STATICRYPT_PASSWORD` で登録した値を入力 → unlock
- セッション中は再入力不要 (`sessionStorage`)

### 4-2. Section03 描画確認

- スクロールして Section03 (`mirror, mirror, mirror`) まで到達
- **「予約注文する」ボタン (白)** が GSAP で fade-in
- **Shop Pay button (紫)** がその下に並列で表示 (5 秒以内に出現すれば OK)
- env 不正 or `customElements.whenDefined` timeout の場合は **Shop Pay button は非表示**、primary CTA のみ残る (safe degrade)

### 4-3. 機能確認

**「予約注文する」**:
- クリック → `loading` 状態で button disable + 「読み込み中...」表示
- 成功 → `<store>.myshopify.com/cart/c/<cart-id>` (Shopify hosted checkout) にリダイレクト
- 失敗 → button 下に赤文字 error message

**Shop Pay button**:
- クリック → `shop.app` の overlay 表示
- Shop アプリ未登録ユーザー → email + OTP 入力フロー
- 登録済ユーザー → 数秒で 1-tap 支払い完了

### 4-4. テスト購入 1 件

本番 store で `¥820,000` を実カードで購入するのは現実的でないため、以下のどちらか:

**Option A: Shopify Test Mode (Bogus Gateway)**

`Admin → Settings → Payments → Manage manual payment methods → Bogus Gateway`:
- 有効化 → カート → checkout で「Bogus Gateway」を選択
- カード番号: `1` (success) / `2` (failure) / `3` (exception) — 動作確認用

**Option B: テスト用低額商品を別途登録**

別 variant を ¥100 で作成 → 実カードで購入 → 即返金。動作確認後 variant を archive。

確認項目:
- [ ] Order 作成成功 (`Admin → Orders` で表示)
- [ ] 注文経路 (`source`): Shop Pay button 経由は `Shop Pay`、cartCreate 経由は `Headless`
- [ ] 6 ヶ月後発送の予約情報が customer note 等に残っているか (該当する場合)

---

## 5. ブラウザ互換性確認

| browser | 検証推奨 |
|---|---|
| Desktop Chrome (latest) | ✅ 必須 |
| Desktop Firefox (latest) | ✅ 必須 |
| Desktop Safari (latest) | ✅ 必須 |
| iOS Safari (iPhone) | ✅ 必須 (主要モバイル流入) |
| Android Chrome | ✅ 必須 |
| Edge | 任意 |

各 browser で:
- StatiCrypt unlock 可
- Section03 描画
- 2 button 表示
- 1 button クリックして checkout 画面まで遷移

iOS Safari は ITP (Intelligent Tracking Prevention) の関係で **Shop Pay button が登録済の Shop アプリと連携できない場合あり** → そのときは Shop Pay の Web フローに自動 fallback。動作はする。

---

## 6. 運用フェーズの留意点

### 6-1. Shop アプリ未登録ユーザーへの UX

ターゲット顧客 (美術品コレクター) が Shop アカウント保有率は不明。Shop Pay button は **登録済ユーザーには 1-tap、未登録ユーザーには新規登録フロー** を提示する。後者は摩擦が増える。

→ **「予約注文する」を primary CTA にして Shop Pay を secondary** に位置付ける現状の配置 (縦並列、白ボタン上 / 紫ボタン下) を維持。

### 6-2. cart 失効

`cartCreate` で作った cart は **Shopify 側で 7 日後に自動失効**。`checkoutUrl` も同様。

- 蜷川案件のような 1 商品 / 即 checkout フローでは問題なし
- ユーザーが checkout 画面で 7 日以上放置するケースで失敗する可能性 (極めて稀)

### 6-3. API version 更新タイミング

`src/lib/shopify.ts` の `apiVersion: "2026-04"` は **1 年で sunset** (Shopify policy)。

- **2027-04 までに更新**: 例えば `"2027-04"` (これは推測、実際は最新 stable を確認)
- 確認方法: https://shopify.dev/docs/api/usage/versioning
- 更新は src/lib/shopify.ts の 1 行差し替えのみ。CI 通れば OK

### 6-4. パスワード変更

`STATICRYPT_PASSWORD` を更新する場合:

1. `Settings → Secrets and variables → Actions` で値を更新
2. `Actions` タブ → `Deploy preview to GitHub Pages` → `Run workflow` で再 deploy
3. 既存セッションは sessionStorage 残存により当面 unlock 状態継続 (タブを閉じるまで)、新規アクセス時は新パスワード必須

### 6-5. Shopify token のローテーション

セキュリティポリシーで token を定期更新する場合:

1. Shopify Admin → 該当 custom app → API credentials → **Rotate token**
2. GitHub Secret `VITE_SHOPIFY_STOREFRONT_TOKEN` を新値で更新
3. 再 deploy

旧 token は rotation 直後に無効化される (grace period なし)。**deploy 完了までは Shop Pay / cartCreate が壊れる時間がある** ことに注意。

---

## 7. トラブルシュート

| 症状 | 原因候補 | 対処 |
|---|---|---|
| deploy failure: `STATICRYPT_PASSWORD secret is not set` | secret 未登録 | §2 で登録 |
| StatiCrypt unlock 後、ページが完全に空白 | bundle build エラー or asset 404 | DevTools Console / Network で確認 |
| Section03 まで scroll しても button が出ない | env 未注入 (secret 未登録) | `Shop Pay button` のみ非表示は仕様 / 両方非表示なら GSAP error |
| 「予約注文する」クリック → 401 Unauthorized | Storefront token が無効 / scope 不足 | §1-2 で scope 再確認 + token rotation |
| 「予約注文する」クリック → 400 Bad Request | variant ID が gid プレフィックスを含む / 数値不正 | `VITE_SHOPIFY_VARIANT_ID` の値を Admin で再確認 |
| Shop Pay button クリック → "Store not found" overlay | `VITE_SHOPIFY_DOMAIN` が間違い (スキームあり / typo) | スキームなしで `<store>.myshopify.com` 形式に修正 |
| Shop Pay button が 5 秒経っても出ない | CDN script の load 失敗 (firewall / 通信断) | DevTools Network で `loader.pay-button.esm.js` を確認、CSP 設定があれば緩める |
| iOS Safari で Shop Pay 1-tap が効かない | ITP の Cookie 制限 | Shop Pay Web フロー fallback で動くか確認、これは Shopify 側 known issue |
| checkout が成功するが Admin に order が出ない | テストモード or webhook 遅延 | 数分待つ + Admin の filter を確認 |

---

## 8. Rollback (緊急時)

| シナリオ | 操作 | 復旧時間 |
|---|---|---|
| Shopify 連携全停止したい | `Settings → Secrets → VITE_SHOPIFY_*` を削除 + 再 deploy | ~2 分 (button が safe degrade で消える) |
| サイト全体を非公開 | `Settings → Pages → Source → None` | 即時 |
| 実装を完全 revert | `git revert ad465bb` + push | ~2 分 (再 deploy) |
| Shop Pay button だけ無効化 | `src/imports/section03/Section03.tsx` の `{shopPayReady && ...}` を `{false && ...}` に変更 + push | ~2 分 |

---

## 9. 参考リンク

- [Shopify Storefront API: cartCreate](https://shopify.dev/docs/api/storefront/latest/mutations/cartcreate)
- [Shopify Web Components for Headless Storefronts](https://shopify.dev/docs/storefronts/headless/additional-sdks/web-components)
- [Shop Pay UX Guidelines](https://shopify.dev/docs/api/commerce-components/pay/design-guidelines)
- [Storefront API versioning](https://shopify.dev/docs/api/usage/versioning)
- [StatiCrypt (preview password gate)](https://github.com/robinmoisson/staticrypt)
- 実装 PR: `linnefromice/MikaNinagawa-Web` #1 (Phase 1 + Phase 2-D), #2 (README cleanup)
- 設計文書: `dipsy-research-ws` PR #88
