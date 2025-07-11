import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface ButterflyHeroProps {
  onAnimationComplete?: () => void;
}

const ButterflyHero: React.FC<ButterflyHeroProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  // Transform values for scroll-based animation
  const butterflyY = useTransform(scrollY, [0, 300], [0, -200]);
  const butterflyScale = useTransform(scrollY, [0, 300], [1, 0.3]);
  const butterflyOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.8, 0]);
  const logoOpacity = useTransform(scrollY, [200, 300], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 350) {
        setIsVisible(false);
        onAnimationComplete?.();
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Abstract Butterfly Design */}
            <motion.div
              className="relative"
              style={{
                width: '80vw',
                height: '60vh',
                maxWidth: '800px',
                maxHeight: '600px',
              }}
              animate={{
                scale: [1, 1.02, 1],
                rotateY: [0, 2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            >
              {/* Butterfly SVG */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 0 40px rgba(209, 169, 128, 0.6))',
                }}
              >
                <defs>
                  <linearGradient id="wingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 0.8)" />
                    <stop offset="50%" stopColor="rgba(116, 136, 115, 0.6)" />
                    <stop offset="100%" stopColor="rgba(209, 169, 128, 0.4)" />
                  </linearGradient>
                  <linearGradient id="wingGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 0.8)" />
                    <stop offset="50%" stopColor="rgba(116, 136, 115, 0.6)" />
                    <stop offset="100%" stopColor="rgba(209, 169, 128, 0.4)" />
                  </linearGradient>
                  <radialGradient id="bodyGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 1)" />
                    <stop offset="100%" stopColor="rgba(116, 136, 115, 0.8)" />
                  </radialGradient>
                </defs>

                {/* Left Upper Wing */}
                <motion.path
                  d="M400 300 Q200 150 100 200 Q50 250 80 320 Q120 400 200 420 Q300 430 380 380 Q390 340 400 300"
                  fill="url(#wingGradient1)"
                  stroke="rgba(209, 169, 128, 0.8)"
                  strokeWidth="2"
                  animate={{
                    d: [
                      "M400 300 Q200 150 100 200 Q50 250 80 320 Q120 400 200 420 Q300 430 380 380 Q390 340 400 300",
                      "M400 300 Q190 140 90 190 Q40 240 70 310 Q110 390 190 410 Q290 420 370 370 Q380 330 400 300",
                      "M400 300 Q200 150 100 200 Q50 250 80 320 Q120 400 200 420 Q300 430 380 380 Q390 340 400 300"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                />

                {/* Right Upper Wing */}
                <motion.path
                  d="M400 300 Q600 150 700 200 Q750 250 720 320 Q680 400 600 420 Q500 430 420 380 Q410 340 400 300"
                  fill="url(#wingGradient2)"
                  stroke="rgba(209, 169, 128, 0.8)"
                  strokeWidth="2"
                  animate={{
                    d: [
                      "M400 300 Q600 150 700 200 Q750 250 720 320 Q680 400 600 420 Q500 430 420 380 Q410 340 400 300",
                      "M400 300 Q610 140 710 190 Q760 240 730 310 Q690 390 610 410 Q510 420 430 370 Q420 330 400 300",
                      "M400 300 Q600 150 700 200 Q750 250 720 320 Q680 400 600 420 Q500 430 420 380 Q410 340 400 300"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />

                {/* Left Lower Wing */}
                <motion.path
                  d="M400 300 Q350 400 300 450 Q250 500 200 480 Q150 450 170 400 Q200 350 250 330 Q320 310 400 300"
                  fill="rgba(116, 136, 115, 0.6)"
                  stroke="rgba(116, 136, 115, 0.8)"
                  strokeWidth="2"
                  animate={{
                    d: [
                      "M400 300 Q350 400 300 450 Q250 500 200 480 Q150 450 170 400 Q200 350 250 330 Q320 310 400 300",
                      "M400 300 Q340 390 290 440 Q240 490 190 470 Q140 440 160 390 Q190 340 240 320 Q310 300 400 300",
                      "M400 300 Q350 400 300 450 Q250 500 200 480 Q150 450 170 400 Q200 350 250 330 Q320 310 400 300"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />

                {/* Right Lower Wing */}
                <motion.path
                  d="M400 300 Q450 400 500 450 Q550 500 600 480 Q650 450 630 400 Q600 350 550 330 Q480 310 400 300"
                  fill="rgba(116, 136, 115, 0.6)"
                  stroke="rgba(116, 136, 115, 0.8)"
                  strokeWidth="2"
                  animate={{
                    d: [
                      "M400 300 Q450 400 500 450 Q550 500 600 480 Q650 450 630 400 Q600 350 550 330 Q480 310 400 300",
                      "M400 300 Q460 390 510 440 Q560 490 610 470 Q660 440 640 390 Q610 340 560 320 Q490 300 400 300",
                      "M400 300 Q450 400 500 450 Q550 500 600 480 Q650 450 630 400 Q600 350 550 330 Q480 310 400 300"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />

                {/* Butterfly Body */}
                <motion.ellipse
                  cx="400"
                  cy="300"
                  rx="8"
                  ry="120"
                  fill="url(#bodyGradient)"
                  animate={{
                    ry: [120, 125, 120],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />

                {/* Wing Details */}
                <motion.circle
                  cx="250"
                  cy="280"
                  r="15"
                  fill="rgba(209, 169, 128, 0.4)"
                  animate={{
                    r: [15, 18, 15],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  cx="550"
                  cy="280"
                  r="15"
                  fill="rgba(209, 169, 128, 0.4)"
                  animate={{
                    r: [15, 18, 15],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </svg>

              {/* RARITONE Logo Integration */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: logoOpacity }}
              >
                <img
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="h-16 w-auto"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(209, 169, 128, 0.8))',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(209, 169, 128, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 60%, rgba(116, 136, 115, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 40%, rgba(209, 169, 128, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyHero;