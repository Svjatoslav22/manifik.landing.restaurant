'use client';

import Link from 'next/link';

const quickLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#menu', label: 'Menu' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', label: 'Facebook', symbol: 'f' },
  { href: '#', label: 'Instagram', symbol: 'ig' },
  { href: '#', label: 'Twitter', symbol: 'tw' },
  { href: '#', label: 'YouTube', symbol: 'yt' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white tracking-wider">MANIFIK</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Experience the finest European cuisine in the heart of Sambir. Where every dish tells a story
              and every visit becomes a memory.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-charcoal-700 hover:bg-forest-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="text-white text-sm font-bold">{social.symbol}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-forest-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>pl. Rynok, 36</li>
              <li>Sambir, Ukraine</li>
              <li className="pt-2">+380 3236 5 1234</li>
              <li>info@manifik.ua</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Manifik Restaurant. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
