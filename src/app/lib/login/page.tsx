"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/chat");
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with logo and content */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col p-12 justify-between">
        <div className="flex items-center justify-center flex-1">
          <Image
            src="/Grupo_Sura_logo.png"
            alt="Grupo Sura Logo"
            width={200}
            height={67}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600">Please enter your details to sign in</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-900"
            >
              Sign In with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
