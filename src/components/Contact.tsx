'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createReservation } from '@/lib/api';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const reservationSchema = Yup.object().shape({
  customerName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number')
    .required('Phone is required'),
  email: Yup.string().email('Invalid email address'),
  date: Yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Date is required'),
  time: Yup.string().required('Time is required'),
  guests: Yup.number()
    .min(1, 'At least 1 guest required')
    .max(20, 'Maximum 20 guests')
    .required('Number of guests is required'),
  notes: Yup.string().max(500, 'Notes must be less than 500 characters'),
});

interface ReservationFormValues {
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
];

export default function Contact() {
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const createReservationMutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      setReservationSuccess(true);
    },
  });

  const handleSubmit = (values: ReservationFormValues) => {
    createReservationMutation.mutate(values);
  };

  if (reservationSuccess) {
    return (
      <section id="contact" className="py-24 bg-charcoal-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-charcoal-700 rounded-2xl p-8"
          >
            <CheckCircle className="w-16 h-16 text-forest-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Reservation Confirmed!</h3>
            <p className="text-gray-300 mb-4">
              Thank you for your reservation. We'll send you a confirmation shortly.
            </p>
            <button
              onClick={() => setReservationSuccess(false)}
              className="mt-6 bg-forest-600 hover:bg-forest-500 text-white px-6 py-2 rounded-full transition-colors"
            >
              Make Another Reservation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact & Reservations</h2>
          <div className="w-24 h-1 bg-forest-500 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get in touch with us or reserve your table for an unforgettable dining experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-forest-600/20 p-3 rounded-lg">
                  <MapPin className="text-forest-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Address</h3>
                  <p className="text-gray-400">pl. Rynok, 36</p>
                  <p className="text-gray-400">Sambir, Lviv Region, Ukraine</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-forest-600/20 p-3 rounded-lg">
                  <Phone className="text-forest-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400">+380 3236 5 1234</p>
                  <p className="text-gray-400">+380 67 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-forest-600/20 p-3 rounded-lg">
                  <Mail className="text-forest-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-400">info@manifik.ua</p>
                  <p className="text-gray-400">reservations@manifik.ua</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-forest-600/20 p-3 rounded-lg">
                  <Clock className="text-forest-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Hours</h3>
                  <p className="text-gray-400">Mon - Thu: 11:00 - 22:00</p>
                  <p className="text-gray-400">Fri - Sat: 11:00 - 23:00</p>
                  <p className="text-gray-400">Sunday: 12:00 - 21:00</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-charcoal-700 rounded-xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5!2d23.1965!3d49.5167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDMxJzAwLjEiTiAyM8KwMTEnNDcuNCJF!5e0!3m2!1sen!2sua!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Manifik Location"
              />
            </div>
          </motion.div>

          {/* Reservation Form */}
          <motion.div
            id="reservation"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-charcoal-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Reserve a Table</h3>

              <Formik
                initialValues={{
                  customerName: '',
                  phone: '',
                  email: '',
                  date: '',
                  time: '',
                  guests: 2,
                  notes: '',
                }}
                validationSchema={reservationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Your Name</label>
                        <Field
                          name="customerName"
                          type="text"
                          className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors"
                          placeholder="John Doe"
                        />
                        <ErrorMessage
                          name="customerName"
                          component="div"
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Phone</label>
                        <Field
                          name="phone"
                          type="tel"
                          className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors"
                          placeholder="+380 XX XXX XXXX"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Email (optional)</label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors"
                        placeholder="john@example.com"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Date</label>
                        <Field
                          name="date"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors"
                        />
                        <ErrorMessage
                          name="date"
                          component="div"
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Time</label>
                        <Field
                          name="time"
                          as="select"
                          className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="time"
                          component="div"
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Number of Guests</label>
                      <Field
                        name="guests"
                        type="number"
                        min="1"
                        max="20"
                        className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors"
                      />
                      <ErrorMessage
                        name="guests"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Special Requests (optional)</label>
                      <Field
                        name="notes"
                        as="textarea"
                        rows={3}
                        className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forest-500 transition-colors resize-none"
                        placeholder="Allergies, celebrations, seating preferences..."
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-forest-600 hover:bg-forest-500 disabled:bg-charcoal-600 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-all duration-300 font-semibold text-lg"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
