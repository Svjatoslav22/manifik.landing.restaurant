'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Taste Modern Europe
            <span className="block text-forest-400 mt-2">in Sambir</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Experience exquisite European cuisine in an elegant atmosphere where every dish tells a story
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="#menu"
            className="bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-full transition-all duration-300 text-lg font-medium uppercase tracking-wider"
          >
            View the Menu
          </Link>
          <Link
            href="#reservation"
            className="border-2 border-white hover:bg-white hover:text-charcoal-900 text-white px-8 py-4 rounded-full transition-all duration-300 text-lg font-medium uppercase tracking-wider"
          >
            Book a Table
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#about" className="text-white animate-bounce">
          <ChevronDown size={32} />
        </Link>
      </motion.div>
    </section>
  );
}
