import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (section: 'home' | 'works' | 'contact') => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4 py-6 lg:p-6"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
        >
          <img src="/logo.svg" alt="Logo" className="h-4 md:h-6 w-auto" />
        </button>


        <div className="flex space-x-4 md:space-x-10">
          <button
            onClick={() => onNavigate('works')}
            className="text-sm md:text-base cursor-pointer font-medium hover:text-gray-300 transition-transform duration-200 active:scale-80"
          >
            How Dinio Works
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-sm md:text-base cursor-pointer font-medium hover:text-gray-300 transition-transform duration-200 active:scale-80"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
};