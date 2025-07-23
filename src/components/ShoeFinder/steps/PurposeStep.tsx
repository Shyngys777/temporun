
import React from 'react';
import { ShoeFilterState } from '../ShoeFinder';

interface PurposeStepProps {
    onSelect: (purpose: ShoeFilterState['purpose']) => void;
}

export const PurposeStep: React.FC<PurposeStepProps> = ({ onSelect }) => {
    return (
        <div className="p-10 md:p-12">
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What do you want to use your shoes for?</h2>
                <p className="text-lg text-muted-foreground">Choose one</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                    className="border rounded-lg p-8 hover:border-black hover:bg-white transition-colors cursor-pointer"
                    onClick={() => onSelect('daily')}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Daily Mileage</h3>
                    <p className="text-base text-center">
                        The most important shoe in your rotation. Comfortable, durable and versatile.
                    </p>
                </div>

                <div
                    className="border rounded-lg p-8 hover:border-black hover:bg-white transition-colors cursor-pointer"
                    onClick={() => onSelect('racing')}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Racing & Workouts</h3>
                    <p className="text-base text-center">
                        This is for sessions and race days. Light, responsive and fast.
                    </p>
                </div>
            </div>
        </div>
    );
};