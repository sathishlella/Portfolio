"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillCategories = [
    {
        title: "Core AI",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        skills: [
            "Transformers",
            "Diffusion Models",
            "Reinforcement Learning",
            "LangChain",
            "Jais LLM",
            "GPT-4 / GPT-4o",
            "RAG Systems",
            "Fine-tuning",
            "Prompt Engineering",
        ],
    },
    {
        title: "Data & Analytics",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        skills: [
            "Power BI (AI Visuals)",
            "BigQuery",
            "Snowflake",
            "SQL / NoSQL",
            "ARIMA / Prophet",
            "Python / Pandas",
            "Streamlit",
            "D3.js",
            "Time Series Analysis",
        ],
    },
    {
        title: "Infrastructure",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        skills: [
            "MLOps / MLFlow",
            "Azure ML Studio",
            "AWS SageMaker",
            "Dubai Regions",
            "Docker",
            "Kubernetes",
            "FastAPI",
            "CI/CD Pipelines",
            "Arabic NLP Tools",
        ],
    },
];

const allCertifications = [
    "GANs - DeepLearning.AI",
    "AWS/Azure/Oracle Cloud",
    "Power BI Visualization",
    "TensorFlow Serving",
    "MTA Database",
    "Python for Data Science",
    "Machine Learning Specialization",
    "Deep Learning Specialization",
    "Natural Language Processing",
    "SQL Advanced Queries",
    "Docker & Kubernetes",
    "Azure AI Fundamentals",
    "AWS Machine Learning",
    "Data Engineering Essentials",
];

export default function SkillsSection() {
    const [showAllCerts, setShowAllCerts] = useState(false);
    const displayedCerts = showAllCerts ? allCertifications : allCertifications.slice(0, 5);

    return (
        <section className="section bg-[#0A0A0A]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="section-title text-gradient-gold">Skills Matrix</h2>
                <p className="section-subtitle">
                    Technical expertise aligned with Dubai 2031 AI Vision requirements
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="glass rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-100">{category.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                                    viewport={{ once: true }}
                                    className="skill-badge"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certifications & Publications */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {/* Publications */}
                <div className="glass-gold rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Publications
                    </h3>
                    <ul className="space-y-3">
                        <li className="text-sm text-zinc-300">
                            <span className="font-medium">CRC Press (2024)</span>
                            <p className="text-zinc-500">Real-Time Monitoring and Predictive Maintenance in Smart Manufacturing</p>
                        </li>
                        <li className="text-sm text-zinc-300">
                            <span className="font-medium">Springer (2021)</span>
                            <p className="text-zinc-500">ML Methods for Signal Strength Based User Position Locating</p>
                        </li>
                    </ul>
                </div>

                {/* Certifications */}
                <div className="glass-gold rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Certifications (14)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence mode="popLayout">
                            {displayedCerts.map((cert) => (
                                <motion.span
                                    key={cert}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-300"
                                >
                                    {cert}
                                </motion.span>
                            ))}
                        </AnimatePresence>
                        <button
                            onClick={() => setShowAllCerts(!showAllCerts)}
                            className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/30 transition-colors cursor-pointer border border-[#D4AF37]/30 hover:border-[#D4AF37]/50"
                        >
                            {showAllCerts ? "Show less" : `+${allCertifications.length - 5} more`}
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
