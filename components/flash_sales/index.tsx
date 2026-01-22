'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';


export default function FlashSaleBanner() {
  const targetDate = new Date('2027-04-04T12:00:00Z').getTime();
  const promoCode = 'Hot10STBL';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
  <div className="w-full px-2 md:px-4 flex items-center justify-center md:py-18">
    <div
      className="relative max-w-8xl w-full rounded-3xl overflow-hidden"
      style={{
        backgroundImage: "url('/images/flashsales/flashsales.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle Blur Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 text-white gap-6">
        {/* Left Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-2">Flash Sale now on!</h1>
          <p className="text-lg">Score Big Savings on All Your Favorites</p>
        </div>

        {/* Center Section - Countdown */}
        <div className="flex-1 text-center font-mono font-semibold text-2xl flex flex-wrap justify-center gap-4">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOUR', value: timeLeft.hours },
            { label: 'MINS', value: timeLeft.minutes },
            { label: 'SECS', value: timeLeft.seconds },
          ].map((item, idx, arr) => (
            <div key={idx} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <span className="bg-white text-black px-4 py-1 rounded-md">
                  {item.value}
                </span>
                <span className="mt-1">{item.label}</span>
              </div>
              {idx < arr.length - 1 && <span className="text-white text-2xl font-bold">:</span>}
            </div>
          ))}
        </div>
        
        {/* Right Section - Promo Code */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-end gap-2 text-white">
          <p className="text-sm flex items-center gap-1 mb-0">
            {copied ? (
              <Check className="w-4 h-4 text-green-300" />
            ) : (
              <Copy
                className="w-4 h-4 text-white cursor-pointer hover:text-gray-200"
                onClick={handleCopy}
              />
            )}
            Use Code:
          </p>
          <div
            className="text-xl font-bold cursor-pointer select-all mb-0"
            onClick={handleCopy}
          >
            {promoCode}
          </div>
          <Link
            href="/shop"
            className="bg-white text-gray-900 px-4 py-1.5 rounded-xl hover:bg-gray-100 transition font-semibold"
          >
            Shop Sale
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}