"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Award } from "lucide-react";

import { Timeline } from "@/components/sections/Timeline";
import { Skills, Education } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";

const TABS = [
    { id: "experience", label: "Опыт", icon: Briefcase },
    { id: "skills", label: "Навыки", icon: Code2 },
    { id: "education", label: "Образование", icon: GraduationCap },
    { id: "certificates", label: "Сертификаты", icon: Award },
];

export function TabsView() {
    const [activeTab, setActiveTab] = useState("experience");

    const renderContent = () => {
        switch (activeTab) {
            case "experience": return <Timeline />;
            case "skills": return <Skills />;
            case "education": return <Education />;
            case "certificates": return <Certificates />;
            default: return null;
        }
    };

    return (
        <div className="h-full w-full flex flex-col glass rounded-3xl overflow-hidden shadow-xl">
            {/* Tab Nav */}
            <div className="flex items-center gap-1 px-3 py-2.5 bg-white/60 dark:bg-black/20 border-b border-gray-200 dark:border-white/5 shrink-0">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabBadge"
                                    className="absolute inset-0 rounded-xl border-2 border-primary/30 pointer-events-none"
                                    initial={false}
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-hidden bg-white/20 dark:bg-transparent">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 16, scale: 0.99 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -16, scale: 0.99 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
