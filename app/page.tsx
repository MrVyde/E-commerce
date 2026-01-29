'use client';

import "./globals.css";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import FlashSaleBanner from "@/components/flash_sales";
import HappyCustomers from "@/components/happycustomers";
import ServiceFeatures from "@/components/serviceFeature";
import HelpCenter from "@/components/helpcenter";
import BrandMarquee from "@/components/brand";




export default function Home() {

 const carouselItems = [
  { name: "Wireless Mouse", image: "/images/collections/mouse.jpeg" },
  { name: "Mobile", image: "/images/collections/mobile.jpeg" },
  { name: "Laptop", image: "/images/collections/laptop.jpeg" },
  { name: "Chargers & Cables", image: "/images/collections/cable.jpeg" },
  { name: "Pan Drive", image: "/images/collections/drive.jpeg" },
  { name: "Speaker", image: "/images/collections/speaker.jpeg" },
  { name: "Clearance Sales", image: "/images/collections/sale.jpeg" },
  { name: "Headphone", image: "/images/collections/headphone.jpeg" },
];


 return (
    <>

    <div className="font-poppins md:pt-12 pb-9">
        <div className="grid gap-4 text-white px-2 pt-2 pb-4 md:p-4 sm:gap-4 sm:px-4 sm:pb-4
            md:grid-cols-2 md:grid-rows-2 md:gap-4
            lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-1 lg:gap-4
        ">

            {/* Large Left Block */}
            <div
            className="md:col-span-2 lg:col-span-1 relative overflow-hidden rounded-xl min-h-[16rem] md:min-h-64 md:h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/homepage/speaker.jpg')" }}
            >
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 z-10 px-6 py-6 text-left text-white">
                <h3 className="text-sm font-medium">POWER ON THE GO</h3>
                <h2 className="text-2xl font-bold">Sleek Cylindrical Power Bank</h2>
                <Link
                href="/shop"
                className="inline-block mt-3 text-sm font-semibold text-black bg-white border border-white rounded-md px-4 py-1 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                >
                SHOP NOW
                </Link>
            </div>
            </div>

            {/* Top Right Block */}
            <div
            className="relative overflow-hidden rounded-xl min-h-[500px] sm:min-h-[500px] md:min-h-64 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/homepage/music.jpeg')" }}
            >
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 inset-x-0 z-10 text-center px-4 py-6 text-white">
                <h3 className="text-sm font-medium">IMMERSIVE SOUND</h3>
                <h2 className="text-2xl font-bold">Feel Every Beat</h2>
                <Link
                href="/shop"
                className="inline-block mt-3 text-sm font-semibold text-black bg-white border border-white rounded-md px-4 py-1 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                >
                SHOP NOW
                </Link>
            </div>
            </div>

            {/* Bottom Right Column */}
            <div className="grid grid-rows-2 gap-4">
            {/* Block 3 */}
            <div
                className="relative overflow-hidden rounded-xl min-h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/homepage/phone.jpeg')" }}
            >
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 inset-x-0 z-10 text-center px-4 py-6 text-white">
                <h3 className="text-sm font-medium">CAPTURE LIFE</h3>
                <h2 className="text-2xl font-bold">Triple-Lens iPhone</h2>
                </div>
            </div>

            {/* Block 4 */}
            <div
                className="relative overflow-hidden rounded-xl min-h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/homepage/Gaming.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 inset-x-0 z-10 text-center px-4 py-6 text-white">
                <h5 className="text-sm font-medium">NEXT-LEVEL GAMING</h5>
                <h2 className="text-2xl font-bold">Dive Into VR</h2>
                </div>
            </div>
            </div>
        </div>
    </div>

    <div className="flex items-center justify-between px-2 md:px-4 pb-6">
        <h1 className="text-xl font-medium">Top collections</h1>
        <Link href="/shop" className="text-sm font-medium underline hover:text-red-600">
            View All
        </Link>
    </div>

    <Carousel items={carouselItems} />
    <FlashSaleBanner />
    <HappyCustomers />
    <ServiceFeatures />
    <HelpCenter />
    <BrandMarquee />

    </>
 );
}