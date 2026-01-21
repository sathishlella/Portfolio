"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
    {
        role: "Managing Partner",
        company: "Velden Health",
        location: "Chicago, IL (Remote)",
        period: "Jun 2025 – Present",
        highlights: [
            "Led end-to-end development of Healthcare RCM platform with predictive analytics",
            "Achieved 60% A/R recovery rate on aged claims (60-180+ days)",
            "Built AI-powered denial management system reducing processing time by 40%",
            "Implemented HIPAA-compliant data pipelines and Power BI dashboards",
        ],
        keywords: ["Predictive Analytics", "Healthcare AI", "MLOps", "Power BI"],
    },
    {
        role: "AI Solutions Engineer & Data Specialist",
        company: "Freelance",
        location: "Remote",
        period: "May 2024 – May 2025",
        highlights: [
            "Developed LangChain-based RAG systems for document intelligence",
            "Fine-tuned LLMs for Arabic NLP use cases (Jais, GPT-4o)",
            "Built ATS Resume Builder with 95%+ compatibility scoring",
            "Deployed ML models on Azure ML Studio and AWS SageMaker",
        ],
        keywords: ["Arabic NLP", "LangChain", "RAG", "LLM Fine-tuning"],
    },
    {
        role: "Graduate Research Assistant",
        company: "Lewis University",
        location: "Romeoville, IL",
        period: "May 2023 – May 2024",
        highlights: [
            "Conducted research on predictive maintenance using time-series ML models",
            "Published research on real-time monitoring in smart manufacturing (CRC Press)",
            "Developed Python data pipelines for academic research projects",
        ],
        keywords: ["Predictive Maintenance", "Time Series", "Research"],
    },
    {
        role: "Associate Software Engineer",
        company: "Mphasis",
        location: "India",
        period: "Aug 2021 – Dec 2022",
        highlights: [
            "Built REST APIs and database management systems (SQL/NoSQL)",
            "Developed UI enhancements and data processing workflows",
            "Collaborated with cross-functional teams on agile projects",
        ],
        keywords: ["API Development", "SQL", "Agile"],
    },
];

const education = [
    {
        degree: "Master of Science in Data Science",
        school: "Lewis University",
        location: "Romeoville, IL, USA",
        period: "2023 – 2024",
        gpa: "3.8/4.0",
    },
    {
        degree: "B.Tech in Electronics & Communications",
        school: "Aditya University",
        location: "India",
        period: "2017 – 2021",
    },
];

const publications = [
    {
        title: "Real-Time Monitoring and Predictive Maintenance",
        publisher: "CRC Press (Wiley)",
        year: "2024",
        doi: "https://doi.org/10.1002/9781394303601.ch14",
        description: "Smart manufacturing, ML-driven uptime optimization, IoT sensor analytics",
        citations: 3,
    },
    {
        title: "Analysis of Received Signal Strength Based on User Position Locating by Using ML Methods",
        publisher: "Springer",
        year: "2021",
        doi: "https://link.springer.com/chapter/10.1007/978-981-15-7511-2_22",
        description: "Gaussian process regression, 5G technology, wireless networks",
        accesses: 583,
    },
];

const allCertifications = [
    "Build Basic GANs – DeepLearning.AI",
    "Intensive Cloud Computing (AWS, Azure, Oracle) – The Cloud Bootcamp",
    "Data Visualization with Power BI – Great Learning",
    "Deploy Models with TensorFlow Serving & Flask – Coursera",
    "MTA: Database Fundamentals – Microsoft",
    "Python for Data Science – IBM",
    "Machine Learning Specialization – Stanford/Coursera",
    "Deep Learning Specialization – DeepLearning.AI",
    "Natural Language Processing – Coursera",
    "SQL Advanced Queries – HackerRank",
    "Docker & Kubernetes Fundamentals – LinkedIn Learning",
    "Azure AI Fundamentals (AI-900) – Microsoft",
    "AWS Machine Learning – Coursera",
    "Data Engineering Essentials – Databricks",
];

export default function ResumePage() {
    const [showAllCerts, setShowAllCerts] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);

    const displayedCerts = showAllCerts ? allCertifications : allCertifications.slice(0, 5);

    const handleDownloadPDF = async () => {
        if (!resumeRef.current || isGenerating) return;

        setIsGenerating(true);

        try {
            // Dynamic import to avoid SSR issues
            const html2pdf = (await import('html2pdf.js')).default;

            const element = resumeRef.current;
            const opt = {
                margin: [10, 10, 10, 10] as [number, number, number, number],
                filename: 'Sathish_Lella_Resume.pdf',
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            // Fallback to print
            window.print();
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main ref={resumeRef} className="min-h-screen bg-[#0F0F0F] py-12 px-6 md:px-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto mb-12">
                <div className="flex justify-between items-start mb-4 no-print">
                    <Link
                        href="/"
                        className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Portfolio
                    </Link>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isGenerating
                            ? 'bg-zinc-600 text-zinc-300 cursor-wait'
                            : 'bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#E5C158]'
                            }`}
                    >
                        {isGenerating ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                            Sathish Lella
                        </h1>
                        <p className="text-xl text-zinc-300">
                            AI Solutions Engineer | Data Specialist | Arabic NLP
                        </p>
                    </div>

                    <div className="flex flex-col text-right text-sm text-zinc-400">
                        <a href="mailto:sathishlellaa@gmail.com" className="hover:text-[#D4AF37]">
                            sathishlellaa@gmail.com
                        </a>
                        <span>+91 9666612820</span>
                        <a
                            href="https://linkedin.com/in/sathishlella"
                            className="hover:text-[#D4AF37]"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            linkedin.com/in/sathishlella
                        </a>
                        <a
                            href="https://scholar.google.com/citations?user=4xwc2BgAAAAJ&hl=en"
                            className="hover:text-[#D4AF37] flex items-center justify-end gap-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 8a8 8 0 017.162 5.44L24 9.5 12 0z" />
                            </svg>
                            Google Scholar
                        </a>
                    </div>
                </div>
            </div>

            {/* Magazine Grid Layout */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Experience (2 cols wide) */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                            Experience
                        </h2>

                        <div className="space-y-8">
                            {experiences.map((exp, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-zinc-800 hover:border-[#D4AF37]/50 transition-colors">
                                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-[#D4AF37]"></div>

                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-zinc-100">{exp.role}</h3>
                                        <span className="text-sm text-zinc-500">{exp.period}</span>
                                    </div>

                                    <div className="text-sm text-[#00C4B4] mb-3">
                                        {exp.company} • {exp.location}
                                    </div>

                                    <ul className="space-y-2 mb-3">
                                        {exp.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="text-sm text-zinc-400 flex gap-2">
                                                <span className="text-[#D4AF37] mt-1">▸</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.keywords.map((kw) => (
                                            <span
                                                key={kw}
                                                className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                                            >
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Publications */}
                    <section>
                        <h2 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                            Publications
                            <a
                                href="https://scholar.google.com/citations?user=4xwc2BgAAAAJ&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-xs font-normal text-zinc-400 hover:text-[#D4AF37] no-print"
                            >
                                View on Google Scholar →
                            </a>
                        </h2>

                        <div className="space-y-4">
                            {publications.map((pub, index) => (
                                <a
                                    key={index}
                                    href={pub.doi}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-[#D4AF37]/50 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-zinc-200 mb-1 group-hover:text-[#D4AF37] transition-colors">
                                                {pub.title}
                                            </h3>
                                            <p className="text-xs text-[#00C4B4] mb-1">{pub.publisher} | {pub.year}</p>
                                            <p className="text-xs text-zinc-500">{pub.description}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 no-print">
                                            {pub.citations && (
                                                <span className="text-xs px-2 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37]">
                                                    {pub.citations} citations
                                                </span>
                                            )}
                                            {pub.accesses && (
                                                <span className="text-xs px-2 py-1 rounded bg-[#00C4B4]/20 text-[#00C4B4]">
                                                    {pub.accesses} accesses
                                                </span>
                                            )}
                                            <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column - Education, Skills, Certifications */}
                <div className="space-y-8">
                    {/* Education */}
                    <section>
                        <h2 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                            Education
                        </h2>

                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                    <h3 className="text-sm font-semibold text-zinc-200">{edu.degree}</h3>
                                    <p className="text-xs text-[#00C4B4]">{edu.school}</p>
                                    <p className="text-xs text-zinc-500">{edu.period}</p>
                                    {edu.gpa && (
                                        <p className="text-xs text-zinc-400 mt-1">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Key Skills */}
                    <section>
                        <h2 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                            Key Skills
                        </h2>

                        <div className="space-y-3">
                            <div>
                                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                    Core AI
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Arabic NLP", "LangChain", "RAG", "GPT-4", "Jais LLM", "Fine-tuning"].map((s) => (
                                        <span key={s} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">{s}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                    Data / Analytics
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Power BI", "BigQuery", "SQL", "Python", "ARIMA", "Streamlit"].map((s) => (
                                        <span key={s} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">{s}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                    Infrastructure
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {["MLOps", "Azure ML", "AWS", "Docker", "FastAPI"].map((s) => (
                                        <span key={s} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Certifications */}
                    <section>
                        <h2 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                            Certifications
                        </h2>

                        <ul className="space-y-2">
                            <AnimatePresence mode="popLayout">
                                {displayedCerts.map((cert, index) => (
                                    <motion.li
                                        key={cert}
                                        layout
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="text-xs text-zinc-400 flex gap-2"
                                    >
                                        <span className="text-[#00C4B4]">✓</span>
                                        <span>{cert}</span>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                            <li className="no-print">
                                <button
                                    onClick={() => setShowAllCerts(!showAllCerts)}
                                    className="text-xs text-[#D4AF37] hover:text-[#E5C158] transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    {showAllCerts ? (
                                        <>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                            Show less
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            +{allCertifications.length - 5} more certifications
                                        </>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </section>

                    {/* Local Relevance - UAE */}
                    <section className="p-4 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                        <h2 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
                            UAE Market Readiness
                        </h2>

                        <ul className="space-y-2 text-xs text-zinc-300">
                            <li className="flex gap-2">
                                <span className="text-[#00C4B4]">✓</span>
                                <span>Familiar with UAE PDPL (Personal Data Protection Law)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#00C4B4]">✓</span>
                                <span>Experience with Data Sovereignty requirements</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#00C4B4]">✓</span>
                                <span>Arabic NLP expertise (Jais LLM, G42 ecosystem)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#00C4B4]">✓</span>
                                <span>AI Ethics Audit & GRC Compliance</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#00C4B4]">✓</span>
                                <span>Azure/AWS Dubai Region deployment experience</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center">
                <p className="text-sm text-zinc-500">
                    Open to AI Solutions Engineer, AI Specialist, and Data Analyst roles in Dubai, UAE.
                </p>
                <p className="text-xs text-zinc-600 mt-2">
                    © 2026 Sathish Lella • Dubai 2031 AI Vision Ready
                </p>
            </div>
        </main>
    );
}

