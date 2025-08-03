import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="h-[100dvh] w-full bg-black text-white flex items-center justify-center px-6 md:px-8 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto w-full">


        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <div className="bg-gray-900 rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-800">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              CONTACT FORM
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project or ask any questions"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Send
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};