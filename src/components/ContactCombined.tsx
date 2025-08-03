import ContactSection from './Contact';
import ContactForm from './ContactForm';

export default function ContactCombined() {
  return (
    <div className="h-[100dvh] w-full hidden md:flex flex-row items-center justify-center p-6 gap-2">
      <div className="w-1/2 h-full flex items-center justify-center">
        <ContactSection />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <ContactForm />
      </div>
    </div>
  );
}
