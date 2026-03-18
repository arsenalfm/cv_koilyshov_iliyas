"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Layers, Brain, Trophy, GraduationCap, Camera } from "lucide-react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

// ─── Certificate data grouped by category ────────────────────────────────────
const groups = [
    {
        id: "professional",
        label: "Профессиональные",
        icon: Shield,
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        items: [
            { title: "Certified Islamic Specialist in Product Development", org: "CIBAFI (General Council for Islamic Banks)", year: "2024", image: "/certificates/cibafi.jpg" },
            { title: "IPMA Level D — Certified Project Management Associate", org: "IPMA", year: "2018", image: null },
        ],
    },
    {
        id: "agile",
        label: "Agile & Scrum",
        icon: Layers,
        color: "text-orange-500",
        bg: "bg-orange-50 dark:bg-orange-500/10",
        items: [
            { title: "Certified ScrumMaster® (CSM)", org: "Scrum Alliance®", year: "2019", image: "/certificates/scrumalliance-csm.jpg" },
            { title: "Certified Scrum Master", org: "ScrumTrek", year: "2019", image: "/certificates/scrumtrek-sm.jpg" },
            { title: "ICP-APM — ICAgile Certified Professional in Agile Project Management", org: "ICAgile / ScrumTrek", year: "2018", image: "/certificates/icagile-icp-apm.jpg" },
            { title: "Product Owner", org: "Scrumtrack", year: "2021", image: null },
            { title: "Agile Professional", org: "Scrumtrack", year: "2020", image: null },
        ],
    },
    {
        id: "leadership",
        label: "Лидерство & Soft Skills",
        icon: Brain,
        color: "text-violet-500",
        bg: "bg-violet-50 dark:bg-violet-500/10",
        items: [
            { title: "Развитие ресурсов руководителя", org: "High Performance Management", year: "2017", image: "/certificates/hpm-leader.jpg" },
            { title: "7 Habits of Highly Effective People 4.0", org: "FranklinCovey", year: "2017", image: "/certificates/franklincovey-7habits.jpg" },
            { title: "Техники эффективного мышления (14 ч.)", org: "JVTEAM", year: "2022", image: "/certificates/jvteam-thinking.jpg" },
            { title: "Эмоциональный интеллект и лидерство", org: "Skillbox", year: "2023", image: null },
            { title: "Коммуникации и тайм-менеджмент", org: "Skillbox", year: "2023", image: null },
        ],
    },
    {
        id: "product",
        label: "Продукт & Аналитика",
        icon: GraduationCap,
        color: "text-primary",
        bg: "bg-primary/8",
        items: [
            { title: "Продакт-аналитика и менеджмент", org: "Skillbox", year: "2023", image: null },
            { title: "Английский C1 Advanced", org: "Cambridge Assessment", year: "2023", image: null },
        ],
    },
    {
        id: "awards",
        label: "Награды & Благодарности",
        icon: Trophy,
        color: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        items: [
            { title: "Почётная грамота — Уполномоченный оператор пенсионных выплат граждан", org: "Отбасы Банк", year: "2021", image: "/certificates/otbasy-award-pension.jpg" },
            { title: "Почётная грамота — Баспана Маркет 2.0", org: "Отбасы Банк", year: "2021", image: "/certificates/otbasy-award-baspana.jpg" },
            { title: "Благодарственное письмо — «День сбережений»", org: "ЖССБ (Жилстройсбербанк Казахстана)", year: "2018", image: "/certificates/jssb-gratitude.jpg" },
        ],
    },
];

// ─── Main Export ──────────────────────────────────────────────────────────────
export function Certificates() {
    const [lightbox, setLightbox] = useState<{ src: string; title: string; org: string; year: string } | null>(null);

    const total = groups.reduce((acc, g) => acc + g.items.length, 0);

    return (
        <section className="pb-2">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Сертификаты & Награды
                <span className="ml-auto text-xs font-normal text-gray-400 font-mono">{total} документов</span>
            </h2>

            <div className="flex flex-col gap-5">
                {groups.map((group, gi) => {
                    const Icon = group.icon;
                    return (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: gi * 0.07 }}
                        >
                            {/* Group header */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-7 h-7 rounded-lg ${group.bg} flex items-center justify-center`}>
                                    <Icon className={`w-4 h-4 ${group.color}`} />
                                </div>
                                <span className={`text-sm font-bold ${group.color}`}>{group.label}</span>
                                <span className="text-xs text-gray-400 font-mono ml-1">({group.items.length})</span>
                                <div className="flex-1 h-px bg-gray-100 dark:bg-white/5 ml-1" />
                            </div>

                            {/* Items list */}
                            <div className="flex flex-col gap-1.5 pl-1">
                                {group.items.map((cert, ci) => (
                                    <motion.div
                                        key={ci}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: gi * 0.07 + ci * 0.04 }}
                                        onClick={() => cert.image && setLightbox({ src: cert.image, title: cert.title, org: cert.org, year: cert.year })}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-white/[0.02] transition-all ${cert.image
                                            ? "cursor-pointer hover:border-primary/30 hover:bg-primary/5 group"
                                            : ""
                                            }`}
                                    >
                                        {/* Dot indicator */}
                                        <span className={`w-2 h-2 rounded-full shrink-0 ${cert.image ? group.color.replace("text-", "bg-") : "bg-gray-300 dark:bg-gray-600"}`} />

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium leading-snug truncate text-foreground">
                                                {cert.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cert.org}</p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {cert.image && (
                                                <Camera className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary transition-colors" />
                                            )}
                                            <span className="text-xs font-mono text-gray-400">{cert.year}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox — shared component */}
            {lightbox && (
                <ImageLightbox
                    src={lightbox.src}
                    title={lightbox.title}
                    subtitle={lightbox.org}
                    badge={lightbox.year}
                    onClose={() => setLightbox(null)}
                />
            )}
        </section>
    );
}
