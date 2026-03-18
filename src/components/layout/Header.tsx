"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

// Nav items now control the tabs in the dashboard — pass through callback
export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-white/5 py-3">
            <div className="container mx-auto px-5 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="/"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    И.&nbsp;<span className="text-primary">Койлышов</span>
                </motion.a>

                {/* Right side: location + theme toggle */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 font-mono">
                        Алматы, Казахстан
                    </span>
                    <div className="w-px h-4 bg-gray-200 dark:bg-white/10 hidden sm:block" />
                    <ThemeToggle />
                </motion.div>
            </div>
        </header>
    );
}
