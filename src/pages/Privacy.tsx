
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Privacy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy | TempoRun"
                description="Learn how TempoRun collects, uses, and protects your personal information."
                keywords="privacy policy, data protection, cookies, personal information, TempoRun"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                            <p className="mb-4">At TempoRun, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
                            <p className="mb-4">We collect personal information that you voluntarily provide to us when you register on our website, place an order, subscribe to our newsletter, or participate in promotions. This information may include:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Contact information (name, email address, mailing address, phone number)</li>
                                <li>Billing information (credit card details, billing address)</li>
                                <li>Account information (username, password)</li>
                                <li>Purchase history</li>
                                <li>Preferences and interests</li>
                            </ul>

                            <p className="mb-4">We also automatically collect certain information when you visit our website, including:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>IP address</li>
                                <li>Browser type</li>
                                <li>Device information</li>
                                <li>Pages visited</li>
                                <li>Time spent on pages</li>
                                <li>Referring website</li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
                            <p className="mb-4">We use your information for various purposes, including:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Processing and fulfilling orders</li>
                                <li>Managing your account</li>
                                <li>Sending transactional emails</li>
                                <li>Providing customer support</li>
                                <li>Sending marketing communications</li>
                                <li>Improving our website and services</li>
                                <li>Preventing fraud</li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-3">3. Cookies and Tracking Technologies</h2>
                            <p className="mb-4">We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Security</h2>
                            <p className="mb-4">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">5. Third-Party Disclosure</h2>
                            <p className="mb-4">We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">6. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate or incomplete information</li>
                                <li>Request deletion of your information</li>
                                <li>Object to certain processing activities</li>
                                <li>Withdraw consent</li>
                                <li>Data portability</li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-3">7. Changes to Privacy Policy</h2>
                            <p className="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h2>
                            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at privacy@temporun.com.</p>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Privacy;