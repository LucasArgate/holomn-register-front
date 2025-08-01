import React, { useState } from 'react';
import { Chat } from '../components/Chat';
import type { ChatMessage } from '../types';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Olá! Sou o assistente IA do GoProject. Como posso ajudá-lo hoje?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const aiResponses = [
        'Entendo sua pergunta. Deixe-me analisar isso para você.',
        'Interessante! Vou processar essa informação e fornecer uma resposta detalhada.',
        'Baseado nos dados disponíveis, posso sugerir algumas abordagens.',
        'Essa é uma excelente pergunta. Vou buscar as informações mais relevantes.',
        'Analisando sua solicitação... Aqui está o que encontrei.',
        'Vou verificar nossas fontes de dados para fornecer uma resposta precisa.',
        'Com base no contexto fornecido, aqui estão minhas recomendações.',
        'Processando sua consulta... Encontrei algumas informações úteis.',
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    } finally {
      setLoading(false);
    }
  };

  return <Chat messages={messages} onSendMessage={handleSendMessage} loading={loading} />;
}; 
