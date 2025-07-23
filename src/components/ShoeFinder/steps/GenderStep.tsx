import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react'; // Use User icon as a placeholder
import { ShoeFilterState } from '../ShoeFinder';

interface GenderStepProps {
    onSelect: (gender: ShoeFilterState['gender']) => void;
}

export const GenderStep: React.FC<GenderStepProps> = ({ onSelect }) => {
    return (
        <div className="p-8 md:p-12">
            <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Для какого пола вы выбираете обувь?</h2>
                <p className="text-lg text-muted-foreground">Выберите один вариант</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <button
                    className="flex flex-col items-center justify-center p-8 border-2 rounded-lg hover:border-black hover:bg-black/5 transition-all duration-300"
                    onClick={() => onSelect('men')}
                >
                    <div className="bg-black rounded-full p-4 mb-4">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <span className="text-xl font-semibold">Мужской</span>
                </button>

                <button
                    className="flex flex-col items-center justify-center p-8 border-2 rounded-lg hover:border-black hover:bg-black/5 transition-all duration-300"
                    onClick={() => onSelect('women')}
                >
                    <div className="bg-black rounded-full p-4 mb-4">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <span className="text-xl font-semibold">Женский</span>
                </button>
            </div>
        </div>
    );
};