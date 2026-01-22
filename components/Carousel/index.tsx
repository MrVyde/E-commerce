"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface CarouselProps {
  items: { name: string; image: string }[];
}

export default function Carousel({ items }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Update active index on scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeftVal = containerRef.current.scrollLeft;
    const itemWidth = containerRef.current.children[0].clientWidth;
    const index = Math.round(scrollLeftVal / itemWidth);
    setActiveIndex(index);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault(); // prevent selection while dragging
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = startX.current - x;
    containerRef.current.scrollLeft = scrollLeft.current + walk;
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="flex gap-1 overflow-x-hidden scroll-smooth snap-x snap-mandatory cursor-pointer select-none "
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          if (isDragging) e.preventDefault(); // prevent accidental clicks while dragging
        }}
      >
        {items.map((item, i) => (
          <Link
            key={i}
            href="/shop"
            className="snap-start min-w-[49%] md:min-w-[24.6%] lg:min-w-[12.3%] group px-2 md:px-4"
            onDragStart={(e) => e.preventDefault()} // prevent ghost drag
          >
            <div className="bg-gray-800 rounded-2xl overflow-hidden relative aspect-square">
              <Image
                src={item.image}
                alt={item.name}
                fill
                draggable={false} // prevent image drag
                className="object-contain md:group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-center text-sm font-medium group-hover:text-red-500 transition-colors duration-300">
              {item.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="flex justify-center gap-2 mt-9 mb-15 md:hidden">
        {items.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === activeIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
