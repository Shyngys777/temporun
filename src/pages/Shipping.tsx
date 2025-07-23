
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const shippingMethods = [
    { method: "Standard Shipping", time: "3-5 business days", cost: "$5.99" },
    { method: "Express Shipping", time: "2-3 business days", cost: "$12.99" },
    { method: "Next Day Delivery", time: "1 business day", cost: "$24.99" },
    { method: "International Shipping", time: "7-14 business days", cost: "Starting at $19.99" }
];

const Shipping = () => {
    return (
        <>
            <SEO
                title="Shipping & Returns | TempoRun"
                description="Information about TempoRun's shipping policies, delivery times, and return procedures."
                keywords="shipping, returns, delivery, exchange, refund, running store"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Shipping & Returns</h1>

                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>

                            <p className="mb-4">At TempoRun, we strive to deliver your orders quickly and efficiently. We process all orders within 1-2 business days and offer several shipping options to meet your needs.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">Shipping Methods & Times</h3>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">Method</th>
                                        <th className="text-left py-3 px-4">Estimated Time</th>
                                        <th className="text-left py-3 px-4">Cost</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {shippingMethods.map((method, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-3 px-4 font-medium">{method.method}</td>
                                            <td className="py-3 px-4">{method.time}</td>
                                            <td className="py-3 px-4">{method.cost}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground">Note: All orders over $50 qualify for free standard shipping within the continental United States.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">Order Processing</h3>
                            <p className="mb-4">Orders are processed Monday through Friday, excluding holidays. Orders placed after 2 PM local time may not be processed until the following business day.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">Tracking Your Order</h3>
                            <p className="mb-4">Once your order ships, you will receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">International Shipping</h3>
                            <p className="mb-4">We ship to select international destinations. Please note that international orders may be subject to import duties, taxes, and customs clearance fees, which are the responsibility of the recipient.</p>

                            <Separator className="my-8" />

                            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>

                            <p className="mb-4">We want you to be completely satisfied with your purchase. If you're not, we offer a hassle-free return policy.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">Return Eligibility</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Items must be returned within 30 days of the delivery date.</li>
                                <li>Products must be unworn, unwashed, and in their original packaging with all tags attached.</li>
                                <li>Sale items marked as "Final Sale" are not eligible for return or exchange.</li>
                                <li>Gift cards and personalized items are not returnable.</li>
                            </ul>

                            <h3 className="text-lg font-medium mt-6 mb-3">Return Process</h3>
                            <ol className="list-decimal pl-6 mb-4 space-y-2">
                                <li>Initiate a return through your account on our website or contact our customer service team.</li>
                                <li>Print the return shipping label (if provided) or package your return securely with your order number included.</li>
                                <li>Ship the package to the address provided in the return instructions.</li>
                                <li>Once received and inspected, we will process your refund to the original payment method.</li>
                            </ol>

                            <h3 className="text-lg font-medium mt-6 mb-3">Refund Processing</h3>
                            <p className="mb-4">Refunds are typically processed within 5-7 business days after we receive and inspect your return. The time it takes for the refund to appear in your account depends on your payment method and financial institution.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">Exchanges</h3>
                            <p className="mb-4">If you would like to exchange an item for a different size or color, please follow the return process and place a new order for the desired item to ensure availability.</p>

                            <h3 className="text-lg font-medium mt-6 mb-3">Return Shipping Costs</h3>
                            <p className="mb-4">Customers are responsible for return shipping costs unless the return is due to our error or the product is defective. If you received a defective or incorrect item, please contact our customer service team for assistance.</p>
                        </CardContent>
                    </Card>

                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-2">When will my order ship?</h3>
                                    <p className="text-muted-foreground">Orders are typically processed within 1-2 business days and shipped according to the selected shipping method.</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Can I change or cancel my order?</h3>
                                    <p className="text-muted-foreground">You may request changes or cancellation within 2 hours of placing your order by contacting our customer service team. Once an order has been processed, it cannot be modified or canceled.</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Do you ship to PO boxes?</h3>
                                    <p className="text-muted-foreground">Yes, we ship to PO boxes for standard shipping only. Express and Next Day delivery options require a physical address.</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">What if my package is lost or damaged?</h3>
                                    <p className="text-muted-foreground">Please contact our customer service team immediately if your package arrives damaged or is lost in transit. We will work with the shipping carrier to resolve the issue promptly.</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Can I return a gift?</h3>
                                    <p className="text-muted-foreground">Yes, gifts can be returned for store credit or exchange. You will need the order number or gift receipt to process the return.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-secondary/30 p-6 rounded-lg text-center">
                        <h2 className="text-xl font-semibold mb-2">Need More Help?</h2>
                        <p className="mb-4">Our customer service team is available to assist you with any questions about shipping, returns, or exchanges.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button>Contact Us</Button>
                            <Button variant="outline">View Order Status</Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Shipping;