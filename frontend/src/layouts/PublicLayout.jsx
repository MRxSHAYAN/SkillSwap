import React, { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef(null);
  const revealTriggerRef = useRef(null);

  // Measure the footer's true rendered height dynamically (handles responsive columns, resizing, orientation)
  useEffect(() => {
    if (!footerRef.current) return;

    const measureHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    // Initial measurement
    measureHeight();

    // Observe size changes (e.g., mobile column wrap, font load, window resize)
    const resizeObserver = new ResizeObserver(measureHeight);
    resizeObserver.observe(footerRef.current);
    window.addEventListener("resize", measureHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureHeight);
    };
  }, []);

  // Track scroll progress across the reveal spacer
  // "start end" = top of spacer hits bottom of viewport (reveal begins)
  // "end end"   = bottom of spacer hits bottom of viewport (reveal complete)
  const { scrollYProgress } = useScroll({
    target: revealTriggerRef,
    offset: ["start end", "end end"],
  });

  // Smooth, subtle reveal transitions driven by scroll progress (0 -> 1)
  const y = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <div className="relative min-h-screen bg-black text-black">
      {/* 
        FRONT LAYER (Main Content)
        - relative z-10: Sits above the fixed footer in the stacking context.
        - bg-white: Opaque background covers the fixed footer completely while browsing.
        - shadow-2xl / drop shadow: Casts depth over the footer as the content pulls away.
        - min-h-screen: Ensures even short pages fill the screen before revealing the footer.
      */}
      <div className="relative z-10 bg-white min-h-screen flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <Navbar />
        <main className="flex-1">
          {/* Outlet renders child routes like Home, About, Login, etc. */}
          <Outlet />
        </main>
      </div>

      {/* 
        REVEAL SPACER (Scroll Canvas)
        - Transparent placeholder matching the exact dynamic height of the footer.
        - Creates the scroll distance needed for the front layer to scroll away and reveal the footer.
        - pointer-events-none ensures clicks pass straight to the underlying footer once exposed.
      */}
      <div
        ref={revealTriggerRef}
        style={{ height: footerHeight > 0 ? `${footerHeight}px` : "auto" }}
        className="relative w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* 
        BACK LAYER (Underlying Reveal Footer)
        - fixed bottom-0 left-0 w-full: Anchored to the viewport bottom beneath Layer 1.
        - z-0: Sits underneath Layer 1 (z-10).
        - Framer Motion: Drives subtle parallax y, opacity, and scale mapped to scroll progress.
      */}
      <motion.div
        ref={footerRef}
        style={{ y, opacity, scale }}
        className="fixed bottom-0 left-0 w-full z-0 origin-bottom"
      >
        <Footer />
      </motion.div>
    </div>
  );
}