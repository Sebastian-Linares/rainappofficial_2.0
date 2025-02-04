'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ConversationProps {
  agentId: string;
  onStatusChange?: (status: string) => void;
  contextData?: {
    title: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
  model: {
    name: string;
    role: string;
    description: string;
    bgColor: string;
    accentColor: string;
    borderColor: string;
    icon: string;
    tag: string;
    status: string;
  };
  user: any;
  onSignOut: () => void;
}

export function Conversation({ agentId, onStatusChange, contextData, model, user, onSignOut }: ConversationProps) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const router = useRouter();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      onStatusChange?.('connected');
      setError(null);
    },
    onDisconnect: () => {
      console.log('Disconnected');
      onStatusChange?.('disconnected');
    },
    onMessage: (message: unknown) => console.log('Message:', message),
    onError: (error: Error) => {
      console.error('Error:', error);
      onStatusChange?.('error');
      setError(error.message);
      setIsInitializing(false);
    },
  });

  const startConversation = useCallback(async () => {
    setIsInitializing(true);
    setError(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setError(error instanceof Error ? error.message : 'Failed to start conversation');
    } finally {
      setIsInitializing(false);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setError(null);
    } catch (error) {
      console.error('Failed to end conversation:', error);
      setError(error instanceof Error ? error.message : 'Failed to end conversation');
    }
  }, [conversation]);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Header */}
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
              onClick={onSignOut}
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Button and Agent Info Card */}
        <div className="relative mb-8">
          {/* Back Button - Absolute positioned */}
          <button
            onClick={() => router.push('/model-selection')}
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+1rem)]
              flex items-center justify-center
              w-14 h-14 rounded-2xl border
              ${model.bgColor} ${model.borderColor}
              hover:shadow-md transition-all duration-200
              group
            `}
          >
            <svg 
              className={`w-6 h-6 ${model.accentColor} transition-transform duration-200 group-hover:-translate-x-0.5`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
          </button>

          {/* Agent Info Card - Full width */}
          <div className={`
            rounded-2xl border p-8
            ${model.bgColor} ${model.borderColor}
          `}>
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-4">
                <div className={`
                  inline-flex p-3.5 rounded-xl
                  bg-white/80 backdrop-blur-sm shadow-sm
                  border ${model.borderColor}
                `}>
                  <span className="text-3xl">
                    {model.icon}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {model.name}
                  </h3>
                  <p className={`text-sm font-medium ${model.accentColor}`}>
                    {model.role}
                  </p>
                </div>
                
                <p className="text-sm leading-relaxed text-gray-600 max-w-2xl">
                  {model.description}
                </p>
              </div>

              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                bg-white/90 backdrop-blur-sm ${model.accentColor}
                transition-colors duration-300 shadow-sm
              `}>
                {model.tag}
              </span>
            </div>

            {/* Context Panel */}
            {contextData && (
              <div className="border-t border-gray-200/50 -mx-8 px-8 pt-6">
                <button
                  onClick={() => setIsContextVisible(!isContextVisible)}
                  className="w-full flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {contextData.title}
                  </span>
                  <svg
                    className={`w-5 h-5 ${model.accentColor} transition-transform duration-200`}
                    style={{
                      transform: isContextVisible ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isContextVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="space-y-4 pt-4">
                    {contextData.sections.map((section, index) => (
                      <div key={index}>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conversation Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {/* Connection Status */}
          <div className="flex items-center gap-2 mb-6">
            <div 
              className={`w-2 h-2 rounded-full ${
                conversation.status === 'connected' 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-gray-300'
              }`}
            />
            <span className="text-sm font-medium text-gray-600">
              {conversation.status === 'connected' ? 'Conectado' : 'Desconectado'}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-3">
            <button
              onClick={startConversation}
              disabled={isInitializing || conversation.status === 'connected'}
              className={`
                relative overflow-hidden px-8 py-4 rounded-xl text-sm font-medium 
                transition-all duration-300 flex items-center gap-2
                ${isInitializing || conversation.status === 'connected'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : `
                    bg-white border-2 ${model.borderColor} ${model.accentColor}
                    hover:shadow-lg hover:shadow-${model.bgColor} 
                    active:transform active:scale-[0.98]
                    before:absolute before:inset-0 
                    before:bg-gradient-to-r before:from-white/0 before:via-white/50 before:to-white/0
                    before:translate-x-[-200%] hover:before:translate-x-[200%]
                    before:transition-transform before:duration-700
                    before:pointer-events-none
                  `
                }
              `}
            >
              {isInitializing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Iniciando...</span>
                </div>
              ) : conversation.status === 'connected' ? (
                <>
                  <span className="relative z-10">Conversación Activa</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Iniciar Conversación</span>
                  <svg 
                    className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </>
              )}
            </button>
            {conversation.status === 'connected' && (
              <button
                onClick={stopConversation}
                className="px-8 py-4 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-md transition-all duration-200 active:transform active:scale-[0.98]"
              >
                Terminar Conversación
              </button>
            )}
          </div>

          {/* Conversation Status */}
          {conversation.status === 'connected' && (
            <div className={`
              mt-6 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
              ${conversation.isSpeaking
                ? `${model.bgColor} ${model.accentColor}`
                : 'bg-green-50 text-green-600'
              }
            `}>
              {conversation.isSpeaking ? '🗣️ Hablando' : '👂 Escuchando'}
            </div>
          )}
        </div>

        {/* Footer */}
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