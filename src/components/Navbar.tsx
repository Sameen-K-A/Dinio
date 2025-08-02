import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (section: 'home' | 'works' | 'contact') => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4 py-6 lg:p-6"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-xl md:text-2xl font-bold hover:text-gray-300 transition-colors duration-300"
        >
          Dinio
        </button>

        <div className="flex space-x-4 md:space-x-10">
          <button
            onClick={() => onNavigate('works')}
            className="text-sm md:text-base font-medium hover:text-gray-300 transition-colors duration-300"
          >
            How Dinio Works
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-sm md:text-base font-medium hover:text-gray-300 transition-colors duration-300"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
};