"use client"

import { useState } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../lib/firebase"; // using your client-side Firebase config
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { FC } from "react";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the passwordless login API with the provided email
      const res = await fetch("/api/passwordless-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Login failed: " + data.error);
        return;
      }

      const token = data.token;
      // Sign in with the custom token
      await signInWithCustomToken(auth, token);
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
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">¡Bienvenido!</h1>
            <p className="mt-2 text-sm text-gray-600">Por favor ingrese su email para iniciar sesión</p>
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
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-black"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
        
        {/* Powered by Rain Group */}
        <div className="absolute bottom-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            Powered by
            <Image
              src="/logo-raingroup.png"
              alt="Rain Group"
              width={80}
              height={25}
              className="object-contain -mt-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
