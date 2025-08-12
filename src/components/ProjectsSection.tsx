"use client"
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectDetails = [
    {
        title: "Drawing App",
        description:
            "A feature-rich web-based drawing application designed for creative freedom. Users can draw with various brush sizes and colors, erase, undo/redo actions, and export their artwork as images. Built using the Canvas API and optimized for performance in modern browsers. Designed with a clean, intuitive UI and fully responsive for mobile/tablet use.",
        tech: ["React", "Canvas API", "Tailwind", "Konva", "Framer-Motions"],
        skills: [
            "Canvas-based Drawing",
            "Undo/Redo Logic",
            "Image Exporting",
            "Responsive UI Design",
            "Konva State Management"
        ],
        github: "https://github.com/SahilSharma1212/drawing-app-using-Konva/",
        live: "https://sahilsharma1212.github.io/drawing-app-using-Konva/",
        images: ["/drawing_app_1.png", "/drawing_app_2.png", "/drawing_app_3.png"],
    },
    {
        title: "AI Resume Builder",
        description:
            "An AI-powered resume builder that generates job-tailored resumes based on user input. Integrates Google's Gemini API to auto-fill relevant achievements, skills, and experience. Includes editable sections, live PDF preview, and export to both Word and PDF formats. Fully authenticated with OAuth and email sign-in, and backed by a custom MongoDB/Next.js API.",
        tech: ["Next.js", "MongoDB", "Tailwind", "Gemini-API", "JWT", "ShadCn", "Mailtrap"],
        skills: [
            "AI Prompt Engineering",
            "User Authentication (OAuth & Email)",
            "Dynamic PDF Generation",
            "Form Handling & Validation",
            "Resume Parsing & Exporting"
        ],
        github: "https://github.com/SahilSharma1212/Next.js-AI-Powered-Resume-Builder",
        live: "https://next-js-ai-powered-resume-builder-fwdy8bnnw.vercel.app/",
        images: ["/resume1.png", "/resume3.png", "/resume2.png"],
    },
    {
        title: "Budgeting App",
        description:
            "Dashboard - Spending Summary Overview. This is a spending summary dashboard built using React, Next.js, and Recharts for visualizing transaction data. The app allows users to filter transactions based on a selected timeframe (week or month) and see a bar chart representation of spending across different categories. Users can also compare their actual spending with their budgeted amounts to see how they are tracking.",
        tech: ["Next.js", "MongoDB", "Tailwind", "Recharts", "JWT", "ShadCn"],
        skills: [
            "Data Filtering & Aggregation",
            "Chart Visualization with Recharts",
            "Date Range Selection",
            "Budget vs Actual Comparison",
            "Responsive Dashboard Design"
        ],
        github: "https://github.com/SahilSharma1212/finance-tracker",
        live: "https://finance-tracker-coral-gamma.vercel.app/",
        images: ["/budgeting1.png", "/budgeting2.png", "/budgeting3.png"],
    },
    {
        title: "Mental Health Analyser",
        description:
            "A Streamlit-based machine learning app that predicts mental health support needs from user-entered data. Includes classification models for complaint genre and sentiment analysis. Designed for HR use-cases with optional integration for real-time feedback, tone classification, and action recommendations. Lightweight UI for quick interaction and easy deployment.",
        tech: ["Python", "Scikit-learn", "Logistic Regression", "Pandas", "Streamlit"],
        skills: [
            "Machine Learning Model Training",
            "Complaint Classification",
            "Sentiment Analysis",
            "Streamlit UI Design",
            "CSV Parsing and Preprocessing"
        ],
        github: "https://github.com/yourusername/drawing-web",
        live: "",
        images: ["/sentiment1.png", "/sentiment2.png", "/sentiment3.png"],
    },
    {
        title: "E-Malkhana",
        description:
            "Digital Evidence Management System for law enforcement agencies, built with Next.js, Supabase, and TailwindCSS. The application enables secure storage and management of case-related evidence (images, PDFs) with advanced search capabilities, category-based filtering, and role-based access control. It includes automated file deletion from Supabase storage when records are removed, ensuring data consistency and security.",
        tech: ["Next.js", "Supabase", "TailwindCSS", "ShadCn", "JWT", "REST API","Firebase"],
        skills: [
            "Role-Based Access Control",
            "Advanced Search & Filtering",
            "Secure File Upload & Deletion",
            "Supabase Storage Management",
            "Responsive & Accessible UI"
        ],
        github: "https://github.com/SahilSharma1212/E-Malkhana", // replace with actual repo if different
        live: "https://e-malkhana-smoky.vercel.app/", // replace with actual deployed link
        images: ["/emalkhana1.png", "/emalkhana2.png", "/emalkhana3.png"],
    },
];

export default function ProjectsSection() {
    const [activeIndex, setActiveIndex] = useState(1);

    return (
        <div className="flex flex-col items-center min-h-screen text-white px-6 py-16">
            <h1 className="text-4xl font-bold mb-12">Projects</h1>

            <div className="flex flex-col lg:flex-row w-full justify-center relative gap-12">
                {/* Project Cards List */}
                <div className="flex flex-col gap-6 relative z-10 w-full lg:w-auto">
                    {ProjectDetails.map((project, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className={`transition-all duration-500 ease-in-out cursor-pointer rounded-xl overflow-hidden bg-gradient-to-b from-blue-950/50 to-gray-950 px-6 py-4 border border-zinc-700 shadow-indigo-600/15 shadow-lg
                                ${isActive
                                        ? "lg:absolute lg:left-[24rem] lg:top-0 z-20 w-full lg:w-[44rem] xl:w-[48rem] h-auto lg:h-[700px] xl:h-[750px] scale-[0.97] xl:scale-100 shadow-2xl"
                                        : "w-full lg:w-[20rem] h-[12rem] shadow"
                                    }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>

                                {/* Collapsed Card */}
                                {!isActive && (
                                    <div className="text-gray-400">
                                        <p>
                                            <span className="font-bold">Description: </span>
                                            {project.description.substring(0, 60)}....
                                        </p>
                                        <div className="flex gap-3 mt-2 text-indigo-200">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 hover:text-white bg-gray-500/50 px-2 py-1 rounded-md"
                                                >
                                                    <FaGithub /> GitHub
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 hover:text-white bg-gray-500/50 px-2 py-1 rounded-md"
                                                >
                                                    <FaExternalLinkAlt /> Live
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Expanded Card */}
                                {isActive && (
                                    <div className="mt-4 flex flex-col lg:flex-row flex-wrap gap-6 min-h-[900px]">
                                        {/* Left - Description + Tech + Skills + Links */}
                                        <div className="flex flex-col gap-6 w-full lg:w-1/2">
                                            {/* Description */}
                                            <div className="w-full bg-blue-200/10 p-4 rounded-lg">
                                                <h3 className="text-white/80 font-semibold mb-1">Description</h3>
                                                <p className="text-white/90 text-sm">{project.description}</p>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="w-full bg-blue-200/10 p-4 rounded-lg">
                                                <h3 className="text-white/80 font-semibold mb-2">Tech Stack</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-white/10 border border-white/20 px-3 py-1 text-sm rounded-xl"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            {project.skills && (
                                                <div className="w-full bg-blue-200/10 p-4 rounded-lg">
                                                    <h3 className="text-white/80 font-semibold mb-2">Skills Applied</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.skills.map((skill, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-white/10 border border-white/20 px-3 py-1 text-sm rounded-xl whitespace-nowrap"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right - Images and Links Below */}
                                        <div className="flex flex-col items-start gap-4 mt-2 pb-1">
                                            {/* Images */}
                                            <div className="flex flex-col gap-4 overflow-x-auto">
                                                {project.images.map((src, i) => (
                                                    <img
                                                        key={i}
                                                        src={src}
                                                        alt={`Preview ${i + 1}`}
                                                        className="rounded-lg object-cover h-36 w-64 border border-white/10 flex-shrink-0"
                                                    />
                                                ))}
                                            </div>

                                            {/* Links below images */}
                                            <div className="flex gap-6 text-indigo-200 mt-2">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 hover:text-white bg-gray-500/50 px-2 py-1 rounded-md shadow-lg shadow-indigo-400/10"
                                                    >
                                                        <FaGithub /> GitHub
                                                    </a>
                                                )}
                                                {project.live && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 hover:text-white bg-gray-500/50 px-2 py-1 rounded-md shadow-lg shadow-indigo-400/10"
                                                    >
                                                        <FaExternalLinkAlt /> Live
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Placeholder for layout on lg+ */}
                <div className="hidden lg:block w-[48rem] max-xl:w-[40rem] min-h-[750px] rounded-xl p-6 transition-opacity duration-500" />
            </div>
        </div>
    );
}