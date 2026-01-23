'use client'

import Link from "next/link"


export default function About() {
    return (
        <div className="min-h-screen px-6 text-black pt-12 bg-gray-200">
      {/* Breadcrumb - Centered */}
      <div className="text-sm text-center mt-10 mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-500">•</span>
        <span>About</span>
      </div>

      {/* Page Title - Centered */}
      <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

      {/* Our Mission */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          Our mission is to empower every household with cutting-edge technology and reliable appliances.<br />
          We strive to make smart living accessible through curated selections of smart home devices.<br />
          From immersive gaming setups to energy-efficient electronics, we deliver innovation with every product.<br />
          Our platform is built to simplify shopping and elevate the customer experience.<br />
          We partner with trusted brands to ensure quality, durability, and performance.<br />
          Every purchase is a step toward a smarter, more connected lifestyle.
        </p>
      </section>

      {/* Our Vision */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          We envision a future where technology seamlessly integrates into everyday life.<br />
          Our goal is to be the leading destination for smart living solutions worldwide.<br />
          We aim to inspire innovation and empower customers to embrace digital transformation.<br />
          By fostering trust and transparency, we build lasting relationships with our community.<br />
          Sustainability and efficiency guide our product choices and business practices.<br />
          Together, we shape a world where convenience meets intelligence.
        </p>
      </section>
    </div>
    );
}