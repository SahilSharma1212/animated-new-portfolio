"use client"
import {
  FaReact, FaNodeJs, FaGitAlt, FaFigma, FaPython, FaJava, FaFileExcel, FaJsSquare,
  FaHtml5
} from "react-icons/fa";
import {
  SiMongodb, SiTailwindcss, SiNextdotjs, SiTypescript, SiCplusplus, SiPandas,
  SiNumpy, SiScikitlearn, SiSecurityscorecard, SiExpress
} from "react-icons/si";
import { MdDashboard, MdMemory } from "react-icons/md";
import { motion } from 'framer-motion';
import { GiToken } from "react-icons/gi";


const categorizedSkills = {
  "Frontend": [
    {
      name: "React",
      icon: <FaReact size={40} className="text-sky-400" />,
      expertise: "Advanced"
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={40} className="text-white" />,
      expertise: "Advanced"
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={40} className="text-slate-400" />,
      expertise: "Proficient"
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={40} className="text-blue-500" />,
      expertise: "Proficient"
    },
    {
      name: "HTML",
      icon: <FaHtml5 size={40} className="text-amber-500" />,
      expertise: "Expert"
    },
  ],
  "Backend": [
    {
      name: "Node.js",
      icon: <FaNodeJs size={40} className="text-green-500" />,
      expertise: "Advanced"
    },
    {
      name: "Express.js",
      icon: <SiExpress size={40} className="text-white" />,
      expertise: "Proficient"
    },
  ],
  "Database": [
    {
      name: "MongoDB",
      icon: <SiMongodb size={40} className="text-green-600" />,
      expertise: "Advanced"
    },
  ],
  "Authentication": [
    {
      name: "NextAuth.js",
      icon: <SiSecurityscorecard size={40} className="text-white" />,
      expertise: "Proficient"
    },
    {
      name: "JWT",
      icon: <GiToken size={40} className="text-blue-400" />,
      expertise: "Advanced"
    }
  ],
  "Programming Languages": [
    {
      name: "Python",
      icon: <FaPython size={40} className="text-yellow-400" />,
      expertise: "Advanced"
    },
    {
      name: "C++",
      icon: <SiCplusplus size={40} className="text-blue-300" />,
      expertise: "Intermediate"
    },
    {
      name: "Java",
      icon: <FaJava size={40} className="text-red-500" />,
      expertise: "Intermediate"
    },
    {
      name: "JavaScript",
      icon: <FaJsSquare size={40} className="text-yellow-400" />,
      expertise: "Expert"
    },
  ],
  "AI/ML & Data": [
    {
      name: "DSA",
      icon: <MdMemory size={40} className="text-purple-400" />,
      expertise: "Ongoing"
    },
    {
      name: "Pandas",
      icon: <SiPandas size={40} className="text-pink-300" />,
      expertise: "Proficient"
    },
    {
      name: "NumPy",
      icon: <SiNumpy size={40} className="text-blue-400" />,
      expertise: "Proficient"
    },
    {
      name: "Scikit-learn",
      icon: <SiScikitlearn size={40} className="text-yellow-300" />,
      expertise: "Intermediate"
    },
  ],
  "Tools & Platforms": [
    {
      name: "Git",
      icon: <FaGitAlt size={40} className="text-orange-500" />,
      expertise: "Proficient"
    },
    {
      name: "Figma",
      icon: <FaFigma size={40} className="text-pink-500" />,
      expertise: "Intermediate"
    },
    {
      name: "Excel",
      icon: <FaFileExcel size={40} className="text-green-700" />,
      expertise: "Proficient"
    },
    {
      name: "PowerBI",
      icon: <MdDashboard size={40} className="text-purple-700" />,
      expertise: "Basic"
    },
  ]
};


export default function SkillsSection() {
  const entries = Object.entries(categorizedSkills);

  return (
    <section className="w-full px-6 py-24 text-white relative z-30">
      <h2 className="text-3xl font-bold text-center mb-16">⚙️ My Tech Stack Timeline</h2>

      <div className="relative">
        {/* Vertical Line - Desktop Only */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-slate-500/25 to-slate-500/25 transform -translate-x-1/2 z-0 hidden md:block" />

        {/* Desktop Timeline Layout */}
        <div className="hidden md:flex flex-col gap-32 relative">
          {entries.map(([category, skills], idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div key={category} className="relative h-fit min-h-[140px]">
                {/* Dot */}
                <motion.div
                  initial={{ y: -4, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-slate-500/25 to-gray-600/25 via-neutral-600/25 rounded-full border-4 border-[#0c0c15] z-10 shadow shadow-blue-200"
                />

                {/* Skill Block */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.5 }}
                  className={`absolute top-0 max-w-xs px-8 py-3 pb-6 rounded-xl border border-neutral-700 shadow-lg shadow-blue-400/10
                    backdrop-blur-sm bg-gradient-to-br from-slate-500/10 to-gray-600/10 via-neutral-600/10
                    ${isLeft
                      ? "left-[calc(50%-1.5rem)] -translate-x-full text-left"
                      : "left-[calc(50%+1.5rem)] text-right"
                    }`}
                >
                  <h3 className="text-xl font-semibold text-slate-200 mb-4 text-center">{category}</h3>
                  <div className="flex flex-wrap justify-center gap-8 px-2">
                    {skills.map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-start gap-2 group hover:scale-105 transition-transform relative"
                      >
                        <div className="flex flex-col items-center relative group">
                          {skill.icon}
                          <p className="text-sm text-gray-300 group-hover:text-white font-semibold">{skill.name}</p>

                          {/* Tooltip with animation and arrow */}
                          {skill.expertise && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="absolute bottom-full mb-3 hidden group-hover:block bg-black/90 text-white text-xs font-medium px-3 py-1 rounded shadow-xl w-max max-w-xs z-20 text-center left-1/2 -translate-x-1/2 pointer-events-none"
                            >
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/90 z-[-1]" />
                              {skill.expertise}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Mobile Grid Layout */}
        <div className="md:hidden flex flex-col gap-8">
          {entries.map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full px-4 py-6 rounded-xl border border-neutral-700 shadow-lg shadow-blue-400/10
                backdrop-blur-sm bg-gradient-to-br from-slate-500/10 to-gray-600/10 via-neutral-600/10"
            >
              <h3 className="text-xl font-semibold text-slate-200 mb-6 text-center">{category}</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center group hover:scale-105 transition-transform relative"
                  >
                    <div className="flex flex-col items-center relative group">
                      {skill.icon}
                      <p className="text-sm text-gray-300 group-hover:text-white font-semibold mt-2">{skill.name}</p>

                      {/* Mobile Tooltip */}
                      {skill.expertise && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full mb-3 hidden group-hover:block bg-black/90 text-white text-xs font-medium px-3 py-1 rounded shadow-xl w-max max-w-xs z-20 text-center left-1/2 -translate-x-1/2 pointer-events-none"
                        >
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/90 z-[-1]" />
                          {skill.expertise}
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}