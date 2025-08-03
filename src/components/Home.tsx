import { motion } from 'framer-motion';

export default function HomeSection() {
  return (
    <div className="h-[100dvh] w-full relative overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
            <img src="/logo.svg" alt="Dinio Logo" className="h-[1em] inline-block" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.2, ease: "easeOut" }}
            className="text-xs md:text-sm font-bold tracking-wide"
          >
            Order Smart. Serve Fast.
          </motion.p>
        </div>
      </div>
    </div>
  );
};