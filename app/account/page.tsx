'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { X,} from 'lucide-react';
import { startTransition } from 'react';
import Link from 'next/link';

const getInitialView = () => {
  if (typeof window === 'undefined') return 'login';

  return window.location.hash.includes('type=recovery')
    ? 'reset'
    : 'login';
};

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [view, setView] = useState< 'login' | 'signup' | 'forgot' | 'reset' | 'confirm'>(() => getInitialView());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(40);
  const [canResend, setCanResend] = useState(false);





  // Countdown for resend email
  useEffect(() => {
    if (view === 'confirm') {
      startTransition(() => {
        setCountdown(40);
        setCanResend(false);
      });

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
      }
    }, [view]);



  
  // Handle login/signup
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = getSupabaseClient();
    setLoading(true);
    setError('');
    setMessage('');

    let data, error;

    if (view === 'login') {
      ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
      ({ data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstName },
        },
      }));

      if (!error) {
        setView('confirm');
        setMessage('');
        setError('');
        setLoading(false);
        return;
      }
    }

    if (error) {
      setError(error.message);
    } else if (data?.user) {
      setUser({ ...data.user, user_metadata: { ...data.user.user_metadata, firstName } });
      router.push('/');
    }

    setLoading(false);
  };

  // Handle forgot password
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = getSupabaseClient();

    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset link sent. Check your email.');
    }

    setLoading(false);
  };

  // Handle password reset
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = getSupabaseClient();

    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password updated! Redirecting...');
      setTimeout(() => router.push('/account'), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <div className="max-w-md w-full mb-8 text-center">
        <div className="text-sm text-gray-500 my-6 pt-5 md:pt-12">
          <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
            Home
          </Link>{' '}
          • Account
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {view === 'signup'
            ? 'Create your account'
            : view === 'reset'
            ? 'Reset your password'
            : view === 'confirm'
            ? 'Check your email'
            : 'Welcome back!'}
        </h1>
        <p className="text-sm text-gray-600">
          {view === 'forgot'
            ? 'Enter your email to receive a password reset link.'
            : view === 'reset'
            ? 'Set a new password for your account.'
            : view === 'confirm'
            ? 'We’ve sent you a confirmation link. Please check your inbox.'
            : 'Log in to manage your account and enjoy exclusive benefits.'}
        </p>
      </div>

      <form
        onSubmit={
          view === 'forgot' ? handleForgot : view === 'reset' ? handleReset : handleAuth
        }
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative"
      >
        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {view === 'confirm' ? (
          <div className="text-center space-y-4">
            <p className="text-gray-700">
               <strong>We’ve emailed you!</strong><br />
              We’ve sent you an email that contains a link to complete your registration.<br />
              Please check your spam inbox if you can’t find the mail.
            </p>

            {!canResend ? (
              <p className="text-sm text-gray-500">You can resend the email in {countdown}s…</p>
            ) : (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={async () => {
                    const supabase = getSupabaseClient();

                    const { error } = await supabase.auth.resend({ type: 'signup', email });
                    if (error) {
                      setError(error.message);
                    } else {
                      setMessage('📧 Email resent!');
                      setCanResend(false);
                      setCountdown(40);
                    }
                  }}
                  className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Resend Email
                </button>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {view === 'signup' && (
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 border border-gray-300 px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Your email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
              required
            />

            {(view !== 'forgot') && (
              <input
                type="password"
                placeholder={view === 'reset' ? 'New password*' : 'Password*'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
                required
              />
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-600 mb-4">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {loading
                ? view === 'login'
                  ? 'Logging in...'
                  : view === 'signup'
                   ? 'Creating account...'
                : view === 'forgot'
                ? 'Sending link...'
                : 'Resetting...'
              : view === 'login'
              ? 'Login'
              : view === 'signup'
              ? 'Create Account'
              : view === 'forgot'
              ? 'Send Reset Link'
              : 'Update Password'}
            </button>

            <div className="text-sm text-center mt-4 space-y-2">
              {view === 'login' && (
                <>
                  <p>
                    Forgot password?{' '}
                    <button onClick={() => setView('forgot')} className="text-blue-600 hover:underline">
                      Reset it
                    </button>
                  </p>
                  <p>
                    Don’t have an account?{' '}
                    <button onClick={() => setView('signup')} className="text-blue-600 hover:underline">
                      Create one
                    </button>
                  </p>
                </>
              )}

              {view === 'signup' && (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setView('login')} className="text-blue-600 hover:underline">
                    Login
                  </button>
                </p>
              )}

              {(view === 'forgot' || view === 'reset') && (
                <p>
                  Back to{' '}
                  <button onClick={() => setView('login')} className="text-blue-600 hover:underline">
                    Login
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}