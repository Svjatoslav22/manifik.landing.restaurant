'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getMenu } from '@/lib/api';
import { MenuItem, CategoryType, CATEGORY_LABELS } from '@/types';
import MenuCard from './MenuCard';
import MenuPagination from './MenuPagination';

const categories: CategoryType[] = [
  'starters',
  'salads',
  'burgers',
  'pizza',
  'main-courses',
  'pasta',
  'beer-snacks',
  'desserts',
  'breakfast',
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['menu', selectedCategory, currentPage],
    queryFn: () =>
      getMenu(
        selectedCategory === 'all' ? undefined : selectedCategory,
        currentPage,
        itemsPerPage
      ),
  });

  const handleCategoryChange = (category: CategoryType | 'all') => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section id="menu" className="py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-forest-500 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each made with passion and the finest ingredients
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm uppercase tracking-wider ${
              selectedCategory === 'all'
                ? 'bg-forest-600 text-white'
                : 'bg-charcoal-700 text-gray-300 hover:bg-charcoal-600'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-forest-600 text-white'
                  : 'bg-charcoal-700 text-gray-300 hover:bg-charcoal-600'
              }`}
            >
              <span>{CATEGORY_LABELS[category]}</span>
            </button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-charcoal-800 rounded-xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">
            Failed to load menu items. Please try again later.
          </div>
        ) : data?.items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No items found in this category.
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data?.items.map((item: MenuItem, index: number) => (
                <MenuCard key={item._id} item={item} index={index} />
              ))}
            </motion.div>

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
              <MenuPagination
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
