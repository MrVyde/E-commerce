'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Menu, ChevronDown, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { getSupabaseClient } from '@/lib/supabaseClient';
import SearchBar from './searchBar';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [products, setProducts] = useState<string[]>([]);


  const router = useRouter();
  const pathname = usePathname();
  const isAccountPage = pathname === '/account';

  const totalItems = useCartStore((state) => state.totalItems);
  const { user, setUser } = useAuthStore();
  const firstName = user?.user_metadata?.firstName;
  const lastName = user?.user_metadata?.lastName;
  const email = user?.email;
  const isLoggedIn = !!user;

   useEffect(() => {

    const supabase = getSupabaseClient();

    const fetchProducts = async () => {
      const { data, error }= await supabase
        .from('products') // your table name
        .select('title');  // the column you want

      if (error) {
        console.error('Error fetching products:',error);
      } else if (data) {
        setProducts(data.map((item) => item.title));
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = products.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabaseClient();

    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    setOpen(false);
    router.push('/');
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isAccountPage) setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const handleUserClick = () => {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    if (isLoggedIn) {
      router.push('/userprofile');
    } else {
      router.push('/account');
    }
  } else {
    if (isLoggedIn) {
      router.push('/userprofile');
    } else {
      router.push('/account');
    }
  }

  setDropdownOpen(false);
};

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-600 inline-flex justify-between w-full px-4 py-2">
        
        <div className="flex items-center space-x-2">
        <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu />
            </button>
            <Link href="/">
                <Image
                src="/images/logo/Logo.png"
                alt="My Store Logo"
                width={120}
                height={40}
                priority
                />
            </Link>
        </div>


        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <div className="relative group py-2">
              <Link href="/about">About</Link>
                <ul className="absolute left-0 top-full z-50 hidden group-hover:block hover:block bg-white text-black rounded shadow min-w-[180px] pt-1">
                    <li>
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">
                        Our Mission
                    </Link>
                    </li>
                    <li>
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">
                        Our Vision
                    </Link>
                    </li>
                </ul>
           </div>
        </div>
        <div className="flex items-center gap-4 text-white">
          <div className="hidden md:block">
            <SearchBar
              query={query}
              suggestions={suggestions}
              onChange={handleInputChange}
              onSelect={(item) => {
                setQuery(item);
                setSuggestions([]);
              }}
            />
          </div>

          {/* User Dropdown (Desktop Only) */}
          <div
            className="relative hidden md:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleUserClick}
              className="flex items-center gap-1 hover:text-gray-200"
            >
              {firstName && <span className="font-semibold capitalize">{firstName}</span>}
              <User />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-[420px] bg-white text-black rounded-md shadow-lg z-50">
                <div className="flex divide-x rounded-md overflow-hidden">
                  {/* Left column */}
                  <div className="w-1/2 p-4">
                    <div className="bg-gray-100 rounded-md p-3 mb-4">
                      <p className="font-semibold capitalize text-gray-800">{firstName} {lastName}</p>
                      <p className="text-sm text-gray-600">{email}</p>
                    </div>
                    <ul className="text-sm space-y-2">
                      <li>
                        <Link
                          href="/account"
                          className="block text-blue-600 hover:text-red-600 transition-colors duration-200"
                        >
                          Switch Account
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="text-blue-600 hover:text-red-600 text-left w-full transition-colors duration-200"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Right column */}
                  <div className="w-1/2 p-4">
                    <p className="font-semibold mb-2">Your Account</p>
                    <ul className="text-sm space-y-2">
                      <li><Link href="/account" className="block hover:text-red-600 transition-colors duration-200">Orders</Link></li>
                      <li><Link href="/account" className="block hover:text-red-600 transition-colors duration-200">History</Link></li>
                      <li><Link href="/account" className="block hover:text-red-600 transition-colors duration-200">Watchlist</Link></li>
                      <li><Link href="/account" className="block hover:text-red-600 transition-colors duration-200">Address</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile User Icon */}
          <button onClick={handleUserClick} className="md:hidden">
            <div className="flex items-center gap-1">
              {firstName && <span className="font-semibold capitalize">{firstName}</span>}
              <User />
            </div>
          </button>

          <Link href="/cart" aria-label="Cart">
                <div className="relative">
                    <ShoppingCart />
                    {isLoggedIn && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                    )}
                </div>
            </Link>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="block md:hidden w-full px-4 pt-16 bg-white shadow">
        <SearchBar
          query={query}
          suggestions={suggestions}
          onChange={handleInputChange}
          onSelect={(item) => {
            setQuery(item);
            setSuggestions([]);
          }}
        />
      </div>

        {/* Mobile Menu */}
    <div>
    <div
        className={`fixed top-0 right-0 w-screen h-screen z-50 transform transition-transform duration-500 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
        }`}
    >
        <div className="flex h-full w-full">
        {/* Backdrop / Close Area */}
        <div
            className={`${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            } w-1/4 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500`}
            onClick={() => setOpen(false)}
        >
            <div className="p-2 border border-white/40 rounded-full cursor-pointer shadow-[0_0_8px_rgba(255,255,255,0.35)] hover:scale-110 transition">
            <X className="text-white" />
            </div>
        </div>

        {/* Menu Panel */}
        <div
            className="
            flex flex-col justify-between h-full w-3/4
            bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200
            backdrop-blur-xl
            text-zinc-900
            shadow-2xl shadow-black/30
            "
        >
            <div>
            <Link
                href="/"
                className="py-4 px-6 block font-medium shadow-[inset_0_-1.5px_0_rgba(0,0,0,0.25)] hover:bg-white/50 transition"
            >
                Home
            </Link>

            <Link
                href="/shop"
                className="py-4 px-6 block font-medium shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] hover:bg-white/20 transition"
            >
                Shop
            </Link>

            <div>
                <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center font-medium justify-between w-full py-4 px-6 shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] hover:bg-white/20 transition"
                >
                <span>About</span>
                <ChevronDown
                    className={`w-6 h-6 shadow-[inset_0_-1.5px_0_rgba(0,0,0,0.25)] rounded-md p-1 transform transition-transform duration-300 ${
                    aboutOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
                </button>

                <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    aboutOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
                >
                <ul>
                    <li className="pl-7 py-2 border-b border-white/30 hover:bg-white/20 transition">
                    <Link href="/about">Our Mission</Link>
                    </li>
                    <li className="pl-7 py-2 border-b border-white/30 hover:bg-white/20 transition">
                    <Link href="/about">Our Vision</Link>
                    </li>
                </ul>
                </div>
            </div>
            </div>

            {/* Mobile Footer */}
            {isLoggedIn && (
            <div className="px-6 py-4 text-gray-900 bg-white/20 backdrop-blur-md">
                <p className="font-semibold text-lg mb-1">
                Hello, <span className="capitalize">{firstName}</span>
                </p>
                <p className="text-sm text-gray-700 mb-4">{email}</p>

                <div className="flex justify-between items-center border-t border-black/30 pt-3">
                <Link
                    href="/account"
                    className="w-1/2 text-center hover:text-cyan-600 transition-colors duration-200"
                >
                    Switch Account
                </Link>

                <div className="h-5 w-px bg-black/30" />

                <button
                    onClick={handleLogout}
                    className="w-1/2 text-center hover:text-red-500 transition-colors duration-200"
                >
                    Sign Out
                </button>
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
    </div>

    </>
  );
}