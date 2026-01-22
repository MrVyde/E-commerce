'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Carie-Gosée H.',
    verified: true,
    rating: 5,
    comment: 'Fast, light, and perfect for work or entertainment... 😍',
    product: 'Ultra Thin And Light Weight Laptop',
    price: '$400.00',
    image: '/images/happycustomer/laptop.jpeg',
    thumbnail: '/images/happycustomer/laptop2.jpeg',
  },
  {
    name: 'Algistino Lionel.',
    verified: true,
    rating: 5,
    comment: 'Loud, clear, and easy to use. Love the bass! Highly recommend! 😊',
    product: 'Woofer Multimedia Bluetooth Speaker',
    price: '$210.00',
    image: '/images/happycustomer/speaker.jpeg',
    thumbnail: '/images/happycustomer/speaker2.jpeg',
  },
  {
    name: 'Cameron Smith',
    verified: true,
    rating: 5,
    comment: 'Great sound, super comfy, and awesome noise canceling! Thank you! 🤗',
    product: 'Multi-Platform Gaming Headset',
    price: (
      <>
        <span className="line-through mr-1">$200.00</span> $180.00
      </>
    ),
    image: '/images/happycustomer/headset.jpeg',
    thumbnail: '/images/happycustomer/headset2.jpeg',
  },
];

export default function HappyCustomers() {
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxIndex = reviews.length - itemsPerPage;

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const visibleReviews = reviews.slice(index, index + itemsPerPage);

  return (
    <section className="w-full px-6 py-12 bg-gray-50 relative">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Happy Customers</h2>

        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="hidden lg:flex absolute left-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel */}
          <div className="w-full overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-300">
              {visibleReviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Customer Image */}
                    <div className="w-full sm:w-1/3 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={review.image}
                        alt={review.product}
                        width={300}
                        height={200}
                        className="object-cover w-full h-auto transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-yellow-500 text-lg mb-1">★★★★★</div>
                        <p className="text-gray-700 font-semibold">
                          {review.name}{' '}
                          {review.verified && (
                            <span className="text-sm text-gray-500">(Verified Buyer)</span>
                          )}
                        </p>
                        <p className="text-gray-600 mt-1">{review.comment}</p>
                      </div>

                      {/* Product Info + Thumbnail */}
                      <div className="flex items-start gap-3 mt-4">
                        <div className="flex flex-col text-sm text-gray-500">
                          <p>
                            <span className="font-semibold">Product:</span> {review.product}
                          </p>
                          <p>
                            <span className="font-semibold">Price:</span> {review.price}
                          </p>
                        </div>
                        <Image
                          src={review.thumbnail}
                          alt="Product Thumbnail"
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={index >= maxIndex}
            className="hidden lg:flex absolute right-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Arrows */}
        <div className="flex justify-center gap-4 mt-6 lg:hidden">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            disabled={index >= maxIndex}
            className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}