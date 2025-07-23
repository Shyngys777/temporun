import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle, ChevronRight, MoreVertical, Clock, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
    content: string;
    isBot: boolean;
    timestamp?: string;
}

interface QuickReply {
    label: string;
    value: string;
}

const initialMessages: Message[] = [
    {
        content: "Сәлеметсіз бе! I'm Shyngys, your running assistant. How can I help you today with running gear or advice?",
        isBot: true,
        timestamp: getCurrentTime()
    }
];

function getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const quickReplies: QuickReply[] = [
    { label: "Shoe Recommendations", value: "Can you recommend running shoes for beginners?" },
    { label: "Size Guide", value: "How do I find my correct running shoe size?" },
    { label: "Shipping Info", value: "What are your shipping options and times?" },
    { label: "Returns Policy", value: "What is your return policy for shoes?" },
    { label: "Training Advice", value: "Do you have tips for starting a running routine?" },
    { label: "Brand Info", value: "Which brands do you carry?" },
    { label: "Store Locations", value: "Where are your physical stores located?" },
    { label: "New Arrivals", value: "What are the latest shoe models you have?" },
];

const botResponses: Record<string, string> = {
    'default': "I don't have specific information about that. Would you like to know about our running shoes, shipping policy, or training advice?",

    'hello': "Hello! How can I help you with your running journey today?",
    'hi': "Hi there! I'm Shyngys, your running assistant. How can I assist you today?",
    'сәлем': "Сәлем! How can I assist you with your running needs today?",

    'shoes': "Our collection includes road running, trail running, and racing shoes from brands like Nike, Adidas, ASICS, Brooks, Hoka, and more. Are you looking for a specific type of running shoe?",
    'products': "We offer a wide range of running shoes, apparel, and accessories from leading brands. Is there a specific category you're interested in?",
    'sizing': "For running shoes, we generally recommend going half a size up from your regular shoes to allow for foot swelling during runs. You can check our detailed size guide at the Size Guide page for more specific measurements.",

    'payment': "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.",
    'shipping': "We offer free standard shipping on orders over $50. Delivery typically takes 3-5 business days within Kazakhstan. Express shipping options are available at checkout for urgent orders.",
    'returns': "We have a 30-day return policy for unworn items in original packaging. You can initiate a return through your account or contact our customer service team for assistance.",
    'warranty': "Most of our running shoes come with a manufacturer's warranty against defects. The specific terms vary by brand, but we're happy to assist with any warranty claims.",

    'running tips': "Some basic running tips: start slow, maintain good posture, invest in proper running shoes, stay hydrated, and gradually increase your distance. Would you like specific advice for beginners or experienced runners?",
    'training': "For training plans, we recommend starting with 3 runs per week and gradually increasing. The key is consistency and listening to your body. Would you like tips for a specific race distance?",
    'injuries': "Common running injuries include shin splints, runner's knee, and plantar fasciitis. The best approach is prevention through proper shoes, form, and training. For existing injuries, we recommend consulting a healthcare professional.",
    'marathon': "Marathon training typically takes 16-20 weeks. The key elements are the long run, speed work, and recovery. Kazakhstan has several marathons throughout the year, including the Almaty Marathon in April.",

    'brands': "We carry premium running brands including Nike, Adidas, ASICS, Brooks, New Balance, Hoka, Saucony, and more. Is there a specific brand you're interested in?",
    'nike': "Nike is known for innovation and performance with popular models like Pegasus, Vaporfly, and Alphafly featuring ZoomX and Air technologies.",
    'adidas': "Adidas offers excellent running shoes with Boost and Lightstrike cushioning. Popular models include Ultraboost, Adizero, and Terrex for trails.",
    'asics': "ASICS is renowned for stability and support with GEL cushioning technology. The Gel-Kayano, Gel-Nimbus, and GT series are customer favorites.",
    'brooks': "Brooks focuses exclusively on running with DNA LOFT cushioning and GuideRails support. Popular models include Ghost, Adrenaline GTS, and Glycerin.",
    'hoka': "Hoka is known for maximum cushioning with a lightweight feel. The Clifton, Bondi, and Speedgoat are their most popular road and trail options.",

    'location': "We have physical stores in major cities across Kazakhstan, with our flagship store in Almaty. Our products are also available through our online store with shipping nationwide.",
    'events': "We regularly organize running events and community runs across Kazakhstan. Check our News section for upcoming events in your area!",
    'sale': "We currently have our seasonal sale with up to 40% off on selected running gear. You can check the Sale section on our website for all discounted items.",

    'thanks': "You're welcome! Is there anything else I can help you with?",
    'thank you': "You're welcome! Happy running, and don't hesitate to chat again if you have more questions!",
    'bye': "Goodbye! Happy running, and don't hesitate to chat again if you have more questions!",
    'рахмет': "Рахмет! Is there anything else I can help you with today?",
};

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (message = input) => {
        if (!message.trim()) return;

        setIsSending(true);
        const userMessage = {
            content: message,
            isBot: false,
            timestamp: getCurrentTime()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            const botResponse = generateBotResponse(message);

            setMessages(prev => [
                ...prev,
                {
                    content: botResponse,
                    isBot: true,
                    timestamp: getCurrentTime()
                }
            ]);

            toast.success("Shyngys has responded to your message", {
                duration: 2000,
                position: "bottom-right",
            });
        } catch (error) {
            console.error('Error generating response:', error);
            toast.error("Sorry, I couldn't process your message. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    const handleQuickReply = (reply: string) => {
        handleSendMessage(reply);
    };

    const generateBotResponse = (userInput: string) => {
        const normalizedInput = userInput.toLowerCase().trim();

        for (const [keyword, response] of Object.entries(botResponses)) {
            if (normalizedInput.includes(keyword)) {
                return response;
            }
        }

        return botResponses.default;
    };

    const ChatContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between bg-primary p-4 rounded-t-lg text-white">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bot size={28} className="text-white" aria-hidden="true" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary"></span>
                    </div>
                    <div>
                        <h3 className="font-medium text-lg" id="chat-title">Shyngys</h3>
                        <p className="text-xs text-white/80">Running Assistant</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-primary/90"
                        aria-label="Minimize chat"
                    >
                        <MinusCircle size={18} aria-hidden="true" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-primary/90"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                    >
                        <X size={18} aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <div
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto bg-gray-50"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
                aria-live="polite"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                        {message.isBot && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot size={16} className="text-white" />
                            </div>
                        )}

                        <div className={`max-w-[80%] relative group`}>
                            <div
                                className={cn(
                                    "px-4 py-3 rounded-2xl shadow-sm",
                                    message.isBot
                                        ? "bg-white text-gray-800 rounded-tl-none"
                                        : "bg-primary text-white rounded-tr-none"
                                )}
                            >
                                {message.content}
                            </div>
                            <div className={`text-xs mt-1 text-gray-500 ${message.isBot ? 'ml-1' : 'mr-1 text-right'}`}>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                    {message.timestamp}
                </span>
                            </div>
                        </div>

                        {!message.isBot && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                                <span className="text-xs font-medium text-gray-700">You</span>
                            </div>
                        )}
                    </div>
                ))}

                {messages.length > 0 && messages[messages.length - 1].isBot && (
                    <div className="flex flex-wrap gap-2 mb-4 mt-2">
                        {quickReplies.slice(0, 4).map((reply, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickReply(reply.value)}
                                className="px-3 py-2 bg-white border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-colors"
                            >
                                {reply.label}
                            </button>
                        ))}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white rounded-b-lg">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="flex gap-2 items-center"
                >
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border-gray-200 focus:border-primary"
                        aria-label="Your message"
                        disabled={isSending}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isSending || !input.trim()}
                        aria-label="Send message"
                        className="bg-primary hover:bg-primary/90"
                    >
                        <Send size={16} className="text-white" aria-hidden="true" />
                    </Button>
                </form>
            </div>
        </div>
    );

    return (
        <div className="fixed z-50 bottom-0 right-0">
            <Button
                className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 h-14 w-14 p-0 animate-bounce hover:animate-none bg-primary hover:bg-primary/90"
                onClick={() => setIsOpen(true)}
                aria-label="Chat with Shyngys"
                title="Chat with Shyngys"
            >
                <MessageCircle size={24} />
            </Button>

            {isMobile ? (
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerContent className="h-[80vh] md:max-w-[450px] mx-auto">
                        <ChatContent />
                    </DrawerContent>
                </Drawer>
            ) : (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side="right" className="p-0 sm:max-w-[400px] w-[400px] border rounded-lg overflow-hidden shadow-xl">
                        <ChatContent />
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
};

export default ChatBot;