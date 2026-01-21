"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoleType, roleLabels, roleDescriptions } from "@/lib/projects";

interface RoleNavProps {
    activeRole: RoleType;
    onRoleChange: (role: RoleType) => void;
}

const roles: RoleType[] = ["engineer", "specialist", "analyst"];

const roleIcons: Record<RoleType, React.ReactNode> = {
    engineer: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    specialist: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    analyst: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
};

export default function RoleNav({ activeRole, onRoleChange }: RoleNavProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Desktop Side Navigation */}
            <nav className="role-nav hidden md:flex">
                {roles.map((role, index) => (
                    <motion.button
                        key={role}
                        onClick={() => onRoleChange(role)}
                        className={`role-nav-item ${activeRole === role ? "active" : ""}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        title={roleLabels[role]}
                    />
                ))}
            </nav>

            {/* Mobile Toggle Button */}
            <button
                className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full bg-[#D4AF37] text-[#0F0F0F] shadow-lg flex items-center justify-center"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {roleIcons[activeRole]}
            </button>

            {/* Mobile Role Selector */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-24 right-6 z-50 md:hidden glass rounded-xl p-4 w-64"
                    >
                        <h3 className="text-sm font-semibold text-[#D4AF37] mb-3">Switch View Mode</h3>
                        <div className="flex flex-col gap-2">
                            {roles.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => {
                                        onRoleChange(role);
                                        setIsExpanded(false);
                                    }}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeRole === role
                                            ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50"
                                            : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
                                        }`}
                                >
                                    {roleIcons[role]}
                                    <div className="text-left">
                                        <div className="text-sm font-medium">{roleLabels[role]}</div>
                                        <div className="text-xs opacity-60">{roleDescriptions[role]}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Role Info Bar */}
            <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="glass rounded-full px-6 py-3 flex items-center gap-4">
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => onRoleChange(role)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${activeRole === role
                                    ? "bg-[#D4AF37] text-[#0F0F0F]"
                                    : "text-zinc-400 hover:text-[#D4AF37]"
                                }`}
                        >
                            {roleIcons[role]}
                            <span className="hidden lg:inline">{roleLabels[role]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
