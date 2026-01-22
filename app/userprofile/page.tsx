'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function UserProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/account');
    }
  }, [user]);

  if (!user) return null;

  const rawFirstName = user.user_metadata?.firstName || 'User';
  const firstName = rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1);
  const email = user.email;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">Hello, {firstName}!</h1>
          <p className="text-gray-600">You are logged in as {email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Primary Shipping Address</h2>
            <p className="text-gray-600">No address available</p>
            <button className="mt-2 text-blue-600 hover:underline">Add a new shipping address</button>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Primary Payment Information</h2>
            <p className="text-gray-600">No card set as primary</p>
            <button className="mt-2 text-blue-600 hover:underline">Add a new card</button>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Name, Email & Password</h2>
            <p className="text-gray-800">{firstName}</p>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">**********</p>
            <button className="mt-2 text-blue-600 hover:underline">Manage Account Info</button>
            <br />
            <button className="mt-1 text-blue-600 hover:underline">Manage Email Subscriptions</button>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Enter gift card code to redeem</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Gift card code"
                className="flex-1 border border-gray-300 px-3 py-2 rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Redeem
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Store Credit Balance</h2>
            <p className="text-2xl font-bold text-gray-800">$0.00</p>
          </div>

          <div className="bg-white p-6 rounded shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Your Order History</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="text"
                placeholder="Search by Order Number, Brand, or Name"
                className="flex-1 border border-gray-300 px-3 py-2 rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Search Orders
              </button>
            </div>
            <p className="mt-4 text-gray-600">Your order history is empty.</p>
            <div className="mt-4">
              <label className="text-sm text-gray-700 mr-2">Orders per page:</label>
              <select className="border border-gray-300 px-2 py-1 rounded">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}