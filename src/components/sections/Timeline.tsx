"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, Building2, ExternalLink, TrendingUp, Clock, Zap, Users } from "lucide-react";
import { useRef } from "react";

// ─── Key Stats (merged from Impact Dashboard) ───────────────────────────────
const stats = [
    { icon: Clock, val: "15+", unit: "лет", label: "опыт", color: "text-primary" },
    { icon: Users, val: "2.5M", unit: "", label: "клиентов", color: "text-blue-500" },
    { icon: TrendingUp, val: "+30%", unit: "", label: "NPS Baspana", color: "text-green-500" },
    { icon: Zap, val: "−40%", unit: "", label: "Time-to-Market", color: "text-yellow-500" },
];

// ─── Full resume experience data ─────────────────────────────────────────────
const timelineData = [
    {
        company: "АРРФР",
        url: "finreg.kz",
        role: "Заместитель директора Департамента информационных технологий",
        period: "июнь 2025 — н.в.",
        duration: "10 месяцев",
        tag: "Госрегулятор финрынка РК",
        tagColor: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        summary: "Стратегическое управление внедрением AI/LLM и развитием инфраструктуры данных. Построение on-premise экосистемы для автоматизации бизнес-процессов.",
        bullets: [
            "Спроектировал и развернул on-premise GPU-кластер для инференса LLM (Open Source) с балансировкой нагрузки — без утечки данных вовне",
            "Создал «Фабрику AI-агентов» — платформу масштабируемой автоматизации задач для различных департаментов",
            "Внедрил корпоративного ИИ-ассистента (Help Desk) и внешних чат-ботов на архитектуре API + RAG",
            "Автоматизировал генерацию юридических документов и риск-анализ через AI-пайплайны",
            "Организовал обучение 100+ сотрудников Prompt Engineering и работе с AI-инструментами",
            "Обеспечил бесперебойную работу критически важных порталов в закрытой инфраструктуре",
        ],
    },
    {
        company: "Al Safi Bank (МФЦА)",
        url: "alsafibank.com",
        role: "Директор Департамента развития продуктов",
        period: "октябрь 2024 — июнь 2025",
        duration: "9 месяцев",
        tag: "Единственный банк в юрисдикции МФЦА",
        tagColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        summary: "Разработка продуктовой стратегии и запуск цифровой платформы для первого исламского банка в Казахстане.",
        bullets: [
            "Разработал и запустил линейку розничных, инвестиционных и сберегательных продуктов на принципах исламского финансирования",
            "Сформировал продуктовую стратегию банка: бизнес-модели, CJM, финансовые модели, шариатское согласование",
            "Спроектировал и запустил цифровую платформу: интернет-банкинг, онбординг, открытие счетов, KYC-проверка",
            "Разработал архитектуру международного исламского цифрового банка с крипто-инфраструктурой для рынка ЕС",
            "Координировал работу с IT, юристами, шариатским советом, маркетингом, девелоперами и международными контрагентами",
        ],
    },
    {
        company: "Отбасы Банк",
        url: "hcsbk.kz",
        role: "Начальник управления развития и поддержки Marketplace Baspana",
        period: "январь 2021 — октябрь 2024",
        duration: "3 года 10 месяцев",
        tag: "2.5 млн вкладчиков · 83% операций дистанционно",
        tagColor: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
        summary: "Развитие маркетплейса недвижимости Baspana для крупнейшего жилищного банка РК.",
        bullets: [
            "Сквозной процесс от заявки до выбора недвижимости: time-to-market −40%, NPS +30%",
            "Запуск программы «Qamqor» с интеграцией RPA и госсервисов (B2C, B2B, B2G) → эффективность +50%, ошибки −20%",
            "Open API для застройщиков → подключение партнёров +35%, время размещения −25%",
            "REST API для B2G-партнёров → синхронизация данных +45%, ручные операции −30%",
            "Модуль «Вторичное жильё» → вовлечённость +20%, транзакции +15%",
            "Раннее бронирование B2B → предпродажи +50%, удовлетворённость застройщиков +30%",
            "CI/CD (Git, Jenkins) → цикл релиза −25%, ошибки +30% выявляемость. Uptime 99.9%",
        ],
    },
    {
        company: "Отбасы Банк (ранее ЖССБ)",
        url: "hcsbk.kz",
        role: "Бизнес-аналитик → Системный аналитик",
        period: "апрель 2015 — январь 2021",
        duration: "5 лет 10 месяцев",
        tag: "Рост внутри банка",
        tagColor: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
        summary: "Запуск ключевых цифровых продуктов банка. Рост от бизнес-аналитика до системного аналитика.",
        bullets: [
            "Мобильное приложение ЖССБ24 → мобильные пользователи +45%, MAU +30%",
            "Интеграция с госбазами (ПШЭП) → время обработки заявок −50%",
            "Новая терминальная сеть → объём транзакций +35%",
            "Оптимизация hcsbk.kz → органический трафик +25%, отказы −15%",
            "Корпоративный портал Битрикс24 → внутреннее взаимодействие +50%",
            "Интернет-банкинг для юридических лиц → бизнес-клиенты +20%",
            "Внедрение АБИС Colvir → операционные затраты −25%",
        ],
    },
    {
        company: "KazInvestBank",
        url: "",
        role: "Менеджер по разработке розничных продуктов",
        period: "2014 — 2015",
        duration: "1 год",
        tag: "Продуктовый менеджмент",
        tagColor: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
        summary: "Разработка и сопровождение полного спектра розничных банковских продуктов.",
        bullets: [
            "Разработка и внедрение розничных продуктов: потребительские займы, автокредитование, ипотека",
            "Депозитные продукты: срочные вклады, сберегательные счета, текущие счета",
            "Карточные продукты: дебетовые и кредитные карты, зарплатные проекты",
            "РКО для физических и юридических лиц, оптимизация тарифных планов",
            "Анализ конкурентного рынка и ценообразование финансовых продуктов",
        ],
    },
    {
        company: "ЖССБ (Жилстройсбербанк)",
        url: "hcsbk.kz",
        role: "Специалист по разработке продуктов",
        period: "2013 — 2014",
        duration: "1 год",
        tag: "Первый опыт в ЖССБ",
        tagColor: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400",
        summary: "Разработка и внедрение продуктов жилищного сбережения.",
        bullets: [
            "Разработка и внедрение продуктов жилищного сбережения для населения",
            "Аналитика потребительских предпочтений и сегментация клиентской базы",
            "Подготовка документации и бизнес-требований для новых продуктов",
            "Взаимодействие с IT-подразделением для реализации продуктовых решений",
        ],
    },
    {
        company: "Olzha Insurance",
        url: "",
        role: "Начальник управления продаж (4 отдела)",
        period: "2011 — 2013",
        duration: "2 года",
        tag: "Руководство продажами",
        tagColor: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        summary: "Управление розничными и корпоративными продажами страховых продуктов.",
        bullets: [
            "Координация 4 отделов: розничные продажи, корпоративные продажи, агентская сеть, банкострахование",
            "Развитие партнёрской сети с банками и автодилерами для кросс-продаж",
            "Запуск новых страховых продуктов и оптимизация существующей продуктовой линейки",
            "Построение системы KPI и мотивации для отделов продаж",
        ],
    },
    {
        company: "БТА Банк",
        url: "",
        role: "Финансовый аналитик",
        period: "2010 — 2011",
        duration: "1 год",
        tag: "Старт карьеры",
        tagColor: "bg-gray-100 text-gray-500 dark:text-gray-200 dark:bg-white/5 dark:text-gray-200",
        summary: "Финансовая аналитика и стратегическое планирование на старте карьеры.",
        bullets: [
            "Финансовая аналитика и бюджетирование продаж по каналам и регионам",
            "Подготовка управленческой отчётности для топ-менеджмента и совета директоров",
            "Стратегическое планирование и прогнозирование доходности продуктов",
            "Поддержка процессов бюджетного контроля и план-факт анализа",
        ],
    },
];

// ─── Expandable Card ─────────────────────────────────────────────────────────
function TimelineCard({ item, index }: { item: typeof timelineData[0]; index: number }) {
    const [expanded, setExpanded] = useState(index === 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
        >
            {/* Header — clickable */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left p-4 bg-white/70 dark:bg-white/[0.03] hover:bg-primary/5 flex items-start gap-3 transition-colors cursor-pointer"
            >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                <span className="font-bold text-foreground text-base">{item.company}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.tagColor}`}>
                                    {item.tag}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-200">{item.role}</p>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                            <div className="text-right">
                                <div className="text-xs text-gray-500 dark:text-gray-200 font-mono">{item.period}</div>
                                <div className="text-xs text-primary/80 font-mono">{item.duration}</div>
                            </div>
                            <motion.div
                                animate={{ rotate: expanded ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0"
                            >
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </motion.div>
                        </div>
                    </div>
                    {!expanded && (
                        <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{item.summary}</p>
                    )}
                </div>
            </button>

            {/* Expanded body */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-1 bg-white/40 dark:bg-white/[0.015] border-t border-gray-100 dark:border-white/5">
                            <p className="text-sm text-gray-500 dark:text-gray-200 mt-3 mb-3 italic leading-relaxed">{item.summary}</p>
                            <div className="flex flex-col gap-2.5">
                                {item.bullets.map((bullet, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <span className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{bullet}</span>
                                    </motion.div>
                                ))}
                            </div>
                            {item.url && (
                                <a
                                    href={`https://${item.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 mt-4 text-xs text-primary hover:underline"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    {item.url}
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Animated counter hook ───────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.startsWith("+") ? "+" : target.startsWith("−") ? "−" : "";
    const hasDecimal = target.includes(".");

    useEffect(() => {
        if (!inView) return;
        const duration = 1200;
        const steps = 40;
        const step = numericTarget / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += step;
            if (current >= numericTarget) {
                setCount(numericTarget);
                clearInterval(interval);
            } else {
                setCount(current);
            }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [inView, numericTarget]);

    return (
        <div ref={ref} className="text-xl font-extrabold">
            {prefix}{hasDecimal ? count.toFixed(1) : Math.round(count)}{suffix}
        </div>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function Timeline() {
    return (
        <section className="pb-2">
            {/* Key Stats banner — animated counters */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                {stats.map(({ icon: Icon, val, unit, label, color }) => (
                    <div key={label} className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-colors">
                        <Icon className={`w-4 h-4 ${color} mb-1`} />
                        <div className={color}>
                            <AnimatedCounter target={val} suffix={unit ? ` ${unit}` : ""} />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-200 mt-0.5">{label}</div>
                    </div>
                ))}
            </div>

            {/* Section heading */}
            <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-primary">#</span> Опыт работы
                <span className="ml-auto text-xs font-normal text-gray-400 font-mono">↓ нажмите для деталей</span>
            </h2>

            <div className="flex flex-col gap-2.5">
                {timelineData.map((item, index) => (
                    <TimelineCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}
