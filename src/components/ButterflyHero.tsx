import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, easeInOut } from 'framer-motion';

interface ButterflyHeroProps {
  onAnimationComplete?: () => void;
}

const ButterflyHero: React.FC<ButterflyHeroProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  // Enhanced smooth transform values with better easing
  const butterflyY = useTransform(scrollY, [0, 600], [0, -400], { ease: easeInOut });
  const butterflyScale = useTransform(scrollY, [0, 600], [1, 0.15], { ease: easeInOut });
  const butterflyOpacity = useTransform(scrollY, [0, 400, 600], [1, 0.9, 0], { ease: easeInOut });
  const logoOpacity = useTransform(scrollY, [400, 600], [0, 1], { ease: easeInOut });

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 650) {
        setIsVisible(false);
        // Smoother delay for navbar appearance
        setTimeout(() => {
          onAnimationComplete?.();
        }, 600);
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
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              y: butterflyY,
              scale: butterflyScale,
              opacity: butterflyOpacity,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 2 }
            }}
          >
            {/* RARITONE Logo positioned above butterfly */}
            <motion.div
              className="mb-8 z-20"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 2.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.8
              }}
            >
              <img
                src="/IMG-20250305-WA0003 (1)-Photoroom.png"
                alt="RARITONE"
                className="h-20 sm:h-24 lg:h-28 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(209, 169, 128, 0.9))',
                }}
              />
            </motion.div>

            {/* Enhanced Anatomically Accurate Butterfly */}
            <motion.div
              className="relative"
              style={{
                width: '85vw',
                height: '65vh',
                maxWidth: '800px',
                maxHeight: '600px',
              }}
              animate={{
                scale: [1, 1.015, 1],
                rotateY: [0, 0.5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut"
              }}
            >
              {/* Anatomically Accurate Butterfly SVG */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 0 80px rgba(209, 169, 128, 0.7))',
                }}
              >
                <defs>
                  {/* Enhanced Gradients for Realistic Wing Patterns */}
                  <radialGradient id="upperWingGradient" cx="30%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 0.9)" />
                    <stop offset="25%" stopColor="rgba(193, 154, 115, 0.8)" />
                    <stop offset="50%" stopColor="rgba(116, 136, 115, 0.6)" />
                    <stop offset="75%" stopColor="rgba(209, 169, 128, 0.4)" />
                    <stop offset="100%" stopColor="rgba(116, 136, 115, 0.2)" />
                  </radialGradient>
                  
                  <radialGradient id="lowerWingGradient" cx="40%" cy="60%" r="50%">
                    <stop offset="0%" stopColor="rgba(116, 136, 115, 0.8)" />
                    <stop offset="40%" stopColor="rgba(209, 169, 128, 0.6)" />
                    <stop offset="80%" stopColor="rgba(116, 136, 115, 0.3)" />
                    <stop offset="100%" stopColor="rgba(209, 169, 128, 0.1)" />
                  </radialGradient>

                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(209, 169, 128, 1)" />
                    <stop offset="30%" stopColor="rgba(193, 154, 115, 0.95)" />
                    <stop offset="70%" stopColor="rgba(116, 136, 115, 0.9)" />
                    <stop offset="100%" stopColor="rgba(57, 62, 70, 0.8)" />
                  </linearGradient>

                  <filter id="wingGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Butterfly Body - More Realistic Segmented Body */}
                <motion.g
                  animate={{
                    scaleY: [1, 1.02, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  {/* Main body */}
                  <ellipse cx="400" cy="300" rx="8" ry="120" fill="url(#bodyGradient)" filter="url(#wingGlow)" />
                  
                  {/* Body segments for realism */}
                  <ellipse cx="400" cy="250" rx="6" ry="12" fill="rgba(209, 169, 128, 0.9)" />
                  <ellipse cx="400" cy="280" rx="7" ry="15" fill="rgba(193, 154, 115, 0.95)" />
                  <ellipse cx="400" cy="320" rx="6" ry="14" fill="rgba(209, 169, 128, 0.9)" />
                  <ellipse cx="400" cy="350" rx="5" ry="12" fill="rgba(116, 136, 115, 0.8)" />
                  
                  {/* Head */}
                  <circle cx="400" cy="220" r="8" fill="rgba(209, 169, 128, 1)" />
                </motion.g>
                
                {/* LEFT UPPER WING - Anatomically Accurate Shape */}
                <motion.path
                  d="M400 280 Q280 150 150 180 Q80 210 90 280 Q100 350 180 380 Q260 400 340 370 Q380 340 400 300"
                  fill="url(#upperWingGradient)"
                  stroke="rgba(209, 169, 128, 0.8)"
                  strokeWidth="1.5"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M400 280 Q280 150 150 180 Q80 210 90 280 Q100 350 180 380 Q260 400 340 370 Q380 340 400 300",
                      "M400 280 Q275 145 145 175 Q75 205 85 275 Q95 345 175 375 Q255 395 335 365 Q375 335 400 300",
                      "M400 280 Q280 150 150 180 Q80 210 90 280 Q100 350 180 380 Q260 400 340 370 Q380 340 400 300"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut"
                  }}
                />
                
                {/* RIGHT UPPER WING - Mirror of left wing */}
                <motion.path
                  d="M400 280 Q520 150 650 180 Q720 210 710 280 Q700 350 620 380 Q540 400 460 370 Q420 340 400 300"
                  fill="url(#upperWingGradient)"
                  stroke="rgba(209, 169, 128, 0.8)"
                  strokeWidth="1.5"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M400 280 Q520 150 650 180 Q720 210 710 280 Q700 350 620 380 Q540 400 460 370 Q420 340 400 300",
                      "M400 280 Q525 145 655 175 Q725 205 715 275 Q705 345 625 375 Q545 395 465 365 Q425 335 400 300",
                      "M400 280 Q520 150 650 180 Q720 210 710 280 Q700 350 620 380 Q540 400 460 370 Q420 340 400 300"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
                
                {/* LEFT LOWER WING - Hindwing */}
                <motion.path
                  d="M400 320 Q340 420 280 460 Q220 500 200 540 Q210 580 250 570 Q300 550 350 520 Q380 480 400 440"
                  fill="url(#lowerWingGradient)"
                  stroke="rgba(116, 136, 115, 0.7)"
                  strokeWidth="1.5"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M400 320 Q340 420 280 460 Q220 500 200 540 Q210 580 250 570 Q300 550 350 520 Q380 480 400 440",
                      "M400 320 Q335 415 275 455 Q215 495 195 535 Q205 575 245 565 Q295 545 345 515 Q375 475 400 440",
                      "M400 320 Q340 420 280 460 Q220 500 200 540 Q210 580 250 570 Q300 550 350 520 Q380 480 400 440"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 0.8
                  }}
                />
                
                {/* RIGHT LOWER WING - Hindwing */}
                <motion.path
                  d="M400 320 Q460 420 520 460 Q580 500 600 540 Q590 580 550 570 Q500 550 450 520 Q420 480 400 440"
                  fill="url(#lowerWingGradient)"
                  stroke="rgba(116, 136, 115, 0.7)"
                  strokeWidth="1.5"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M400 320 Q460 420 520 460 Q580 500 600 540 Q590 580 550 570 Q500 550 450 520 Q420 480 400 440",
                      "M400 320 Q465 415 525 455 Q585 495 605 535 Q595 575 555 565 Q505 545 455 515 Q425 475 400 440",
                      "M400 320 Q460 420 520 460 Q580 500 600 540 Q590 580 550 570 Q500 550 450 520 Q420 480 400 440"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 1.2
                  }}
                />

                {/* Wing Vein Patterns - More Detailed and Realistic */}
                <motion.g
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  {/* Left wing veins */}
                  <path d="M400 280 Q320 240 240 260" stroke="rgba(209, 169, 128, 0.7)" strokeWidth="1" fill="none" />
                  <path d="M380 300 Q300 280 220 300" stroke="rgba(209, 169, 128, 0.6)" strokeWidth="0.8" fill="none" />
                  <path d="M360 320 Q280 320 200 340" stroke="rgba(209, 169, 128, 0.5)" strokeWidth="0.8" fill="none" />
                  
                  {/* Right wing veins */}
                  <path d="M400 280 Q480 240 560 260" stroke="rgba(209, 169, 128, 0.7)" strokeWidth="1" fill="none" />
                  <path d="M420 300 Q500 280 580 300" stroke="rgba(209, 169, 128, 0.6)" strokeWidth="0.8" fill="none" />
                  <path d="M440 320 Q520 320 600 340" stroke="rgba(209, 169, 128, 0.5)" strokeWidth="0.8" fill="none" />
                </motion.g>

                {/* Wing Spots/Eyespots for Realism */}
                <motion.g
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }}
                >
                  <circle cx="280" cy="280" r="15" fill="rgba(209, 169, 128, 0.6)" />
                  <circle cx="280" cy="280" r="8" fill="rgba(116, 136, 115, 0.8)" />
                  <circle cx="520" cy="280" r="15" fill="rgba(209, 169, 128, 0.6)" />
                  <circle cx="520" cy="280" r="8" fill="rgba(116, 136, 115, 0.8)" />
                </motion.g>
                
                {/* Antennae - More Detailed */}
                <motion.g
                  animate={{ 
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M390 210 Q385 190 380 170 Q378 160 375 150" stroke="rgba(209, 169, 128, 1)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M410 210 Q415 190 420 170 Q422 160 425 150" stroke="rgba(209, 169, 128, 1)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  
                  {/* Antennae clubs */}
                  <ellipse cx="375" cy="148" rx="3" ry="6" fill="rgba(209, 169, 128, 1)" />
                  <ellipse cx="425" cy="148" rx="3" ry="6" fill="rgba(209, 169, 128, 1)" />
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Ambient Cosmic Light Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 25% 35%, rgba(209, 169, 128, 0.12) 0%, transparent 70%)',
            'radial-gradient(circle at 75% 65%, rgba(116, 136, 115, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(209, 169, 128, 0.06) 0%, transparent 70%)',
            'radial-gradient(circle at 25% 35%, rgba(209, 169, 128, 0.12) 0%, transparent 70%)'
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyHero;