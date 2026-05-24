'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Clock, MapPin, Eye } from 'lucide-react';

export default function Delivery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="delivery" className="py-24 bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Delivery</h2>
          <div className="w-24 h-1 bg-forest-500 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Check our current menu availability and delivery details below.
          </p>
        </motion.div>

        {/* Delivery Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-charcoal-700 rounded-xl p-6 text-center">
            <Truck className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Free Delivery</h3>
            <p className="text-gray-400 text-sm">On orders above 1300 UAH</p>
          </div>
          <div className="bg-charcoal-700 rounded-xl p-6 text-center">
            <Clock className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">30-60 minutes in Sambir</p>
          </div>
          <div className="bg-charcoal-700 rounded-xl p-6 text-center">
            <MapPin className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Delivery Area</h3>
            <p className="text-gray-400 text-sm">Within 10km from city center</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto rounded-2xl border border-charcoal-700 bg-charcoal-700/60 p-8 text-center"
        >
          <Eye className="w-12 h-12 text-forest-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">View-only menu</h3>
          <p className="text-gray-300 leading-relaxed">
            Menu items shown on this site are available to browse only. Ordering is disabled,
            so you can review what is currently in stock before visiting or contacting us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
