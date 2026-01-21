"use client";

import { useTheme } from "@/lib/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // Hide toggle until mounted to prevent hydration issues
    if (!mounted) return null;

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg"
            style={{
                background: theme === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.08)",
                border: theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <AnimatePresence mode="wait">
                {theme === "dark" ? (
                    // Sun icon for switching to light
                    <motion.svg
                        key="sun"
                        className="w-5 h-5 text-[#D4AF37]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </motion.svg>
                ) : (
                    // Moon icon for switching to dark
                    <motion.svg
                        key="moon"
                        className="w-5 h-5 text-zinc-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </motion.svg>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
