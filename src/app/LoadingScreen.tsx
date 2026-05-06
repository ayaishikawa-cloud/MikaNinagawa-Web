import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import titleSvg from "../assets/loading-title.svg";
import specialSvg from "../assets/loading-special.svg";

const DURATION_MS = 1500;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-[40px] bg-[#111]"
        >
          <img src={titleSvg} alt="" className="block w-[305px] h-auto pointer-events-none select-none" />
          <img src={specialSvg} alt="" className="block w-[28px] h-auto pointer-events-none select-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
