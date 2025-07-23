
import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    formatCardNumber,
    formatExpiry,
    mockProcessPayment,
    validateCardNumber,
    validateExpiry,
    validateCVC
} from '@/utils/checkout';

const checkoutSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    address: z.string().min(5, { message: "Address must be at least 5 characters" }),
    city: z.string().min(2, { message: "City must be at least 2 characters" }),
    postalCode: z.string().min(4, { message: "Postal code must be at least 4 characters" }),
    country: z.string().min(2, { message: "Country must be at least 2 characters" }),
    cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
    cardName: z.string().min(2, { message: "Cardholder name must be at least 2 characters" }),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Expiry must be in format MM/YY" })
        .refine(validateExpiry, { message: "Card is expired or date is invalid" }),
    cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits" })
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
    const { items, getCartTotal, clearCart } = useCart();
    const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const [paymentAttempts, setPaymentAttempts] = useState(0);
    const navigate = useNavigate();

    // Initialize the form with default values
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            cardNumber: '',
            cardName: '',
            expiry: '',
            cvc: ''
        }
    });

    // Effect to show warning toast for empty cart
    useEffect(() => {
        if (items.length === 0 && checkoutStep !== 'confirmation') {
            toast.warning("Your cart is empty", {
                description: "Add items to your cart before checking out",
                action: {
                    label: "Shop Now",
                    onClick: () => navigate('/')
                }
            });
        }
    }, [items.length, checkoutStep, navigate]);

    const onSubmit = async (data: CheckoutFormValues) => {
        setProcessingError(null);

        if (checkoutStep === 'shipping') {
            // Validate shipping data
            setCheckoutStep('payment');

            // Scroll to top on page transition
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (checkoutStep === 'payment') {
            setIsProcessing(true);
            setPaymentAttempts(prev => prev + 1);

            try {
                // Process payment
                const result = await mockProcessPayment();

                if (result.success) {
                    setIsProcessing(false);
                    setCheckoutStep('confirmation');
                    clearCart();

                    toast.success("Order Confirmed!", {
                        description: "Your payment was processed successfully"
                    });

                    // Analytics tracking would go here in a real application
                    console.log('Order completed:', {
                        items,
                        total: getCartTotal() * 1.1,
                        customer: {
                            name: `${data.firstName} ${data.lastName}`,
                            email: data.email
                        }
                    });
                } else {
                    setIsProcessing(false);
                    setProcessingError(result.error?.message || "An unknown error occurred");

                    toast.error("Payment Failed", {
                        description: result.error?.message || "Please try again or use a different payment method"
                    });
                }
            } catch (error) {
                setIsProcessing(false);
                setProcessingError("Network error. Please check your connection and try again.");

                toast.error("Connection Error", {
                    description: "Please check your internet connection and try again"
                });
            }
        }
    };

    // Early return for empty cart
    if (items.length === 0 && checkoutStep !== 'confirmation') {
        return (
            <div className="container max-w-4xl mx-auto py-12 px-4">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="mb-6">Add some items to your cart before checking out.</p>
                    <Button onClick={() => navigate('/')}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    // Order confirmation screen
    if (checkoutStep === 'confirmation') {
        return (
            <div className="container max-w-4xl mx-auto py-12 px-4">
                <div className="text-center py-12 space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle className="h-20 w-20 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold">Thank You For Your Order!</h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Your order has been placed and is being processed. You will receive an email confirmation shortly.
                    </p>
                    <div className="pt-4">
                        <Button onClick={() => navigate('/')}>
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="mb-6">
                        <div className="flex justify-between mb-3">
                            <span className={`font-medium ${checkoutStep === 'shipping' ? 'text-primary' : 'text-gray-500'}`}>1. Shipping</span>
                            <span className={`font-medium ${checkoutStep === 'payment' ? 'text-primary' : 'text-gray-500'}`}>2. Payment</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: checkoutStep === 'shipping' ? '50%' : '100%' }}
                            />
                        </div>
                    </div>

                    {processingError && (
                        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium text-red-700">Payment Error</p>
                                <p className="text-red-600">{processingError}</p>
                                {paymentAttempts > 1 && (
                                    <p className="text-sm mt-1 text-red-600">
                                        Having trouble? Please double-check your card details or try a different payment method.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {checkoutStep === 'shipping' ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="johndoe@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Main St" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="New York" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="postalCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Postal Code</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="10001" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="United States" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            ) : (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="cardNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Card Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={16}
                                                        onChange={(e) => {
                                                            field.onChange(formatCardNumber(e.target.value));
                                                        }}
                                                        value={field.value}
                                                        className={validateCardNumber(field.value) || !field.value ? "" : "border-red-300 focus-visible:ring-red-300"}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="cardName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cardholder Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="expiry"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Expiry Date (MM/YY)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="MM/YY"
                                                            maxLength={5}
                                                            onChange={(e) => {
                                                                field.onChange(formatExpiry(e.target.value));
                                                            }}
                                                            value={field.value}
                                                            className={validateExpiry(field.value) || !field.value ? "" : "border-red-300 focus-visible:ring-red-300"}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="cvc"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CVC</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="123"
                                                            maxLength={4}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value.replace(/\D/g, ''));
                                                            }}
                                                            value={field.value}
                                                            className={validateCVC(field.value) || !field.value ? "" : "border-red-300 focus-visible:ring-red-300"}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="pt-4">
                                {checkoutStep === 'shipping' ? (
                                    <Button type="submit" className="w-full md:w-auto">
                                        Continue to Payment
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full md:w-auto"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Complete Payment'
                                        )}
                                    </Button>
                                )}

                                {checkoutStep === 'payment' && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full md:w-auto mt-2 md:mt-0 md:ml-2"
                                        onClick={() => setCheckoutStep('shipping')}
                                        disabled={isProcessing}
                                    >
                                        Back to Shipping
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="divide-y">
                        {items.map((item) => (
                            <div key={item.id} className="py-3 flex gap-3">
                                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{item.brand}</p>
                                    <p className="font-medium">{item.name}</p>
                                    <div className="flex justify-between mt-1">
                                        <p className="text-sm">{item.quantity} × ${item.price.toFixed(2)}</p>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span className="font-medium">$0.00</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span className="font-medium">${(getCartTotal() * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t mt-2">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">${(getCartTotal() * 1.1).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;