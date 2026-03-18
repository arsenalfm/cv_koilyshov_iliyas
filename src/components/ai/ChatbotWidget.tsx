"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, Sparkles } from "lucide-react";

const quickQuestions = [
    "Опыт внедрения AI & LLM?",
    "Главные достижения в финтехе?",
    "Подход к управлению?",
    "Формат работы и локация?",
];

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const userInteracted = useRef(false);

    const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat({
        api: "/api/chat",
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-pop the center modal after 3.5s to WOW the user
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userInteracted.current) {
                setIsOpen(true);
                setHasBeenOpened(true);
            }
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const open = () => {
        userInteracted.current = true;
        setIsOpen(true);
        setHasBeenOpened(true);
    };

    const closePanel = () => {
        userInteracted.current = true;
        setIsOpen(false);
    }

    const handleQuickQuestion = (q: string) => {
        append({ role: "user", content: q });
    };

    return (
        <>
            {/* Floating trigger button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.5 }}
                        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
                    >
                        {/* Tooltip bubble */}
                        {!hasBeenOpened && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.5 }}
                                className="bg-background/95 backdrop-blur border border-primary/30 rounded-2xl px-4 py-3 shadow-xl max-w-[200px] text-right"
                            >
                                <p className="text-xs font-medium text-foreground">Привет! 👋</p>
                                <p className="text-xs text-gray-500 dark:text-gray-200 mt-0.5">Спросите меня что угодно об Илиясе</p>
                                {/* Arrow */}
                                <div className="absolute right-4 -bottom-1.5 w-3 h-3 bg-background/95 border-r border-b border-primary/30 rotate-45" />
                            </motion.div>
                        )}

                        <motion.button
                            onClick={open}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center glow-pulse hover:shadow-[0_0_50px_rgba(59,130,246,0.9)] transition-shadow group"
                        >
                            {/* Ping rings */}
                            <span className="absolute inset-0 rounded-2xl bg-primary/40 animate-ping opacity-50" />
                            <span className="absolute inset-[-4px] rounded-[18px] border-2 border-primary/30 animate-pulse" />

                            <Bot className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform" />

                            {/* Badge */}
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                                <span className="text-[9px] font-bold text-white">AI</span>
                            </span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 dark:bg-black/60"
                        onClick={closePanel}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                            className="relative w-full max-w-2xl h-[85vh] max-h-[800px] min-h-[500px] flex flex-col rounded-3xl shadow-2xl overflow-hidden text-sm border border-primary/20"
                            style={{
                                background: "var(--chat-bg, rgba(15,23,42,0.95))",
                                backdropFilter: "blur(24px)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-primary/20 bg-gradient-to-r from-primary/15 to-blue-600/5">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">AI Ассистент Илияса</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            <p className="text-xs text-green-400">Онлайн</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={closePanel}
                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
                                {messages.length === 0 && (
                                    <div className="my-auto flex flex-col items-center gap-3 text-center">
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="w-14 h-14 bg-primary/15 rounded-2xl border border-primary/20 flex items-center justify-center"
                                        >
                                            <Sparkles className="w-7 h-7 text-primary" />
                                        </motion.div>
                                        <div>
                                            <h4 className="text-white font-semibold">Здравствуйте! 👋</h4>
                                            <p className="text-gray-400 text-xs mt-1 max-w-[220px]">
                                                Я AI-ассистент Илияса. Задайте любой вопрос о его карьере, навыках или проектах.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                                            {quickQuestions.map((q) => (
                                                <button
                                                    key={q}
                                                    onClick={() => handleQuickQuestion(q)}
                                                    className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 text-primary rounded-full transition-all hover:scale-105 active:scale-95"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((m, i) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`flex gap-2.5 max-w-[88%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                                    >
                                        <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-white/10" : "bg-primary/20 border border-primary/20"}`}>
                                            {m.role === "user"
                                                ? <User className="w-3.5 h-3.5 text-gray-300" />
                                                : <Bot className="w-3.5 h-3.5 text-primary" />}
                                        </div>
                                        <div className={`px-3.5 py-2.5 rounded-2xl leading-relaxed ${m.role === "user"
                                            ? "bg-primary text-white rounded-tr-sm"
                                            : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm"
                                            }`}>
                                            {m.content}
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <div className="mr-auto flex gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/20 flex-shrink-0 flex items-center justify-center">
                                            <Bot className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-1.5">
                                            {[0, 150, 300].map((d) => (
                                                <span key={d} className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-white/[0.02]">
                                <div className="relative flex items-center">
                                    <input
                                        value={input || ""}
                                        onChange={handleInputChange}
                                        placeholder="Спросите об опыте, навыках, проектах..."
                                        className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !(input || "").trim()}
                                        className="absolute right-1.5 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
