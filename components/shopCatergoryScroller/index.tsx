'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Appliances', image: '/images/ShpCatergoryScroll/appliances.jpg', href: '/shop/appliances' },
  { name: 'Gaming', image: '/images/ShpCatergoryScroll/Gaming.jpg', href: '/shop/gaming' },
  { name: 'Smart Home', image: '/images/ShpCatergoryScroll/smart-home.jpeg', href: '/shop/smart-home' },
  { name: 'Phone', image: '/images/ShpCatergoryScroll/phone.jpeg', href: '/shop/phone' },
  { name: 'Electronic', image: '/images/ShpCatergoryScroll/Electronics.jpg', href: '/shop/electronic' },
];


export default function CategoryScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };

  const handleMouseDrag = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    let startX = e.pageX - container.offsetLeft;
    let scrollLeft = container.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * -1;
      container.scrollLeft = scrollLeft + walk;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      container.classList.remove('cursor-grabbing');
    };

    container.classList.add('cursor-grabbing');
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <section className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="w-full">
        {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Shop by Category
        </h2> */}

        <div className="overflow-hidden">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDrag}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab select-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="min-w-[60%] sm:min-w-[45%] md:min-w-[33.333%] lg:min-w-[20%] snap-start select-none"
                draggable={false}
              >
                <div className="group rounded-lg overflow-hidden h-[345px] sm:h-[345px] md:h-[384px] lg:h-[384px]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 text-center text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dots — only on mobile screens */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {categories.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === i ? 'bg-orange-500 scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}