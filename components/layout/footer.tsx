'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';


type LinkItem = { label: string; href: string };
type FooterSection = { title: string; links?: LinkItem[] }; 




const sections = [
  {
    title: 'Our Company',
    links: [
      { label: 'About Us', href: '/aboutus' },
      { label: 'Contact Us', href: '/contactus' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Sale', href: '/sale' },
      { label: 'Size Guide', href: '/sizeguide' },
    ],
  },
];

const allSections: FooterSection[] = [...sections, { title: 'Newsletter' }];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);


  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-12 text-sm">
      <div className="max-w-[1600px] mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-10">
          {/* About Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="mb-4 leading-relaxed">
            Our mission is to make technology and home essentials accessible, reliable, and affordable.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-stone-900 w-4 h-4" />
                <span>2571 Seattle</span>
              </li>
              <li>
                <a
                  href="tel:+19734353638"
                  className="flex items-start gap-2 hover:text-red-500 transition-colors"
                >
                  <FaPhoneAlt className="mt-1 text-gray-900 w-4 h-4" />
                  <span>+1 (879) 776–9367</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fashionwomen.com"
                  className="flex items-start gap-2 hover:text-red-500 transition-colors"
                >
                  <FaEnvelope className="mt-1 text-zinc-900 w-4 h-4" />
                  <span>info@vyde.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Our Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Our Company</h3>
            <ul className="space-y-2">
              {sections[0].links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-red-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {sections[1].links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-red-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Sign Up to Newsletter</h3>
            <p className="mb-4">Subscribe for store updates and discounts.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  setSubscribed(true);
                  setEmail('');
                }
              }}
              className="flex flex-col sm:flex-row gap-2 mb-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-[70%]"
              />
              <button
                type="submit"
                className="bg-stone-900 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full sm:w-[30%] min-w-[120px]"
              >
                Sign Up
              </button>
            </form>
            {subscribed && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-3 w-fit">
                Thanks for subscribing
              </div>
            )}
            <p className="text-xs text-gray-500 mb-4">
              *By entering your email, you accept our terms and privacy policy.
            </p>
            <div className="flex gap-6 text-gray-600">
              <FaFacebookF className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <FaInstagram className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <FaTiktok className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <FaYoutube className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <FaPinterestP className="w-5 h-5 hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="lg:hidden space-y-6 mt-10">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="mb-2">
             Our mission is to make technology and home essentials accessible, reliable, and affordable.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-gray-900 w-4 h-4" />
                <span>2571 Seattle</span>
              </li>
              <li>
                <a
                  href="tel:+19734353638"
                  className="flex items-start gap-2 hover:text-red-500 transition-colors"
                >
                  <FaPhoneAlt className="mt-1 text-gray-900 w-4 h-4" />
                  <span>+1 (879) 776–9367</span>  
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fashionwomen.com"
                  className="flex items-start gap-2 hover:text-red-500 transition-colors"
                >
                  <FaEnvelope className="mt-1 text-stone-900 w-4 h-4" />
                  <span>info@Vyde.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Collapsible Sections */}
          {allSections.map(({ title, links }) => (
            <div key={title}>
              <button
                onClick={() => toggleSection(title)}
                className="w-full flex justify-between items-center text-lg font-semibold py-2 border-b border-gray-300"
              >
                {title === 'Newsletter' ? 'Subscribe to get 10% OFF' : title}
                <span className="text-xl">{openSection === title ? '−' : '+'}</span>
              </button>
              {openSection === title && (
                <div className="mt-2 px-2">
                  {title === 'Newsletter' ? (
                    <>
                      <p className="mb-2">Subscribe for store updates and discounts.</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (email.trim()) {
                            setSubscribed(true);
                            setEmail('');
                          }
                        }}
                        className="flex flex-col gap-2 mb-2"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        <button
                          type="submit"
                            className="bg-zinc-900 text-white px-6 py-2 rounded-md hover:bg-red-600"
                        >
                          Sign Up
                        </button>
                      </form>
                      {subscribed && (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-3 w-fit">
                          Thanks for subscribing
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mb-3">
                        *By entering your email, you accept our terms and privacy policy.
                      </p>
                      <div className="flex gap-6 text-gray-600">
                        <FaFacebookF className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                        <FaInstagram className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                        <FaTiktok className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                        <FaYoutube className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                        <FaPinterestP className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                      </div>
                    </>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {links?.map(({ label, href }) => (
                        <li key={label}>
                          <Link href={href} className="hover:text-red-500 transition-colors">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center gap-2 text-gray-600 text-sm">
          <div>© 2025 Vyde store. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}