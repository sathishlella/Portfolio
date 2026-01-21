"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
    isLarge?: boolean;
}

export default function ProjectCard({ project, index, isLarge = false }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`bento-card group ${isLarge ? "bento-card-large" : ""}`}
        >
            {/* Sector Badge */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-widest text-[#00C4B4] uppercase">
                    {project.sector}
                </span>
                <div className="flex gap-2">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-[#D4AF37] hover:bg-zinc-700/50 transition-all"
                            title="Live Demo"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-[#D4AF37] hover:bg-zinc-700/50 transition-all"
                            title="GitHub"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-zinc-100 group-hover:text-[#D4AF37] transition-colors">
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                    <span key={tech} className="skill-badge">
                        {tech}
                    </span>
                ))}
            </div>

            {/* Impact Metric */}
            <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00C4B4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-sm text-[#00C4B4] font-medium">{project.impact}</span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                    background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.1), transparent 40%)",
                }}
            />
        </motion.div>
    );
}
