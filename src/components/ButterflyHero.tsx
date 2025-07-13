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
                src="/Raritone.png"
                alt="RARITONE"
                className="h-24 sm:h-28 lg:h-32 w-auto"
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
                viewBox="0 0 900 700"
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 0 60px rgba(209, 169, 128, 0.5))',
                }}
              >
                <defs>
                  {/* Enhanced Gradients for Realistic Wing Patterns */}
                  <radialGradient id="upperWingGradient" cx="35%" cy="45%" r="65%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                    <stop offset="20%" stopColor="rgba(209, 169, 128, 0.7)" />
                    <stop offset="40%" stopColor="rgba(193, 154, 115, 0.6)" />
                    <stop offset="60%" stopColor="rgba(116, 136, 115, 0.4)" />
                    <stop offset="80%" stopColor="rgba(209, 169, 128, 0.3)" />
                    <stop offset="100%" stopColor="rgba(116, 136, 115, 0.1)" />
                  </radialGradient>
                  
                  <radialGradient id="lowerWingGradient" cx="45%" cy="65%" r="55%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                    <stop offset="30%" stopColor="rgba(116, 136, 115, 0.7)" />
                    <stop offset="60%" stopColor="rgba(209, 169, 128, 0.5)" />
                    <stop offset="100%" stopColor="rgba(116, 136, 115, 0.2)" />
                  </radialGradient>

                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 69, 19, 0.9)" />
                    <stop offset="30%" stopColor="rgba(160, 82, 45, 0.8)" />
                    <stop offset="70%" stopColor="rgba(101, 67, 33, 0.7)" />
                    <stop offset="100%" stopColor="rgba(62, 39, 35, 0.6)" />
                  </linearGradient>

                  <filter id="wingGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Butterfly Body - More Realistic Segmented Body */}
                <motion.g
                  animate={{
                    scaleY: [1, 1.01, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  {/* Main body */}
                  <ellipse cx="450" cy="350" rx="6" ry="100" fill="url(#bodyGradient)" />
                  
                  {/* Body segments for realism */}
                  <ellipse cx="450" cy="280" rx="4" ry="8" fill="rgba(139, 69, 19, 0.8)" />
                  <ellipse cx="450" cy="310" rx="5" ry="10" fill="rgba(160, 82, 45, 0.8)" />
                  <ellipse cx="450" cy="350" rx="4" ry="9" fill="rgba(139, 69, 19, 0.7)" />
                  <ellipse cx="450" cy="380" rx="3" ry="8" fill="rgba(101, 67, 33, 0.6)" />
                  
                  {/* Head */}
                  <circle cx="450" cy="260" r="6" fill="rgba(139, 69, 19, 0.9)" />
                </motion.g>
                
                {/* LEFT UPPER WING - Anatomically Accurate Shape */}
                <motion.path
                  d="M450 320 Q320 180 180 210 Q100 240 110 320 Q120 400 200 430 Q290 450 370 420 Q420 380 450 340"
                  fill="url(#upperWingGradient)"
                  stroke="rgba(139, 69, 19, 0.4)"
                  strokeWidth="1"
                  animate={{
                    d: [
                      "M450 320 Q320 180 180 210 Q100 240 110 320 Q120 400 200 430 Q290 450 370 420 Q420 380 450 340",
                      "M450 320 Q315 175 175 205 Q95 235 105 315 Q115 395 195 425 Q285 445 365 415 Q415 375 450 340",
                      "M450 320 Q320 180 180 210 Q100 240 110 320 Q120 400 200 430 Q290 450 370 420 Q420 380 450 340"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />
                
                {/* RIGHT UPPER WING - Mirror of left wing */}
                <motion.path
                  d="M450 320 Q580 180 720 210 Q800 240 790 320 Q780 400 700 430 Q610 450 530 420 Q480 380 450 340"
                  fill="url(#upperWingGradient)"
                  stroke="rgba(139, 69, 19, 0.4)"
                  strokeWidth="1"
                  animate={{
                    d: [
                      "M450 320 Q580 180 720 210 Q800 240 790 320 Q780 400 700 430 Q610 450 530 420 Q480 380 450 340",
                      "M450 320 Q585 175 725 205 Q805 235 795 315 Q785 395 705 425 Q615 445 535 415 Q485 375 450 340",
                      "M450 320 Q580 180 720 210 Q800 240 790 320 Q780 400 700 430 Q610 450 530 420 Q480 380 450 340"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
                
                {/* LEFT LOWER WING - Hindwing */}
                <motion.path
                  d="M450 360 Q380 460 320 500 Q260 540 240 580 Q250 620 290 610 Q340 590 390 560 Q420 520 450 480"
                  fill="url(#lowerWingGradient)"
                  stroke="rgba(139, 69, 19, 0.3)"
                  strokeWidth="1"
                  animate={{
                    d: [
                      "M450 360 Q380 460 320 500 Q260 540 240 580 Q250 620 290 610 Q340 590 390 560 Q420 520 450 480",
                      "M450 360 Q375 455 315 495 Q255 535 235 575 Q245 615 285 605 Q335 585 385 555 Q415 515 450 480",
                      "M450 360 Q380 460 320 500 Q260 540 240 580 Q250 620 290 610 Q340 590 390 560 Q420 520 450 480"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
                
                {/* RIGHT LOWER WING - Hindwing */}
                <motion.path
                  d="M450 360 Q520 460 580 500 Q640 540 660 580 Q650 620 610 610 Q560 590 510 560 Q480 520 450 480"
                  fill="url(#lowerWingGradient)"
                  stroke="rgba(139, 69, 19, 0.3)"
                  strokeWidth="1"
                  animate={{
                    d: [
                      "M450 360 Q520 460 580 500 Q640 540 660 580 Q650 620 610 610 Q560 590 510 560 Q480 520 450 480",
                      "M450 360 Q525 455 585 495 Q645 535 665 575 Q655 615 615 605 Q565 585 515 555 Q485 515 450 480",
                      "M450 360 Q520 460 580 500 Q640 540 660 580 Q650 620 610 610 Q560 590 510 560 Q480 520 450 480"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />

                {/* Wing Vein Patterns - Realistic and Subtle */}
                <motion.g
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  {/* Left wing veins */}
                  <path d="M450 320 Q360 280 280 300" stroke="rgba(139, 69, 19, 0.4)" strokeWidth="0.5" fill="none" />
                  <path d="M430 340 Q340 320 260 340" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="0.5" fill="none" />
                  <path d="M410 360 Q320 360 240 380" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="0.5" fill="none" />
                  
                  {/* Right wing veins */}
                  <path d="M450 320 Q540 280 620 300" stroke="rgba(139, 69, 19, 0.4)" strokeWidth="0.5" fill="none" />
                  <path d="M470 340 Q560 320 640 340" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="0.5" fill="none" />
                  <path d="M490 360 Q580 360 660 380" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="0.5" fill="none" />
                </motion.g>

                {/* Wing Spots - Natural butterfly patterns */}
                <motion.g
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut"
                  }}
                >
                  <circle cx="320" cy="320" r="12" fill="rgba(255, 255, 255, 0.4)" />
                  <circle cx="320" cy="320" r="6" fill="rgba(139, 69, 19, 0.5)" />
                  <circle cx="580" cy="320" r="12" fill="rgba(255, 255, 255, 0.4)" />
                  <circle cx="580" cy="320" r="6" fill="rgba(139, 69, 19, 0.5)" />
                </motion.g>
                
                {/* Antennae - More Detailed */}
                <motion.g
                  animate={{ 
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M440 250 Q435 230 430 210 Q428 200 425 190" stroke="rgba(139, 69, 19, 0.8)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M460 250 Q465 230 470 210 Q472 200 475 190" stroke="rgba(139, 69, 19, 0.8)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Antennae clubs */}
                  <ellipse cx="425" cy="188" rx="2" ry="4" fill="rgba(139, 69, 19, 0.9)" />
                  <ellipse cx="475" cy="188" rx="2" ry="4" fill="rgba(139, 69, 19, 0.9)" />
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