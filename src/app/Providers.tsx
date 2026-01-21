"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/lib/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ChatBot from "@/components/ui/ChatBot";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            {children}
            <ThemeToggle />
            <ChatBot />
        </ThemeProvider>
    );
}
