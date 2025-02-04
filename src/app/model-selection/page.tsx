"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

const models = [
  {
    id: "sura",
    name: "Mauricio",
    role: "Servicios Corporativos Sura",
    description: "Gerente Administrativo evaluando renovación de contrato con ARL Sura",
    path: "/sura",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
    borderColor: "border-blue-100",
    hoverBorder: "group-hover:border-blue-600",
    ringColor: "group-hover:ring-blue-100",
    icon: "👨‍💼",
    tag: "Renovación",
    status: "En revisión de contrato"
  },
  {
    id: "cliente",
    name: "Oscar",
    role: "Cliente Potencial",
    description: "Gerente Administrativo del sector infraestructura buscando cambiar de ARL",
    path: "/cliente",
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-600",
    borderColor: "border-emerald-100",
    hoverBorder: "group-hover:border-emerald-600",
    ringColor: "group-hover:ring-emerald-100",
    icon: "👨‍💻",
    tag: "Prospecto",
    status: "Evaluando propuestas"
  },
  {
    id: "educativo",
    name: "Sebastián",
    role: "Sector Educativo",
    description: "Gerente de Talento Humano evaluando opciones de ARL para su institución",
    path: "/educativo",
    bgColor: "bg-violet-50",
    accentColor: "text-violet-600",
    borderColor: "border-violet-100",
    hoverBorder: "group-hover:border-violet-600",
    ringColor: "group-hover:ring-violet-100",
    icon: "👨‍🏫",
    tag: "Educación",
    status: "Buscando mejores beneficios"
  }
];

export default function ModelSelection() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    document.title = "Selección de Modelo";
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
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

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-16 max-w-3xl">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Selecciona un Agente
          </h1>
          <p className="text-lg text-gray-500/90">
            Elige el perfil con el que deseas interactuar para comenzar la conversación. Cada agente tiene diferentes necesidades y expectativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => router.push(model.path)}
              className={`
                group relative overflow-hidden rounded-2xl border-2 p-8
                transition-all duration-300 ease-out
                ${model.bgColor} ${model.borderColor} ${model.hoverBorder}
                hover:shadow-xl hover:-translate-y-1 hover:cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-offset-2 ${model.ringColor}
              `}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                  bg-white/90 backdrop-blur-sm ${model.accentColor}
                  transition-colors duration-300 shadow-sm
                `}>
                  {model.tag}
                </span>
              </div>

              {/* Icon */}
              <div className={`
                inline-flex mb-6 p-3.5 rounded-xl
                bg-white/80 backdrop-blur-sm shadow-sm
                transition-transform duration-300 group-hover:scale-110
                border ${model.borderColor}
              `}>
                <span className="text-3xl">
                  {model.icon}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {model.name}
                  </h3>
                  <p className={`text-sm font-medium ${model.accentColor}`}>
                    {model.role}
                  </p>
                </div>
                
                <p className="text-sm leading-relaxed text-gray-600">
                  {model.description}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {model.status}
                  </span>

                  <div className={`
                    inline-flex items-center text-sm font-medium
                    ${model.accentColor} opacity-90 group-hover:opacity-100
                    transition-all duration-300
                  `}>
                    Iniciar
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
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
      </main>
    </div>
  );
}
