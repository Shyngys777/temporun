
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export interface CategoryItem {
    name: string;
    image: string;
    description?: string;
    link: string;
}

interface BrandCategoriesProps {
    categories: CategoryItem[];
    accentColor: string;
}

const BrandCategories = ({ categories, accentColor }: BrandCategoriesProps) => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Shop By Category</h2>
                    <div className={`h-1 w-20 bg-gradient-to-r ${accentColor} mb-6`}></div>
                    <p className="text-xl text-black/70 max-w-3xl">
                        Find the perfect shoes for your specific running needs and terrain
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={category.link}
                            className="relative group overflow-hidden rounded-lg aspect-[4/3] block"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-300 group-hover:p-10">
                                <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                                {category.description && (
                                    <p className="text-white/80 mb-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{category.description}</p>
                                )}
                                <Button
                                    className={`w-fit bg-gradient-to-r ${accentColor} text-white hover:opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0`}
                                >
                                    Shop Now
                                </Button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandCategories;