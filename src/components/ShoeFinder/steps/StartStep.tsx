
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface StartStepProps {
    onNext: () => void;
}

export const StartStep: React.FC<StartStepProps> = ({ onNext }) => {
    return (
        <div className="flex flex-col min-h-[80vh]">
            <div className="flex flex-col flex-grow justify-center p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
                        Find Your Perfect Running Shoes
                    </h2>

                    <div className="mb-10 text-gray-600 text-lg">
                        <p className="mb-4">
                            Our expert shoe finder uses 40+ years of running expertise to match you with the ideal shoes for your unique needs.
                        </p>
                        <p className="font-medium">
                            Answer a few quick questions to discover shoes that will elevate your running experience.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        onClick={onNext}
                        className="mt-4 py-7 px-8 text-lg bg-black text-white hover:bg-black/90 rounded-md transition-all duration-300 group flex items-center gap-2"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500">
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-2xl text-black mb-1">30+</div>
                            <div>Shoes Analyzed</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-2xl text-black mb-1">5</div>
                            <div>Quick Questions</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-2xl text-black mb-1">100%</div>
                            <div>Perfect Match</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};