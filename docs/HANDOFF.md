> **Note**: これは `linnefromice/ai-research-pipeline` repo の
> `docs/handoff/2026-05-27-mika-shopify-integration.md` を本リポに hard copy したものです。
> Canonical source は ai-research-pipeline 側にあり、内容が更新された際は手動で同期する必要があります。
> 本リポ単独で context を完結させたいケース (別セッション・別マシンからの作業着手・upstream への共有等) のために配置しています。

---

# 引継ぎメモ: Mika Ninagawa Web — Shopify 統合プロジェクト

> 作成: 2026-05-27
> 目的: 別セッションへの引継ぎ。本プロジェクトの目的・現状・残作業・意思決定履歴をまとめる。
> 想定読者: このタスクを引き継ぐ AI セッション、または将来の自分

---

## 0. TL;DR (3 行)

- **蜷川実花の特装版アーティストブック (¥820,000 / 限定 30 / 6 ヶ月先発送)** を Web 販売するサイトに Shopify 統合を実装中
- **本実装と詳細設計は完了**: `linnefromice/MikaNinagawa-Web` repo に 4 PR merge 済 (Phase 1 cartCreate + Phase 2-D Shop Pay button + README + SETUP + GALLERY 設計)
- **残作業**: Shopify Admin 側の本セットアップ (商品 / token / metafields), Phase 3 (商品データ build 時 fetch + OGP + Flow 通知), ギャラリー運用設計の最終決定

---

## 1. プロジェクト概要

### 1-1. 対象

- **商品**: 「mirror, mirror, mirror — mika ninagawa」特装版アーティストブック
- **価格**: ¥820,000 (税込)
- **限定**: 30 作品
- **発送**: ご注文から 6 ヶ月後から順次
- **第一期締切**: 7 月 30 日
- **サイト**: `ayaishikawa-cloud/MikaNinagawa-Web` (Figma Make 由来の Vite + React SPA)

### 1-2. ステークホルダー (推測含む)

| 役割 | 担当 |
|---|---|
| 元 repo オーナー | `ayaishikawa-cloud` (蜷川案件のフロントエンド初期構築) |
| 本実装 fork オーナー | `linnefromice` (Shopify 統合実装) |
| コンサル設計 | `dipsy-research-ws` repo (PR #88 シリーズ) で実施 |
| ユーザー (本セッション主) | `linnefromice` (designer / engineer / consulting lead) |
| 想定 Shopify ストア管理者 | (未確定、案件側で誰が運用するか別途確認必要) |

### 1-3. 全体ゴール

1. **オンライン販売 (本 fork サイト)**: Shopify Cart API → hosted checkout で予約受付
2. **Shop Pay 1-tap**: 80 万円高単価で conversion を上げる
3. **ギャラリー併売**: 物理ギャラリーで Draft Order ベースで予約受付
4. **30 限定の在庫管理**: 全チャネルで衝突なく統合
5. **通知 / 観測**: 注文 / 在庫変化を Slack でリアルタイム把握

---

## 2. 関連リポジトリと役割

| Repo | 役割 | 主要 PR / 文書 |
|---|---|---|
| **`linnefromice/MikaNinagawa-Web`** (fork) | 実装本体 | PR #1-#4 全 merge 済 |
| `ayaishikawa-cloud/MikaNinagawa-Web` (upstream) | 原 repo | まだ contribute していない |
| **`linnefromice/dipsy-research-ws`** (private) | コンサル成果物 | PR #88 で Shopify 統合設計 (#83-#87 シリーズ) |
| `linnefromice/ai-research-pipeline` (本 repo、private) | 研究パイプライン / セッション本拠 | 本 handoff doc を保管 |

### Clone 場所 (ローカル)

| 用途 | パス |
|---|---|
| 本拠地 (research pipeline) | `/home/paru/repository/github.com/linnefromice/ai-research-pipeline` |
| 実装 fork | `/home/paru/repository/github.com/linnefromice/MikaNinagawa-Web` |
| 上流 (clone のみ、変更しない) | `/home/paru/repository/github.com/ayaishikawa-cloud/MikaNinagawa-Web` |

---

## 3. 完了済みの作業 (linnefromice/MikaNinagawa-Web)

### 3-1. PR 一覧 (全 merged、main = `d93582d` + gallery doc `fc55ad9` 後)

| PR | commit | 内容 |
|---|---|---|
| #1 | `ad465bb` | feat(shopify): Phase 1 cartCreate + Phase 2-D Shop Pay button 統合 (5 commits、セルフレビュー反映済) |
| #2 | `804b07b` | docs(readme): StatiCrypt 流に書き換え、PasswordGate.tsx 言及削除 |
| #3 | `d93582d` | docs(setup): 上位環境セットアップ手順 (`docs/SETUP.md` 265 行、9 章) |
| #4 | (gallery doc) | docs(gallery): ギャラリー併売設計メモ (`docs/GALLERY_INTEGRATION.md` 279 行) |

### 3-2. 実装ファイル

```
MikaNinagawa-Web/
├── .env.example          # NEW: VITE_SHOPIFY_DOMAIN / TOKEN / VARIANT_ID
├── .gitignore            # MODIFIED: .env / .env.local 除外
├── index.html            # MODIFIED: lang=ja, Shop Pay loader 2 本 (cdn.shopify.com)
├── docs/
│   ├── SETUP.md          # NEW: 上位環境セットアップ手順 (9 章)
│   └── GALLERY_INTEGRATION.md  # NEW: ギャラリー併売設計 (10 章)
├── package.json          # MODIFIED: @shopify/storefront-api-client ^1.0.10
├── src/
│   ├── lib/
│   │   └── shopify.ts    # NEW: cartCreate wrapper + variantIdToGid helper
│   ├── types/
│   │   └── shop-pay.d.ts # NEW: <shop-pay-button> 型定義
│   └── imports/section03/Section03.tsx  # MODIFIED: onClick + Shop Pay button 配置
└── .github/workflows/deploy.yml  # MODIFIED: VITE_SHOPIFY_* 3 env 注入
```

### 3-3. 主要技術判断 (なぜそうしたか)

| 論点 | 採用 | 根拠 |
|---|---|---|
| SDK | `@shopify/storefront-api-client` のみ (≈10 KB) | hydrogen-react は overkill (1 商品 / 1 ボタン)、将来切替余地は残す |
| Shop Pay 実装 | **Web component を CDN から直接ロード** (`type=module`) | bundle +0 KB、公式 ESM |
| Loader URL | `https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.pay-button.esm.js` | 公式 docs 準拠 (最初は `shop.app/checkout-kit-loader.js` で間違えていたが review で修正) |
| `channel` 属性 | **使用せず** | 公式 web component docs に記載なし (hydrogen-react 専用 prop と判明) |
| `store-url` | `https://${DOMAIN}` (スキーム込み) | 公式仕様 |
| `variants` | `{numericId}:1` (gid 含まず) | 公式仕様 |
| cart 永続化 | なし、毎クリック新規 cartCreate | 薄実装方針 (1 商品 / 即 checkout) |
| API version | `2026-04` (1 年安定) | sunset 回避、`2025-01` だと 2026-04 sunset 危険 |
| Shop Pay readiness | `customElements.whenDefined` + 5s timeout | loader 失敗時の永久 pending 防止 |
| env 未注入時 | button 非表示 (safe degrade) | UX 安全側 |
| ギャラリー販売方式 (検討段階) | **Option C: Draft Order ベース** + 必要時 POS Lite | 6 ヶ月先発送 / 高単価 / 即時引き渡し不要 / コスト 0 |

---

## 4. 設計検討の履歴 (主要な分岐点)

### 4-1. SDK 選定の議論

検討した選択肢:
1. **`@shopify/storefront-api-client` のみ** (採用) — 薄実装
2. `@shopify/hydrogen-react` (未採用) — 機能豊富だが overkill
3. Hydrogen framework (未採用) — Vite SPA を解体する規模

「**現状では薄実装、商品増 / variant 切替 / カート概念が必要になったら hydrogen-react に切り替え**」がコンセンサス。`storefront-api-client → hydrogen-react` の移行コストは低いので future-proof。

### 4-2. ABD 各個別最適化 vs hydrogen-react 統合の議論

- **A** (動的価格・在庫取得) only → `vite.config` build 時 inject が最薄
- **B** (数量選択) only → 蜷川案件で不要 (1 個前提)
- **D** (Shop Pay button) only → web component 直接埋め込み (D1-b) が最薄
- **ABD 全部** → hydrogen-react に切替が薄くなる閾値

蜷川案件は **A + D を個別最適パターンで採用** が ROI 最大という結論。実装は **D のみ完了**、A は Phase 3 で。

### 4-3. 設計レビューでの誤り修正

D1-b 詳細設計で当初書いたが公式仕様照合で訂正:
- ❌ `https://shop.app/checkout-kit-loader.js` → ✅ `https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.pay-button.esm.js`
- ❌ `<script async>` (classic) → ✅ `<script type="module">` (ESM)
- ❌ `channel="headless"` → ✅ 属性そのもの削除

### 4-4. セルフレビューで追加修正 (commit 5)

- ❌ `apiVersion: "2025-01"` → ✅ `"2026-04"` (sunset 回避)
- ❌ userErrors の error message が message のみ → ✅ `code` + `field` も含める
- ❌ env 未設定 warning が常時出る → ✅ `import.meta.env.DEV` 限定

### 4-5. ギャラリー併売の議論 (PR #4 で記録)

検討した 4 option:
- A. 単一プール + POS (🔥🔥)
- B. 拠点別配分 (🟡 蜷川には不要)
- **C. Draft Order ベース (🔥🔥🔥 採用)**
- D. フル POS (🟢 over-engineered)

推奨は **C ベース + 必要時 POS Lite 追加 (Phase 2)** で `docs/GALLERY_INTEGRATION.md` に詳細記録。

---

## 5. 残作業 (優先順)

### 5-1. 🔴 Critical: Shopify Admin の本セットアップ

**前提**: ユーザーは "テスト store 済み" と回答済だが、本番 store のセットアップは未確認。

`docs/SETUP.md §1` 通り:
- [ ] Shopify ストア開設 + KYC 完了
- [ ] 特装版商品作成 + variant ID メモ
- [ ] Storefront API custom app 作成 + token 取得
- [ ] Settings → Domains 登録
- [ ] Customer Accounts (New) 有効化
- [ ] Shop Pay enabled 確認
- [ ] 日本国内配送ゾーン + ¥820,000 商品の送料設定
- [ ] 内税表示
- [ ] (推奨) custom metafields 4 つ追加 (`release_date`, `shipping_lead_months`, `first_order_deadline`, `og_image_url`)

### 5-2. 🔴 Critical: GitHub Secrets 登録 (本 fork or upstream どちらで運用するか決定後)

| Secret | 値 |
|---|---|
| `STATICRYPT_PASSWORD` | 任意 (preview gate) |
| `VITE_SHOPIFY_DOMAIN` | `<store>.myshopify.com` (スキームなし) |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Storefront API token |
| `VITE_SHOPIFY_VARIANT_ID` | 数値 variant ID |
| (Phase 3 で追加) `VITE_SHOPIFY_PRODUCT_HANDLE` | 商品 handle |

現状 fork 側で deploy が `STATICRYPT_PASSWORD` 未設定で failure 中。

### 5-3. 🟡 Important: Phase 3 実装

設計完了済、未実装:

- **A**: 商品データ build 時 fetch (`vite.config.ts` で `__PRODUCT__` 注入)
- **C**: OGP / 構造化データ (`vite-plugin-html` + `index.html` 動的注入 + StatiCrypt `--meta-*`)
- **D**: Shopify Flow で Slack 通知 (no-code、Admin 設定のみ)

工数試算: A + C で 5-6h、D は 1-2h、合計 1 営業日。設計詳細は前セッション会話に存在 (本 handoff の §8 参照)。

### 5-4. 🟡 Important: ギャラリー運用マニュアル

`docs/GALLERY_OPS.md` (新規) として:
- Draft Order 作成手順 (スタッフ向け、screenshot 付き)
- invoice メール typo 対策
- キャンセル / 返金フロー
- FAQ (発送時期 / 関税 / 受取場所)

### 5-5. 🟢 Optional: README から docs/ への導線追加

- `README.md` の末尾に `## Documentation` セクション追加
- `docs/SETUP.md` `docs/GALLERY_INTEGRATION.md` へのリンク

### 5-6. 🟢 Optional: upstream への PR

- 本 fork の改善を `ayaishikawa-cloud/MikaNinagawa-Web` に PR
- 関係者合意が前提 (蜷川案件のオーナーシップに依存)

---

## 6. ユーザーがまだ決めていないオープン論点

| # | 論点 | 選択肢 | 影響範囲 |
|---|---|---|---|
| 1 | 本 fork で本番運用するか、upstream に PR するか | 本 fork / upstream | secrets 登録先、deploy URL |
| 2 | サイトに在庫数表示するか | (a) 非表示 / (b) 残 N 個 / (c) Sold out のみ | Section03 の UI、希少感マーケ判断 |
| 3 | Shopify POS Lite を有効化するか | Yes / No | ギャラリー即時決済の可否 |
| 4 | ギャラリーは何拠点 + 場所 | 単独 / 複数 | Locations 設計 (Option A vs B) |
| 5 | 海外コレクター対応するか | Yes / No | Markets 有効化、多通貨多言語 |
| 6 | キャンセルポリシー | 期間中可 / 不可 | スタッフ操作権限 |
| 7 | 在庫表示の更新方法 | build 時 / runtime fetch / Webhook trigger | A 実装の depth |
| 8 | 第二期 / Mika 関連商品の計画 | あり / なし | hydrogen-react 移行 / 多商品化の必要性 |

これらが決まれば Phase 3 (A + C + D) と GALLERY_OPS.md の実装着手が可能。

---

## 7. 次セッションでまず確認すべきこと

引き継ぎ時の動作確認:

```bash
# 1. ai-research-pipeline (本拠地) を最新化
cd /home/paru/repository/github.com/linnefromice/ai-research-pipeline
git pull --ff-only origin main

# 2. MikaNinagawa-Web fork を最新化
cd /home/paru/repository/github.com/linnefromice/MikaNinagawa-Web
git checkout main && git pull --ff-only origin main
git log --oneline -10  # ad465bb / 804b07b / d93582d / fc55ad9 が並ぶはず

# 3. GitHub Pages deploy の状態確認
gh run list --repo linnefromice/MikaNinagawa-Web --workflow=deploy.yml --limit 3
# → secret 未設定なら failure 連続中、登録後 re-run で復旧

# 4. dipsy-research-ws の PR #88 を確認
gh pr view 88 --repo linnefromice/dipsy-research-ws

# 5. ローカル dev smoke (env なしでも build は通る)
cd /home/paru/repository/github.com/linnefromice/MikaNinagawa-Web
npm install
npm run build
```

---

## 8. 次セッションでやるなら推奨順序

### Option X (推奨): Phase 3 実装に進む

1. ユーザーに「§6 のオープン論点 1-2 を決めてもらう」(在庫表示 + 本 fork or upstream)
2. Shopify Admin の本セットアップ (§5-1) を進める
3. GitHub Secrets 登録 (§5-2)
4. PR #5: feat(shopify): A 商品データ build 時 fetch + C OGP / JSON-LD
5. PR #6: docs(notifications): D Shopify Flow セットアップガイド
6. ローカル + 本番動作確認

### Option Y: GALLERY_OPS.md 作成に進む

1. ユーザーに「§6 の論点 3-6 (POS / 拠点 / 海外 / キャンセル) を決めてもらう」
2. PR #5: docs(gallery): GALLERY_OPS.md スタッフ運用マニュアル
3. (任意) Phase 2 POS Lite セットアップ

### Option Z: upstream contribute

1. ユーザーに「upstream に PR するか」確認
2. 関係者 (ayaishikawa-cloud) と合意形成
3. fork の改善を整理して upstream に PR

---

## 9. 重要なファイル / リンクのインデックス

### MikaNinagawa-Web (実装本体)

- 実装: `src/lib/shopify.ts` / `src/types/shop-pay.d.ts` / `src/imports/section03/Section03.tsx` / `index.html` / `.github/workflows/deploy.yml`
- 設計: `docs/SETUP.md` (運用) / `docs/GALLERY_INTEGRATION.md` (ギャラリー)
- 環境: `.env.example` / `.gitignore`

### dipsy-research-ws (コンサル設計)

- `product/outputs/202605-creator-exclusive-shopify-consulting/`
  - `20260525-shopify-preorder-feasibility-research.md`
  - `20260525-existing-shopify-account-renewal-memo.md`
  - `20260525-multi-store-multi-domain-architecture-memo.md`
  - `20260526-mika-ninagawa-web-shopify-integration-design.md` (PR #88)
  - `output/20260525-creator-shopify-consulting-report.md`

### 公式 docs

- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Shop Pay Web Component](https://shopify.dev/docs/storefronts/headless/additional-sdks/web-components)
- [Shopify Locations](https://help.shopify.com/manual/locations)
- [Shopify POS Lite vs Pro](https://www.shopify.com/pos/features)
- [Draft Orders](https://help.shopify.com/manual/orders/draft-orders)
- [Shopify Flow](https://help.shopify.com/manual/shopify-flow)

---

## 10. セッション固有の暗黙の文脈

### 10-1. ユーザー特性 (推測)

- 設計レビュー / セルフレビュー / 段階的 PR を重視
- 公式仕様への忠実さを評価する
- 「薄実装」「未来の拡張余地」を両立する技術判断を好む
- Markdown / 構造化された情報整理を好む
- 蜷川案件 = 美術品コンサル、ステークホルダー (蜷川さん本人 / プロデューサー / 出版社) への提示を意識

### 10-2. コミュニケーションパターン

- 設計 → レビュー → 修正 → 実装の流れを段階的に踏む
- 「次は何しますか?」 / 「○○ もしておきますか?」と確認しがち
- セルフレビュー要請が定型的に来る (実装後に必ず "セルフレビューしてください")

### 10-3. 技術 stack

- React + Vite + Tailwind (Figma Make 由来)
- GitHub Pages + StatiCrypt
- Cloudflare Workers (別案件で運用中)
- Shopify (本案件で新規導入)

### 10-4. 注意点

- **upstream (ayaishikawa-cloud) は変更権限なし、PR で contribute する想定**
- 本 fork での deploy 失敗は **secret 未設定が原因**、実装には問題なし
- dipsy-research-ws は **private repo**、外部に出さない
- `linnefromice` は user 名であり個人 / 法人を兼ねる構造 (推測)

---

## 11. 完了時の状態 (このメモの起点)

```
main branch heads:
  ai-research-pipeline:     最新 (毎日 cron で報告レポートが追加されている)
  MikaNinagawa-Web:         fc55ad9 (PR #4 merge 後)
  dipsy-research-ws:        PR #88 merge 後の main

Pending decisions: §6 の 8 論点
Pending work: §5-1 §5-2 (人手作業) → §5-3 (Phase 3 実装)
```

このメモは引継ぎ完了後 (Phase 3 着手前または完了後) に更新されることを想定。次セッションは本メモを起点に作業を再開できる。
