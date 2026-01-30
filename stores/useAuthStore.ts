// store/useAuthStore.ts
'use client';

import { create } from 'zustand';
import { getSupabaseClient } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

let initialized = false;

type AuthStore = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),

  signOut: async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    set({ user: null });
  },

  fetchUser: async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('❌ Error fetching user:', error.message);
      set({ loading: false });
      return;
    }

    set({ user: data.user, loading: false });
  },
}));

export const initAuthListener = () => {
  const supabase = getSupabaseClient();

  if (initialized) return;
  initialized = true;

  supabase.auth.getSession().then(({ data: { session } }) => {
    useAuthStore.getState().setUser(session?.user || null);
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setUser(session?.user || null);
  });
};
