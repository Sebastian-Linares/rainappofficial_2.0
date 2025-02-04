"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { Conversation } from "../components/conversation";

const mauricioModel = {
  id: "sura",
  name: "Mauricio",
  role: "Servicios Corporativos Sura",
  description: "Gerente Administrativo evaluando renovación de contrato con ARL Sura",
  bgColor: "bg-blue-50",
  accentColor: "text-blue-600",
  borderColor: "border-blue-100",
  icon: "👨‍💼",
  tag: "Renovación",
  status: "En revisión de contrato"
};

const mauricioContext = {
  title: "Contexto de la Conversación",
  sections: [
    {
      title: "Quién soy",
      content: "Soy Mauricio, el Gerente Administrativo de una compañía de servicios corporativos en Colombia."
    },
    {
      title: "Situación actual",
      content: "Mi contrato con ARL Sura está por vencer, y estoy evaluando cambiar de proveedor (por ejemplo, a Colmena o Bolívar)."
    },
    {
      title: "Motivo de mi insatisfacción",
      content: "No estoy satisfecho con el nivel de asesoría y capacitación que recibo; siento que no se cumple con el presupuesto asignado para estos servicios."
    },
    {
      title: "Expectativas",
      content: "Espero que se incremente el acompañamiento y se ofrezca una propuesta clara y concreta. Si la oferta no es convincente, terminaré la conversación rápidamente."
    },
    {
      title: "Estilo de comunicación",
      content: "Prefiero respuestas breves y directas. No doy más detalles de lo necesario a menos que se me solicite."
    }
  ]
};

export default function SuraAgent() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [status, setStatus] = useState<string>('disconnected');

  useEffect(() => {
    document.title = "Mauricio (Servicios Corporativos Sura)";
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
      agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_SURA || ''} 
      onStatusChange={setStatus}
      contextData={mauricioContext}
      model={mauricioModel}
      user={user}
      onSignOut={handleSignOut}
    />
  );
} 