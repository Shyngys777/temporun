
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowDownRight, ShoppingBag, HeartIcon } from 'lucide-react';

const categories = [
  {
    id: 'road-running',
    title: 'Road Running',
    description: 'Engineered for speed and comfort on paved surfaces. Perfect for daily training, marathons, and urban environments.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/road-running',
    features: ['Lightweight cushioning', 'Responsive', 'Breathable upper'],
    popularBrands: ['Nike', 'Adidas', 'ASICS', 'Brooks', 'New Balance'],
    popularModels: [
      { name: 'Nike Pegasus', price: '$120' },
      { name: 'ASICS Gel-Cumulus', price: '$130' },
      { name: 'Brooks Ghost', price: '$140' }
    ]
  },
  {
    id: 'trail-running',
    title: 'Trail Running',
    description: 'Rugged designs for challenging off-road terrain. Built with durable materials and enhanced traction for unpredictable surfaces.',
    image: 'https://images.unsplash.com/photo-1665859618005-9dadcf72f369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/trail-running',
    features: ['Aggressive outsole', 'Rock protection', 'Water-resistant'],
    popularBrands: ['Salomon', 'Hoka', 'Brooks', 'Saucony', 'The North Face'],
    popularModels: [
      { name: 'Salomon Speedcross', price: '$140' },
      { name: 'Hoka Speedgoat', price: '$145' },
      { name: 'Brooks Cascadia', price: '$130' }
    ]
  },
  {
    id: 'competition',
    title: 'Competition',
    description: 'Ultralight racing shoes built for personal records. Engineered with cutting-edge materials and technology for race day performance.',
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/competition',
    features: ['Carbon plate', 'Minimal weight', 'Energy return'],
    popularBrands: ['Nike', 'Adidas', 'ASICS', 'Saucony', 'New Balance'],
    popularModels: [
      { name: 'Nike Vaporfly', price: '$250' },
      { name: 'Adidas Adizero Pro', price: '$220' },
      { name: 'ASICS Metaspeed Sky', price: '$250' }
    ]
  },
  {
    id: 'daily-trainers',
    title: 'Daily Trainers',
    description: 'Reliable shoes for everyday running. Balanced cushioning and durability for consistent training throughout the year.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/daily-trainers',
    features: ['Durable outsole', 'Balanced cushioning', 'Supportive fit'],
    popularBrands: ['Brooks', 'ASICS', 'Nike', 'New Balance', 'Saucony'],
    popularModels: [
      { name: 'Brooks Adrenaline', price: '$130' },
      { name: 'ASICS Kayano', price: '$160' },
      { name: 'Nike Structure', price: '$120' }
    ]
  },
  {
    id: 'stability',
    title: 'Stability',
    description: 'Supportive shoes for runners who need gait correction. Engineered with guidance features to promote natural alignment.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/stability',
    features: ['Medial support', 'Structured upper', 'Guidance systems'],
    popularBrands: ['ASICS', 'Brooks', 'Saucony', 'Mizuno', 'Hoka'],
    popularModels: [
      { name: 'ASICS Kayano', price: '$160' },
      { name: 'Brooks Adrenaline GTS', price: '$130' },
      { name: 'Saucony Guide', price: '$130' }
    ]
  },
  {
    id: 'cushioned',
    title: 'Cushioned',
    description: 'Maximum comfort for long-distance running. Plush cushioning to absorb impact and reduce fatigue over extended miles.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/cushioned',
    features: ['Max cushioning', 'Shock absorption', 'Plush comfort'],
    popularBrands: ['Hoka', 'Brooks', 'New Balance', 'ASICS', 'Altra'],
    popularModels: [
      { name: 'Hoka Bondi', price: '$160' },
      { name: 'Brooks Glycerin', price: '$150' },
      { name: 'New Balance 1080', price: '$150' }
    ]
  },
];

const Categories = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Header */}
        <div className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Running Shoe Categories</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Discover the perfect shoes for your running style. Each category is designed to optimize performance for specific terrains and preferences.
            </p>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {categories.map((category) => (
              <Card key={category.id} className="group h-full flex flex-col overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
                  <p className="text-black/70 mb-4">{category.description}</p>
                  
                  <Tabs defaultValue="features" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="brands">Brands</TabsTrigger>
                      <TabsTrigger value="models">Models</TabsTrigger>
                    </TabsList>
                    <TabsContent value="features" className="mt-4">
                      <ul className="space-y-2">
                        {category.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <ArrowDownRight className="h-4 w-4 mr-2 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="brands" className="mt-4">
                      <ul className="flex flex-wrap gap-2">
                        {category.popularBrands.map((brand, index) => (
                          <li key={index} className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                            {brand}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="models" className="mt-4">
                      <ul className="space-y-2">
                        {category.popularModels.map((model, index) => (
                          <li key={index} className="flex items-center justify-between border-b pb-2">
                            <span>{model.name}</span>
                            <span className="font-medium">{model.price}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button asChild className="w-full group">
                      <Link to={category.href} className="flex items-center justify-center">
                        Shop {category.title}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Kazakhstan Running Guide */}
        <div className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Running in Kazakhstan</h2>
              <p className="text-lg text-black/70 max-w-3xl mx-auto">
                Discover the best running routes, events and communities across Kazakhstan's diverse terrain - from urban parks to mountain trails.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Almaty Mountain Trail" 
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Popular Running Cities</h3>
                  <ul className="space-y-2">
                    <li>Almaty - Mountain trails and urban parks</li>
                    <li>Nur-Sultan - Riverfront pathways</li>
                    <li>Shymkent - Historic routes</li>
                    <li>Karaganda - Lake circuits</li>
                  </ul>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/news">View Running Guides</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Kazakhstan Marathon" 
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
                  <ul className="space-y-2">
                    <li>Almaty Marathon - April 2023</li>
                    <li>Nur-Sultan Half Marathon - June 2023</li>
                    <li>Borovoe Trail Run - July 2023</li>
                    <li>Kazakhstan Ultra - September 2023</li>
                  </ul>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/news">View All Events</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
