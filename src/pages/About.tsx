import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button'; // Correcting my import
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const About = () => {
    return (
        <>
            <SEO
                title="About Us | TempoRun"
                description="Learn about TempoRun, our mission, vision, and commitment to runners of all levels."
                keywords="about us, running store, mission, vision, TempoRun history, running community"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-black/5 to-black/10 py-16 md:py-24">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">About TempoRun</h1>
                            <p className="text-lg md:text-xl max-w-2xl">Empowering runners with premium footwear and gear since 2010. Our passion for running drives everything we do.</p>
                        </div>
                    </div>

                    {/* Our Story */}
                    <div className="container mx-auto px-4 py-16 max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                                <p className="mb-4">TempoRun was founded by a group of passionate runners who saw a need for a specialized running store that truly understood the needs of runners at all levels.</p>
                                <p className="mb-4">What started as a small local shop has grown into a premier destination for running enthusiasts, offering expert advice, community events, and the best selection of running shoes and gear.</p>
                                <p>Our commitment to quality, expertise, and the running community has guided our growth and success over the years.</p>
                            </div>
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="/placeholder.svg"
                                    alt="TempoRun store"
                                    className="w-full h-[300px] object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mission & Values */}
                    <div className="bg-secondary/30 py-16">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
                                <p className="max-w-2xl mx-auto">We are guided by our passion for running and commitment to helping runners achieve their goals.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <Card className="hover-lift">
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                                        <p>Our team consists of experienced runners who understand the importance of proper footwear and gear, providing personalized recommendations based on your unique needs.</p>
                                    </CardContent>
                                </Card>

                                <Card className="hover-lift">
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-3">Quality</h3>
                                        <p>We carefully select products from trusted brands known for their performance, durability, and innovation, ensuring that our customers receive the best running gear available.</p>
                                    </CardContent>
                                </Card>

                                <Card className="hover-lift">
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-3">Community</h3>
                                        <p>We foster a supportive running community through group runs, workshops, and events, connecting runners of all levels and promoting the joy and benefits of running.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="container mx-auto px-4 py-16 max-w-5xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: "Alex Martin", role: "Founder & CEO", image: "/placeholder.svg" },
                                { name: "Sarah Johnson", role: "Head of Operations", image: "/placeholder.svg" },
                                { name: "Michael Chen", role: "Running Expert", image: "/placeholder.svg" },
                                { name: "Olivia Brown", role: "Community Manager", image: "/placeholder.svg" }
                            ].map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold">{member.name}</h3>
                                    <p className="text-muted-foreground">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-black/5 py-16">
                        <div className="container mx-auto px-4 text-center max-w-2xl">
                            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                            <p className="mb-8">Have questions about our products or services? We'd love to hear from you!</p>
                            <div className="flex justify-center space-x-4">
                                <Button>Contact Us</Button>
                                <Button variant="outline">Visit Our Store</Button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default About;