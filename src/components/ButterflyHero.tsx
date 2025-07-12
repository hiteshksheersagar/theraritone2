import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, easeInOut } from 'framer-motion';

interface ButterflyHeroProps {
  onAnimationComplete?: () => void;
}

const ButterflyHero: React.FC<ButterflyHeroProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  // Transform values for scroll-based animation with easing
  const butterflyY = useTransform(scrollY, [0, 400], [0, -300], { ease: easeInOut });
  const butterflyScale = useTransform(scrollY, [0, 400], [1, 0.2], { ease: easeInOut });
  const butterflyOpacity = useTransform(scrollY, [0, 300, 400], [1, 0.8, 0], { ease: easeInOut });
  const logoOpacity = useTransform(scrollY, [300, 400], [0, 1], { ease: easeInOut });

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 450) {
        setIsVisible(false);
        // Delay navbar appearance until butterfly is completely gone
        setTimeout(() => {
          onAnimationComplete?.();
        }, 800);
      } else {
        setIsVisible(true);
      }
    });

    return unsubscribe;
  }, [scrollY, onAnimationComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              y: butterflyY,
              scale: butterflyScale,
              opacity: butterflyOpacity,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ 
              duration: 2, 
              ease: easeInOut,
              opacity: { duration: 1.5 }
            }}
          >
            {/* Abstract Futuristic Butterfly Design */}
            <motion.div
              className="relative"
              style={{
                width: '90vw',
                height: '70vh',
                maxWidth: '900px',
                maxHeight: '700px',
              }}
              animate={{
                scale: [1, 1.02, 1],
                rotateY: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut"
              }}
            >
              {/* Futuristic Butterfly SVG */}
              <svg
                viewBox="0 0 900 700"
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 0 60px rgba(209, 169, 128, 0.8))',
                }}
              >
                <defs>
                  <linearGradient id="wingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 0.9)" />
                    <stop offset="30%" stopColor="rgba(116, 136, 115, 0.7)" />
                    <stop offset="70%" stopColor="rgba(209, 169, 128, 0.5)" />
                    <stop offset="100%" stopColor="rgba(116, 136, 115, 0.3)" />
                  </linearGradient>
                  <linearGradient id="wingGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 0.9)" />
                    <stop offset="30%" stopColor="rgba(116, 136, 115, 0.7)" />
                    <stop offset="70%" stopColor="rgba(209, 169, 128, 0.5)" />
                    <stop offset="100%" stopColor="rgba(116, 136, 115, 0.3)" />
                  </linearGradient>
                  <radialGradient id="bodyGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 1)" />
                    <stop offset="50%" stopColor="rgba(116, 136, 115, 0.9)" />
                    <stop offset="100%" stopColor="rgba(57, 62, 70, 0.8)" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Left Upper Wing - Abstract Curved Form */}
                <motion.path
                  d="M450 350 Q200 120 80 180 Q20 230 50 320 Q90 450 180 480 Q320 500 420 420 Q440 385 450 350"
                  fill="url(#wingGradient1)"
                  stroke="rgba(209, 169, 128, 0.9)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{
                    d: [
                      "M450 350 Q200 120 80 180 Q20 230 50 320 Q90 450 180 480 Q320 500 420 420 Q440 385 450 350",
                      "M450 350 Q190 110 70 170 Q10 220 40 310 Q80 440 170 470 Q310 490 410 410 Q430 375 450 350",
                      "M450 350 Q200 120 80 180 Q20 230 50 320 Q90 450 180 480 Q320 500 420 420 Q440 385 450 350"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />

                {/* Right Upper Wing - Abstract Curved Form */}
                <motion.path
                  d="M450 350 Q700 120 820 180 Q880 230 850 320 Q810 450 720 480 Q580 500 480 420 Q460 385 450 350"
                  fill="url(#wingGradient2)"
                  stroke="rgba(209, 169, 128, 0.9)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{
                    d: [
                      "M450 350 Q700 120 820 180 Q880 230 850 320 Q810 450 720 480 Q580 500 480 420 Q460 385 450 350",
                      "M450 350 Q710 110 830 170 Q890 220 860 310 Q820 440 730 470 Q590 490 490 410 Q470 375 450 350",
                      "M450 350 Q700 120 820 180 Q880 230 850 320 Q810 450 720 480 Q580 500 480 420 Q460 385 450 350"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />

                {/* Left Lower Wing - Elegant Tail */}
                <motion.path
                  d="M450 350 Q380 480 320 540 Q260 600 200 580 Q140 550 160 480 Q190 420 240 390 Q350 360 450 350"
                  fill="rgba(116, 136, 115, 0.7)"
                  stroke="rgba(116, 136, 115, 0.9)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{
                    d: [
                      "M450 350 Q380 480 320 540 Q260 600 200 580 Q140 550 160 480 Q190 420 240 390 Q350 360 450 350",
                      "M450 350 Q370 470 310 530 Q250 590 190 570 Q130 540 150 470 Q180 410 230 380 Q340 350 450 350",
                      "M450 350 Q380 480 320 540 Q260 600 200 580 Q140 550 160 480 Q190 420 240 390 Q350 360 450 350"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />

                {/* Right Lower Wing - Elegant Tail */}
                <motion.path
                  d="M450 350 Q520 480 580 540 Q640 600 700 580 Q760 550 740 480 Q710 420 660 390 Q550 360 450 350"
                  fill="rgba(116, 136, 115, 0.7)"
                  stroke="rgba(116, 136, 115, 0.9)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{
                    d: [
                      "M450 350 Q520 480 580 540 Q640 600 700 580 Q760 550 740 480 Q710 420 660 390 Q550 360 450 350",
                      "M450 350 Q530 470 590 530 Q650 590 710 570 Q770 540 750 470 Q720 410 670 380 Q560 350 450 350",
                      "M450 350 Q520 480 580 540 Q640 600 700 580 Q760 550 740 480 Q710 420 660 390 Q550 360 450 350"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.9
                  }}
                />

                {/* Central Body - Elegant and Minimal */}
                <motion.ellipse
                  cx="450"
                  cy="350"
                  rx="12"
                  ry="140"
                  fill="url(#bodyGradient)"
                  filter="url(#glow)"
                  animate={{
                    ry: [140, 145, 140],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                />

                {/* Wing Detail Patterns */}
                <motion.circle
                  cx="280"
                  cy="320"
                  r="20"
                  fill="rgba(209, 169, 128, 0.5)"
                  animate={{
                    r: [20, 25, 20],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  cx="620"
                  cy="320"
                  r="20"
                  fill="rgba(209, 169, 128, 0.5)"
                  animate={{
                    r: [20, 25, 20],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />

                {/* Elegant Wing Veins */}
                <motion.path
                  d="M450 350 Q350 280 250 300"
                  stroke="rgba(209, 169, 128, 0.6)"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d="M450 350 Q550 280 650 300"
                  stroke="rgba(209, 169, 128, 0.6)"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </svg>

              {/* RARITONE Logo Integration - Appears on Scroll */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: logoOpacity }}
              >
                <img
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="h-20 w-auto"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(209, 169, 128, 1))',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Cosmic Light Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(209, 169, 128, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 60%, rgba(116, 136, 115, 0.06) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 40%, rgba(209, 169, 128, 0.08) 0%, transparent 60%)'
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyHero;