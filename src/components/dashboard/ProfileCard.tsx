"use client";

import { motion } from "framer-motion";
import { FileText, Linkedin, Mail, Send, Phone, Sparkles } from "lucide-react";

export function ProfileCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full w-full glass rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group"
        >
            {/* Background ambient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-[80px] -z-10 group-hover:bg-primary/15 transition-colors duration-700" />

            <div className="flex flex-col gap-5">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 w-fit text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    Открыт к предложениям
                </div>

                {/* Name */}
                <div>
                    <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-2">
                        Илияс<br />
                        <span className="text-gradient">Койлышов</span>
                    </h1>
                    <p className="text-sm font-mono shimmer-text">CIO / CTO / CPO  •  AI & FinTech Leader</p>
                </div>

                {/* Bio from resume */}
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    Руководитель с <strong className="text-foreground">15+ годами опыта</strong> в финансовом секторе Казахстана на стыке технологий, продуктового менеджмента и бизнес-стратегии. Построил on-premise AI-экосистему (LLM, RAG, GPU-кластер) для государственного регулятора. Запустил цифровую ипотечную платформу Baspana для банка с <strong className="text-foreground">2,5 млн вкладчиков</strong> — NPS&nbsp;+30%, time-to-market&nbsp;−40%.
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { val: "15+", lbl: "лет опыта" },
                        { val: "2.5M", lbl: "клиентов" },
                        { val: "30+", lbl: "в команде" },
                    ].map((m) => (
                        <motion.div key={m.lbl} whileHover={{ scale: 1.05, y: -2 }} className="text-center p-2.5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors cursor-default">
                            <div className="text-xl font-extrabold text-primary">{m.val}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{m.lbl}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-5">
                <a
                    href="#"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 text-sm relative overflow-hidden group"
                >
                    {/* Shine sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <FileText className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Скачать CV (PDF)</span>
                </a>

                <div className="flex flex-col gap-2.5">
                    <a href="mailto:iliyas.org@gmail.com" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors text-sm">
                        <div className="p-2 rounded-lg bg-white/5 dark:bg-black/20 border border-gray-200 dark:border-white/5">
                            <Mail className="w-4 h-4" />
                        </div>
                        <span>iliyas.org@gmail.com</span>
                    </a>
                    <a href="tel:+77012544415" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors text-sm">
                        <div className="p-2 rounded-lg bg-white/5 dark:bg-black/20 border border-gray-200 dark:border-white/5">
                            <Phone className="w-4 h-4" />
                        </div>
                        <span>+7 701 254 44 15</span>
                    </a>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-white/10">
                    <a href="#" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-primary/10 hover:text-primary border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 transition-all text-xs font-medium">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                    </a>
                    <a href="#" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-primary/10 hover:text-primary border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 transition-all text-xs font-medium">
                        <Send className="w-4 h-4" />
                        Telegram
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
