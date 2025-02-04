"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { Conversation } from "../components/conversation";

const sebastianModel = {
  id: "educativo",
  name: "Sebastián",
  role: "Sector Educativo",
  description: "Gerente de Talento Humano evaluando opciones de ARL para su institución",
  bgColor: "bg-violet-50",
  accentColor: "text-violet-600",
  borderColor: "border-violet-100",
  icon: "👨‍🏫",
  tag: "Educación",
  status: "Buscando mejores beneficios"
};

const sebastianContext = {
  title: "Contexto de la Conversación",
  sections: [
    {
      title: "Quién soy",
      content: "Soy Sebastián, Gerente de Talento Humano en una institución educativa con más de 300 empleados entre docentes y personal administrativo."
    },
    {
      title: "Situación actual",
      content: "Estamos evaluando diferentes ARL para mejorar la cobertura y beneficios para nuestros empleados, especialmente en temas de riesgos psicosociales."
    },
    {
      title: "Intereses principales",
      content: "Me interesa conocer los programas de prevención, especialmente en riesgos psicosociales y ergonómicos. También quiero saber sobre capacitaciones y acompañamiento."
    },
    {
      title: "Expectativas",
      content: "Busco una ARL que entienda las necesidades específicas del sector educativo y ofrezca soluciones adaptadas a nuestro contexto."
    },
    {
      title: "Estilo de comunicación",
      content: "Soy analítico y detallista. Me gusta explorar todas las opciones antes de tomar una decisión."
    }
  ]
};

declare global {
  interface Window {
    elevenlabs: {
      initialize: (options: { apiKey: string }) => void;
      Agent: {
        new(options: {
          agentId: string;
          voiceId: string;
          container: string;
        }): any;
      };
    };
  }
}

export default function EducativoAgent() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [status, setStatus] = useState<string>('disconnected');

  useEffect(() => {
    document.title = "Sebastián (Sector Educativo)";
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return null;

  return (
    <Conversation 
      agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_EDUCATIVO || ''} 
      onStatusChange={setStatus}
      contextData={sebastianContext}
      model={sebastianModel}
      user={user}
      onSignOut={handleSignOut}
    />
  );
} 