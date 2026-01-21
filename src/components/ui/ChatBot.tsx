"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

interface Message {
    id: string;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

// Knowledge base about Sathish
const knowledgeBase = {
    greeting: [
        "Hey there! I'm Aria, Sathish's AI assistant. So happy you stopped by! How can I help you today?",
        "Hi lovely! Welcome to Sathish's portfolio. I'm Aria - ask me anything about his work!",
        "Hello! I'm Aria, here to tell you all about Sathish. What would you like to know?",
    ],
    skills: [
        "Sathish is absolutely amazing with AI and ML! He specializes in Arabic NLP where he fine-tunes LLMs like Jais and GPT-4, Healthcare AI with predictive systems achieving 60% recovery rates, Data Engineering with Python, SQL, Azure, and AWS, plus MLOps for production ML pipelines. Want to know more about any of these?",
    ],
    experience: [
        "Oh, Sathish has such an impressive journey! Currently he's a Managing Partner at Velden Health in Chicago, leading Healthcare AI development. Previously he was an AI Solutions Engineer doing freelance work with LangChain, RAG systems, and Arabic NLP. He also did research as a Graduate Research Assistant at Lewis University where he published work on predictive maintenance!",
    ],
    projects: [
        "Let me tell you about Sathish's coolest projects! He built a Healthcare RCM Platform with 60% A/R recovery rate, an Arabic Sentiment Analyzer for social media NLP, a Smart City Dashboard for real-time Dubai traffic analytics, and Predictive Maintenance systems using ML for manufacturing. Which one interests you most?",
    ],
    contact: [
        "Want to connect with Sathish? He'd love to hear from you! Email him at sathishlellaa@gmail.com, call at +91 9666612820, or find him on LinkedIn at linkedin.com/in/sathishlella. He's actively looking for AI roles in Dubai!",
    ],
    education: [
        "Sathish is super well-educated! He has a Master's in Computer Science from Lewis University, Illinois completed in 2024, and a Bachelor's in Computer Science from JNTU Hyderabad, India in 2022. Plus 14 certifications including Azure AI, AWS ML, and Stanford ML! He never stops learning!",
    ],
    dubai: [
        "Yes! Sathish is totally ready for Dubai! He's aligned with the Dubai 2031 AI Vision and has UAE PDPL compliance knowledge, Arabic NLP expertise perfect for the region, smart city analytics experience, and he's open to immediate relocation. He'd be such an asset to any Dubai-based company!",
    ],
    publications: [
        "Sathish is a published researcher! He wrote Real-Time Monitoring in Smart Manufacturing published by CRC Press with 3 citations, and Signal Strength Analysis published by Springer with 583 accesses! You can find his work on Google Scholar.",
    ],
    certifications: [
        "Sathish has 14 certifications! He's such a go-getter! Azure Data Scientist Associate, Azure AI Engineer Associate, Power BI Data Analyst, Google Data Analytics, Stanford ML Specialization, AWS Machine Learning, and many more! He really invests in continuous learning!",
    ],
    resume: [
        "Want Sathish's resume? Just click the Resume button in the hero section, or visit the resume page directly! You can also download it as a PDF there.",
    ],
    default: [
        "Hmm, that's a great question! I'm not 100% sure about that, but I can tell you about Sathish's skills, projects, experience, or how to contact him. What interests you?",
        "Ooh, interesting! Let me suggest some topics I know well: Skills and Technologies, Work Experience, Projects, Education, and Contact Info. What would you like to explore?",
    ],
};

function getResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    if (/(^hi|^hello|^hey|^hii|^hola|good morning|good evening|good afternoon)/i.test(lowerInput)) {
        return knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
    }
    if (/(skill|technolog|what (can|does)|expertise|speciali|know|language|framework|tool)/i.test(lowerInput)) {
        return knowledgeBase.skills[0];
    }
    if (/(experience|work|job|career|employm|position|role|company|where.*work)/i.test(lowerInput)) {
        return knowledgeBase.experience[0];
    }
    if (/(project|portfolio|built|created|develop|made|showcase|demo)/i.test(lowerInput)) {
        return knowledgeBase.projects[0];
    }
    if (/(contact|email|phone|reach|connect|hire|linkedin|social|message)/i.test(lowerInput)) {
        return knowledgeBase.contact[0];
    }
    if (/(education|degree|university|college|study|school|academic|qualification)/i.test(lowerInput)) {
        return knowledgeBase.education[0];
    }
    if (/(dubai|uae|emirates|middle east|relocat|visa|move)/i.test(lowerInput)) {
        return knowledgeBase.dubai[0];
    }
    if (/(publication|research|paper|journal|publish|article|scholar)/i.test(lowerInput)) {
        return knowledgeBase.publications[0];
    }
    if (/(certif|badge|credential|course|training)/i.test(lowerInput)) {
        return knowledgeBase.certifications[0];
    }
    if (/(resume|cv|download|pdf)/i.test(lowerInput)) {
        return knowledgeBase.resume[0];
    }
    if (/(thank|thanks|thx|appreciate)/i.test(lowerInput)) {
        return "You're so welcome! It was lovely chatting with you. Feel free to reach out to Sathish - he'd love to connect!";
    }
    if (/(bye|goodbye|see you|later|gtg)/i.test(lowerInput)) {
        return "Bye bye! It was wonderful chatting with you. Best of luck, and don't be a stranger! Sathish would love to hear from you!";
    }
    if (/(who is|tell me about|about sathish|introduce)/i.test(lowerInput)) {
        return "Let me introduce you to Sathish! He's an AI Solutions Engineer passionate about Arabic NLP, Healthcare AI, and Smart City Analytics. Currently a Managing Partner at Velden Health, he's built systems with 60% A/R recovery rates and published research in smart manufacturing. He's looking for exciting AI opportunities in Dubai!";
    }

    return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
}

const quickQuestions = [
    "What are his skills?",
    "Tell me about projects",
    "How to contact?",
    "Dubai ready?",
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = "en-US";

                recognitionRef.current.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setInputValue(transcript);
                    setIsListening(false);
                };

                recognitionRef.current.onerror = () => {
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            }
        }
    }, []);

    // Text-to-speech function
    const speak = useCallback((text: string) => {
        if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        // Try to get a female voice
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v =>
            v.name.includes("Female") ||
            v.name.includes("Samantha") ||
            v.name.includes("Victoria") ||
            v.name.includes("Google UK English Female") ||
            v.name.includes("Microsoft Zira")
        ) || voices.find(v => v.lang.startsWith("en"));

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [voiceEnabled]);

    // Stop speaking
    const stopSpeaking = () => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // Start listening
    const startListening = () => {
        if (recognitionRef.current) {
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    // Stop listening
    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                const greeting = knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
                setMessages([{
                    id: Date.now().toString(),
                    text: greeting,
                    isBot: true,
                    timestamp: new Date(),
                }]);
                speak(greeting);
            }, 500);
        }
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen, messages.length, speak]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: text.trim(),
            isBot: false,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        setIsTyping(true);

        setTimeout(() => {
            const response = getResponse(text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                isBot: true,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
            speak(response);
        }, 800 + Math.random() * 700);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    return (
        <>
            {/* Stylish Chat Button with Pulse Animation */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
            >
                {/* Pulse rings */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#00C4B4] opacity-30 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#00C4B4] opacity-20 animate-pulse" />

                {/* Button */}
                <div className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-zinc-800"
                        : "bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#00C4B4]"
                    }`}>
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.svg
                                key="close"
                                className="w-7 h-7 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </motion.svg>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="relative"
                            >
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {/* Notification dot */}
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>

            {/* Enhanced Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`fixed bottom-28 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] rounded-3xl shadow-2xl overflow-hidden ${isDark
                                ? "bg-gradient-to-b from-[#1f1f1f] to-[#0f0f0f]"
                                : "bg-gradient-to-b from-white to-gray-50"
                            }`}
                        style={{
                            boxShadow: isDark
                                ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.1)"
                                : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                        }}
                    >
                        {/* Glassmorphism Header */}
                        <div className={`relative p-5 ${isDark
                                ? "bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#00C4B4]/10"
                                : "bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#00C4B4]/5"
                            }`}>
                            <div className="absolute inset-0 backdrop-blur-xl" />
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Avatar with status ring */}
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00C4B4] p-[2px]">
                                            <div className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? "bg-[#1f1f1f]" : "bg-white"
                                                }`}>
                                                <span className="text-lg">✨</span>
                                            </div>
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-lg" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                                            Aria
                                        </h3>
                                        <p className={`text-xs ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                                            {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "AI Assistant • Online"}
                                        </p>
                                    </div>
                                </div>

                                {/* Voice Toggle */}
                                <button
                                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                                    className={`p-2 rounded-full transition-all ${voiceEnabled
                                            ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                            : isDark ? "bg-zinc-800 text-zinc-500" : "bg-gray-200 text-gray-400"
                                        }`}
                                    title={voiceEnabled ? "Mute voice" : "Enable voice"}
                                >
                                    {voiceEnabled ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className={`h-[320px] overflow-y-auto p-4 space-y-4 ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50/50"
                            }`}>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={`relative max-w-[85%] ${message.isBot ? "pr-2" : "pl-2"}`}>
                                        {message.isBot && (
                                            <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00C4B4] flex items-center justify-center text-xs">
                                                ✨
                                            </div>
                                        )}
                                        <div
                                            className={`rounded-2xl px-4 py-3 ${message.isBot
                                                    ? isDark
                                                        ? "bg-zinc-800/80 text-zinc-100 ml-4 rounded-tl-sm"
                                                        : "bg-white text-gray-800 shadow-md ml-4 rounded-tl-sm border border-gray-100"
                                                    : "bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-white rounded-tr-sm shadow-lg"
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                        </div>
                                        {/* Speak button for bot messages */}
                                        {message.isBot && (
                                            <button
                                                onClick={() => isSpeaking ? stopSpeaking() : speak(message.text)}
                                                className={`mt-1 ml-4 text-xs flex items-center gap-1 ${isDark ? "text-zinc-500 hover:text-[#D4AF37]" : "text-gray-400 hover:text-[#D4AF37]"
                                                    } transition-colors`}
                                            >
                                                {isSpeaking ? (
                                                    <>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                            <rect x="6" y="4" width="4" height="16" rx="1" />
                                                            <rect x="14" y="4" width="4" height="16" rx="1" />
                                                        </svg>
                                                        Stop
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                        </svg>
                                                        Listen
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-center gap-2 ml-4">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00C4B4] flex items-center justify-center text-xs">
                                            ✨
                                        </div>
                                        <div className={`rounded-2xl px-4 py-3 ${isDark ? "bg-zinc-800/80" : "bg-white shadow-md border border-gray-100"
                                            }`}>
                                            <div className="flex gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <span className="w-2 h-2 rounded-full bg-[#00C4B4] animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions - Pill Style */}
                        {messages.length <= 1 && (
                            <div className={`px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50/50"
                                }`}>
                                {quickQuestions.map((q, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => sendMessage(q)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex-shrink-0 text-xs px-4 py-2 rounded-full font-medium transition-all ${isDark
                                                ? "bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-300 hover:from-[#D4AF37]/20 hover:to-[#00C4B4]/20 hover:text-white border border-zinc-700"
                                                : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#00C4B4]/10 shadow-sm border border-gray-200"
                                            }`}
                                    >
                                        {q}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Enhanced Input Area */}
                        <form onSubmit={handleSubmit} className={`p-4 ${isDark
                                ? "bg-gradient-to-t from-[#1f1f1f] to-transparent border-t border-zinc-800/50"
                                : "bg-gradient-to-t from-white to-transparent border-t border-gray-200/50"
                            }`}>
                            <div className={`flex gap-2 items-center rounded-2xl px-4 py-3 transition-all ${isDark
                                    ? "bg-zinc-800/50 border border-zinc-700 focus-within:border-[#D4AF37]/50"
                                    : "bg-gray-100 border border-gray-200 focus-within:border-[#D4AF37]/50"
                                }`}>
                                {/* Microphone Button */}
                                <button
                                    type="button"
                                    onClick={isListening ? stopListening : startListening}
                                    className={`p-2 rounded-full transition-all ${isListening
                                            ? "bg-red-500 text-white animate-pulse"
                                            : isDark
                                                ? "bg-zinc-700 text-zinc-400 hover:text-[#D4AF37] hover:bg-zinc-600"
                                                : "bg-gray-200 text-gray-500 hover:text-[#D4AF37] hover:bg-gray-300"
                                        }`}
                                    title={isListening ? "Stop listening" : "Voice input"}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={isListening ? "Listening..." : "Type or speak..."}
                                    className={`flex-1 bg-transparent outline-none text-sm ${isDark ? "text-white placeholder-zinc-500" : "text-gray-900 placeholder-gray-500"
                                        }`}
                                />

                                {/* Send Button */}
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className={`p-2.5 rounded-xl transition-all ${inputValue.trim()
                                            ? "bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-white shadow-lg hover:shadow-xl"
                                            : isDark ? "bg-zinc-700 text-zinc-500" : "bg-gray-200 text-gray-400"
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>

                            {/* Voice Status */}
                            {isListening && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 flex items-center justify-center gap-2 text-xs text-red-500"
                                >
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    Listening... Speak now
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
