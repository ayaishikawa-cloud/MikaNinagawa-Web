import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import boxVideo from "../01IndexPcO/box_3d.mp4";
import tagSpecialSvg from "../../assets/tag_special.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Section03() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const textCol = textColRef.current;
    if (!section || !visual || !textCol) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visual,
        { scale: 0.4 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

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

  return (
    <section ref={sectionRef} className="flex w-full" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-1/2 bg-[#F1F0F2] flex items-center justify-center overflow-hidden">
        <div ref={visualRef} className="w-[50%] aspect-[4/5] flex items-center justify-center" style={{ willChange: "transform" }}>
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
        <div className="px-[8%] py-[80px] flex flex-col gap-[40px]">
          <img data-reveal src={tagSpecialSvg} alt="特装版" className="block w-[82px] h-[29px]" />

          <h2 data-reveal className="font-['Hiragino_Mincho_Pro',serif] text-[40px] leading-[1.3]">mirror, mirror, mirror<br />mika ninagawa</h2>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] tracking-[0.96px]">
            <span className="text-[32px]">¥820,000</span>
            <span className="text-[16px] ml-[8px]">(税込)</span>
          </p>

          <button data-reveal type="button" className="bg-white text-black font-['Noto_Sans_JP',sans-serif] text-[13px] leading-[22px] rounded-[5px] w-[180px] h-[48px] transition-colors duration-200 hover:bg-neutral-300">
            予約注文する
          </button>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[10px] leading-[16px] opacity-80 -mt-[27px]">
            発送予定：ご注文いただいてから、6ヶ月後から順次発送
          </p>

          <p data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[13px] leading-[22px] text-justify max-w-[460px]">
            祭壇をイメージした、小型のアクリル製キャビネットの中にアーティストブックを収納した特装版を限定リリースします。キャビネットの内には、今回刊行される書籍をは​じめ、蜷川がセレクトした追悼や記憶にまつわるアイテムが収められます。日常の​空間に置かれるひとつの私的な祭壇として、記憶と現在、生と死のあいだに静かな​回路をひらくオブジェクトです。
          </p>

          <div data-reveal className="font-['Noto_Sans_JP',sans-serif] text-[13px] leading-[25px] text-justify max-w-[460px] flex flex-col">
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
