'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Truck,
  ShieldCheck,
  Heart,
  Headphones,
} from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-6 h-6 text-stone-900" />,
    title: 'Fast & Free Shipping',
    description:
      'We believe in getting your products to you as quickly as possible, with no extra cost.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
    title: '100% Secure Checkout',
    description:
      'Shop with confidence knowing that your personal information is safe with our 100% Secure Checkout.',
  },
  {
    icon: <Heart className="w-6 h-6 text-zinc-900" />,
    title: 'Easy 30-days Returns',
    description:
      "We want you to love every purchase, and if for any reason you're not completely satisfied.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-gray-900" />,
    title: 'Our Premium Support',
    description:
      'Experience exceptional service with our premium support team dedicated to your needs.',
  },
];

export default function ServiceFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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

    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

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
    <section className="w-full overflow-hidden px-2 md:px-4 py-12 bg-white">
      <div className="max-w-9xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Shop With Us
        </h2>

        {/* Mobile: horizontal scroll */}
        {isMobile ? (
          <>
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
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="min-w-full bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-start gap-4 select-none"
                    draggable={false}
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div>{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === i ? 'bg-gray-900 scale-110' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          // Medium and Large: Grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-start gap-4"
              >
                <div>{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}