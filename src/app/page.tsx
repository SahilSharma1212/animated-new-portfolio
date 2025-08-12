import { useEffect, useState } from "react";
import HeroSectionPage from "./components/HeroSectionPage";
import IntroSectionPage from "./components/IntroSectionPage";
import { motion } from "framer-motion";

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
    <div className=" bg-gradient-to-b from-gray-950 via-slate-950 to-[hsl(240,27%,6%)]">
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
  );
}

export default App;