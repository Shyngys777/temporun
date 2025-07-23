
import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { ShoeFilterState } from '../ShoeFinder';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

interface ResultsStepProps {
    filters: ShoeFilterState;
    onReset: () => void;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({ filters, onReset }) => {
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by gender
        if (filters.gender) {
            result = result.filter(product =>
                product.gender === filters.gender || product.gender === 'unisex'
            );
        }

        // Filter by purpose
        if (filters.purpose === 'daily') {
            // Tags that indicate daily/training shoes
            result = result.filter(product =>
                product.tags?.some(tag =>
                    ['daily-trainer', 'cushioned', 'comfort', 'neutral', 'stability'].includes(tag)
                )
            );
        } else if (filters.purpose === 'racing') {
            // Tags that indicate racing/speed shoes
            result = result.filter(product =>
                product.tags?.some(tag =>
                    ['racing', 'speed', 'responsive', 'tempo', 'lightweight'].includes(tag)
                )
            );
        }

        // Filter by stability
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

        // Filter by cushioning
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

        // Return at most 12 products to ensure performance
        return result.slice(0, 12);
    }, [filters]);

    return (
        <div className="p-8">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">Your Recommended Shoes</h2>
                    <span className="text-muted-foreground">{filteredProducts.length} results</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {filters.gender && (
                        <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                            {filters.gender === 'men' ? 'Men' : 'Women'}
                        </div>
                    )}
                    {filters.discipline && (
                        <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full capitalize">
                            {filters.discipline.replace('-', ' ')}
                        </div>
                    )}
                    {filters.purpose && (
                        <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full capitalize">
                            {filters.purpose === 'daily' ? 'Daily Mileage' : 'Racing & Workouts'}
                        </div>
                    )}
                    {filters.stability && (
                        <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full capitalize">
                            {filters.stability === 'none' ? 'Neutral' : `${filters.stability} Stability`}
                        </div>
                    )}
                    {filters.cushioning && (
                        <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full capitalize">
                            {filters.cushioning} Cushioning
                        </div>
                    )}
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                brand={product.brand}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                colorway={product.colorway}
                                image={product.image}
                                isNew={product.isNew}
                                isSale={product.isSale}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={onReset}
                            className="gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Start Over
                        </Button>

                        <Button className="gap-2">
                            View All Results
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-4">No exact matches found</h3>
                    <p className="mb-6 text-muted-foreground">
                        We couldn't find shoes that match all your criteria exactly. Try adjusting your filters or browse our full collection.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="outline"
                            onClick={onReset}
                            className="gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Start Over
                        </Button>

                        <Button>
                            Browse All Shoes
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};