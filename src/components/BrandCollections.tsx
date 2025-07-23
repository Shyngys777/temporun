
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CollectionItem {
    name: string;
    image: string;
    description: string;
}

interface BrandCollectionsProps {
    brandName: string;
    collections: CollectionItem[];
    accentColor: string;
}

const BrandCollections = ({
                              brandName,
                              collections,
                              accentColor
                          }: BrandCollectionsProps) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Collections</h2>
                    <div className={`h-1 w-20 bg-gradient-to-r ${accentColor} mb-6`}></div>
                    <p className="text-xl text-black/70 max-w-3xl">
                        Discover the latest innovations from {brandName}'s premier collections,
                        each designed to enhance your running experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <Card
                            key={collection.name}
                            className="overflow-hidden group hover:shadow-xl transition-all duration-500 border-none"
                        >
                            <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-4xl font-bold text-white drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {collection.name}
                                    </h3>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <p className="text-black/70 mb-4">{collection.description}</p>
                                <Button variant="ghost" className="group/btn">
                                    Explore {collection.name}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandCollections;