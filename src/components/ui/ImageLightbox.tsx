"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageLightboxProps {
    src: string;
    title: string;
    subtitle?: string;
    badge?: string;
    onClose: () => void;
}

export function ImageLightbox({ src, title, subtitle, badge, onClose }: ImageLightboxProps) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.88, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-[#161B22] rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full"
                >
                    {/* Image area */}
                    <div className="relative w-full bg-gray-50 dark:bg-black/20" style={{ height: "480px" }}>
                        <Image
                            src={src}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-contain p-6"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    {/* Footer */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-white/10">
                        <div>
                            <h3 className="font-bold text-foreground text-sm">{title}</h3>
                            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-200 mt-0.5">{subtitle}</p>}
                        </div>
                        {badge && <span className="text-sm font-mono font-bold text-primary">{badge}</span>}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
