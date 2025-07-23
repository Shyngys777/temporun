
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Terms = () => {
    return (
        <>
            <SEO
                title="Terms of Service | TempoRun"
                description="Terms and conditions for using TempoRun's website and services."
                keywords="terms of service, conditions, legal, running store, TempoRun"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>

                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                            <p className="mb-4">Welcome to TempoRun. Please read these Terms of Service carefully before using our website.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
                            <p className="mb-4">By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our website.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">2. Changes to Terms</h2>
                            <p className="mb-4">We may revise these Terms at any time by updating this page. You are expected to check this page from time to time to take notice of any changes we made, as they are binding on you.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">3. Product Information</h2>
                            <p className="mb-4">We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on our store. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">4. Pricing and Availability</h2>
                            <p className="mb-4">All prices are shown in local currency and do not include taxes or shipping unless otherwise stated. We reserve the right to modify prices without notice. We do not guarantee the availability of any product.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">5. Ordering and Payment</h2>
                            <p className="mb-4">When you place an order, we will send you an email confirmation. This confirmation does not mean that your order has been accepted. We reserve the right to refuse or cancel any order for any reason.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">6. Shipping and Delivery</h2>
                            <p className="mb-4">Shipping times are estimates and cannot be guaranteed. We are not liable for any delays in receiving your order.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">7. Returns and Exchanges</h2>
                            <p className="mb-4">You may return unused products within 30 days of delivery for a full refund. The customer is responsible for return shipping costs unless the product is defective.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">8. Intellectual Property</h2>
                            <p className="mb-4">All content on our website, including text, graphics, logos, images, and software, is the property of TempoRun and is protected by international copyright laws.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">9. Limitation of Liability</h2>
                            <p className="mb-4">To the fullest extent permitted by law, TempoRun shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our website.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">10. Governing Law</h2>
                            <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3">11. Contact Information</h2>
                            <p className="mb-4">If you have any questions about these Terms, please contact us at support@temporun.com.</p>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Terms;