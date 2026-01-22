'use client';

import { useState } from 'react';
import SidebarFilter from '@/components/SidebarFilter';
import MobileFilterBar from '@/components/mobileFilterBar.tsx';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/pagination/Pagination';
import Link from 'next/link';
import CategoryScroller from '@/components/shopCatergoryScroller';

const categories = [
  'Appliances',
  'Gaming',
  'Phone',
  'Smart Home',
  'Digital',
  'Electronic',
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative h-64 w-full bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/shop.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent backdrop-brightness-105" />
        <div className="relative z-10 text-center">
          <div className="text-sm mb-2">
            <Link href="/" className="hover:underline text-gray-200">
              Home
            </Link>
            <span className="mx-1">•</span>
            <span>Shop</span>
          </div>
          <h1 className="text-4xl font-bold">Shop</h1>
        </div>
      </div>

      <CategoryScroller />

      <div className="flex gap-6 p-6">
        {/* Sidebar Filter — Desktop Only */}
        <aside className="hidden md:block w-1/4">
          <SidebarFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          />
        </aside>

        {/* Main Content */}
        <section className="flex-1">
        {/* Mobile Filter — Mobile Only */}
        <div className="md:hidden mb-4 -mx-4 px-4">
            <MobileFilterBar
            selected={selectedCategory}
            onSelect={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
            }}
            />
        </div>

        <ProductGrid category={selectedCategory} page={currentPage} />
        <Pagination
            currentPage={currentPage}
            totalPages={2}
            onPageChange={setCurrentPage}
        />
        </section>
      </div>
    </>
  );
}