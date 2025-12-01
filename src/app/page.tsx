"use client"
import { useEffect, useState } from "react";
import HeroSectionPage from "./../components/HeroSectionPage";
import IntroSectionPage from "./../components/IntroSectionPage"
import { motion } from "framer-motion";
import { SiVercel } from "react-icons/si";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function App() {
  const [introVisibility, setIntroVisibility] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisibility(false);
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="bg-gradient-to-b from-blue-950 via-blue-950 to-[hsl(227,88%,6%)] pb-5 scrollbar-dark">
      <motion.div
        className="intro-section"
        initial={{ y: 440, opacity: 1 }}
        animate={{ y: introVisibility ? 0 : -440, opacity: introVisibility ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: introVisibility ? "block" : "none" }}
      >
       <IntroSectionPage />
      </motion.div>

      <motion.div
        className="hero-section max-w-screen overflow-x-hidden"
        initial={{ y: 440, opacity: 0 }}
        animate={{ y: introVisibility ? 440 : 0, opacity: introVisibility ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: introVisibility ? "none" : "block" }}
      >
        <HeroSectionPage/>
      </motion.div>

      
    </div>
    {/* ChatBot/Footer section */}
                <footer className={ "bg-gray-950 text-white py-4"}>
                    <div className="container mx-auto flex justify-center gap-6 text-lg">
                        <a href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:sahilbhaisharma1212@gmail.com" className="hover:text-red-400">
                            <FaEnvelope />
                        </a>
                        <a href="https://github.com/SahilSharma1212" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaGithub />
                        </a>
                        <a href="https://vercel.com/sahil-sharmas-projects-ac471dc4" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            <SiVercel />
                        </a>
                    </div>
                    <p className="text-center text-sm mt-3 opacity-70">
                        © {new Date().getFullYear()} Sahil Sharma. All rights reserved.
                    </p>
                </footer>
                </>
  );
}

export default App;