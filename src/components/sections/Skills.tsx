"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BrainCircuit, Database, LineChart, Code2, Users, Globe2, MessageSquare } from "lucide-react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

const skillCategories = [
    {
        title: "AI & ML",
        icon: <BrainCircuit className="w-4 h-4 text-primary" />,
        skills: ["LLM", "RAG", "Prompt Engineering", "GPU Infrastructure", "AI Agents", "n8n оркестрация"],
    },
    {
        title: "Product & Management",
        icon: <Users className="w-4 h-4 text-blue-400" />,
        skills: ["Agile", "Scrum", "Kanban", "JIRA", "Roadmap", "CustDev", "CJM", "MVP", "USM"],
    },
    {
        title: "Data & Analytics",
        icon: <LineChart className="w-4 h-4 text-indigo-400" />,
        skills: ["SQL", "Oracle PL/SQL", "Power BI", "Google Analytics", "SEO"],
    },
    {
        title: "FinTech",
        icon: <Database className="w-4 h-4 text-teal-400" />,
        skills: ["ABIS Colvir", "Open Way", "Процессинг", "KYC/AML", "Open API", "REST", "Исламские финансы"],
    },
    {
        title: "Soft Skills",
        icon: <MessageSquare className="w-4 h-4 text-rose-400" />,
        skills: ["Лидерство", "Кросс-функциональное управление", "Презентации", "Наставничество"],
    },
];

const educationData = [
    {
        university: "Университет международного бизнеса (UIB)",
        degree: "Магистр, Международные финансы",
        year: "2013",
        image: "/certificates/diploma-master.jpg",
    },
    {
        university: "КазНУ им. аль-Фараби",
        degree: "Бакалавр, Механика (Механико-математический факультет)",
        year: "2010",
        image: "/certificates/diploma-bachelor.jpg",
    },
    {
        university: "РФМШ им. О.А. Жаутыкова",
        degree: "Физико-математическое направление",
        year: "2006",
        image: null,
    },
];

const languages = [
    { lang: "Казахский", level: "Родной", pct: 100 },
    { lang: "Русский", level: "C2", pct: 98 },
    { lang: "Английский", level: "C1 Advanced", pct: 82 },
];

export function Skills() {
    return (
        <section className="pb-2">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Навыки & Стек
            </h2>
            <div className="flex flex-col gap-4">
                {skillCategories.map((cat, i) => (
                    <motion.div
                        key={cat.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {cat.icon}
                            <span className="text-sm font-semibold text-foreground">{cat.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {cat.skills.map((s) => (
                                <span
                                    key={s}
                                    className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Languages mini section */}
                <div className="mt-2 pt-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <Globe2 className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">Языки</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        {languages.map((l) => (
                            <div key={l.lang} className="flex items-center gap-3">
                                <span className="text-xs text-gray-600 dark:text-gray-200 w-28 shrink-0">{l.lang} <span className="text-primary text-xs">({l.level})</span></span>
                                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${l.pct}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        className="h-full bg-primary rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Education() {
    const [lightbox, setLightbox] = useState<string | null>(null);

    const selectedItem = lightbox ? educationData.find(e => e.image === lightbox) : null;

    return (
        <section className="pb-2">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Образование
            </h2>
            <div className="flex flex-col gap-3">
                {educationData.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => item.image && setLightbox(item.image)}
                        className={`p-4 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-colors ${item.image ? "cursor-pointer hover:shadow-md" : ""}`}
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div>
                                <h3 className="font-semibold text-foreground text-sm">{item.university}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-200 mt-0.5">{item.degree}</p>
                                {item.image && (
                                    <p className="text-xs text-primary/60 mt-1.5 flex items-center gap-1">
                                        📄 нажмите для просмотра диплома
                                    </p>
                                )}
                            </div>
                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">{item.year}</span>
                        </div>
                    </motion.div>
                ))}
                <div className="mt-2 p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-gray-500 dark:text-gray-200">
                    🎓 Выпускник РФМШ им. О.А. Жаутыкова — физмат-школа. Участник олимпиад по математике.
                </div>
            </div>

            {/* Diploma lightbox — shared component */}
            {lightbox && selectedItem && (
                <ImageLightbox
                    src={lightbox}
                    title={selectedItem.university}
                    subtitle={selectedItem.degree}
                    badge={selectedItem.year}
                    onClose={() => setLightbox(null)}
                />
            )}
        </section>
    );
}
