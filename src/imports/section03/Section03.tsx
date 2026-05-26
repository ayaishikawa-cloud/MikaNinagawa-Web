import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import boxVideo from "../01IndexPcO/box_3d.mp4";
import tagSpecialSvg from "../../assets/tag_special.svg";
import { cartCreate, variantIdToGid } from "../../lib/shopify";

gsap.registerPlugin(ScrollTrigger);

// Shopify env (build 時に Vite が import.meta.env で焼き込む)
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN as string | undefined;
const SHOPIFY_VARIANT_ID = import.meta.env.VITE_SHOPIFY_VARIANT_ID as string | undefined;

// Shop Pay button web component の readiness 検出 timeout (ms)
const SHOP_PAY_READY_TIMEOUT_MS = 5000;

export default function Section03() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const [shopPayReady, setShopPayReady] = useState(false);
  const [preorderState, setPreorderState] = useState<"idle" | "loading" | "error">("idle");

  // GSAP reveal animation (既存)
  useEffect(() => {
    const section = sectionRef.current;
    const textCol = textColRef.current;
    if (!section || !textCol) return;

    const ctx = gsap.context(() => {
      const reveals = textCol.querySelectorAll<HTMLElement>("[data-reveal]");
      ScrollTrigger.batch(reveals, {
        onEnter: (els) =>
          gsap.from(els, {
            opacity: 0,
            y: 40,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
          }),
        start: "top 85%",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Shop Pay web component readiness 検出
  // - customElements.whenDefined は loader script 未ロード時に never resolve するため timeout を併用
  // - 5 秒以内に登録されなかった場合は button を非表示にして primary CTA だけ残す
  useEffect(() => {
    if (typeof window === "undefined" || !("customElements" in window)) return;

    if (customElements.get("shop-pay-button")) {
      setShopPayReady(true);
      return;
    }

    let cancelled = false;
    Promise.race([
      customElements.whenDefined("shop-pay-button"),
      new Promise<void>((_, reject) =>
        setTimeout(
          () => reject(new Error("shop-pay-button load timeout")),
          SHOP_PAY_READY_TIMEOUT_MS,
        ),
      ),
    ])
      .then(() => {
        if (!cancelled) setShopPayReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          console.warn(
            "[ShopPay] web component unavailable; falling back to primary CTA only",
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 「予約注文する」クリックハンドラ (cartCreate → checkoutUrl リダイレクト)
  const handlePreorder = async () => {
    if (!SHOPIFY_VARIANT_ID) {
      console.error("[Preorder] VITE_SHOPIFY_VARIANT_ID is not set");
      setPreorderState("error");
      return;
    }
    setPreorderState("loading");
    try {
      const cart = await cartCreate([
        { merchandiseId: variantIdToGid(SHOPIFY_VARIANT_ID), quantity: 1 },
      ]);
      window.location.href = cart.checkoutUrl;
    } catch (e) {
      console.error("[Preorder] cartCreate failed", e);
      setPreorderState("error");
    }
  };

  return (
    <section ref={sectionRef} id="section03" className="flex w-full" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-1/2 bg-[#EEEFF2] flex items-center justify-center overflow-hidden">
        <div className="w-full aspect-[4/5] flex items-center justify-center">
          <video
            src={boxVideo}
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-full object-cover"
          />
        </div>
      </div>

      <div ref={textColRef} className="w-1/2 bg-[#111] text-white">
        <div className="h-[150vh]" aria-hidden />
        <div className="px-[8%] py-[64px] flex flex-col gap-[40px]">
          <img data-reveal src={tagSpecialSvg} alt="特装版" className="block w-[66px] h-[23px] mb-[-16px]" />

          <h2 data-reveal className="font-['Hiragino_Mincho_Pro',serif] text-[38px] leading-[1.3] mb-[-8px]">mirror, mirror, mirror<br />mika ninagawa</h2>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] tracking-[0.96px]">
            <span className="text-[32px]">¥820,000</span>
            <span className="text-[16px] ml-[8px]">(税込)</span>
          </p>

          {/* CTA 群: 「予約注文する」+ Shop Pay button を縦並列、同幅 180px */}
          <div data-reveal className="flex flex-col gap-3 w-[180px]">
            <button
              type="button"
              onClick={handlePreorder}
              disabled={preorderState === "loading"}
              className="bg-white text-black font-['Noto_Sans_JP',sans-serif] text-[13px] leading-[22px] rounded-[5px] w-full h-[48px] transition-colors duration-200 hover:bg-neutral-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {preorderState === "loading" ? "読み込み中..." : "予約注文する"}
            </button>

            {preorderState === "error" && (
              <p className="font-['Noto_Sans_JP',sans-serif] text-[10px] leading-[14px] text-red-300">
                一時的なエラーが発生しました。しばらく経ってから再度お試しください。
              </p>
            )}

            {shopPayReady && SHOPIFY_DOMAIN && SHOPIFY_VARIANT_ID && (
              <shop-pay-button
                store-url={`https://${SHOPIFY_DOMAIN}`}
                variants={`${SHOPIFY_VARIANT_ID}:1`}
              />
            )}
          </div>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[8px] leading-[14px] opacity-80 -mt-[27px]">
            発送予定：ご注文いただいてから、6ヶ月後から順次発送
          </p>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[12px] leading-[20px] text-justify max-w-[460px]">
            祭壇をイメージした、小型のアクリル製キャビネットの中にアーティストブックを収納した特装版を限定リリースします。キャビネットの内には、今回刊行される書籍をは​じめ、蜷川がセレクトした追悼や記憶にまつわるアイテムが収められます。日常の​空間に置かれるひとつの私的な祭壇として、記憶と現在、生と死のあいだに静かな​回路をひらくオブジェクトです。
          </p>

          <div data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[11px] leading-[22px] text-justify max-w-[460px] flex flex-col">
            <span>受注締切：第一期 7月30日</span>
            <span>販売数：限定30作品</span>
            <span>著者：蜷川実花</span>
            <span>ブック・デザイン：秋山伸／edition.nord</span>
            <span>エディトリアルデザイン：刈谷悠三、角田奈央／neucitora</span>
            <span>編集：我孫子裕一／afumi inc.</span>
            <span>取り扱い：Art Lab.</span>
            <span>素材：合本, B5 56p., B5 40p., A4 144p. A5 16p. B6 38p., A6 16p. A4 8p., 合計318p.</span>
            <span>商品コード：1100051641</span>
            <span>メーカー：カルチュア・コンビニエンス・クラブ株式会社</span>
            <span>出版：光村推古書院株式会社</span>
            <span>企画：CCC ART LAB, 株式会社テレビ朝日, 株式会社ラッキースター, afumi inc.</span>
          </div>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[10px] leading-[16px] opacity-60">© Culture Convenience Club Co.,Ltd</p>
        </div>
      </div>
    </section>
  );
}
