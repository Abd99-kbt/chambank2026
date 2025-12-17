'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'عذراً، حدث خطأ في النظام. يرجى المحاولة مرة أخرى لاحقاً.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-20 right-4 w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cham-red to-cham-red-dark p-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">مساعد بنك الشام</h3>
                                    <p className="text-xs text-white/80">مساعدك الذكي دائم التواجد</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-400 mt-10">
                                    <p>مرحباً بك! 👋</p>
                                    <p className="text-sm mt-2">كيف يمكنني مساعدتك اليوم؟</p>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                            ? 'bg-cham-navy text-white rounded-br-none'
                                            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 rounded-2xl p-3 rounded-bl-none shadow-sm flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-cham-red" />
                                        <span className="text-xs text-gray-500">جاري الكتابة...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="اكتب استفسارك هنا..."
                                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-cham-red focus:ring-1 focus:ring-cham-red text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-cham-navy text-white p-2 rounded-xl hover:bg-cham-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 ${isOpen ? 'bg-gray-800 rotate-90 text-white' : 'bg-cham-navy text-white animate-bounce-subtle'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </>
    );
}
