"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IoBookOutline, IoHomeOutline, IoDocument } from "react-icons/io5";
import { FaGithub, FaLinkedin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { GrProjects } from 'react-icons/gr';
import * as THREE from 'three';
import ProfileCard from "./ProfileCard";
import CollegeInfo, { BioInfo, BranchInfo, TypeWriterEffect } from "./InfoPage";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import { motion } from "motion/react"
import { RiRobot2Line } from 'react-icons/ri';
import Chatbot from "./ChatBot"


function ParallaxCameraRig() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        const targetX = mouse.current.x * 0.5;
        const targetY = mouse.current.y * 0.5;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// ---------------------- Custom Glow Sprite ----------------------
function createGlowTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');

    const gradient = ctx!.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
    );

    gradient.addColorStop(0, 'rgba(173, 216, 230, 0.3)');
    gradient.addColorStop(0.3, 'rgba(100, 100, 150, 0.2)');
    gradient.addColorStop(0.6, 'rgba(50, 50, 80, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx!.fillStyle = gradient;
    ctx!.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);
};

// ---------------------- Cursor Glow Follower ----------------------
function MouseFollowerGlow() {
    const spriteRef = useRef<THREE.Sprite>(null);
    const { camera, mouse } = useThree();
    const texture = useMemo(() => createGlowTexture(), []);
    const vec = new THREE.Vector3();

    useFrame(() => {
        if (!spriteRef.current) return;
        vec.set(mouse.x, mouse.y, 0.5);
        vec.unproject(camera);
        const dir = vec.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        spriteRef.current.position.lerp(pos, 0.1);
    });

    return (
        <sprite ref={spriteRef} scale={[2, 2, 1]}>
            <spriteMaterial
                map={texture}
                color={new THREE.Color('cyan')}
                transparent
                opacity={1}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </sprite>
    );
}

// ---------------------- Floating Glow Blobs ----------------------
function FloatingGlowBlobs({ count = 8 }) {
    const groupRef = useRef<THREE.Group>(null);
    const texture = useMemo(() => createGlowTexture(), []);

    const blobData = useMemo(() =>
        new Array(count).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 20
            ),
            speed: Math.random() * 0.005 + 0.008,
            phase: Math.random() * Math.PI * 4
        })), [count]);

    useFrame(({ clock }) => {
        const group = groupRef.current;
        if (!group) return;
        group.children.forEach((sprite: THREE.Object3D, i: number) => {
            const t = clock.elapsedTime;
            const data = blobData[i];
            const s = sprite as THREE.Sprite;
            s.position.x = data.position.x + Math.sin(t * data.speed + data.phase) * 1.5;
            s.position.y = data.position.y + Math.cos(t * data.speed + data.phase) * 1.5;
            s.position.z = data.position.z + Math.sin(t * data.speed + data.phase) * 1;
        });
    });

    return (
        <group ref={groupRef}>
            {blobData.map((_, i) => (
                <sprite key={i} scale={[3.5, 3.5, 1]}>
                    <spriteMaterial
                        map={texture}
                        transparent
                        opacity={0.2}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </sprite>
            ))}
        </group>
    );
}

function SocialMediaIconsRow() {

    function downloadResume() {

    }

    const tooltipStyle = `
    absolute -bottom-12 left-1/2 -translate-x-1/2
    bg-gray-800 text-white text-sm px-2 py-1 rounded
    opacity-0 group-hover:opacity-100 transition-all duration-300
    pointer-events-none z-20
  `;


    return (
        <div className="flex max-xl:justify-center items-center gap-6 mt-6 max-md:mt-4">
            <div className="flex items-center gap-6 mt-6">
                <a href="https://github.com/SahilSharma1212?tab=repositories" target="_blank" rel="noopener noreferrer" className="group relative">
                    <FaGithub className="text-[#6e5494] text-2xl transition-transform duration-300 transform hover:scale-110 " />
                    <div className={tooltipStyle}>GitHub</div>
                </a>

                <a href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" target="_blank" rel="noopener noreferrer" className="group relative">
                    <FaLinkedin className="text-[#0077B5] text-2xl transition-transform duration-300 transform hover:scale-110" />
                    <div className={tooltipStyle + ""}>LinkedIn</div>
                </a>

                <a href="tel:+918821809999" className="group relative">
                    <FaPhoneAlt className="text-green-400 text-2xl transition-transform duration-300 transform hover:scale-110" />
                    <div className={tooltipStyle + " w-16"}>Call Me</div>
                </a>

                <a href="https://mail.google.com/mail/?view=cm&to=sahilbhaisharma1212@gmail.com" target="_blank" className="group relative">
                    <FaEnvelope className="text-red-400 text-2xl transition-transform duration-300 transform hover:scale-110" />
                    <div className={tooltipStyle + " w-22"}>Send Email</div>
                </a>
                <a href="#" target="_blank" className="group relative">
                    <IoDocument className="text-gray-200 text-2xl transition-transform duration-300 transform hover:scale-110" />
                    <div className={tooltipStyle} onClick={downloadResume}>Download Resume</div>
                </a>
            </div>

        </div>
    );
}



// ---------------------- Main Component ----------------------
function StarFieldWithLight() {

    const [visibleSection, setVisibleSection] = useState("home");

    const aboutSahil = `Sahil is a motivated and highly capable Computer Science Engineering student currently in his 4th year of B.Tech. He is passionate about technology and constantly expanding his expertise across various domains. Known for his problem-solving mindset and structured approach, Sahil delivers effective solutions by combining technical skills with creativity and user-centric design.

Technical Skills:
Sahil has strong proficiency in C, C++, Java, JavaScript, TypeScript, Python, and frameworks such as React.js, Next.js, Node.js, Express.js, and the MERN stack (MongoDB, Express.js, React.js, Node.js). He has experience working with Firebase, Supabase, and JWT Authentication, and employs libraries like Framer Motion, Tailwind CSS, and popular UI component libraries to build engaging and efficient web interfaces. For data handling and analytics, he is skilled in Pandas, NumPy, Scikit-learn, and Power BI, and is also familiar with Generative AI tools. His design work is supported by Figma, and he holds a UI/UX certification from Udemy.
For other tools and technologies, Sahil is aware of the field at a beginner’s level and is eager to deepen his knowledge through hands-on experience and learning.

Certifications & Learning:
He holds a UI/UX certificate from Udemy and identifies as a self-taught web developer and data analyst. Sahil is currently exploring advanced topics in Generative AI, machine learning, and cloud engineering, and actively pursues learning opportunities to broaden his skill set.

Projects & Experience:
Sahil has worked on several impactful projects, including:

Personal Portfolio – a modern and responsive web portfolio showcasing his skills, projects, and achievements.

Emalkhana – a digital space for managing police-confiscated properties, developed as a freelance project for the Rajnandgaon district police department and currently in use to improve operations.

AI-Powered Resume Generator – a feature-rich web application built with Next.js, SHADCN UI, JWT Authentication, and Gemini API, enabling users to create professional resumes efficiently.

Mental Health Analyzer – a Python-based application using Scikit-learn, Hugging Face, Pandas, NumPy, and Streamlit, designed to analyze mental health patterns and provide insights.

Soft Skills:
Sahil’s strengths include analytical thinking, adaptability, and effective communication. He is known for approaching tasks with enthusiasm and discipline, always eager to take on challenges and support team efforts. His ability to explain complex topics clearly makes him a dependable collaborator, while his self-driven attitude ensures continuous learning.

Career Aspirations:
Sahil aspires to build a successful career as a software developer and data analyst, with a focus on full-stack development, AI-powered applications, and cloud-based solutions. He is committed to solving real-world problems through technology and contributing positively to innovative projects.

Interests:
Outside of development work, Sahil enjoys designing interfaces, creating engaging content, and experimenting with new technologies. He actively explores creative solutions, stays updated with industry trends, and enjoys working on projects that combine technology with user experience.`

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-950 to-slate-950  scrollbar-dark scrollbar-dark">


            {/* 🔵 3D Background Canvas (fixed behind everything) */}
            <div className="fixed inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[0, 2, 5]} intensity={19} color="#00ffff" />
                    <Stars radius={100} depth={50} count={8000} factor={4} fade />
                    <ParallaxCameraRig />
                    <MouseFollowerGlow />
                    <FloatingGlowBlobs count={5} />
                </Canvas>
            </div>

            {/* 🔵 Sidebar */}
            <nav className="fixed top-1/2 -translate-y-1/2 md:left-5 max-md:top-14 max-md:left-1/2 max-md:-translate-left-1/2 max-md:flex-row z-50 bg-gradient-to-br from-gray-500/10 to-slate-600/10 backdrop-blur-sm rounded-2xl px-3 py-6 shadow-lg border border-white/10 md:hover:w-30 md:w-12 transition-all overflow-x-hidden max-xl:hidden">
                <ul className="flex justify-between items-start text-sm md:text-base text-gray-400 md:flex-col gap-7 pl-1">
                    <button onClick={() => setVisibleSection("home")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "home" ? "text-cyan-400" : ""}`}>
                        <IoHomeOutline /> <p className='max-md:hidden'>About</p>
                    </button>
                    <button onClick={() => setVisibleSection("projects")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "projects" ? "text-cyan-400" : ""}`}>
                        <GrProjects /><p className='max-md:hidden'>Projects</p>
                    </button>
                    <button onClick={() => setVisibleSection("skills")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "skills" ? "text-cyan-400" : ""}`}>
                        <IoBookOutline /><p className='max-md:hidden'>Skills</p>
                    </button>
                    <button onClick={() => setVisibleSection("ChatBot")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "ChatBot" ? "text-cyan-400" : ""}`}>
                        <RiRobot2Line /><p className='max-md:hidden'>ChatBot</p>
                    </button>
                </ul>
            </nav>

            {/* 🔵 HERO Section */}
            <div className='md:relative z-10 scrollbar-dark'>

                <nav className=" z-50 flex justify-center py-5 xl:hidden">
                    <ul className="justify-between items-start text-sm text-gray-400  backdrop-blur-sm  bg-gradient-to-br from-gray-500/10 to-blue-600/10 gap-7 inline-flex rounded-2xl px-6 py-6 shadow-lg border border-white/10 ">
                        <button onClick={() => setVisibleSection("home")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "home" ? "text-cyan-400" : ""}`}>
                            <IoHomeOutline /> <p className='max-md:hidden'>About</p>
                        </button>
                        <button onClick={() => setVisibleSection("projects")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "projects" ? "text-cyan-400" : ""}`}>
                            <GrProjects /><p className='max-md:hidden'>Projects</p>
                        </button>
                        <button onClick={() => setVisibleSection("skills")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "skills" ? "text-cyan-400" : ""}`}>
                            <IoBookOutline /><p className='max-md:hidden'>Skills</p>
                        </button>
                        <button onClick={() => setVisibleSection("ChatBot")} className={`hover:text-white cursor-pointer flex items-center justify-start gap-4 font-semibold transition-all ${visibleSection === "ChatBot" ? "text-cyan-400" : ""}`}>
                            <RiRobot2Line /><p className='max-md:hidden'>ChatBot</p>
                        </button>
                    </ul>
                </nav>


                {/* Home/Profile section*/}
                <section className={visibleSection !== "home" ? "hidden" : "md:min-h-screen flex max-xl:flex-col items-center justify-evenly px-8 bg-transparent max-md:gap-14  scrollbar-dark"}
                    id='profile'>

                    {/* bio and icons */}
                    <div className="text-white max-w-sm mr-10 max-md:mt-10 items-center max-xl:flex-col max-md:flex">
                        <h1 className="text-4xl font-bold mb-4 max-md:text-center">👋 Welcome to My Portfolio</h1>
                        <p className="text-lg text-gray-300 max-md:text-center">
                            I&apos;m Sahil Sharma — building intelligent interfaces, futuristic designs, and scalable web solutions.
                        </p>
                        <SocialMediaIconsRow />
                    </div>

                    {/* profile */}
                    <div
                        className="md:relative w-80 h-[420px] max-xl:mt-20 max-lg:mt-0 md:ml-10 max-md:min-h-[850px] max-md:flex max-md:flex-col max-md:gap-4 max-md:items-center"
                    >
                        <ProfileCard />
                        <div className="md:absolute md:-top-12 md:-left-32 md:z-20 "><TypeWriterEffect /></div>
                        <div className="md:absolute md:-bottom-10 md:-left-64 md:z-20"><BioInfo /></div>
                        <div className="md:absolute md:top-10 md:-right-42 md:z-20"><CollegeInfo /></div>
                        <div className="md:absolute md:bottom-20 md:-right-52 md:z-20"><BranchInfo /></div>
                    </div>

                </section>


                {/* Skills section */}
                <section
                    className={visibleSection !== "skills" ? "hidden" : "px-6 py-20 bg-transparent 2xl:mx-44 xl:mx-40 relative overflow-hidden"}
                    id='skillsSection'
                >

                    <div
                        className="p-[2px] rounded-2xl bg-gradient-to-r from-slate-950/50 via-blue-950/0 backdrop-blur-lg overflow-hidden relative"
                        style={{ boxShadow: "0 0 20px #415e8c" }}
                    >
                        {/* 🌌 Star Layer */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="w-full h-full bg-[url('/stars.svg')] opacity-20 animate-pulse-slow" />
                        </div>

                        {/* 🔷 Random Gradient Blobs */}
                        <motion.div
                            className="h-64 w-64 bg-indigo-950 blur-3xl absolute z-0 left-0 top-0"
                            animate={{ x: [0, 20, -15, 0], y: [0, -10, 15, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="h-64 w-64 bg-cyan-950 blur-3xl absolute z-0 left-0 top-1/2"
                            animate={{ x: [0, -25, 10, 0], y: [0, 20, -15, 0], rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="h-64 w-64 bg-blue-950 blur-3xl absolute z-0 left-0 bottom-20"
                            animate={{ x: [0, 30, -30, 0], y: [0, -15, 25, 0] }}
                            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="h-64 w-64 bg-indigo-950 blur-3xl absolute z-0 right-0 top-0"
                            animate={{ x: [0, -20, 25, 0], y: [0, 10, -15, 0] }}
                            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="h-64 w-64 bg-sky-950 blur-3xl absolute z-0 right-0 bottom-1/2"
                            animate={{ x: [0, 10, -10, 0], y: [0, -20, 15, 0], rotate: [0, 3, -3, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="h-64 w-64 bg-cyan-950 blur-3xl absolute z-0 right-0 bottom-40"
                            animate={{ x: [0, -15, 15, 0], y: [0, 25, -25, 0], rotate: [0, 6, -6, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* 🌠 Glowing Lines */}
                        <motion.div
                            className="absolute w-[2px] h-96 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent blur-lg left-1/3 top-10 rotate-45 z-0"
                            animate={{ y: [0, -20, 20, 0], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute h-[1px] w-96 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm top-1/2 left-1/2 -translate-x-1/2"
                            animate={{ x: [0, -15, 15, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Inner Glass Layer with Skills */}
                        <div className="bg-gradient-to-b from-[#0c0c15]/25 to-gray-950 backdrop-blur-sm rounded-2xl p-8 relative z-10"
                        >
                            <SkillsSection />
                        </div>
                    </div>

                </section>


                {/* Projects section */}
                <section className={visibleSection !== "projects" ? "hidden" : ""} id='projectsSection'>
                    <ProjectsSection />
                </section>
                <section id="chatbot" className={visibleSection !== "ChatBot" ? "hidden" : "visible h-[90vh] scale-90 sm:px-20 py-10 max-sm:px-5  scrollbar-dark"}>

                    <Chatbot
                        geminiApiKey="AIzaSyD0JlTVfdj71pue_NrFWKVA-n2QQ3_7RWU"
                        systemContext={aboutSahil}
                        botName="Sahil's AI Assistant"
                        welcomeMessage="Hey! Ask me anything about Sahil!"
                    />
                </section>


            </div>




        </div>
    );

}

export default StarFieldWithLight;