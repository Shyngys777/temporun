
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const jobOpenings = [
    {
        title: "Store Manager",
        location: "Athlete City, AC",
        type: "Full-time",
        description: "We're looking for an experienced Store Manager to lead our flagship store operations, staff management, and drive sales growth."
    },
    {
        title: "Running Expert / Sales Associate",
        location: "Athlete City, AC",
        type: "Full-time",
        description: "Join our team as a Running Expert to provide personalized recommendations and exceptional service to our customers."
    },
    {
        title: "Digital Marketing Specialist",
        location: "Remote",
        type: "Full-time",
        description: "Help grow our online presence through effective digital marketing strategies, social media management, and content creation."
    },
    {
        title: "Warehouse & Inventory Coordinator",
        location: "Athlete City, AC",
        type: "Full-time",
        description: "Oversee our warehouse operations, manage inventory, and ensure efficient order fulfillment and shipping processes."
    },
    {
        title: "Customer Service Representative",
        location: "Hybrid",
        type: "Part-time",
        description: "Provide exceptional customer service through phone, email, and chat support to address inquiries, resolve issues, and process orders."
    }
];

const Careers = () => {
    return (
        <>
            <SEO
                title="Careers | TempoRun"
                description="Join our team at TempoRun and be part of a passionate community dedicated to serving runners."
                keywords="careers, jobs, employment, running store, retail jobs, TempoRun"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-black/5 to-black/10 py-16 md:py-24">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
                            <p className="text-lg md:text-xl max-w-2xl">Be part of a passionate team dedicated to inspiring and serving the running community.</p>
                        </div>
                    </div>

                    {/* Why Work With Us */}
                    <div className="container mx-auto px-4 py-16 max-w-5xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">Why Work With Us</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="hover-lift">
                                <CardContent className="pt-6">
                                    <h3 className="text-xl font-semibold mb-3">Passionate Community</h3>
                                    <p>Join a team of running enthusiasts who are dedicated to supporting runners of all levels and growing the running community.</p>
                                </CardContent>
                            </Card>

                            <Card className="hover-lift">
                                <CardContent className="pt-6">
                                    <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
                                    <p>We invest in our team members' development with ongoing training, advancement opportunities, and support for professional growth.</p>
                                </CardContent>
                            </Card>

                            <Card className="hover-lift">
                                <CardContent className="pt-6">
                                    <h3 className="text-xl font-semibold mb-3">Excellent Benefits</h3>
                                    <p>Enjoy competitive pay, employee discounts, flexible scheduling, healthcare benefits, and a positive work environment.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Culture */}
                    <div className="bg-secondary/30 py-16">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="rounded-lg overflow-hidden">
                                    <img
                                        src="/placeholder.svg"
                                        alt="Team culture"
                                        className="w-full h-[400px] object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
                                    <p className="mb-4">At TempoRun, we foster a collaborative, energetic, and inclusive workplace where passion for running meets exceptional customer service.</p>
                                    <p className="mb-4">We believe in work-life balance, celebrating achievements together, and creating a supportive environment where every team member feels valued and empowered.</p>
                                    <p>Our team regularly participates in local running events, community service projects, and team-building activities that strengthen our bonds and connection to the running community.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Openings */}
                    <div className="container mx-auto px-4 py-16 max-w-5xl">
                        <h2 className="text-3xl font-bold mb-8 text-center">Current Openings</h2>

                        <div className="space-y-6">
                            {jobOpenings.map((job, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="py-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                                <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground mt-1 md:space-x-4">
                                                    <span>{job.location}</span>
                                                    <span className="hidden md:inline">•</span>
                                                    <span>{job.type}</span>
                                                </div>
                                                <p className="mt-3 text-sm md:text-base">{job.description}</p>
                                            </div>
                                            <Button className="mt-4 md:mt-0 flex items-center" variant="outline">
                                                View Details
                                                <ChevronRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Application Process */}
                    <div className="bg-gradient-to-r from-black/5 to-black/10 py-16">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <h2 className="text-3xl font-bold mb-8 text-center">Application Process</h2>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold">1</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Apply Online</h3>
                                    <p className="text-sm">Submit your application through our careers portal.</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold">2</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Initial Interview</h3>
                                    <p className="text-sm">Complete a phone interview with our hiring team.</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold">3</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">In-Person Meeting</h3>
                                    <p className="text-sm">Meet the team and discuss your experience and goals.</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold">4</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Offer & Onboarding</h3>
                                    <p className="text-sm">Receive your offer and begin your onboarding journey.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
                        <h2 className="text-3xl font-bold mb-4">Don't See the Right Fit?</h2>
                        <p className="mb-8">We're always looking for talented individuals to join our team. Send us your resume for future opportunities.</p>
                        <Button size="lg">Submit Your Resume</Button>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Careers;