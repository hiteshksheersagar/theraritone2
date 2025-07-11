import React, { useEffect, useRef } from 'react';

const LiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating cosmic particles
    const createCosmicParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'cosmic-particle';
      
      // Random size between 1-4px
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = Math.random() > 0.5 
        ? 'rgba(209, 169, 128, 0.6)' 
        : 'rgba(116, 136, 115, 0.4)';
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '-10px';
      
      // Random animation duration
      const duration = Math.random() * 20 + 15;
      particle.style.animation = `cosmic-float ${duration}s linear infinite`;
      
      // Random horizontal drift
      const drift = (Math.random() - 0.5) * 200;
      particle.style.setProperty('--drift', `${drift}px`);
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createCosmicParticle(), i * 300);
    }

    // Continue creating particles
    const interval = setInterval(createCosmicParticle, 2000);

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cosmic-float {
        0% {
          transform: translateY(0px) translateX(0px) scale(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
          transform: scale(1);
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(var(--drift, 0px)) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} className="live-cosmic-background">
      {/* Cosmic aurora gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-orange-900/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-amber-900/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-yellow-900/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>
      
      {/* Subtle cosmic grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(209, 169, 128, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(209, 169, 128, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        animation: 'cosmic-drift 120s linear infinite'
      }}></div>
    </div>
  );
};

export default LiveBackground;