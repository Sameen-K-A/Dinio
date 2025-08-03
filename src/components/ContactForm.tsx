import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required'),
  email: z.string().trim().email('Invalid email address'),
  message: z.string().trim().min(5, 'Message must be at least 5 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: data.fullName,
      email: data.email,
      message: data.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Email send error:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center p-4 md:p-6">
      <div className="max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <div className="bg-[#1d1d1d] rounded-4xl p-4 md:p-6">
            <h3 className="text-4xl font-bold mb-8 md:mb-15 mt-5 md:mt-8 text-center">
              CONTACT FORM
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-10 px-5 md:px-10">
              <div>
                <input
                  type="text"
                  {...register("fullName")}
                  className="w-full py-2 md:py-3 text-sm bg-transparent border-b border-[#666666] text-white placeholder-[#666666] focus:outline-none"
                  placeholder="Full Name"
                />
                {errors.fullName && (
                  <p className="text-red-500 font-semibold text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full py-2 md:py-3 text-sm bg-transparent border-b border-[#666666] text-white placeholder-[#666666] focus:outline-none"
                  placeholder="E-Mail"
                />
                {errors.email && (
                  <p className="text-red-500 font-semibold text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  {...register("message")}
                  className="w-full py-2 md:py-3 text-sm h-32 resize-none bg-transparent border-b border-[#666666] text-white placeholder-[#666666] focus:outline-none"
                  placeholder="What you want to say"
                />
                {errors.message && (
                  <p className="text-red-500 font-semibold text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <div className='w-full flex justify-center'>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-fit bg-[#666666] text-black py-2 px-6 rounded-lg cursor-pointer font-semibold hover:bg-[#767676] transition-colors duration-300 focus:outline-none"
                >
                  {isSubmitting ? 'Sending' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};