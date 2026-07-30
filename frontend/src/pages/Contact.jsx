import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle2, Sparkles } from "lucide-react";
import contactGif from "../assets/Contact-illustration.gif";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-white text-zinc-900 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-zinc-100">
      {/* Light Gradient Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-blue-50/80 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-sky-100/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-zinc-200/80 p-6 sm:p-12 lg:p-16 shadow-xl shadow-zinc-200/50 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT SIDE: FORM */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/80 text-xs font-semibold text-blue-600 mb-4">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
                  Contact <span className="text-blue-600">Us</span>
                </h2>
                <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                  Have questions about skill trading or need help matching? Drop us a message!
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-emerald-800 flex items-center gap-4 shadow-sm"
                >
                  <CheckCircle2
                    size={28}
                    className="text-emerald-600 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900">
                      Message Sent!
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      We've received your message and will get back to you shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-11 sm:pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-50/80 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-11 sm:pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-50/80 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-4 sm:left-5 top-4 text-zinc-400"
                    />
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full pl-11 sm:pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-50/80 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group active:scale-[0.99]"
                  >
                    <span>Send Message</span>
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT SIDE: ILLUSTRATION */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 flex items-center justify-center relative min-h-[260px] sm:min-h-[320px]"
            >
              <div className="relative z-10 w-full max-w-sm sm:max-w-md flex items-center justify-center p-2">
                <img
                  src={contactGif}
                  alt="Contact Illustration"
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}