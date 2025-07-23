
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BrandsSection from '@/components/BrandsSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import Newsletter from '@/components/Newsletter';

const Index = () => {
    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <BrandsSection />
                <CategoriesSection />
                <FeaturedProductsSection />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
};

export default Index;