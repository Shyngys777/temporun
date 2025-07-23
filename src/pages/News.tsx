
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Globe, MapPin, Trophy, Users, ArrowRight, Clock, BookOpen } from 'lucide-react';

const featuredNews = {
  title: "Almaty Marathon Sets New Participation Record",
  excerpt: "Over 20,000 runners participated in this year's Almaty Marathon, setting a new record for the event and cementing its status as Central Asia's premier running competition.",
  date: "April 23, 2023",
  image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  readTime: "5 min read",
  author: "Askar Nurumov",
  category: "Events"
};

const newsCategories = [
  { id: "all", label: "All News" },
  { id: "events", label: "Events" },
  { id: "training", label: "Training" },
  { id: "gear", label: "Gear Reviews" },
  { id: "community", label: "Community" },
  { id: "international", label: "International" }
];

const newsItems = [
  {
    id: 1,
    title: "New Balance Opens First Kazakhstan Store in Almaty",
    excerpt: "Global running brand New Balance has opened its first dedicated store in Kazakhstan, bringing their full range of performance running shoes to local runners.",
    date: "May 5, 2023",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "3 min read",
    author: "Dinara Kalieva",
    category: "Gear"
  },
  {
    id: 2,
    title: "Training for Altitude: Preparing for Mountain Races",
    excerpt: "Professional coach Marat Zhylkybaev shares his expert advice for training effectively for high-altitude competitions in Kazakhstan's mountain regions.",
    date: "April 29, 2023",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "7 min read",
    author: "Marat Zhylkybaev",
    category: "Training"
  },
  {
    id: 3,
    title: "Kazakhstan Ultra Trail Series Announced for 2023",
    excerpt: "A new series of ultra trail running events has been announced, connecting five of Kazakhstan's most beautiful natural landscapes into a competitive series.",
    date: "April 24, 2023",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    author: "Timur Artykbayev",
    category: "Events"
  },
  {
    id: 4,
    title: "Local Running Communities Transform Urban Spaces",
    excerpt: "Grassroots running groups in Nur-Sultan and Almaty are collaborating with city officials to create dedicated running paths and improve safety for urban runners.",
    date: "April 20, 2023",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    author: "Aizhan Nurmagambetova",
    category: "Community"
  },
  {
    id: 5,
    title: "Kenyan Elite Runners to Host Training Camp in Almaty",
    excerpt: "A group of elite Kenyan marathon runners will host a special two-week training camp in Almaty this summer, offering local runners a chance to learn from the world's best.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    author: "Yerlan Konakbayev",
    category: "International"
  },
  {
    id: 6,
    title: "Comprehensive Review: Top Trail Running Shoes for Kazakh Terrain",
    excerpt: "Our expert team tests ten leading trail running shoes to find the best options for Kazakhstan's diverse and challenging terrain.",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "8 min read",
    author: "Askar Nurumov",
    category: "Gear"
  }
];

const upcomingEvents = [
  {
    id: "e1",
    name: "Almaty Marathon",
    date: "April 23, 2023",
    location: "Almaty",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "e2",
    name: "Charyn Canyon Trail Run",
    date: "May 14, 2023",
    location: "Charyn National Park",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "e3",
    name: "Nur-Sultan Night Run",
    date: "June 10, 2023",
    location: "Nur-Sultan",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredNews = activeCategory === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category.toLowerCase() === activeCategory);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Header */}
        <div className="bg-black text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Running News</h1>
                <p className="text-lg text-white/80 max-w-2xl">
                  Stay up to date with the latest running news, events, and trends from Kazakhstan and around the world. From elite competitions to community initiatives, we cover all aspects of the running world.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Runners in Kazakhstan" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">Discover the beauty of running in Kazakhstan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="bg-white py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 rounded-xl overflow-hidden">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {featuredNews.category}
                  </span>
                  <span className="text-black/60 text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{featuredNews.title}</h2>
                <p className="text-black/70 mb-6">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      {featuredNews.author.charAt(0)}
                    </div>
                    <span className="ml-2 text-sm font-medium">{featuredNews.author}</span>
                  </div>
                  <span className="text-sm text-black/60 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredNews.readTime}
                  </span>
                </div>
                <Button className="mt-6 w-full sm:w-auto">
                  Read Full Article
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* News Listings */}
        <div className="bg-slate-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold">Latest News</h2>
              <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <Tabs value={activeCategory} className="w-full">
                  <TabsList className="flex mb-8">
                    {newsCategories.map(category => (
                      <TabsTrigger 
                        key={category.id}
                        value={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className="px-4 py-2"
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map(news => (
                <Card key={news.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/9] w-full relative">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-medium rounded-full">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-sm text-black/60 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {news.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {news.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                    <p className="text-black/70 mb-4">{news.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <div className="h-7 w-7 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs">
                          {news.author.charAt(0)}
                        </div>
                        <span className="ml-2 text-sm font-medium">{news.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="font-medium">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-4">Upcoming Running Events</h2>
              <p className="text-black/70 max-w-2xl mx-auto">
                Find your next race and challenge yourself. From city marathons to trail adventures, there's something for every runner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <div key={event.id} className="group relative rounded-xl overflow-hidden h-64">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <Button variant="outline" className="mt-4 bg-white/10 border-white/40 backdrop-blur-sm hover:bg-white/20 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button variant="outline" asChild>
                <Link to="/events" className="inline-flex items-center">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-slate-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-4">Running Resources</h2>
              <p className="text-black/70 max-w-2xl mx-auto">
                Expert guides, training plans, and community resources to help you reach your running goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Training Guides</h3>
                  <p className="text-black/70 mb-4">Expert plans for all levels, from 5K to marathon</p>
                  <Button variant="outline" size="sm" className="mt-auto">View Guides</Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Route Maps</h3>
                  <p className="text-black/70 mb-4">Discover the best running routes across Kazakhstan</p>
                  <Button variant="outline" size="sm" className="mt-auto">Explore Routes</Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Running Clubs</h3>
                  <p className="text-black/70 mb-4">Connect with local running communities</p>
                  <Button variant="outline" size="sm" className="mt-auto">Find Clubs</Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Race Calendar</h3>
                  <p className="text-black/70 mb-4">Comprehensive calendar of upcoming races</p>
                  <Button variant="outline" size="sm" className="mt-auto">View Calendar</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* International News */}
        <div className="bg-white py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Global Running News</h2>
              <Button variant="ghost" size="sm" className="hidden md:flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                View All Global News
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      International
                    </span>
                    <span className="text-black/60 text-sm">May 2, 2023</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Boston Marathon Sees Record-Breaking Performances</h3>
                  <p className="text-black/70">The 2023 Boston Marathon witnessed multiple course records being broken in what experts are calling one of the most competitive fields in the event's history.</p>
                  <Button variant="outline" className="mt-4">Read Story</Button>
                </div>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      International
                    </span>
                    <span className="text-black/60 text-sm">April 30, 2023</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">UTMB Announces New Qualification System for 2024</h3>
                  <p className="text-black/70">Ultra-Trail du Mont-Blanc (UTMB) has announced significant changes to its qualification system for next year's event, affecting runners worldwide.</p>
                  <Button variant="outline" className="mt-4">Read Story</Button>
                </div>
              </Card>
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" className="w-full">
                <Globe className="h-4 w-4 mr-2" />
                View All Global News
              </Button>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default News;
