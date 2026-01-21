"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/ThemeContext";

interface ParticlesProps {
    count?: number;
    mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 5000, mousePosition }: ParticlesProps) {
    const points = useRef<THREE.Points>(null!);
    const geometryRef = useRef<THREE.BufferGeometry>(null!);

    const { positions, colors, originalPositions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        // Golden color (D4AF37) in RGB normalized
        const goldR = 212 / 255;
        const goldG = 175 / 255;
        const goldB = 55 / 255;

        // Teal color (00C4B4) for accent
        const tealR = 0 / 255;
        const tealG = 196 / 255;
        const tealB = 180 / 255;

        for (let i = 0; i < count; i++) {
            // Spread particles in a sphere-like distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 3 + Math.random() * 4;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Mix gold and teal colors randomly
            const isGold = Math.random() > 0.15;
            if (isGold) {
                colors[i * 3] = goldR + (Math.random() - 0.5) * 0.1;
                colors[i * 3 + 1] = goldG + (Math.random() - 0.5) * 0.1;
                colors[i * 3 + 2] = goldB + (Math.random() - 0.5) * 0.1;
            } else {
                colors[i * 3] = tealR;
                colors[i * 3 + 1] = tealG;
                colors[i * 3 + 2] = tealB;
            }
        }

        return {
            positions,
            colors,
            originalPositions: new Float32Array(positions),
        };
    }, [count]);

    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
            );
            geometryRef.current.setAttribute(
                "color",
                new THREE.BufferAttribute(colors, 3)
            );
        }
    }, [positions, colors]);

    useFrame((state) => {
        if (!geometryRef.current) return;

        const time = state.clock.elapsedTime;
        const positionAttr = geometryRef.current.getAttribute("position") as THREE.BufferAttribute;
        if (!positionAttr) return;
        const posArray = positionAttr.array as Float32Array;

        const mouseX = mousePosition.current.x * 3;
        const mouseY = mousePosition.current.y * 3;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Original position
            const ox = originalPositions[i3];
            const oy = originalPositions[i3 + 1];
            const oz = originalPositions[i3 + 2];

            // Floating animation
            const floatOffset = Math.sin(time * 0.5 + i * 0.01) * 0.05;

            // Mouse attraction
            let attractionX = 0;
            let attractionY = 0;

            const dist = Math.sqrt((mouseX - ox) ** 2 + (mouseY - oy) ** 2);
            const maxDist = 2;

            if (dist < maxDist) {
                const force = (1 - dist / maxDist) * 0.5;
                attractionX = (mouseX - ox) * force;
                attractionY = (mouseY - oy) * force;
            }

            // Apply transformations
            posArray[i3] = THREE.MathUtils.lerp(posArray[i3], ox + attractionX, 0.05);
            posArray[i3 + 1] = THREE.MathUtils.lerp(posArray[i3 + 1], oy + attractionY + floatOffset, 0.05);
            posArray[i3 + 2] = oz + Math.sin(time * 0.3 + i * 0.005) * 0.05;
        }

        positionAttr.needsUpdate = true;

        // Gentle rotation
        if (points.current) {
            points.current.rotation.y += 0.0005;
            points.current.rotation.x = Math.sin(time * 0.1) * 0.05;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry ref={geometryRef} />
            <pointsMaterial
                size={0.02}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function NeuralConnections() {
    const lineRef = useRef<THREE.LineSegments>(null!);
    const geometryRef = useRef<THREE.BufferGeometry>(null!);

    const { positions, colors } = useMemo(() => {
        const nodeCount = 50;
        const positions = new Float32Array(nodeCount * 2 * 3);
        const colors = new Float32Array(nodeCount * 2 * 3);

        const goldR = 212 / 255;
        const goldG = 175 / 255;
        const goldB = 55 / 255;

        for (let i = 0; i < nodeCount; i++) {
            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.acos(2 * Math.random() - 1);
            const r1 = 2 + Math.random() * 3;

            const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
            const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
            const r2 = r1 + (Math.random() - 0.5) * 2;

            positions[i * 6] = r1 * Math.sin(phi1) * Math.cos(theta1);
            positions[i * 6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
            positions[i * 6 + 2] = r1 * Math.cos(phi1);

            positions[i * 6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2);
            positions[i * 6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2);
            positions[i * 6 + 5] = r2 * Math.cos(phi2);

            // Gold color with fade
            for (let j = 0; j < 2; j++) {
                const alpha = j === 0 ? 1 : 0.3;
                colors[i * 6 + j * 3] = goldR * alpha;
                colors[i * 6 + j * 3 + 1] = goldG * alpha;
                colors[i * 6 + j * 3 + 2] = goldB * alpha;
            }
        }

        return { positions, colors };
    }, []);

    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
            );
            geometryRef.current.setAttribute(
                "color",
                new THREE.BufferAttribute(colors, 3)
            );
        }
    }, [positions, colors]);

    useFrame((state) => {
        if (!lineRef.current) return;

        const time = state.clock.elapsedTime;
        lineRef.current.rotation.y = time * 0.02;
        lineRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    });

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry ref={geometryRef} />
            <lineBasicMaterial
                vertexColors
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    );
}

export default function AntiGravityHero() {
    const mousePosition = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme, mounted } = useTheme();

    const isDark = theme === "dark";

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mousePosition.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mousePosition.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`hero-container transition-colors duration-500 ${isDark ? "bg-[#0F0F0F]" : "bg-gradient-to-b from-white to-[#f5f5f7]"
                }`}
        >
            {/* Three.js Canvas - Only show in dark mode */}
            {isDark && mounted && (
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    gl={{ alpha: true, antialias: true }}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                >
                    <color attach="background" args={["#0F0F0F"]} />
                    <ambientLight intensity={0.5} />
                    <Particles count={5000} mousePosition={mousePosition} />
                    <NeuralConnections />
                </Canvas>
            )}

            {/* Light Mode Background - Subtle gradient circles */}
            {!isDark && mounted && (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#D4AF37]/10 to-[#00C4B4]/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#00C4B4]/10 to-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
            )}

            {/* Hero Content Overlay */}
            <div className="hero-content">
                <div className={`role-badge mb-6 ${!isDark ? "bg-white/80 border-black/10" : ""}`}>
                    <span className="w-2 h-2 rounded-full bg-[#00C4B4] animate-pulse"></span>
                    Dubai 2031 AI Vision
                </div>

                <h1 className={`hero-title ${isDark ? "text-gradient-gold" : "text-[#1d1d1f]"}`}>
                    Sathish Lella
                </h1>

                <p className={`hero-subtitle mb-8 ${!isDark ? "text-[#515154]" : ""}`}>
                    AI Solutions Engineer • Data Specialist • Arabic NLP
                </p>

                <div className="flex gap-4 justify-center pointer-events-auto">
                    <a href="#projects" className="btn-primary">
                        View Projects
                    </a>
                    <a href="/resume" className={`btn-secondary ${!isDark ? "border-black/20 text-[#1d1d1f] hover:border-[#D4AF37]" : ""}`}>
                        Resume
                    </a>
                </div>
            </div>

            {/* Dubai Coordinates */}
            <div className={`coordinates ${!isDark ? "text-[#86868b]" : ""}`}>
                LAT: 25.2048° N | LONG: 55.2708° E
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className={`text-xs tracking-widest ${isDark ? "text-zinc-500" : "text-[#86868b]"}`}>SCROLL</span>
                <svg
                    className="w-5 h-5 text-[#D4AF37]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    );
}
