'use client';

import "./globals.css";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { useEffect } from 'react';
import { initAuthListener } from "@/stores/useAuthStore";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children }: RootLayoutProps ) {
  useEffect(() => {
    initAuthListener();
  }, []);

  
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}