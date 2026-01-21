export interface Project {
    id: string;
    title: string;
    description: string;
    sector: string;
    techStack: string[];
    impact: string;
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    featured: boolean;
    roles: ("engineer" | "specialist" | "analyst")[];
}

export const projects: Project[] = [
    {
        id: "velden-health",
        title: "Velden Health RCM Platform",
        description: "Full-stack healthcare Revenue Cycle Management platform with AI-powered claim recovery, predictive analytics dashboard, and automated denial management. Features interactive calculators and real-time A/R tracking.",
        sector: "Healthcare / Data Analytics",
        techStack: ["Python", "Streamlit", "Power BI", "JavaScript", "ARIMA", "SQL"],
        impact: "60% A/R recovery rate • 95%+ clean claims • $25K+ annual savings per clinic",
        liveUrl: "https://veldenhealth.com",
        featured: true,
        roles: ["engineer", "analyst"],
    },
    {
        id: "ats-resume-builder",
        title: "ATS AI Resume Builder",
        description: "Intelligent resume optimization platform using LangChain and GPT-4o for real-time ATS compatibility scoring. Multi-language support with Arabic NLP capabilities using fine-tuned models.",
        sector: "Arabic NLP / AI",
        techStack: ["Next.js", "LangChain", "OpenAI", "TypeScript", "Tailwind"],
        impact: "95%+ ATS compatibility • Multi-language support • 174+ deployments",
        githubUrl: "https://github.com/sathishlella/ats-ai-resume-builder",
        featured: true,
        roles: ["specialist", "engineer"],
    },
    {
        id: "genai-pdf-qa",
        title: "GenAI PDF Q&A System",
        description: "RAG-based document intelligence system enabling natural language queries over PDF documents. Uses vector embeddings and semantic search for accurate information retrieval.",
        sector: "RAG / Document AI",
        techStack: ["Python", "LangChain", "ChromaDB", "OpenAI", "Streamlit"],
        impact: "90%+ query accuracy • Sub-second responses • Multi-document support",
        githubUrl: "https://github.com/sathishlella/GenAI-PDF-QA",
        featured: true,
        roles: ["specialist", "engineer"],
    },
    {
        id: "arabic-sentiment",
        title: "Arabic Sentiment Analyzer",
        description: "Real-time sentiment analysis for Arabic text using Jais LLM and Hugging Face transformers. Optimized for Gulf Arabic dialects with custom tokenization.",
        sector: "Arabic NLP / G42",
        techStack: ["Jais LLM", "Hugging Face", "FastAPI", "Python", "Docker"],
        impact: "92% accuracy on Gulf Arabic • Real-time API • UAE market-ready",
        featured: true,
        roles: ["specialist"],
    },
    {
        id: "smart-city-dashboard",
        title: "Smart City IoT Dashboard",
        description: "Real-time analytics dashboard for smart city metrics including energy consumption, traffic patterns, and environmental monitoring. Built for DEWA/Smart Dubai use cases.",
        sector: "IoT / Smart City",
        techStack: ["Next.js", "D3.js", "BigQuery", "Power BI", "WebSockets"],
        impact: "15+ real-time metrics • Live data streaming • Mobile responsive",
        featured: true,
        roles: ["analyst", "engineer"],
    },
    {
        id: "predictive-maintenance",
        title: "Predictive Maintenance API",
        description: "ML-powered API for predicting equipment failures in energy/utilities sector. Uses time-series forecasting and anomaly detection for proactive maintenance scheduling.",
        sector: "Energy / MLOps",
        techStack: ["Python", "TensorFlow", "MLFlow", "FastAPI", "Docker", "Kubernetes"],
        impact: "40% reduction in downtime • 30-day failure prediction • Auto-scaling",
        featured: false,
        roles: ["engineer", "specialist"],
    },
];

export type RoleType = "engineer" | "specialist" | "analyst";

export const roleLabels: Record<RoleType, string> = {
    engineer: "Solutions Engineer",
    specialist: "AI Specialist",
    analyst: "Data Analyst",
};

export const roleDescriptions: Record<RoleType, string> = {
    engineer: "Focus on architecture, scalability, and system design",
    specialist: "Focus on model fine-tuning, research, and AI/ML deep-dives",
    analyst: "Focus on storytelling, business KPIs, and data visualization",
};
