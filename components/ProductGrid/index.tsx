'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useCartStore } from '@/stores/cartStore';

type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  rating: number;
  in_stock: boolean;
  description?: string;
};

const PAGE_SIZE = 9;

export default function ProductGrid({ category, page }: { category: string; page: number }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .range(from, to);

      if (error) console.error(error);
      else setProducts(data || []);

      setLoading(false);
    }

    fetchProducts();
  }, [category, page]);

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {products.map((product) => {
        const cartItem = items.find((item) => item.id === product.id);
        const quantity = cartItem?.quantity || 0;

        return (
          <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg transition relative">
            {!product.in_stock && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                Pre-Order
              </span>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full rounded"
              onError={(e) => {
                if (e.currentTarget.src !== '/fallback.jpg') {
                  e.currentTarget.src = '/fallback.jpg';
                }
              }}
            />

            <h3 className="mt-2 font-semibold text-sm">{product.title}</h3>
            <div className="text-yellow-500 text-sm">★★★★★</div>

            {product.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
            )}

            <p className="text-lg font-bold text-gray-800 mt-2">£{product.price}</p>

            {/* Cart Controls */}
            <div className="mt-3">
              {quantity === 0 ? (
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      image: product.image_url,
                    })
                  }
                  className="w-32 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-xl transition"
                >
                  Add to cart
                </button>
              ) : (
                <div className="w-32 flex items-center justify-between border border-yellow-400 rounded-xl px-3 py-2">
                  <button
                    onClick={() => {
                      const newQty = quantity - 1;
                      if (newQty <= 0) {
                        removeFromCart(product.id);
                      } else {
                        updateQuantity(product.id, newQty);
                      }
                    }}
                    className="text-yellow-600 text-lg font-bold"
                  >
                    –
                  </button>

                  <span className="text-sm font-medium">{quantity}</span>

                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="text-yellow-600 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}