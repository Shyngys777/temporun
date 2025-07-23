
import React, { useState, useMemo, useEffect } from 'react';
import { X, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { products } from '@/lib/data';
import { GenderStep } from './steps/GenderStep';
import { DisciplineStep } from './steps/DisciplineStep';
import { PurposeStep } from './steps/PurposeStep';
import { StabilityStep } from './steps/StabilityStep';
import { CushioningStep } from './steps/CushioningStep';
import { ResultsStep } from './steps/ResultsStep';
import { StartStep } from './steps/StartStep';

export type ShoeFilterState = {
    gender: 'men' | 'women' | null;
    discipline: 'road' | 'trail' | 'cross-country' | 'track' | null;
    purpose: 'daily' | 'racing' | null;
    stability: 'none' | 'light' | 'moderate' | 'max' | null;
    cushioning: 'low' | 'moderate' | 'high' | null;
};

const initialFilterState: ShoeFilterState = {
    gender: null,
    discipline: null,
    purpose: null,
    stability: null,
    cushioning: null,
};

export const ShoeFinder = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [filters, setFilters] = useState<ShoeFilterState>(initialFilterState);
    const [availableShoes, setAvailableShoes] = useState(products.length);

    const totalSteps = 6; // Number of steps including start and results
    const progress = Math.min(Math.round((step / totalSteps) * 100), 100);

    // Calculate available shoes count based on current filters
    useEffect(() => {
        let result = [...products];

        // Filter by gender
        if (filters.gender) {
            result = result.filter(product =>
                product.gender === filters.gender || product.gender === 'unisex'
            );
        }

        // Filter by discipline (if set)
        if (filters.discipline) {
            // This is a simplified filter since we don't have discipline in our data model
            // In a real application, you would filter by the actual discipline field
            if (filters.discipline === 'road') {
                result = result.filter(product =>
                    product.tags?.some(tag => tag.includes('road'))
                );
            } else if (filters.discipline === 'trail') {
                result = result.filter(product =>
                    product.tags?.some(tag => tag.includes('trail'))
                );
            } else if (filters.discipline === 'cross-country') {
                result = result.filter(product =>
                    product.tags?.some(tag => tag.includes('cross'))
                );
            } else if (filters.discipline === 'track') {
                result = result.filter(product =>
                    product.tags?.some(tag => tag.includes('track'))
                );
            }
        }

        // Filter by purpose (if set)
        if (filters.purpose) {
            if (filters.purpose === 'daily') {
                result = result.filter(product =>
                    product.tags?.some(tag =>
                        ['daily-trainer', 'cushioned', 'comfort', 'neutral', 'stability'].includes(tag)
                    )
                );
            } else if (filters.purpose === 'racing') {
                result = result.filter(product =>
                    product.tags?.some(tag =>
                        ['racing', 'speed', 'responsive', 'tempo', 'lightweight'].includes(tag)
                    )
                );
            }
        }

        // Filter by stability (if set)
        if (filters.stability) {
            if (filters.stability === 'none') {
                result = result.filter(product =>
                    product.tags?.includes('neutral')
                );
            } else if (filters.stability === 'light') {
                result = result.filter(product =>
                    product.tags?.some(tag => ['neutral', 'support'].includes(tag))
                );
            } else if (filters.stability === 'moderate' || filters.stability === 'max') {
                result = result.filter(product =>
                    product.tags?.some(tag => ['stability', 'support', 'overpronation'].includes(tag))
                );
            }
        }

        // Filter by cushioning (if set)
        if (filters.cushioning) {
            if (filters.cushioning === 'low') {
                result = result.filter(product =>
                    product.tags?.some(tag => ['lightweight', 'responsive'].includes(tag))
                );
            } else if (filters.cushioning === 'moderate') {
                result = result.filter(product =>
                    product.tags?.some(tag => ['balanced', 'versatile'].includes(tag))
                );
            } else if (filters.cushioning === 'high') {
                result = result.filter(product =>
                    product.tags?.includes('cushioned')
                );
            }
        }

        setAvailableShoes(result.length);
    }, [filters]);

    const handleNextStep = () => {
        setStep(prev => Math.min(prev + 1, totalSteps));
    };

    const handlePrevStep = () => {
        setStep(prev => Math.max(prev - 1, 0));
    };

    const handleUpdateFilter = <K extends keyof ShoeFilterState>(
        key: K,
        value: ShoeFilterState[K]
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        handleNextStep();
    };

    const handleReset = () => {
        setFilters(initialFilterState);
        setStep(0);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Get title for the current step
    const getStepTitle = () => {
        if (step === 0) return "Running Shoe Finder";
        if (step === totalSteps) return "Running Shoe Finder";

        // Add percentage if in the middle of the process
        const percentage = progress > 0 && progress < 100 ? `${progress}%` : '';
        return `Running Shoe Finder ${percentage}`;
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return <StartStep onNext={handleNextStep} />;
            case 1:
                return <GenderStep onSelect={(value) => handleUpdateFilter('gender', value)} />;
            case 2:
                return <DisciplineStep onSelect={(value) => handleUpdateFilter('discipline', value)} />;
            case 3:
                return <PurposeStep onSelect={(value) => handleUpdateFilter('purpose', value)} />;
            case 4:
                return <StabilityStep onSelect={(value) => handleUpdateFilter('stability', value)} />;
            case 5:
                return <CushioningStep onSelect={(value) => handleUpdateFilter('cushioning', value)} />;
            case 6:
                return <ResultsStep filters={filters} onReset={handleReset} />;
            default:
                return null;
        }
    };

    return (
        <div className="shoe-finder-container fixed z-50">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button
                        className="fixed z-50 right-0 top-1/2 -translate-y-1/2 bg-black text-white py-6 px-3 rounded-l-md flex flex-col items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        <span className="text-sm font-medium [writing-mode:vertical-lr] rotate-180">Shoe Finder</span>
                        <ShoppingBag className="w-5 h-5 text-green-400" />
                    </button>
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="w-full sm:max-w-3xl p-0 overflow-y-auto"
                >
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="py-4 px-6 flex items-center justify-between border-b bg-black text-white">
                            <div className="flex items-center gap-3">
                                {step > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            // If going back from step 1, reset gender filter
                                            if (step === 1) {
                                                setFilters(prev => ({...prev, gender: null}));
                                            }
                                            // If going back from step 2, reset discipline filter
                                            else if (step === 2) {
                                                setFilters(prev => ({...prev, discipline: null}));
                                            }
                                            // If going back from step 3, reset purpose filter
                                            else if (step === 3) {
                                                setFilters(prev => ({...prev, purpose: null}));
                                            }
                                            // If going back from step 4, reset stability filter
                                            else if (step === 4) {
                                                setFilters(prev => ({...prev, stability: null}));
                                            }
                                            // If going back from step 5, reset cushioning filter
                                            else if (step === 5) {
                                                setFilters(prev => ({...prev, cushioning: null}));
                                            }
                                            handlePrevStep();
                                        }}
                                        className="text-white hover:bg-white/10"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                )}
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold">
                                        {getStepTitle()}
                                    </h2>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleClose}
                                className="text-white hover:bg-white/10"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Progress indicator */}
                        {progress > 0 && (
                            <Progress
                                value={progress}
                                className="h-1 rounded-none bg-gray-200"
                                indicatorClassName="bg-emerald-400"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {renderStepContent()}
                        </div>

                        {/* Footer with shoe count - only show on steps 1-5 */}
                        {step > 0 && step < totalSteps && (
                            <div className="p-4 bg-black text-white flex justify-between items-center">
                                <div className="font-semibold text-xl">
                                    {availableShoes} shoes Available
                                </div>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                    View all
                                </Button>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};