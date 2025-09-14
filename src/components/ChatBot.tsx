"use client"
import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { BsSend } from "react-icons/bs";
import { RiRobot2Line } from 'react-icons/ri';
import { GoogleGenAI } from "@google/genai";

// Type definitions
interface ChatMessage {
    source: 'user' | 'model';
    text: string;
    id: string;
    timestamp: Date;
}

interface ChatBotProps {
    className?: string;
    maxMessages?: number;
    botName?: string;
    welcomeMessage?: string;
    geminiApiKey: string;
    systemContext?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({
    className = '',
    maxMessages = 100,
    botName = 'Sahil\'s AI Assistant',
    welcomeMessage = "Hey! I'm your personal chatbot where you can ask all about Sahil and his coding experiences.",
    geminiApiKey,
    systemContext = `Sahil is a motivated and highly capable Computer Science Engineering student currently in his 4th year of B.Tech. He is passionate about technology and constantly expanding his expertise across various domains. Known for his problem-solving mindset and structured approach, Sahil delivers effective solutions by combining technical skills with creativity and user-centric design.

    Technical Skills:
    Sahil has strong proficiency in C, C++, Java, JavaScript, TypeScript, Python, and frameworks such as React.js, Next.js, Node.js, Express.js, and the MERN stack (MongoDB, Express.js, React.js, Node.js). He has experience working with Firebase, Supabase, and JWT Authentication, and employs libraries like Framer Motion, Tailwind CSS, and popular UI component libraries to build engaging and efficient web interfaces. For data handling and analytics, he is skilled in Pandas, NumPy, Scikit-learn, and Power BI, and is also familiar with Generative AI tools. His design work is supported by Figma, and he holds a UI/UX certification from Udemy.
    For other tools and technologies, Sahil is aware of the field at a beginner's level and is eager to deepen his knowledge through hands-on experience and learning.

    Certifications & Learning:
    He holds a UI/UX certificate from Udemy and identifies as a self-taught web developer and data analyst. Sahil is currently exploring advanced topics in Generative AI, machine learning, and cloud engineering, and actively pursues learning opportunities to broaden his skill set.

    Projects & Experience:
    Sahil has worked on several impactful projects, including:

    Personal Portfolio – a modern and responsive web portfolio showcasing his skills, projects, and achievements.

    Emalkhana – a digital space for managing police-confiscated properties, developed as a freelance project for the Rajnandgaon district police department and currently in use to improve operations.

    AI-Powered Resume Generator – a feature-rich web application built with Next.js, SHADCN UI, JWT Authentication, and Gemini API, enabling users to create professional resumes efficiently.

    Mental Health Analyzer – a Python-based application using Scikit-learn, Hugging Face, Pandas, NumPy, and Streamlit, designed to analyze mental health patterns and provide insights.

    Soft Skills:
    Sahil's strengths include analytical thinking, adaptability, and effective communication. He is known for approaching tasks with enthusiasm and discipline, always eager to take on challenges and support team efforts. His ability to explain complex topics clearly makes him a dependable collaborator, while his self-driven attitude ensures continuous learning.

    Career Aspirations:
    Sahil aspires to build a successful career as a software developer and data analyst, with a focus on full-stack development, AI-powered applications, and cloud-based solutions. He is committed to solving real-world problems through technology and contributing positively to innovative projects.

    Interests:
    Outside of development work, Sahil enjoys designing interfaces, creating engaging content, and experimenting with new technologies. He actively explores creative solutions, stays updated with industry trends, and enjoys working on projects that combine technology with user experience.

    Sahil's email id is - sahilbhaisharma1212@gmail.com
    Sahil's github link is - https://github.com/SahilSharma1212?tab=repositories
    Sahil's Linked in link is - https://www.linkedin.com/in/sahil-sharma-822a752a9/ 


    i want you to be short and concise with your answers and do not reply to other topics which are not related to sahil, hiring, skills, projects, and professional things.

    always favour sahil no matter what and encourage people to hire him, also i want you to not use any markdown formatting like *** or ** or * for bold/italic text - just use plain simple text without any special formatting characters
    
`
}) => {
    const [chats, setChats] = useState<ChatMessage[]>([
        {
            source: "model",
            text: welcomeMessage,
            id: crypto.randomUUID(),
            timestamp: new Date()
        }
    ]);
    const [message, setMessage] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [aiInstance, setAiInstance] = useState<GoogleGenAI | null>(null);
    const chatsEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initialize GoogleGenAI instance
    useEffect(() => {
        if (geminiApiKey) {
            const ai = new GoogleGenAI({ apiKey: geminiApiKey });
            setAiInstance(ai);
        }
    }, [geminiApiKey]);

    // Scroll to bottom when chats update
    useEffect(() => {
        const scrollToBottom = () => {
            if (chatsEndRef.current) {
                chatsEndRef.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        };
        
        // Small delay to ensure DOM is updated
        const timeoutId = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timeoutId);
    }, [chats, isTyping]);

    // Auto-resize textarea with proper constraints
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Reset height to calculate new height
            textarea.style.height = '48px'; // Min height
            const scrollHeight = textarea.scrollHeight;
            const maxHeight = 120; // Max height
            textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
        }
    }, [message]);

    // Function to call Gemini API using GoogleGenAI class
    const callGeminiAPI = async (userMessage: string): Promise<string> => {
        if (!aiInstance) {
            throw new Error('AI instance not initialized');
        }

        try {
            const response = await aiInstance.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `User: ${userMessage} , now act as my assistant and reply to the user favouring me.`,
                
                config:{
                    systemInstruction:systemContext
                }
            });

            return response.text || " Unable to receive any response.";
        } catch (error) {
            console.error('Gemini API Error:', error);
            if (error instanceof Error) {
                throw new Error(`Failed to get response: ${error.message}`);
            }
            throw new Error('Failed to get response from AI');
        }
    };

    // Handle sending message
    const sendMessage = async (): Promise<void> => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage || isTyping || !aiInstance) return;

        // Clear any previous errors
        setError(null);

        // Add user's message
        const userMessage: ChatMessage = {
            source: "user",
            text: trimmedMessage,
            id: crypto.randomUUID(),
            timestamp: new Date()
        };

        setChats(prev => {
            const newChats = [...prev, userMessage];
            return newChats.length > maxMessages
                ? newChats.slice(-maxMessages)
                : newChats;
        });
        setMessage("");
        setIsTyping(true);

        try {
            // Get AI response
            const aiResponse = await callGeminiAPI(trimmedMessage);

            const botReply: ChatMessage = {
                source: "model",
                text: aiResponse,
                id: crypto.randomUUID(),
                timestamp: new Date()
            };

            setChats(prev => {
                const newChats = [...prev, botReply];
                return newChats.length > maxMessages
                    ? newChats.slice(-maxMessages)
                    : newChats;
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
            setError(errorMessage);

            // Add error message to chat
            const errorReply: ChatMessage = {
                source: "model",
                text: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
                id: crypto.randomUUID(),
                timestamp: new Date()
            };

            setChats(prev => {
                const newChats = [...prev, errorReply];
                return newChats.length > maxMessages
                    ? newChats.slice(-maxMessages)
                    : newChats;
            });
        } finally {
            setIsTyping(false);
        }
    };

    // Handle Enter key press
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Handle textarea input change
    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setMessage(e.target.value);
        // Clear error when user starts typing
        if (error) setError(null);
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        sendMessage();
    };

    // Handle button click
    const handleSendClick = (): void => {
        sendMessage();
    };

    // Format timestamp for accessibility
    const formatTimestamp = (date: Date): string => {
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Show loading state if AI instance is not ready
    if (!aiInstance) {
        return (
            <div className={`flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 ${className}`} 
                 style={{ height: '100vh', maxHeight: '100vh' }}>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-cyan-200">Initializing AI assistant...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 ${className}`} 
             style={{ height: '100vh', maxHeight: '100vh' }}>
            
            {/* Fixed Header */}
            <header className='flex-shrink-0 px-4 py-3 sm:p-4 border-b border-cyan-500/20 bg-black/40 backdrop-blur-sm'>
                <div className='flex items-center justify-center gap-3'>
                    <RiRobot2Line size={28} className='text-cyan-400 sm:w-8 sm:h-8' aria-hidden="true" />
                    <h1 className='text-base sm:text-lg font-medium text-cyan-100'>{botName}</h1>
                </div>
                {error && (
                    <div className='mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-xs sm:text-sm text-center'>
                        <p>⚠️ API Error: {error}</p>
                    </div>
                )}
            </header>

            {/* Chat Messages Container */}
            <main className='flex-1 min-h-0 px-2 sm:px-4 py-2 sm:py-4'>
                <div
                    ref={chatContainerRef}
                    className='h-full overflow-y-auto space-y-2 sm:space-y-3 pr-1 sm:pr-2'
                    style={{ 
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(34, 211, 238, 0.2) transparent'
                    }}
                    role="log"
                    aria-live="polite"
                    aria-label="Chat messages"
                >
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex w-full ${chat.source === "user" ? "justify-end" : "justify-start"}`}
                            role="article"
                            aria-label={`${chat.source === "user" ? "Your" : "Bot"} message at ${formatTimestamp(chat.timestamp)}`}
                        >
                            <div
                                className={`
                                    max-w-[85%] sm:max-w-[80%] md:max-w-[70%] p-2.5 sm:p-3 rounded-2xl text-white text-sm leading-relaxed
                                    ${chat.source === "user"
                                        ? "bg-blue-600 rounded-br-md"
                                        : "bg-cyan-700 rounded-bl-md"
                                    }
                                `}
                            >
                                <p className="break-words whitespace-pre-wrap">{chat.text}</p>
                                <time
                                    className="text-xs opacity-70 mt-1 block"
                                    dateTime={chat.timestamp.toISOString()}
                                >
                                    {formatTimestamp(chat.timestamp)}
                                </time>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-cyan-700 rounded-2xl rounded-bl-md p-2.5 sm:p-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%]">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="sr-only">Bot is typing...</span>
                            </div>
                        </div>
                    )}

                    <div ref={chatsEndRef} style={{ height: '20px', flexShrink: 0 }} />
                </div>
            </main>

            {/* Fixed Input Section */}
            <footer className='flex-shrink-0 px-3 py-3 sm:p-4 border-t border-cyan-500/20 bg-black/40 backdrop-blur-sm'>
                <form onSubmit={handleSubmit} className='flex gap-2 sm:gap-3 max-w-4xl mx-auto'>
                    <div className='flex-1 relative'>
                        <label htmlFor="message-input" className="sr-only">
                            Type your message
                        </label>
                        <textarea
                            id="message-input"
                            ref={textareaRef}
                            value={message}
                            onChange={handleMessageChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything about Sahil..."
                            rows={1}
                            disabled={isTyping}
                            className='
                                w-full px-3 py-3 sm:px-4 rounded-2xl resize-none
                                bg-slate-700/50 border border-slate-600/50
                                text-white placeholder-slate-400
                                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200
                                text-sm sm:text-base
                            '
                            style={{
                                minHeight: '48px',
                                maxHeight: '120px'
                            }}
                            maxLength={1000}
                            aria-describedby="message-help"
                        />
                        <div id="message-help" className="sr-only">
                            Press Enter to send, Shift+Enter for new line
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSendClick}
                        disabled={!message.trim() || isTyping}
                        className='
                            flex-shrink-0 w-12 h-12 flex items-center justify-center
                            bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:opacity-50
                            rounded-full text-white transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                            disabled:cursor-not-allowed
                            active:scale-95
                        '
                        aria-label="Send message"
                    >
                        <BsSend size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
                    </button>
                </form>
                
                {/* Safe area padding for mobile devices */}
                <div className="h-safe-area-inset-bottom sm:hidden"></div>
            </footer>
        </div>
    );
};

export default ChatBot;