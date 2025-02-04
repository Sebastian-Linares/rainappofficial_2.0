"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { Conversation } from "../components/conversation";

const oscarModel = {
  id: "cliente",
  name: "Oscar",
  role: "Cliente Potencial",
  description: "Gerente Administrativo del sector infraestructura buscando cambiar de ARL",
  bgColor: "bg-emerald-50",
  accentColor: "text-emerald-600",
  borderColor: "border-emerald-100",
  icon: "👨‍💻",
  tag: "Prospecto",
  status: "Evaluando propuestas"
};

const oscarContext = {
  title: "Contexto de la Conversación",
  sections: [
    {
      title: "Quién soy",
      content: "Soy Oscar, el Gerente Administrativo de una empresa de infraestructura con más de 500 empleados."
    },
    {
      title: "Situación actual",
      content: "Actualmente tenemos contrato con otra ARL, pero estamos buscando cambiar debido a problemas con la gestión de casos y tiempos de respuesta."
    },
    {
      title: "Intereses principales",
      content: "Me interesa conocer la cobertura, el proceso de atención de accidentes y las tarifas. También quiero saber sobre los programas de prevención."
    },
    {
      title: "Expectativas",
      content: "Busco una ARL que ofrezca un servicio más personalizado y eficiente. El precio es importante, pero la calidad del servicio es prioritaria."
    },
    {
      title: "Estilo de comunicación",
      content: "Soy directo y analítico. Me gusta tener datos concretos y ejemplos específicos."
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

export default function ClienteAgent() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [status, setStatus] = useState<string>('disconnected');

  useEffect(() => {
    document.title = "Oscar (Cliente Potencial)";
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
      agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_CLIENTE || ''} 
      onStatusChange={setStatus}
      contextData={oscarContext}
      model={oscarModel}
      user={user}
      onSignOut={handleSignOut}
    />
  );
} 