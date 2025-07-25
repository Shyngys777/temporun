
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Contact = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast({
                title: "Message Sent!",
                description: "We've received your message and will get back to you soon.",
            });
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <>
            <SEO
                title="Contact Us | TempoRun"
                description="Get in touch with TempoRun for any questions, feedback, or support."
                keywords="contact, email, phone, address, running store, TempoRun"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-black/5 to-black/10 py-16">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                            <p className="text-lg max-w-xl">We're here to help! Reach out to us with any questions, feedback, or concerns.</p>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-5xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contact Information */}
                            <div className="lg:col-span-1">
                                <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-3">
                                        <Mail className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-medium">Email</h3>
                                            <p className="text-muted-foreground">info@temporun.com</p>
                                            <p className="text-muted-foreground">support@temporun.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Phone className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-medium">Phone</h3>
                                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                            <p className="text-muted-foreground">+1 (555) 987-6543</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-medium">Address</h3>
                                            <p className="text-muted-foreground">123 Running Way</p>
                                            <p className="text-muted-foreground">Athlete City, AC 12345</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Clock className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-medium">Business Hours</h3>
                                            <p className="text-muted-foreground">Monday-Friday: 9AM-7PM</p>
                                            <p className="text-muted-foreground">Saturday: 10AM-6PM</p>
                                            <p className="text-muted-foreground">Sunday: 11AM-5PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="font-medium mb-2">Connect With Us</h3>
                                    <div className="flex space-x-4">
                                        <Button size="icon" variant="outline" className="rounded-full">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                                        </Button>
                                        <Button size="icon" variant="outline" className="rounded-full">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                                        </Button>
                                        <Button size="icon" variant="outline" className="rounded-full">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="text-sm font-medium">
                                                        Your Name
                                                    </label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-sm font-medium">
                                                        Your Email
                                                    </label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="subject" className="text-sm font-medium">
                                                    Subject
                                                </label>
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="How can we help you?"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-sm font-medium">
                                                    Message
                                                </label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Your message here..."
                                                    rows={6}
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full md:w-auto"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
                            <div className="rounded-lg overflow-hidden h-[400px] bg-secondary flex items-center justify-center">
                                <div className="text-center p-6">
                                    <p className="text-lg font-medium mb-2">Interactive Map Coming Soon</p>
                                    <p className="text-muted-foreground">We're located at 123 Running Way, Athlete City, AC 12345</p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-2">What are your shipping rates?</h3>
                                        <p className="text-muted-foreground">We offer free shipping on orders over $50. For orders under $50, shipping rates start at $5.99.</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-2">How can I track my order?</h3>
                                        <p className="text-muted-foreground">Once your order ships, you'll receive a tracking number via email that you can use to track your package.</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-2">What is your return policy?</h3>
                                        <p className="text-muted-foreground">We accept returns within 30 days of purchase. Items must be unworn and in original packaging.</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-2">Do you offer international shipping?</h3>
                                        <p className="text-muted-foreground">Yes, we ship to select international destinations. Shipping rates vary by country.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Contact;