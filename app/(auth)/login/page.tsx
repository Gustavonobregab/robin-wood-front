'use client';

import { useState } from 'react';
import { loginWithGoogle } from '../../http/login'; // Certifique-se que o caminho está correto
import { Badge } from '../../components/Badge'; // Reutilizando seu componente
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-neutral-50 overflow-hidden font-manrope">
      
      {/* Background Grid (Reutilizado da HeroSection para consistência) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-200 p-8 md:p-10 flex flex-col items-center text-center animate-fade">
          
          {/* Logo / Badge */}
          <div className="mb-8">
            <div className="h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-slate-900/20">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <Badge className="bg-neutral-100 text-neutral-600 border-neutral-200 border">
              <span className="text-xs font-semibold uppercase tracking-wide">Secure Access</span>
            </Badge>
          </div>

          {/* Texts */}
          <h1 className="font-jakarta font-bold text-3xl text-slate-900 tracking-tight mb-3">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm mb-8 max-w-[280px] leading-relaxed">
            Log in to manage your API keys, monitor usage, and optimize your content.
          </p>

          {/* Google Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full group relative flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-slate-700 border border-neutral-200 font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.63c1.61 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Footer / Terms */}
          <div className="mt-8 pt-6 border-t border-neutral-100 w-full">
            <p className="text-xs text-slate-400">
              By continuing, you agree to our{' '}
              <Link href="#" className="underline hover:text-slate-600 transition-colors">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="#" className="underline hover:text-slate-600 transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        
        {/* Simple Footer Text */}
        <p className="text-center mt-6 text-sm text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} Robin Wood API.
        </p>
      </div>
    </div>
  );
}