
import React from 'react';
import { ShoeFilterState } from '../ShoeFinder';

interface DisciplineStepProps {
    onSelect: (discipline: ShoeFilterState['discipline']) => void;
}

export const DisciplineStep: React.FC<DisciplineStepProps> = ({ onSelect }) => {
    return (
        <div className="p-10 md:p-12">
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What discipline will you use the shoes for?</h2>
                <p className="text-lg text-muted-foreground">Choose one</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                    className="border rounded-md p-4 h-32 flex items-center justify-center text-xl md:text-2xl font-medium hover:border-black hover:bg-white transition-colors"
                    onClick={() => onSelect('road')}
                >
                    Road
                </button>

                <button
                    className="border rounded-md p-4 h-32 flex items-center justify-center text-xl md:text-2xl font-medium hover:border-black hover:bg-white transition-colors"
                    onClick={() => onSelect('trail')}
                >
                    Trail
                </button>

                <button
                    className="border rounded-md p-4 h-32 flex items-center justify-center text-xl md:text-2xl font-medium hover:border-black hover:bg-white transition-colors"
                    onClick={() => onSelect('cross-country')}
                >
                    <div className="text-center">
                        Cross<br />Country
                    </div>
                </button>

                <button
                    className="border rounded-md p-4 h-32 flex items-center justify-center text-xl md:text-2xl font-medium hover:border-black hover:bg-white transition-colors"
                    onClick={() => onSelect('track')}
                >
                    <div className="text-center">
                        Track &<br />Field
                    </div>
                </button>
            </div>

            <div className="absolute bottom-4 right-6">
                <button className="text-gray-500 text-sm font-medium flex items-center">
                    Skip
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};