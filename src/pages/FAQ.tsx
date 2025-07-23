
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

// FAQ data structure
const faqCategories = [
    {
        category: "Orders & Shipping",
        faqs: [
            {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history."
            },
            {
                question: "What are your shipping rates?",
                answer: "We offer free standard shipping on orders over $50. For orders under $50, standard shipping is $5.99. Express shipping is available for $12.99, and Next Day delivery for $24.99."
            },
            {
                question: "How long will it take to receive my order?",
                answer: "Standard shipping typically takes 3-5 business days, Express shipping 2-3 business days, and Next Day delivery arrives the next business day if ordered before 2 PM local time."
            },
            {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to select international destinations. International shipping rates start at $19.99 and delivery typically takes 7-14 business days."
            },
            {
                question: "Can I change or cancel my order after it's placed?",
                answer: "You may request changes or cancellation within 2 hours of placing your order by contacting our customer service team. Once an order has been processed, it cannot be modified or canceled."
            }
        ]
    },
    {
        category: "Returns & Exchanges",
        faqs: [
            {
                question: "What is your return policy?",
                answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in their original packaging with all tags attached."
            },
            {
                question: "How do I initiate a return?",
                answer: "You can initiate a return through your account on our website or by contacting our customer service team. Once approved, you'll receive return instructions and a shipping label if applicable."
            },
            {
                question: "How long does it take to process a refund?",
                answer: "Refunds are typically processed within 5-7 business days after we receive and inspect your return. The time it takes for the refund to appear in your account depends on your payment method and financial institution."
            },
            {
                question: "Can I exchange an item for a different size or color?",
                answer: "For exchanges, we recommend returning the original item and placing a new order for the desired size or color to ensure availability."
            },
            {
                question: "Who pays for return shipping?",
                answer: "Customers are responsible for return shipping costs unless the return is due to our error or the product is defective."
            }
        ]
    },
    {
        category: "Products & Sizing",
        faqs: [
            {
                question: "How do I find the right shoe size?",
                answer: "We recommend measuring your feet and referring to our size guides provided on each product page. For running shoes, it's often recommended to go half a size up from your regular shoe size."
            },
            {
                question: "What's the difference between neutral and stability running shoes?",
                answer: "Neutral running shoes are designed for runners with a neutral gait or slight supination, while stability shoes provide additional support for runners who overpronate (when your foot rolls inward excessively)."
            },
            {
                question: "How often should I replace my running shoes?",
                answer: "Most running shoes should be replaced every 300-500 miles, depending on your running style, weight, and the surfaces you run on. Signs that it's time for new shoes include worn tread, compressed cushioning, or new aches and pains."
            },
            {
                question: "Do you offer waterproof running shoes?",
                answer: "Yes, we carry several models with waterproof or water-resistant technology, perfect for running in wet conditions. Look for shoes labeled with GORE-TEX or similar waterproof technologies."
            },
            {
                question: "What's the best way to clean my running shoes?",
                answer: "Remove excess dirt with a soft brush, then hand wash with mild soap and cold water. Remove insoles to clean separately. Stuff shoes with paper towels and air dry at room temperature. Never put running shoes in the washing machine or dryer."
            }
        ]
    },
    {
        category: "Account & Payment",
        faqs: [
            {
                question: "How do I create an account?",
                answer: "Click on the account icon in the top right corner of our website and select 'Sign Up'. Follow the prompts to create your account with your email address and password."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay."
            },
            {
                question: "Is it safe to store my payment information on your website?",
                answer: "Yes, we use industry-standard encryption and security protocols to protect your personal and payment information. Your card details are never stored directly on our servers."
            },
            {
                question: "How can I update my account information?",
                answer: "Log in to your account, navigate to 'Account Settings' or 'Profile', and you can update your information including address, payment methods, and communication preferences."
            },
            {
                question: "Can I place an order without creating an account?",
                answer: "Yes, we offer a guest checkout option that allows you to place orders without creating an account. However, creating an account allows you to track orders, save favorite products, and streamline future purchases."
            }
        ]
    }
];

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Filter FAQs based on search query and active category
    const filteredFAQs = faqCategories.flatMap(category => {
        const categoryFAQs = category.faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeCategory === 'all' || activeCategory === category.category) {
            return categoryFAQs.map(faq => ({ ...faq, category: category.category }));
        }

        return [];
    });

    return (
        <>
            <SEO
                title="FAQ | TempoRun"
                description="Find answers to frequently asked questions about TempoRun's products, shipping, returns, and more."
                keywords="FAQ, questions, answers, running shoes, shipping, returns, running gear"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-black/5 to-black/10 py-16">
                        <div className="container mx-auto px-4 max-w-5xl text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                            <p className="text-lg max-w-xl mx-auto">Find answers to commonly asked questions about our products, shipping, returns, and more.</p>

                            {/* Search */}
                            <div className="mt-8 max-w-md mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                    <Input
                                        placeholder="Search questions..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-5xl">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            <Button
                                variant={activeCategory === 'all' ? 'default' : 'outline'}
                                onClick={() => setActiveCategory('all')}
                            >
                                All Categories
                            </Button>

                            {faqCategories.map((category, index) => (
                                <Button
                                    key={index}
                                    variant={activeCategory === category.category ? 'default' : 'outline'}
                                    onClick={() => setActiveCategory(category.category)}
                                >
                                    {category.category}
                                </Button>
                            ))}
                        </div>

                        {/* FAQ Results */}
                        {searchQuery && filteredFAQs.length === 0 ? (
                            <div className="text-center py-12">
                                <h2 className="text-xl font-semibold mb-2">No results found</h2>
                                <p className="text-muted-foreground">Try adjusting your search term or browse by category</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {activeCategory === 'all' ? (
                                    // Group by category when showing all
                                    faqCategories.map((category, categoryIndex) => {
                                        const categoryFilteredFAQs = category.faqs.filter(faq =>
                                            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                                        );

                                        if (categoryFilteredFAQs.length === 0) return null;

                                        return (
                                            <div key={categoryIndex}>
                                                <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                                                <div className="space-y-4">
                                                    {categoryFilteredFAQs.map((faq, faqIndex) => (
                                                        <Card key={faqIndex}>
                                                            <CardContent className="pt-6">
                                                                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                                                                <p className="text-muted-foreground">{faq.answer}</p>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    // Just show filtered FAQs for selected category
                                    <div className="space-y-4">
                                        {filteredFAQs.map((faq, index) => (
                                            <Card key={index}>
                                                <CardContent className="pt-6">
                                                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                                                    <p className="text-muted-foreground">{faq.answer}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Contact CTA */}
                        <div className="mt-16 bg-secondary/30 p-8 rounded-lg text-center">
                            <h2 className="text-2xl font-semibold mb-3">Still Have Questions?</h2>
                            <p className="text-muted-foreground mb-6">Can't find what you're looking for? Our customer service team is here to help.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button>Contact Support</Button>
                                <Button variant="outline">Live Chat</Button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default FAQ;