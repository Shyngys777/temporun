
export type CheckoutErrorType =
    | 'card_error'
    | 'validation_error'
    | 'processing_error'
    | 'server_error'
    | 'network_error';

export interface CheckoutError {
    type: CheckoutErrorType;
    message: string;
}

export const formatCardNumber = (value: string): string => {
    return value.replace(/\s/g, '').replace(/\D/g, '');
};

export const formatExpiry = (value: string): string => {
    // Add slash after 2 digits
    value = value.replace(/\s/g, '').replace(/\D/g, '');
    if (value.length > 2) {
        return value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    return value;
};

export const validateCardNumber = (cardNumber: string): boolean => {
    // Basic validation - 16 digits
    return /^\d{16}$/.test(cardNumber);
};

export const validateExpiry = (expiry: string): boolean => {
    // Format should be MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        return false;
    }

    const [month, year] = expiry.split('/').map(part => parseInt(part, 10));

    // Valid month is 1-12
    if (month < 1 || month > 12) {
        return false;
    }

    // Get current date for expiry validation
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed

    // Check if card is expired
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }

    return true;
};

export const validateCVC = (cvc: string): boolean => {
    // CVC should be 3 or 4 digits
    return /^\d{3,4}$/.test(cvc);
};

export const mockProcessPayment = async (): Promise<{success: boolean, error?: CheckoutError}> => {
    // This is a mock function that simulates payment processing
    // In a real application, this would call your payment processor's API

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate successful payment (98% of the time)
    const isSuccessful = Math.random() > 0.02;

    if (isSuccessful) {
        return { success: true };
    } else {
        const errors: CheckoutError[] = [
            { type: 'card_error', message: 'Your card was declined. Please try a different payment method.' },
            { type: 'processing_error', message: 'An error occurred while processing your payment. Please try again.' },
            { type: 'network_error', message: 'Network error. Please check your connection and try again.' }
        ];

        // Randomly select an error
        const randomError = errors[Math.floor(Math.random() * errors.length)];
        return { success: false, error: randomError };
    }
};