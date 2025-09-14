"use client"
import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { BsSend } from "react-icons/bs";
import { RiRobot2Line } from 'react-icons/ri';

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
    Outside of development work, Sahil enjoys designing interfaces, creating engaging content, and experimenting with new technologies. He actively explores creative solutions, stays updated with industry trends, and enjoys working on projects that combine technology with user experience.

    Sahil's email id is - sahilbhaisharma1212@gmail.com
    Sahil's github link is - https://github.com/SahilSharma1212?tab=repositories
    Sahil's Linked in link is - https://www.linkedin.com/in/sahil-sharma-822a752a9/ 
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
    const chatsEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Scroll to bottom when chats update
    useEffect(() => {
        chatsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    }, [message]);

    // Function to call Gemini API
    const callGeminiAPI = async (userMessage: string): Promise<string> => {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `${systemContext}\n\nUser: ${userMessage}`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from Gemini API');
            }
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
        if (!trimmedMessage || isTyping) return;

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

    return (
        <div className={`h-screen max-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 ${className}`}>
            {/* Fixed Header */}
            <header className='flex-shrink-0 p-4 border-b border-cyan-500/20 bg-black/40 backdrop-blur-sm'>
                <div className='flex items-center justify-center gap-3'>
                    <RiRobot2Line size={32} className='text-cyan-400' aria-hidden="true" />
                    <h1 className='text-lg font-medium text-cyan-100'>{botName}</h1>
                </div>
                {error && (
                    <div className='mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm text-center'>
                        <p>⚠️ API Error: {error}</p>
                    </div>
                )}
            </header>

            {/* Chat Messages Container */}
            <main className='flex-1 min-h-0 p-4 overflow-hidden'>
                <div
                    className='h-full overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent'
                    style={{ scrollbarWidth: 'thin' }}
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
                                    max-w-[80%] sm:max-w-[70%] p-3 rounded-2xl text-white text-sm leading-relaxed
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
                            <div className="bg-cyan-700 rounded-2xl rounded-bl-md p-3 max-w-[80%] sm:max-w-[70%]">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="sr-only">Bot is typing...</span>
                            </div>
                        </div>
                    )}

                    <div ref={chatsEndRef} />
                </div>
            </main>

            {/* Fixed Input Section */}
            <footer className='flex-shrink-0 p-4 border-t border-cyan-500/20 bg-black/40 backdrop-blur-sm'>
                <form onSubmit={handleSubmit} className='flex gap-2 max-w-4xl mx-auto'>
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
                                w-full px-4 py-3 rounded-2xl resize-none
                                bg-slate-700/50 border border-slate-600/50
                                text-white placeholder-slate-400
                                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200
                                min-h-[50px] max-h-[120px]
                            '
                            style={{
                                height: 'auto',
                                minHeight: '50px'
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
                        '
                        aria-label="Send message"
                    >
                        <BsSend size={18} aria-hidden="true" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatBot;