import { ReactNode, useEffect, useState } from "react";
import { TopCanvasContent, BottomCanvasContent } from "../imports/01IndexPcO/01IndexPcO";
import Section03 from "../imports/section03/Section03";
import SmoothScroll from "./SmoothScroll";
import LoadingScreen from "./LoadingScreen";

const DESIGN_WIDTH = 1280;
const TOP_CANVAS_HEIGHT = 4098;
const BOTTOM_CANVAS_HEIGHT = 1833;

function ScaledCanvas({ height, children }: { height: number; children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(window.innerWidth / DESIGN_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="bg-[#111] w-full overflow-x-clip" style={{ height: height * scale }}>
      <div
        className="relative"
        style={{
          width: DESIGN_WIDTH,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <main className="[&_*]:!font-extralight" style={{ fontWeight: 200 }}>
        <ScaledCanvas height={TOP_CANVAS_HEIGHT}>
          <TopCanvasContent />
        </ScaledCanvas>
        <Section03 />
        <ScaledCanvas height={BOTTOM_CANVAS_HEIGHT}>
          <BottomCanvasContent />
        </ScaledCanvas>
      </main>
    </>
  );
}
