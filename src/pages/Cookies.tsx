
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Cookies = () => {
    return (
        <>
            <SEO
                title="Cookie Policy | TempoRun"
                description="Information about how TempoRun uses cookies and similar technologies on our website."
                keywords="cookies, tracking technologies, privacy, data collection, TempoRun"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Cookie Policy</h1>

                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                            <p className="mb-4">This Cookie Policy explains how TempoRun uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">What Are Cookies?</h2>
                            <p className="mb-4">Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use</h2>

                            <h3 className="text-lg font-medium mt-4 mb-2">Essential Cookies</h3>
                            <p className="mb-4">These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.</p>

                            <h3 className="text-lg font-medium mt-4 mb-2">Performance Cookies</h3>
                            <p className="mb-4">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us to improve our website and your shopping experience.</p>

                            <h3 className="text-lg font-medium mt-4 mb-2">Functional Cookies</h3>
                            <p className="mb-4">These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>

                            <h3 className="text-lg font-medium mt-4 mb-2">Targeting Cookies</h3>
                            <p className="mb-4">These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">How to Control Cookies</h2>
                            <p className="mb-4">You can control and manage cookies in various ways. Most web browsers allow you to manage your cookie preferences. You can:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Delete cookies from your device</li>
                                <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
                                <li>Set your browser to notify you when you receive a cookie</li>
                            </ul>

                            <p className="mb-4">Please note that if you choose to block or delete cookies, it may affect your ability to fully use the website and its features.</p>

                            <div className="mt-8 p-4 bg-secondary rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Cookie Preferences</h3>
                                <p className="mb-4">You can set your cookie preferences below:</p>

                                <div className="flex flex-col space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        Accept All Cookies
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        Essential Cookies Only
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        Customize Cookie Settings
                                    </Button>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Cookie Policy</h2>
                            <p className="mb-4">We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
                            <p className="mb-4">If you have any questions about our Cookie Policy, please contact us at privacy@temporun.com.</p>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Cookies;