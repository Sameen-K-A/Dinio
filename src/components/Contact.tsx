import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <div className="h-[100dvh] w-full relative flex items-center justify-center p-4 md:p-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut" }}
          className="text-center max-w-sm mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 tracking-tight">
            CONTACT
          </h2>

          <p className="md:text-lg leading-relaxed mb-15">
            Got a question, a spark of curiosity, or something you'd love to share? Whether you're exploring how we work, thinking about onboarding, or just wondering what we're building — we're here and ready to listen.
            Your message won't go into a void. It lands with the people who care.
            Reach out — let's start a conversation.
          </p>

          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight">
              E-mail
            </h2>
            <a href="mailto:hello@dinio.in" className="md:text-xl">
              hello@dinio.in
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};