'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Do You Offer Warranties On Electronic Products?',
    answer:
      'Yes, we provide warranties on most electronic products. The duration and coverage may vary by item, so please check the product description or reach out to our customer support for specific warranty information.',
  },
  {
    question: 'What Is Your Return Policy For Electronics?',
    answer:
      "We offer a hassle-free return policy for electronics. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a refund or exchange. Be sure to check our return policy page for detailed instructions.",
  },
  {
    question: 'Do You Provide Technical Support For The Products You Sell?',
    answer:
      "Yes, we offer technical support for most of our products. If you encounter any issues or have questions about setup and usage, our dedicated support team is here to assist you. Feel free to contact us through our customer support channels, and we'll be happy to help.",
  },
  {
    question: 'Can I Track My Order After Purchase?',
    answer:
      'Absolutely! Once your order is processed and shipped, you will receive a tracking number via email. You can use this tracking number to monitor the delivery status of your package in real-time.',
  },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 py-12 bg-white">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Contact Info */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-800">Help Center</h2>
          <p className="text-gray-600">
            If you have an issue or question that requires immediate assistance, you can click the
            button below to chat live with a Customer Service representative.
          </p>
          <p className="text-sm text-gray-500">
            Customer support team from: <strong>8am to 7:30pm daily</strong>. Average answer time: <strong>5h</strong>.
          </p>
          <Link
            href="/contactus"
            className="bg-gray-900 text-white px-4 py-2 rounded-md w-fit hover:bg-red-600"
          >
            Contact Us
          </Link>
        </div>

        {/* Right Side: FAQ */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left cursor-pointer"
              >
                <h3 className="text-md font-semibold text-gray-800">{faq.question}</h3>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-900" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-900" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}