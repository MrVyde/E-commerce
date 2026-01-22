'use client';

import Image from 'next/image';

const brands = [
  'lg.png',
  'jbl.png',
  'asus.png',
  'nintendo.png',
  'breville.png',
];

export default function BrandMarquee() {
  return (
    <section className="w-full bg-white py-6">
      <div className="mx-auto max-w-[1600px] px-4">
        {/* Top Line */}
        <div className="border-t border-gray-200 mb-6" />

        <div className="overflow-hidden">
          <div className="w-max flex animate-marquee gap-20">
            {[...brands, ...brands].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={`/images/brands/${logo}`}
                  alt={`Brand ${logo}`}
                  width={180}
                  height={60}
                  className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-200 mt-6" />
      </div>
    </section>
  );
}