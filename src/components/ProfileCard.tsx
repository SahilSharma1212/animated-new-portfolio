"use client"
import { motion } from 'framer-motion';

const ProfileCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{opacity:1,y:0}}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <motion.div
                animate={{boxShadow: [
                        '0 0 20px #6081b370',   // cyan dim
                        '0 0 40px #6067b330',   // bright
                        '0 0 20px #6081b370',   // back to dim
                    ],
                }}
                transition={{duration:3,repeat:Infinity,ease:"easeInOut"}}
                className="relative w-80 max-w-sm p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl hover:shadow-[#1a2638] 400/20 hover:border-[#1a2638] 400/20 transition-all text-white z-10"
            >
                {/* Profile Image */}
                <div className="h-64 rounded-2xl overflow-hidden border-4 border-[#1a2638] mx-auto mb-4 shadow-md">
                    <img
                        src="/profile.jpg"
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 'auto' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="overflow-hidden"
                >
                    {/* Name and Title */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold">Sahil Sharma</h2>
                        
                    </div>


                    {/* Socials / Links */}
                    <div className="mt-5 flex justify-center gap-4">
                        <a href="#" className="text-[#1a2638] 400 hover:text-white transition">
                            <i className="ri-github-fill text-xl"></i>
                        </a>
                        <a href="#" className="text-[#1a2638] 400 hover:text-white transition">
                            <i className="ri-linkedin-fill text-xl"></i>
                        </a>
                        <a href="#" className="text-[#1a2638] 400 hover:text-white transition">
                            <i className="ri-instagram-line text-xl"></i>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProfileCard;
