"use client"
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";



const CollegeInfo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                animate={{ y: [2, -1, 2.5, -1.5, 1, -2], rotate: [1, -1, 1.2, -1.3, 0.8, -1] }}
                transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
                className="w-72 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl text-white motion-safe:will-change-transform"
            >
                <p className="text-white font-medium">🎓 College:</p> Bhilai Institute of Technology Durg
            </motion.div>
        </motion.div>
    );
};

export default CollegeInfo;



export function BranchInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                animate={{ y: [1.5, -1, 2, -1.5, 2, -1.5], rotate: [1, -1.25, 1, -0.9, 1, -1] }}
                transition={{ repeat: Infinity, duration: 9.5, ease: "easeInOut" }}
                className="w-72 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl text-white motion-safe:will-change-transform"
            >
                <p className="text-white font-medium">📚 Degree:</p> B.Tech in Computer Science (2026)
            </motion.div>
        </motion.div>
    )

}


export function BioInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                animate={{ y: [1.5, -1, 2, -0.8, 1.2, -1.2], rotate: [0.5, -0.8, 0.3, -1, 0.4, -0.6] }}
                transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
                className="w-80 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl text-white motion-safe:will-change-transform"
            >
                <p className="text-white font-medium">Hey There 👋:</p>
                <p className="text-gray-300 mt-1">
                    I&apos;m a tech-driven creative passionate about crafting immersive web experiences. I love building futuristic UIs, solving real-world problems with the MERN stack, and exploring AI/ML innovations that push boundaries.
                </p>

            </motion.div>
        </motion.div>
    )
}

export function TypeWriterEffect(){
    return(
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                animate={{ y: [1.5, -1, 2, -0.8, 1.2, -1.2], rotate: [0.5, -0.8, 0.3, -1, 0.4, -0.6] }}
                transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl text-white motion-safe:will-change-transform"
            >
                <p className="text-lg text-slate-300 mt-1 font-bold text-shadow-lg text-shadow-gray-200/20">
                            <Typewriter
                                words={['S/W Engineer', 'Web Developer', 'Data Analyst', 'ML Engineer']}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={60}
                                deleteSpeed={40}
                                delaySpeed={1200}
                            />
                        </p>

            </motion.div>
        </motion.div>
    )
}