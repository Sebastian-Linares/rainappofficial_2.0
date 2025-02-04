"use client";

import { useState, useEffect, Suspense } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Script from 'next/script';

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

function ChatContent() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const model = searchParams.get("model");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agent, setAgent] = useState<any>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const agentConfig: Record<string, { 
    name: string;
    voiceId: string;
    agentId: string;
  }> = {
    sura: {
      name: "Mauricio (Servicios Corporativos Sura)",
      voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID_SURA || '',
      agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_SURA || ''
    },
    cliente: {
      name: "Oscar (Cliente Potencial)",
      voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID_CLIENTE || '',
      agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_CLIENTE || ''
    },
    educativo: {
      name: "Sebastián (Sector Educativo)",
      voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID_EDUCATIVO || '',
      agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID_EDUCATIVO || ''
    }
  };

  useEffect(() => {
    if (model && agentConfig[model]) {
      document.title = agentConfig[model].name;
    }
  }, [model]);

  useEffect(() => {
    if (!model) {
      router.push("/model-selection");
    }
  }, [model, router]);

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

  const handleScriptLoad = () => {
    if (window.elevenlabs) {
      window.elevenlabs.initialize({
        apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || ''
      });
      setIsSDKLoaded(true);
    }
  };

  const startConversation = async () => {
    if (!model || !agentConfig[model] || !isSDKLoaded) return;
    
    setIsLoading(true);
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const config = agentConfig[model];
      const newAgent = new window.elevenlabs.Agent({
        agentId: config.agentId,
        voiceId: config.voiceId,
        container: '#agent-container'
      });

      setAgent(newAgent);
      setIsActive(true);
    } catch (error) {
      console.error('Error starting conversation:', error);
      setIsLoading(false);
      setIsActive(false);
    }
  };

  const stopConversation = async () => {
    if (agent) {
      try {
        await agent.destroy();
      } catch (error) {
        console.error('Error destroying agent:', error);
      }
    }
    setIsActive(false);
    setAgent(null);
  };

  if (!model || !agentConfig[model]) {
    return null;
  }

  const config = agentConfig[model];

  return (
    <div className="min-h-screen bg-gray-50">
      <Script 
        src="https://api.elevenlabs.io/v1/conversation-sdk"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/model-selection')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ←
            </button>
            <h1 className="text-xl font-medium text-gray-800">
              {config.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {!isActive ? (
              <button
                onClick={startConversation}
                disabled={isLoading || !isSDKLoaded}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg 
                  ${(isLoading || !isSDKLoaded) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} transition-colors`}
              >
                {isLoading ? 'Iniciando...' : !isSDKLoaded ? 'Cargando SDK...' : 'Iniciar Conversación'}
              </button>
            ) : (
              <button
                onClick={stopConversation}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Terminar Conversación
              </button>
            )}
            <button
              onClick={() => signOut(auth)}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div id="agent-container" className="w-full h-[600px] rounded-lg shadow-lg bg-white"></div>
      </main>
    </div>
  );
}

export default function Chat() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}

