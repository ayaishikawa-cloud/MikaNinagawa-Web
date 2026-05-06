import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import titleSvg from "../assets/loading-title.svg";
import specialSvg from "../assets/loading-special.svg";

const DURATION_MS = 2500;

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-[12px] bg-[#111]"
        >
          <motion.img
            src={titleSvg}
            alt=""
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="block w-[305px] h-auto pointer-events-none select-none"
          />
          <motion.img
            src={specialSvg}
            alt=""
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
            className="block w-[28px] h-auto pointer-events-none select-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
