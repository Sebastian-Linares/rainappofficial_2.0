'use client';

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  user: any;
  showBackButton?: boolean;
}

export function Header({ user, showBackButton }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          {showBackButton && (
            <>
              <button
                onClick={() => router.push('/model-selection')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ←
              </button>
              <div className="h-6 w-px bg-gray-200" />
            </>
          )}
          <Image
            src="/logo-raingroup.png"
            alt="Rain Group Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <div className="h-6 w-px bg-gray-200" />
          <Image
            src="/Grupo_Sura_logo.png"
            alt="Sura Logo"
            width={100}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {user?.email}
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
} 