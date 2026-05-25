'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Restaurant Interior',
    category: 'Interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    alt: 'Signature Dish',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    alt: 'Elegant Dining',
    category: 'Interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    alt: 'Artisan Pizza',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Fine Dining',
    category: 'Interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    alt: 'Gourmet Dessert',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    alt: 'Chef at Work',
    category: 'Kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80',
    alt: 'Wine Selection',
    category: 'Drinks',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = ['All', 'Interior', 'Food', 'Kitchen', 'Drinks'];

  const filteredImages =
    filter === 'All' ? galleryImages : galleryImages.filter((img) => img.category === filter);

  const markImageAsFailed = (src: string) => {
    setFailedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  };

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h2>
          <div className="w-24 h-1 bg-forest-500 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A glimpse into our world of culinary excellence
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm uppercase tracking-wider ${
                filter === category
                  ? 'bg-forest-600 text-white'
                  : 'bg-charcoal-700 text-gray-300 hover:bg-charcoal-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${filter}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              {failedImages[image.src] ? (
                <div className="h-full w-full bg-linear-to-br from-charcoal-700 to-charcoal-600 flex items-center justify-center">
                  <span className="text-sm uppercase tracking-[0.2em] text-gray-300/80">{image.alt}</span>
                </div>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => markImageAsFailed(image.src)}
                />
              )}
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-forest-400 transition-colors"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-forest-400 transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft size={40} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-forest-400 transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex items-center justify-center"
            >
              {failedImages[filteredImages[selectedImage].src] ? (
                <div className="w-full max-w-5xl h-[60vh] bg-linear-to-br from-charcoal-700 to-charcoal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-medium">{filteredImages[selectedImage].alt}</span>
                </div>
              ) : (
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={1600}
                  height={1200}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                  onError={() => markImageAsFailed(filteredImages[selectedImage].src)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
