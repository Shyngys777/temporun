
import React from 'react';
import { ShoeFilterState } from '../ShoeFinder';

interface CushioningStepProps {
    onSelect: (cushioning: ShoeFilterState['cushioning']) => void;
}

export const CushioningStep: React.FC<CushioningStepProps> = ({ onSelect }) => {
    return (
        <div className="p-10 md:p-12">
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What level of cushioning do you require?</h2>
                <p className="text-lg text-muted-foreground">Select one</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    className="border rounded-lg p-8 hover:border-black hover:bg-white transition-colors cursor-pointer"
                    onClick={() => onSelect('low')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">Less Cushioning</h3>
                    <p className="text-sm text-center">
                        These shoes typically have a lower heel-to-toe drop, less cushioning, and a more flexible and lightweight construction
                    </p>
                </div>

                <div
                    className="border rounded-lg p-8 hover:border-black hover:bg-white transition-colors cursor-pointer"
                    onClick={() => onSelect('moderate')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">Moderate Cushioning</h3>
                    <p className="text-sm text-center">
                        Moderate cushioned running shoes strike a balance between providing cushioning and maintaining a reasonable level of responsiveness
                    </p>
                </div>

                <div
                    className="border rounded-lg p-8 hover:border-black hover:bg-white transition-colors cursor-pointer"
                    onClick={() => onSelect('high')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">More Cushioning</h3>
                    <p className="text-sm text-center">
                        Maximal cushioned running shoes are designed to provide runners with a high level of cushioning and shock absorption
                    </p>
                </div>
            </div>
        </div>
    );
};