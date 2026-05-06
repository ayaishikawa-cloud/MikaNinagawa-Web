import { useEffect, useState } from "react";
import Component01IndexPcO from "../imports/01IndexPcO/01IndexPcO";

const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 5820;

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(window.innerWidth / DESIGN_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="bg-[#111] w-full overflow-hidden [&_*]:!font-extralight"
      style={{ height: DESIGN_HEIGHT * scale, fontWeight: 200 }}
    >
      <div
        className="relative"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Component01IndexPcO />
      </div>
    </div>
  );
}
