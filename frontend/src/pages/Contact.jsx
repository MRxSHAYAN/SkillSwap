import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
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
    <section className="bg-white text-zinc-900 py-20 pt-32 pb-20 px-6 px-6 border-b border-zinc-200 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="bg-sky-50/60 rounded-[2.5rem] border border-sky-100 p-8 sm:p-12 lg:p-16 shadow-xl shadow-sky-500/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-[#0f2d4a] tracking-tight">
                  Contact us
                </h2>
                <p className="text-zinc-500 text-sm mt-2">
                  Have questions about skill trading? Drop us a line below!
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white p-6 rounded-3xl border border-emerald-200 text-emerald-700 flex items-center gap-4 shadow-sm"
                >
                  <CheckCircle2
                    size={28}
                    className="text-emerald-500 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-base text-zinc-900">
                      Message Sent!
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      We'll get back to you shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-12 pr-6 py-4 rounded-full bg-white border border-blue-100 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-blue-300 shadow-sm"
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-12 pr-6 py-4 rounded-full bg-white border border-blue-100 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-blue-300 shadow-sm"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-5 top-5 text-blue-600"
                    />
                    <textarea
                      required
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full pl-12 pr-6 py-4 rounded-3xl bg-white border border-blue-100 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-blue-300 shadow-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group active:scale-98"
                  >
                    <span>Send Message</span>
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 flex items-center justify-center relative min-h-[300px]"
            >
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 w-full max-w-md flex items-center justify-center">
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
