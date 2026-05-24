'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, MapPin, Phone, Star } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Manifik</h2>
          <div className="w-24 h-1 bg-forest-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Welcome to <span className="text-forest-400 font-semibold">Manifik</span>, where modern European
              cuisine meets timeless elegance. Nestled in the heart of Sambir, our restaurant offers a unique
              dining experience that celebrates the rich culinary traditions of Europe with a contemporary twist.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Our passionate chefs craft each dish using only the finest locally-sourced ingredients, ensuring
              every bite is a journey through flavors that are both familiar and excitingly new.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're joining us for a romantic dinner, a family celebration, or a business lunch,
              Manifik promises an unforgettable experience in a warm and sophisticated atmosphere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-charcoal-700 rounded-xl p-6 flex items-start space-x-4">
              <Clock className="text-forest-400 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Operating Hours</h3>
                <p className="text-gray-300">Monday - Thursday: 11:00 - 22:00</p>
                <p className="text-gray-300">Friday - Saturday: 11:00 - 23:00</p>
                <p className="text-gray-300">Sunday: 12:00 - 21:00</p>
              </div>
            </div>

            <div className="bg-charcoal-700 rounded-xl p-6 flex items-start space-x-4">
              <MapPin className="text-forest-400 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
                <p className="text-gray-300">pl. Rynok, 36</p>
                <p className="text-gray-300">Sambir, Lviv Region</p>
                <p className="text-gray-300">Ukraine</p>
              </div>
            </div>

            <div className="bg-charcoal-700 rounded-xl p-6 flex items-start space-x-4">
              <Phone className="text-forest-400 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Contact</h3>
                <p className="text-gray-300">+380 3236 5 1234</p>
                <p className="text-gray-300">info@manifik.ua</p>
              </div>
            </div>

            <div className="bg-charcoal-700 rounded-xl p-6 flex items-start space-x-4">
              <Star className="text-forest-400 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Rating</h3>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                  <span className="text-gray-300 ml-2">4.9 (250+ reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
