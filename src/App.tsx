import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import HomeSection from './components/Home';
import WorksSection from './components/HowWorks';
import ContactSection from './components/Contact';
import ContactForm from './components/ContactForm';
import ContactCombined from './components/ContactCombined';
import Navbar from './components/Navbar';
import SocialIcons from './components/Social';

type Section = 'home' | 'works' | 'contact' | 'form';

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

      const isMobile = window.innerWidth < 768;
      const sections: Section[] = isMobile
        ? ['home', 'works', 'contact', 'form']
        : ['home', 'works', 'contact'];

      const index = sections.indexOf(currentSection);
      let nextSection: Section | null = null;

      if (e.deltaY > 0 && index < sections.length - 1) {
        nextSection = sections[index + 1];
      } else if (e.deltaY < 0 && index > 0) {
        nextSection = sections[index - 1];
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
        const isMobile = window.innerWidth < 768;
        const sections: Section[] = isMobile
          ? ['home', 'works', 'contact', 'form']
          : ['home', 'works', 'contact'];

        const index = sections.indexOf(currentSection);
        let nextSection: Section | null = null;

        if (deltaY > 0 && index < sections.length - 1) {
          nextSection = sections[index + 1];
        } else if (deltaY < 0 && index > 0) {
          nextSection = sections[index - 1];
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
    enter: { opacity: 0, scale: 1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 },
  };

  const transition = {
    duration: 0.3,
    ease: easeInOut,
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden overscroll-contain">
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
          {currentSection === 'contact' && (
            <>
              <div className="block md:hidden">
                <ContactSection />
              </div>
              <div className="hidden md:block">
                <ContactCombined />
              </div>
            </>
          )}
          {currentSection === 'form' && (
            <div className="block md:hidden">
              <ContactForm />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;