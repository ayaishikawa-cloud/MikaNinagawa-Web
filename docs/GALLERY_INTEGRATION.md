# ギャラリー併売 統合設計メモ

> Status: 設計検討メモ (実装未着手)
> 作成日: 2026-05-27
> Context: 本サイト (オンライン販売) + 物理アートギャラリーでの併売を想定した、Shopify を軸にした在庫管理 / チャネル統合の検討
> 関連: [`docs/SETUP.md`](./SETUP.md) (本番運用セットアップ)

---

## 0. まず整理: 蜷川案件における "ギャラリー販売" の実態

| 軸 | 一般的な物販 | 美術品ギャラリー (蜷川案件) |
|---|---|---|
| ギャラリーの役割 | 倉庫 + 販売 | **discovery + プレミアム接客** |
| 在庫物理保管 | あり | 基本なし、sample のみ |
| 引き渡し | その場 | **6 ヶ月後**、出版時に発送 |
| 決済 | 即時 (現金 / カード) | カード / 銀行振込 / 期日決済 |
| 顧客接点 | 単発 | 長期 (preorder → 受取 → アフター) |
| 単価 | ~数千〜数万円 | **¥820,000** |

→ ギャラリーは **「販売拠点」というより「予約受付代理店」** に近い構造。従来 POS の発想 (現物即販売) は半分しか当てはまらない。これを設計の前提に置く。

---

## 1. Shopify が用意する 5 つのしくみ

| # | 機能 | 何ができるか |
|---|---|---|
| **L** | **Locations** (Multi-location inventory) | 物理拠点ごとに在庫を持つ / 配分する |
| **P** | **Shopify POS** (Lite / Pro) | iPad / iPhone がレジに。Admin と完全同期 |
| **D** | **Draft Orders** | スタッフが Admin で手動注文作成 → invoice メール送付 |
| **C** | **Sales Channels** | チャネルごとに販売対象 / 在庫配分 / 価格を管理 |
| **F** | **Shopify Flow + Webhooks** | 注文発生で在庫減 / 通知 / CRM 更新を自動化 |

---

## 2. 4 つの設計案 (Option A-D)

### Option A: 単一在庫プール (最薄、共有プール)

```
Shopify: 1 product, 30 unit, Single location
   │
   ├── オンライン (this fork)
   └── ギャラリー (POS or 手動)
        └── 同じ 30 から減る
```

- **Pros**: 在庫衝突なし (Shopify 排他制御)、セットアップ最小、配分問題なし
- **Cons**: チャネル別レポートが取りづらい (POS channel tag で一定追跡可)
- **蜷川適合度**: 🔥🔥🔥 (30 限定 / 高単価 / 在庫 hot-swap リスク回避)

### Option B: 拠点別在庫配分

```
Shopify: 1 product, 30 unit
  ├── Online: 15
  ├── Tokyo gallery: 10
  └── Kyoto gallery: 5
```

- **Pros**: 拠点別売上 / 在庫が正確、VIP 先行枠など差別化容易
- **Cons**: 配分ミスで「online sold out なのにギャラリーには残ってる」事態、拠点間 transfer 必要、POS Pro 必須 (¥89/月/location)
- **蜷川適合度**: 🟡 (出版社一括製造 / ギャラリーは sample のみ の本案件には基本不要)

### Option C: オンライン専売 + ギャラリーは Draft Order 経由 (一番薄い)

```
Shopify: 1 product, 30 unit, Single location
   │
   ├── オンライン (this fork)
   └── ギャラリースタッフが Admin で Draft Order
        → invoice をメール → 顧客が後で支払い
```

- **Pros**: 追加コスト **¥0**、セットアップ 30 分、Shop Pay / カード / 銀行振込から選択可、¥820,000 商品で「即時現金」は現実的でないので Draft Order の方が顧客フィット
- **Cons**: 即時性なし (顧客は invoice を後で受け取り)、スタッフ Admin 操作の学習必要
- **蜷川適合度**: 🔥🔥🔥 (6 ヶ月先発送 + 高単価 + 美術品 = 即時引き渡し不要 = Draft Order が自然)

### Option D: ギャラリー POS + Online は BOPIS (フル統合)

```
Shopify: 1 product, 30 unit
Locations: Online / Tokyo gallery / Kyoto
Fulfillment options:
  - Ship (online)
  - Pickup at Tokyo gallery (online)
  - Pickup at Kyoto gallery (online)
  - In-store sale (Tokyo POS / Kyoto POS)
```

- **Pros**: 顧客体験の柔軟性最大、販売員別 incentivize 可、Shopify が全て管理
- **Cons**: POS Pro 2 台分 × ¥89/月 = ¥178/月、ハードウェア / staff 訓練の labor、本案件のスコープに対して **明らかにオーバー**
- **蜷川適合度**: 🟢 (将来 Mika 関連商品が増えてかつ常設ギャラリー継続販売する場合のみ)

---

## 3. Option 別比較表

| 軸 | A: 単一プール + POS | B: 拠点別配分 | **C: Draft Order** | D: フル POS |
|---|---|---|---|---|
| 月次コスト | POS Pro ¥89/月 | POS Pro ¥89/月/location | **¥0** | POS Pro × N |
| ハードウェア | iPad + reader | 同上 + 各 location | **不要** | iPad + reader × N |
| セットアップ | 半日 | 1 日 | **30 分** | 数日 |
| スタッフ訓練 | 1-2h | 1-2h | **30 分** (Draft Order 入力) | 半日 |
| 在庫衝突リスク | なし | あり (配分ミス) | **なし** | あり (配分ミス) |
| 即時決済 | ✅ | ✅ | ❌ (invoice メール) | ✅ |
| 6 ヶ月先発送との相性 | ◯ | ◯ | **◎** | ◯ |
| ¥820,000 商品との相性 | ◯ | ◯ | **◎** (振込フィット) | ◯ |
| 拠点別レポート | △ (channel tag) | ◎ | △ | ◎ |
| **蜷川案件適合度** | 🔥🔥 | 🟡 | **🔥🔥🔥** | 🟢 |

---

## 4. 推奨設計: Option C ベース + Option A 補強 (必要時)

### 推奨構成

```
Shopify Admin (Basic plan 以上)
  Product: mirror, mirror, mirror
  Inventory: 30
  Locations: 1 (e.g., "Mika 出版")
    │
    ├── Online (本 fork)
    │     cartCreate → Shopify checkout
    │
    └── Gallery staff
          Admin で Draft Order 作成 → invoice メール
          → 顧客が支払い (カード / 銀行振込)
                  │
                  ▼
            同じ 30 inventory pool から減る
                  │
                  ▼
            Shopify Flow:
              注文 → Slack notify
              残 5 切り → alert
              完売 → 全関係者 broadcast
```

### なぜ Option C (Draft Order) ベースか

1. **6 ヶ月先発送**: その場引き渡しが不要 → 即時 POS 決済の優位性が消える
2. **¥820,000**: カードでは枠超 / 銀行振込希望が多い → invoice の方が顧客親和性高
3. **30 限定**: 在庫衝突を避けたい → 単一 location が安全
4. **コスト 0**: POS Pro ¥89/月 × 各 location を払わない
5. **柔軟性**: Draft Order は割引 / カスタム line item / 顧客 note を自由に追加可

### 万一 "即時引き渡し / 即時決済" が必要なら POS Lite を追加

- **Shopify POS Lite**: Basic plan 同梱、**追加月額ゼロ**
- 単一 location 前提 = Option A と整合
- iPad + Tap & Chip Reader (¥3,000) でカード決済可

---

## 5. Shopify POS Lite まとめ (参考)

| 項目 | 値 |
|---|---|
| 月額 | **¥0** (Basic 以上に同梱) |
| 決済手数料 | 通常レート (3.4-3.55% 程度、日本) |
| ハードウェア | iPad / iPhone (持参可) + Tap & Chip Reader ¥3,000 |
| 機能 | 商品検索 / カード決済 / 領収書 / 在庫自動同期 / Draft Order からの清算 |
| 制限 | 単一 location のみ、staff 別売上レポートなし、BOPIS なし |
| Pro へ上げる動機 | 複数 location / staff commission / BOPIS が要る場合 |

蜷川案件は **基本不要** (Draft Order 中心)。「現地カード決済客がいる」場合のみ保険的に有効化。

---

## 6. 段階導入プラン

### Phase 1 (今すぐ、コード変更 0)

| ステップ | 内容 | 所要 |
|---|---|---|
| 1 | Shopify Admin で staff seat 作成 (ギャラリー担当者) | 10m |
| 2 | スタッフ向け training (Draft Order 操作) | 1h |
| 3 | Shopify Flow で注文 / 残数 / 完売の 3 種通知設定 | 30m |
| 4 | スタッフ用 manual を `docs/GALLERY_OPS.md` として用意 | 1-2h |

**合計**: 半日程度。**コスト ¥0**。

### Phase 2 (現地で即時決済もしたい場合のみ、+1h)

| ステップ | 内容 |
|---|---|
| 5 | Shopify Admin で Point of Sale channel install (無料) |
| 6 | iPad に Shopify POS app install、staff account でログイン |
| 7 | 商品が POS channel から見えることを確認 |
| 8 | テスト売上 1 件で確認 |

### Phase 3 (将来、第二期 / Mika 関連商品が出てから)

- Multi-location 化 (Option B)
- 拠点別 inventory 配分
- BOPIS (Buy Online, Pickup at Gallery)
- POS Pro 移行 (¥89/月)

---

## 7. 技術的留意点 (6 件)

### 7-1. 在庫表示の更新ラグ

- **問題**: build 時 fetch では「最後の deploy」時点の在庫しか出ない
- **対策 (薄)**: Shopify Flow で `Inventory adjusted` → GitHub Actions `repository_dispatch` → 自動 build → 2 分で反映
- **対策 (中)**: 在庫部分だけ runtime fetch (1 query)
- **対策 (厚)**: WebSocket / SSE で push (over-engineered)
- 蜷川案件: **薄を採用** (30 個販売中の更新頻度は数日に 1 回)

### 7-2. invoice メールの到達性

- スタッフ入力の顧客メアド typo で invoice が届かない事故
- Shopify Admin の `send test invoice to self` でチェック
- スタッフ操作チェックリストに含める

### 7-3. 国際配送

- 海外コレクター層 → `Settings → Markets → International` 有効化
- 関税 / VAT / 配送料の自動計算
- DHL Express 等の対応 carrier

### 7-4. 税 / 領収書 / インボイス制度

- ギャラリー販売も Shopify の PDF 領収書発行可
- 内税表示 (¥820,000 税込)
- インボイス制度: Shopify Admin に **適格請求書発行事業者番号** を登録すれば自動採番

### 7-5. キャンセル / 返金

- 6 ヶ月の preorder 期間中、Shopify Admin の `Cancel` で在庫 +1 戻る
- カード払いは自動返金 (Shopify Payments / Stripe)
- 銀行振込は手動振込 + `Mark as refunded`
- staff 権限で「Cancel orders」を必要な staff のみ ON

### 7-6. レポート / 会計

- `Reports → Sales by channel`: online vs POS の売上比較
- POS Pro なら `Sales by staff` も
- Tax report → freee / マネーフォワード等会計 SaaS と連携 (CSV export)

---

## 8. 在庫衝突の回避メカニズム (技術的詳細)

Shopify は **inventory commit を排他制御** で行う:

- 同時に online cart 投入 → checkout 押した時、最初の 1 人だけ通過
- 残りは "Sold out" / "Insufficient inventory" error
- ギャラリーの Draft Order も同じ pool

→ **設計レベルで衝突は起きない**。ただし UI レベルで「残数表示が古い」ことは起きうる (build snapshot のため) → 買い物カート画面で `cartCreate` 失敗 → error 表示で気付く構造になっている。

---

## 9. 実装着手前のオープン論点

| 決めること | 選択肢 |
|---|---|
| **本 fork サイトに在庫表示を追加するか** | (a) 表示しない / (b) 残 N 個表示 / (c) Sold out のみ |
| **POS Lite を有効化するか** (即時決済する場合のみ必要) | Yes / No |
| **ギャラリーは何拠点 + 場所は?** | 拠点数で Option B / 単一プール選択が変わる |
| **海外コレクター対応するか** | Markets を有効化するか |
| **キャンセルポリシー** | 6 ヶ月の preorder 期間中のキャンセル可否 |

これらが決まれば、`docs/GALLERY_OPS.md` (スタッフ運用マニュアル) として **コード変更ゼロで実装** に進められる。

---

## 10. 参考リンク

- [Shopify Locations](https://help.shopify.com/manual/locations)
- [Shopify POS Lite vs Pro](https://www.shopify.com/pos/features)
- [Draft Orders](https://help.shopify.com/manual/orders/draft-orders)
- [Shopify Flow](https://help.shopify.com/manual/shopify-flow)
- [Markets / 多通貨多言語](https://help.shopify.com/manual/markets)
