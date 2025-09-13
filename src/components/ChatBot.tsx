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
}

const ChatBot: React.FC<ChatBotProps> = ({
    className = '',
    maxMessages = 100,
    botName = 'Chat Assistant',
    welcomeMessage = "Hey I'm your personal chatbot where you can ask all about Sahil and his coding experiences."
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

    // Handle sending message
    const sendMessage = (): void => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        // Add user's message
        const userMessage: ChatMessage = {
            source: "user",
            text: trimmedMessage,
            id: crypto.randomUUID(),
            timestamp: new Date()
        };

        setChats(prev => {
            const newChats = [...prev, userMessage];
            // Limit messages to prevent memory issues
            return newChats.length > maxMessages 
                ? newChats.slice(-maxMessages) 
                : newChats;
        });
        setMessage("");
        setIsTyping(true);

        // Simulate bot response after 1-2 seconds
        const responseDelay = Math.random() * 1000 + 1000;
        setTimeout(() => {
            const botReply: ChatMessage = {
                source: "model",
                text: generateBotResponse(trimmedMessage),
                id: crypto.randomUUID(),
                timestamp: new Date()
            };
            setChats(prev => {
                const newChats = [...prev, botReply];
                return newChats.length > maxMessages 
                    ? newChats.slice(-maxMessages) 
                    : newChats;
            });
            setIsTyping(false);
        }, responseDelay);
    };

    // Simulated bot response function with better responses
    const generateBotResponse = (userMsg: string): string => {
        const responses = [
            `You asked about: "${userMsg}". That's an interesting question!`,
            `Thanks for asking about "${userMsg}". I'm still learning but happy to help!`,
            `Regarding "${userMsg}" - I'd love to help you with that topic.`,
            `You mentioned "${userMsg}". Let me think about that...`,
            `That's a great question about "${userMsg}". Here's what I think...`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
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
                                <p className="break-words">{chat.text}</p>
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
                            placeholder="Type your message..."
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