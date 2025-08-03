import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import HomeSection from './components/Home';
import WorksSection from './components/HowWorks';
import ContactSection from './components/Contact';
import Navbar from './components/Navbar';
import SocialIcons from './components/Social';

type Section = 'home' | 'works' | 'contact';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (section: Section) => {
    if (section !== currentSection && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSection(section);
        setIsTransitioning(false);
      }, 600);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      let nextSection: Section | null = null;

      if (e.deltaY > 0) {
        if (currentSection === 'home') nextSection = 'works';
        else if (currentSection === 'works') nextSection = 'contact';
      } else if (e.deltaY < 0) {
        if (currentSection === 'contact') nextSection = 'works';
        else if (currentSection === 'works') nextSection = 'home';
      }

      if (nextSection) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSection(nextSection!);
          setIsTransitioning(false);
        }, 600);
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) {
        let nextSection: Section | null = null;

        if (deltaY > 0) {
          if (currentSection === 'home') nextSection = 'works';
          else if (currentSection === 'works') nextSection = 'contact';
        } else {
          if (currentSection === 'contact') nextSection = 'works';
          else if (currentSection === 'works') nextSection = 'home';
        }

        if (nextSection) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentSection(nextSection!);
            setIsTransitioning(false);
          }, 600);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isTransitioning]);

  const sectionVariants = {
    enter: {
      opacity: 0,
      scale: 1,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1,
    },
  };

  const transition = {
    duration: 0.3,
    ease: easeInOut,
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <Navbar onNavigate={handleNavigate} />
      <SocialIcons />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0"
        >
          {currentSection === 'home' && <HomeSection />}
          {currentSection === 'works' && <WorksSection />}
          {currentSection === 'contact' && <ContactSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;