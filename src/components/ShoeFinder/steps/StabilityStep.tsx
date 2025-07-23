
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { ShoeFilterState } from '../ShoeFinder';

interface StabilityStepProps {
    onSelect: (stability: ShoeFilterState['stability']) => void;
}

export const StabilityStep: React.FC<StabilityStepProps> = ({ onSelect }) => {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Do you need any additional stability?</h2>
                <p className="text-base text-muted-foreground mb-4">
                    Wearing appropriate footwear with features that provide stability and support can be beneficial for individuals with light overpronation, especially during high-impact activities like running. Shoes with motion control or stability features can help control the inward rolling of the foot and provide additional support.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    className="border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => onSelect('none')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">None</h3>
                    <p className="text-sm mb-4 text-center">Recommended for</p>
                    <p className="font-medium text-center">Neutral Pronation</p>

                    <div className="mt-4 flex justify-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1.5">
                                        <Info className="h-4 w-4" />
                                        More information
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-sm">
                                    <p>For runners with a neutral pronation, where the foot rolls inward slightly upon impact, providing natural shock absorption.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div
                    className="border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => onSelect('light')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">Light Stability</h3>
                    <p className="text-sm mb-4 text-center">Recommended for</p>
                    <p className="font-medium text-center">Mild Overpronation</p>

                    <div className="mt-4 flex justify-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1.5">
                                        <Info className="h-4 w-4" />
                                        More information
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-sm">
                                    <p>For runners with mild overpronation, where the foot rolls inward slightly more than ideal. These shoes offer light support to guide your foot into proper alignment.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div
                    className="border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => onSelect('moderate')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">Moderate Stability</h3>
                    <p className="text-sm mb-4 text-center">Recommended for</p>
                    <p className="font-medium text-center">Overpronation</p>

                    <div className="mt-4 flex justify-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1.5">
                                        <Info className="h-4 w-4" />
                                        More information
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-sm">
                                    <p>For runners with moderate overpronation. These shoes provide firmer support structures to control excess inward rolling of the foot during your stride.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div
                    className="border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => onSelect('max')}
                >
                    <h3 className="text-xl font-bold mb-4 text-center">Max Stability</h3>
                    <p className="text-sm mb-4 text-center">Recommended for</p>
                    <p className="font-medium text-center">Severe Overpronation</p>

                    <div className="mt-4 flex justify-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1.5">
                                        <Info className="h-4 w-4" />
                                        More information
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-sm">
                                    <p>For runners with severe overpronation. These motion control shoes offer maximum support and stability to prevent excessive inward rolling of the foot.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};