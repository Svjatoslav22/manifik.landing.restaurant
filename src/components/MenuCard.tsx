'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MenuItem } from '@/types';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-charcoal-800 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-forest-900/20 transition-all duration-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-linear-to-br from-charcoal-700 to-charcoal-600 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm uppercase tracking-[0.3em] text-gray-300/70">Menu item</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-forest-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {item.price} UAH
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-forest-400 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Ingredients */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.ingredients.slice(0, 3).map((ingredient, i) => (
              <span
                key={i}
                className="text-xs bg-charcoal-700 text-gray-300 px-2 py-1 rounded"
              >
                {ingredient}
              </span>
            ))}
          </div>
        )}

        <div className="w-full rounded-lg border border-charcoal-600 bg-charcoal-700/60 px-4 py-2.5 text-center text-sm text-gray-300">
          Available to view only
        </div>
      </div>
    </motion.div>
  );
}
