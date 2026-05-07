import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import HeroScrollAnimation from "./HeroScrollAnimation";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;
import svgPaths from "./svg-j6uad99ttk";
import img80A6842 from "./9714234be74e8638426b0727fcd956c9b143294a.png";
import img110191118Vca598652800X12003 from "./3800ff74777e5ee427f5afce19caeffd911e9489.png";
import imgPaint002 from "./e02aa0fce2873d6fd27d88549a96aa3786ad40e0.png";
import img141216041936900X12002 from "./8e06a0486a91890b1caf8c716bde82ea6a40a2ea.png";
import imgPhoto07Sec01 from "./d60f1cbbf07b4b5959221b170f9437d73d7cde0d.png";
import imgPhoto06Sec01 from "./c9b2a38377132388fca2a0ddc9178bbb047e3940.png";
import imgPhoto05Sec01 from "./91b0e119065989ac2d7654fee36d052a1f2289ac.png";
import imgPhoto04Sec01 from "./b2c977e6cfcda7545fa3e1488073edcad7fab7a9.png";
import imgPhoto03Sec01 from "./a45ae21d2ca1ab4f44409f1cc1a37df86494e66c.png";
import imgPhoto02Sec01 from "./b401b651683b492c8d3c6b621705dafe1fe08c98.png";
import imgPhoto01Sec01 from "./798856b17fea137fe816f56fb4d79fa710b2d472.png";
import img80A6632 from "./85a92643cfc8ea2127cb6553bae8279a76d47044.png";
import imgS1600X2133VFrmsWebpFf594319Bdc3406D8B06E5Ee25F80E0FWebp1 from "./9fcb13bc64cd31fd8b75bb0e064a6ea536fcb195.png";
import imgS1600X2133VFrmsWebp272D6FecEd0D4F3591D3Dbab1025219DWebp1 from "./dd347c12beb48f5b69e5fcddf4baa037e70a4a8e.png";
import imgS1600X2133VFrmsWebp59C9Cca8143A4D9E987086C7B74CdcdeWebp1 from "./488a9aee76e938753e3880d8d5dcaf1da822e27d.png";
import imgRectangle13 from "./5317d1625578a70e60886f852db5623e81fc5541.png";
import imgImgSec05 from "./1d9b0dde9104012a5cd940cb30c770ee5aa53b58.png";
import imgBgSec05 from "../bg_sec05.png";
import heroScrollVideo from "./hero-scroll.mp4";
import movieSec02Video from "./movie_sec02.mp4";
import { img80A06841, img141216041936900X12001 } from "./svg-n94c3";

function MovieHero() {
  return (
    <div data-hero="bg" className="-translate-x-1/2 absolute h-[854px] left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[1280px_720px] opacity-90 top-0 w-[1280px]" style={{ maskImage: `url('${img80A06841}')` }}>
      <video
        data-hero-video
        src={heroScrollVideo}
        poster={img80A6842}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
      />
    </div>
  );
}

function AnkerSection() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector("#section03");
    if (!target) return;
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement | string, opts?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo("#section03", { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <a href="#section03" onClick={handleClick} className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 cursor-pointer group">
      <div className="bg-white col-1 h-[44px] ml-0 mt-0 relative rounded-[5px] row-1 w-[139px] transition-colors duration-200 group-hover:bg-neutral-300" />
      <p className="col-1 font-['Noto_Sans_JP',sans-serif] leading-[22px] ml-[31px] mt-[11px] not-italic relative row-1 text-[13px] text-black whitespace-nowrap pointer-events-none">予約注文する</p>
    </a>
  );
}

function Floating() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start right-[25px] top-[599px] w-[320px]">
      <p className="font-['Instrument_Serif',serif] leading-[24px] not-italic relative shrink-0 text-[20px] text-left text-shadow-[0px_0px_20px_rgba(0,0,0,0.65)] text-white tracking-[0.6px] whitespace-nowrap">Mika Ninagawa Artist’s Book</p>
      <AnkerSection />
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  return (
    <section ref={heroRef} style={{ height: 1750 }}>
      <HeroScrollAnimation containerRef={heroRef} />
      <div data-hero-follow className="absolute top-0 left-0 w-full" style={{ height: 854, willChange: "transform" }}>
        <MovieHero />
      </div>
      <Floating />
      <div className="absolute h-[156px] left-[1121px] top-[204px] w-[54px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 156">
          <g id="special">
            <path d={svgPaths.p22051900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2cc54600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1def3600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p317e3bc0} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
      <div className="absolute h-[346px] left-[1053px] top-[196px] w-[35px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 346">
          <g id="mirrormirrormirror">
            <path d={svgPaths.p33743280} fill="var(--fill-0, white)" />
            <path d={svgPaths.p28799900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3d005900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2c98b300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2335b80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2d5dedf0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1d87c500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2cd11100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p24228e00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2abeed00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1c0b0500} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
      <motion.div initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} className="absolute h-[646px] left-[119px] top-[44px] w-[58px]">
        <div className="absolute inset-[-8.05%_-89.66%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 162 750">
            <g filter="url(#filter0_d_1_150)" id="mikaninagawa">
              <path d={svgPaths.p1b6a1d00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1581b480} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2e7f6700} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3679b6c0} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="750" id="filter0_d_1_150" width="162" x="8.84427e-10" y="3.87985e-10">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="26" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.208027 0 0 0 0 0.0639652 0 0 0 0 0.0639652 0 0 0 0.7 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_150" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_150" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </motion.div>
      <div className="absolute flex h-[148.808px] items-center justify-center left-[890px] top-[555px] w-[436.877px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[161.19deg]">
          <div className="h-0 relative w-[461.525px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 461.525 1">
                <line id="Line 2" stroke="var(--stroke-0, white)" x2="461.525" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[368px] items-center justify-center left-0 top-[196px] w-[903px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[22.17deg]">
          <div className="h-0 relative w-[975.107px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 975.107 1">
                <line id="Line 1" stroke="var(--stroke-0, white)" x2="975.107" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1, ease: "easeOut", delay: 0.1 }} className="absolute flex inset-[-0.7%_-8%_92.2%_30%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-15 scale-[0.7] flex-none h-[hypot(5.5846cqw,45.1707cqh)] w-[hypot(94.4154cqw,-54.8293cqh)]">
          <div className="relative size-full">
            <div className="absolute inset-[-27.32%_-6.03%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 929 283">
                <g filter="url(#filter0_d_1_144)" id="title">
                  <path d={svgPaths.p32564580} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2c0afb00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p21007e80} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3b1fee70} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p13290200} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3418a700} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p297fe8c0} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3191ee00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.pbfda080} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1ae89970} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1e41aa00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1113e300} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p11dfb500} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p31981500} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p59cf600} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p39392500} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1a47d700} fill="var(--fill-0, white)" />
                  <path d={svgPaths.pc382a40} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p9686cf0} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p33151500} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p36f55a00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2510100} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p7df7100} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2cecfa80} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1e5fa700} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1ff48e00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3b93b200} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p37f0e200} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3229cd00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p670cd70} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p205acd00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2b677f00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1fee0f00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3bd08800} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p576c200} fill="var(--fill-0, white)" />
                  <path d={svgPaths.pe5a8100} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2da5ea00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p34dde100} fill="var(--fill-0, white)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="283" id="filter0_d_1_144" width="929" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="25" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.207843 0 0 0 0 0.0627451 0 0 0 0 0.0627451 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_144" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_144" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Movie() {
  return (
    <div className="absolute left-0 top-[1750px] w-[1280px] h-[853px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img110191118Vca598652800X12003} />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="-translate-x-1/2 absolute flex h-[883px] items-center justify-center left-[calc(50%+3.5px)] top-[487px] w-[1177px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
      <div className="-rotate-90 flex-none">
        <div className="h-[1177px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1px_298px] mask-size-[1176px_585px] relative w-[883px]" style={{ maskImage: `url('${img141216041936900X12001}')` }}>
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img141216041936900X12002} />
        </div>
      </div>
    </div>
  );
}

function BgSec() {
  return (
    <>
      <Movie />
      <div className="absolute h-[853px] left-0 top-[1750px] w-[1281px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPaint002} />
      </div>
    </>
  );
}

function ParallaxPhoto({ className, src, speed }: { className: string; src: string; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={src} />
    </motion.div>
  );
}

function Section() {
  return (
    <section>
      <BgSec />
      <ParallaxPhoto src={imgPhoto07Sec01} speed={220} className="absolute h-[222px] left-[777px] top-[2238px] w-[332.25px]" />
      <ParallaxPhoto src={imgPhoto06Sec01} speed={-190} className="absolute h-[386.25px] left-[-29px] top-[1915px] w-[515.25px]" />
      <ParallaxPhoto src={imgPhoto05Sec01} speed={250} className="absolute h-[288px] left-[153px] top-[2130px] w-[431.25px]" />
      <ParallaxPhoto src={imgPhoto04Sec01} speed={-240} className="absolute h-[219px] left-[982px] top-[1872px] w-[330px]" />
      <ParallaxPhoto src={imgPhoto03Sec01} speed={180} className="absolute h-[338px] left-[106px] top-[1872px] w-[478px]" />
      <ParallaxPhoto src={imgPhoto02Sec01} speed={-210} className="absolute h-[339px] left-[698px] top-[2015px] w-[478px]" />
      <ParallaxPhoto src={imgPhoto01Sec01} speed={200} className="absolute h-[339px] left-[378px] top-[2185px] w-[477px]" />
      <div className="absolute font-['Hiragino_Mincho_Pro',serif] leading-[0] left-[59px] not-italic text-[20px] text-white top-[2172px] whitespace-nowrap">
        <motion.p {...fadeIn} className="leading-[24px] mb-0">破</motion.p>
        <motion.p {...fadeIn} className="leading-[24px] mb-0">壊</motion.p>
        <motion.p {...fadeIn} className="leading-[24px] mb-0">、</motion.p>
        <motion.p {...fadeIn} className="leading-[24px] mb-0">再</motion.p>
        <motion.p {...fadeIn} className="leading-[24px] mb-0">生</motion.p>
        <motion.p {...fadeIn} className="leading-[24px] mb-0">、</motion.p>
        <motion.p {...fadeIn} className="leading-[24px] mb-0">ま</motion.p>
        <motion.p {...fadeIn} className="leading-[24px]">た破壊</motion.p>
      </div>
    </section>
  );
}

function MovieSec() {
  return (
    <>
      <div className="absolute bg-black h-[351px] left-[347px] top-[3231px] w-[621px]" />
      <div className="-translate-x-1/2 absolute h-[346px] left-[calc(50%+18px)] top-[3233px] w-[620px]">
        <video src={movieSec02Video} autoPlay muted loop playsInline className="absolute inset-0 max-w-none object-cover opacity-25 pointer-events-none size-full" />
      </div>
    </>
  );
}

function Section1() {
  return (
    <section>
      <div className="absolute flex h-[354.581px] items-center justify-center left-[532px] top-[2746.01px] w-[908.353px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-21.32deg]">
          <div className="h-0 relative w-[975.107px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 975.107 0.5">
                <line id="Line 1" stroke="var(--stroke-0, white)" strokeWidth="0.5" x2="975.107" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <MovieSec />
      <motion.p {...fadeIn} className="absolute font-['Noto_Sans_JP',sans-serif] h-[190px] leading-[19px] left-[calc(50%+269px)] not-italic text-[11px] text-justify text-white top-[3680px] w-[264px]">写真を中心として、映画、映像、空間インスタレーションも多く手掛ける。クリエイティブチーム「EiM（エイム）」の一員としても活動中。木村伊兵衛写真賞ほか数々受賞。2010年ニューヨークのRizzoliから写真集を出版。また、『ヘルタースケルター』（2012年）、『Diner ダイナー』（2019年）をはじめ長編映画を5作、Netflixオリジナルドラマ『FOLLOWERS』（2020年）を監督。これまでに写真集120冊以上を刊行、個展150回以上、グループ展130回以上と国内外で精力的に作品発表を続ける。</motion.p>
      <div className="-translate-x-1/2 absolute flex h-[117px] items-center justify-center left-[calc(50%+257px)] top-[3500px] w-[12px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <p className="font-['Instrument_Serif',serif] leading-[12px] not-italic relative text-[18px] text-center text-white tracking-[1.8px] whitespace-nowrap">Mika Ninagawa</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute font-['Hiragino_Mincho_Pro',serif] leading-[0] left-[847px] not-italic text-[40px] text-center text-white top-[3530px] whitespace-nowrap">
        <p className="leading-[48px] mb-0 whitespace-pre">蜷</p>
        <p className="leading-[48px] mb-0 whitespace-pre">川</p>
        <p className="leading-[48px] mb-0 whitespace-pre">​</p>
        <p className="leading-[48px] mb-0 whitespace-pre">実</p>
        <p className="leading-[48px] whitespace-pre">花</p>
      </div>
      <p className="absolute font-['Hiragino_Mincho_Pro',serif] leading-[48px] left-[calc(50%-486px)] not-italic text-[23px] text-justify text-white top-[2821px] w-[987px]">
        {[
          "30年近くキャリアを重ねていくなかで、映画やインスタレーション作品など大きなプロジェクトをやる機会も増えてきた。",
          "どれも新しい挑戦だし、いつだって熱を入れて作品をつくっているけれど、やっぱり写真が全てのスタート地点であり帰る場所。",
          "今日もどこに発表するでもなく、呼吸をするように撮り続けている。",
          "大きなプロジェクトをやればやるほど「カメラで世界を切り取る」というシンプルな行為が輝いて見える。",
          "改めてそんなことを感じていた時に、この本の話が舞い込んできて、自然とこういう形になっていった。",
          "これまでに 100 冊以上出してきたどの写真集とも違う、私の創作に対するある種の狂気を孕んだエネルギーや「撮らずにはいられない」原始的な衝動を詰め込んだ本が完成した。",
          "編集者を筆頭に、この本に関わった全員が尋常じゃないエネルギーと愛を注いでくれた超アナログな本。",
          "この時代にこの本をつくったのは必然だったと思う。",
          "これから担当編集が夜なべして、何千冊も手作業でリボンを結んで仕上げるんですよ。",
          "そのエネルギー、今の時代ほかにはないと思う。",
        ].map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {line}
          </motion.span>
        ))}
      </p>
      <div className="absolute flex h-[68px] items-center justify-center left-[calc(50%-611px)] top-[2677px] w-[12px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <p className="font-['Instrument_Serif',serif] leading-[12px] not-italic relative text-[18px] text-white tracking-[1.08px] whitespace-nowrap">Comment</p>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ src, imgWidth, imgHeight, offsetX, offsetY }: { src: string; imgWidth: number; imgHeight: number; offsetX: number; offsetY: number }) {
  return (
    <div className="overflow-hidden relative shrink-0 w-[311.716px] h-[418.868px]">
      <img
        alt=""
        className="absolute max-w-none pointer-events-none object-cover"
        style={{ width: imgWidth, height: imgHeight, left: offsetX, top: offsetY }}
        src={src}
      />
    </div>
  );
}

function Img01Sec() {
  return <ProductCard src={img80A6632} imgWidth={633.992} imgHeight={422.868} offsetX={-161.703} offsetY={-1.948} />;
}

function Img02Sec() {
  return <ProductCard src={imgS1600X2133VFrmsWebpFf594319Bdc3406D8B06E5Ee25F80E0FWebp1} imgWidth={341.088} imgHeight={454.713} offsetX={0} offsetY={-26.301} />;
}

function Img03Sec() {
  return <ProductCard src={imgS1600X2133VFrmsWebp272D6FecEd0D4F3591D3Dbab1025219DWebp1} imgWidth={321.482} imgHeight={428.576} offsetX={0} offsetY={-9.741} />;
}

function Img04Sec() {
  return <ProductCard src={imgS1600X2133VFrmsWebp59C9Cca8143A4D9E987086C7B74CdcdeWebp1} imgWidth={320.63} imgHeight={427.44} offsetX={-9.741} offsetY={0} />;
}

function Frame2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [400, -400]);
  return (
    <motion.div ref={ref} style={{ x }} className="content-stretch flex gap-[24px] items-center leading-[0] relative shrink-0">
      <Img01Sec />
      <Img02Sec />
      <Img03Sec />
      <Img04Sec />
    </motion.div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex gap-[93px] items-start left-[24px] top-[537px]">
      <div className="flex h-[102px] items-center justify-center relative shrink-0 w-[12px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <p className="font-['Instrument_Serif',serif] leading-[12px] not-italic relative text-[18px] text-white tracking-[1.08px] whitespace-nowrap">Product Detail</p>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

function Section3() {
  return (
    <section>
      <div className="absolute flex h-[368px] items-center justify-center left-[-243px] top-[200px] w-[903px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[22.17deg]">
          <div className="h-0 relative w-[975.107px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 975.107 0.5">
                <line id="Line 1" stroke="var(--stroke-0, white)" strokeWidth="0.5" x2="975.107" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame3 />
    </section>
  );
}

function BgSec2() {
  return (
    <div className="absolute left-0 top-[956px] w-[1280px] h-[875px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBgSec05} />
    </div>
  );
}

function ButtonDetail() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 cursor-pointer group">
      <div className="border-[0.5px] border-solid border-white col-1 h-[44px] ml-0 mt-0 relative rounded-[5px] row-1 w-[139px] transition-colors duration-200 group-hover:bg-white/15" />
      <p className="col-1 font-['Noto_Sans_JP',sans-serif] leading-[22px] ml-[30px] mt-[11px] not-italic relative row-1 text-[13px] text-white whitespace-nowrap pointer-events-none">詳細はこちら</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[485px]">
      <div className="font-['Hiragino_Mincho_Pro',serif] leading-[0] not-italic relative shrink-0 text-[36px] text-white w-[475px]">
        <motion.p {...fadeIn} className="leading-[49px] mb-0">mirror, mirror, mirror</motion.p>
        <motion.p {...fadeIn} className="leading-[49px]">mika ninagawa 展</motion.p>
      </div>
      <motion.p {...fadeIn} className="font-['Noto_Sans_JP',sans-serif] h-[124px] leading-[25px] min-w-full not-italic relative shrink-0 text-[12px] text-white w-[min-content]">蜷川実花が、10数年にわたり活動の拠点としてきた下北沢の地において、アーティストブックの刊行を記念した展覧会を開催します。本展は、アーティストブックに結実した表現の軌跡を、展示空間の中であらためて構成する試みです。「破壊、再生、また破壊」という創作テーマのもと、蜷川の表現史と現在の表現が、ひとつの空間として提示されます​。</motion.p>
      <ButtonDetail />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[71px] items-center left-0 top-[1188px]">
      <div className="h-[429px] relative shrink-0 w-[642px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-90 pointer-events-none size-full" src={imgImgSec05} />
      </div>
      <Frame4 />
    </div>
  );
}

function Section4() {
  return (
    <section>
      <BgSec2 />
      <Frame5 />
      <div className="absolute flex h-[74px] items-center justify-center left-[calc(50%+601px)] top-[1106px] w-[12px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <p className="font-['Instrument_Serif',serif] leading-[12px] not-italic relative text-[18px] text-white tracking-[1.08px] whitespace-nowrap">Exhibition</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="-translate-x-1/2 absolute left-[calc(50%+545.5px)] top-[1795px] w-[123px] h-[16px] flex items-center">
        <svg className="block w-full h-auto" fill="none" viewBox="0 0 123 23">
          <g id="logo_dipsy">
            <path d={svgPaths.p412a900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p133bb600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p29017000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p6fa3780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1adee000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p24c68b00} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
      <motion.p {...fadeIn} className="absolute font-['Roboto',sans-serif] font-light leading-[16px] left-[138px] text-[11px] text-white top-[1795px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`©  2026 DIPSY Inc. All rights reserved.`}</motion.p>
      <motion.p {...fadeIn} className="absolute font-['Noto_Sans_JP',sans-serif] leading-[16px] left-[30px] not-italic text-[12px] text-white top-[1795px] whitespace-pre">{`利用規約　　｜　　`}</motion.p>
    </footer>
  );
}

export function TopCanvasContent() {
  return (
    <div className="bg-[#111] relative size-full">
      <Hero />
      <Section />
      <Section1 />
    </div>
  );
}

export function BottomCanvasContent() {
  return (
    <div className="bg-[#111] relative size-full">
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}