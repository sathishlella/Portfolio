"use client";

import { motion } from "framer-motion";
import { projects, RoleType } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
    activeRole: RoleType;
}

export default function ProjectGrid({ activeRole }: ProjectGridProps) {
    // Filter projects by role
    const filteredProjects = projects.filter((project) =>
        project.roles.includes(activeRole)
    );

    return (
        <section id="projects" className="section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="section-title text-gradient-gold">Featured Projects</h2>
                <p className="section-subtitle">
                    {activeRole === "engineer" &&
                        "Showcasing scalable architectures and production-ready systems"}
                    {activeRole === "specialist" &&
                        "Deep dives into AI/ML models, fine-tuning, and cutting-edge research"}
                    {activeRole === "analyst" &&
                        "Data-driven insights, visualizations, and business impact stories"}
                </p>
            </motion.div>

            <div className="bento-grid">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        isLarge={project.featured && index === 0}
                    />
                ))}
            </div>
        </section>
    );
}
