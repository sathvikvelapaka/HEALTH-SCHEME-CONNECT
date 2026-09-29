
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; parts: {text: string}[] }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const initialMessage = { role: 'model' as const, parts: [{text: t('chatbotGreeting')}] };

  useEffect(() => {
    if(isOpen && messages.length === 0){
        setMessages([initialMessage]);
    }
    if(isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        // Reset when closed
        setApiKey('');
        setTempApiKey('');
        setMessages([]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async (messageToSend?: string) => {
    const currentInput = messageToSend || userInput;
    if (!currentInput.trim() || !apiKey) return;
    
    const userMessage = { role: 'user' as const, parts: [{text: currentInput}] };
    setMessages((prev) => (prev.length === 0 ? [initialMessage, userMessage] : [...prev, userMessage]));

    setUserInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].slice(0, -1);
      const responseText = await getChatbotResponse(history, currentInput, apiKey);
      const modelMessage = { role: 'model' as const, parts: [{text: responseText}] };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage = { role: 'model' as const, parts: [{text: 'Sorry, something went wrong. Please try again later.'}] };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setMessages([]);
  };

  const SuggestedPrompts = () => (
    <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3 text-center">{t('suggestions')}</p>
        <div className="flex flex-col gap-2">
            <button onClick={() => handleSend('Find hospitals in Hyderabad for PMJAY')} className="text-sm text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-secondary px-4 py-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 hover:text-primary-blue transition-all shadow-sm">
                🏥 {t('suggestion1')}
            </button>
            <button onClick={() => handleSend('What does Aarogyasri cover?')} className="text-sm text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-secondary px-4 py-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 hover:text-primary-blue transition-all shadow-sm">
                🛡️ {t('suggestion2')}
            </button>
        </div>
    </div>
  )

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen ? 'rotate-90 bg-gray-800 scale-90' : 'bg-black dark:bg-white text-white dark:text-black hover:scale-110 hover:-translate-y-1'} rounded-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 focus:outline-none group border-4 border-white dark:border-gray-900`}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
          ) : (
            //  Chat bubble icon
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 13.849 2.497 15.591 3.373 17.091L2.001 22L6.995 20.745C8.469 21.547 10.182 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 14C10.895 14 10 13.105 10 12C10 10.895 10.895 10 12 10C13.105 10 14 10.895 14 12C14 13.105 13.105 14 12 14ZM8 12C8 13.105 7.105 14 6 14C4.895 14 4 13.105 4 12C4 10.895 4.895 10 6 10C7.105 10 8 10.895 8 12ZM18 14C16.895 14 16 13.105 16 12C16 10.895 16.895 10 18 10C19.105 10 20 10.895 20 12C20 13.105 19.105 14 18 14Z"/>
             </svg>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-[380px] h-[600px] max-h-[70vh] bg-gray-50 dark:bg-gray-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col z-50 overflow-hidden border border-white/50 dark:border-gray-700 animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right">
          
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center relative">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        AI
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <div>
                    <h3 className="font-bold text-xl font-heading text-text-primary leading-tight">{t('aiAssistant')}</h3>
                    <span className="text-xs text-text-secondary font-medium">Typically replies instantly</span>
                </div>
            </div>
            {apiKey && (
              <button 
                onClick={handleClearApiKey}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 border border-transparent hover:border-red-200 rounded-lg"
                title="Clear API Key"
              >
                Logout
              </button>
            )}
          </header>

          {!apiKey ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-50 dark:bg-gray-900">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Welcome to AI Assistant</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Please enter your Google Gemini API key to start chatting.
              </p>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Enter Gemini API Key..."
                className="w-full py-3 px-4 mb-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-blue bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleSaveApiKey()}
              />
              <button
                onClick={handleSaveApiKey}
                disabled={!tempApiKey.trim()}
                className="w-full py-3 bg-primary-blue text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Start Chatting
              </button>
            </div>
          ) : (
            <>
              {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black scroll-smooth">
            <div className="flex flex-col gap-4">
                {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                    {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-sm">AI</div>
                    )}
                    <div className={`px-5 py-3 text-sm shadow-sm relative ${
                        msg.role === 'user' 
                        ? 'bg-primary-blue text-white rounded-2xl rounded-br-sm' 
                        : 'bg-white dark:bg-gray-800 text-text-primary border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm'
                    }`}>
                    <p className="leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\n/g, '<br />') }} />
                    </div>
                </div>
                ))}

                {isLoading && (
                <div className="flex items-end gap-2 self-start animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div className="px-5 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm shadow-sm">
                        <div className="flex gap-1.5">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>
          </div>

          {messages.length <= 1 && <SuggestedPrompts />}

          {/* Input Area */}
          <footer className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-2 relative items-center">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder={t('askMeAnything')}
                className="flex-1 py-3.5 pl-5 pr-12 border-2 border-gray-100 dark:border-gray-700 rounded-full focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-gray-50 dark:bg-gray-800 text-text-primary shadow-inner transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !userInput.trim()}
                className="absolute right-2 p-2 bg-primary-blue text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-90"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-text-muted">AI can make mistakes. Verify important info.</p>
            </div>
          </footer>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
