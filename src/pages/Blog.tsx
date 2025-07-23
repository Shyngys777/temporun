
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

// Blog post data
const blogPosts = [
    {
        id: 1,
        title: "How to Choose the Perfect Running Shoes for Your Foot Type",
        excerpt: "Finding the right running shoes can make all the difference in your comfort, performance, and injury prevention. Learn how to select the perfect pair based on your unique foot characteristics.",
        category: "Gear Guide",
        date: "May 15, 2023",
        author: "Sarah Johnson",
        image: "/placeholder.svg"
    },
    {
        id: 2,
        title: "10 Essential Stretches Every Runner Should Know",
        excerpt: "Proper stretching before and after runs can improve performance and reduce injury risk. Discover the most effective stretches to incorporate into your running routine.",
        category: "Training",
        date: "April 28, 2023",
        author: "Michael Chen",
        image: "/placeholder.svg"
    },
    {
        id: 3,
        title: "Beginner's Guide to Half Marathon Training",
        excerpt: "Training for your first half marathon can be daunting. This comprehensive 12-week plan will help you build endurance and confidence to cross that finish line.",
        category: "Training",
        date: "April 10, 2023",
        author: "Alex Martin",
        image: "/placeholder.svg"
    },
    {
        id: 4,
        title: "Nutrition Tips for Long-Distance Runners",
        excerpt: "Proper nutrition is crucial for running performance. Learn what to eat before, during, and after your runs to fuel your body optimally.",
        category: "Nutrition",
        date: "March 22, 2023",
        author: "Olivia Brown",
        image: "/placeholder.svg"
    },
    {
        id: 5,
        title: "5 Common Running Injuries and How to Prevent Them",
        excerpt: "Running injuries can sideline even the most dedicated athletes. Discover the most common injuries, their causes, and preventative measures to keep you running strong.",
        category: "Health",
        date: "March 5, 2023",
        author: "Dr. James Wilson",
        image: "/placeholder.svg"
    },
    {
        id: 6,
        title: "The Ultimate Guide to Running in Different Weather Conditions",
        excerpt: "Don't let weather stop your training. From scorching heat to freezing cold, learn how to adapt your running routine for any climate while staying safe and comfortable.",
        category: "Tips & Tricks",
        date: "February 18, 2023",
        author: "Sarah Johnson",
        image: "/placeholder.svg"
    }
];

// Featured post
const featuredPost = {
    id: 7,
    title: "The Science of Endurance: How to Build Your Running Stamina",
    excerpt: "Endurance isn't just about physical strength—it's a complex interplay of physiological adaptations, mental fortitude, and strategic training. This comprehensive guide explores the latest research on building running stamina and provides actionable strategies to help you go the distance.",
    category: "Training",
    date: "May 20, 2023",
    author: "Dr. Emily Patel",
    image: "/placeholder.svg"
};

// Blog categories
const categories = [
    "Training",
    "Nutrition",
    "Gear Guide",
    "Health",
    "Tips & Tricks",
    "Success Stories",
    "Events",
    "Technology"
];

const Blog = () => {
    return (
        <>
            <SEO
                title="Blog | TempoRun"
                description="Training tips, gear reviews, and running advice from the TempoRun experts."
                keywords="running blog, training tips, gear reviews, nutrition advice, running techniques"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-black/5 to-black/10 py-16">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">TempoRun Blog</h1>
                            <p className="text-lg max-w-2xl">Expert advice, training tips, and inspiration for runners of all levels.</p>

                            {/* Search */}
                            <div className="mt-8 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                    <Input
                                        placeholder="Search articles..."
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-5xl">
                        {/* Featured Post */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">Featured Article</h2>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="overflow-hidden h-[300px] md:h-auto">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardContent className="p-6 md:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center mb-3">
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded">
                          {featuredPost.category}
                        </span>
                                                <span className="text-xs text-muted-foreground ml-3">
                          {featuredPost.date}
                        </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">{featuredPost.title}</h3>
                                            <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-sm font-medium mb-4">By {featuredPost.author}</p>
                                            <Button className="flex items-center">
                                                Read Article
                                                <ChevronRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>

                        {/* Latest Posts */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Latest Articles</h2>
                                <Button variant="outline">View All</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogPosts.slice(0, 3).map((post) => (
                                    <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="overflow-hidden h-48">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-3">
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded">
                          {post.category}
                        </span>
                                                <span className="text-xs text-muted-foreground ml-3">
                          {post.date}
                        </span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-3">{post.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs">By {post.author}</span>
                                                <Button variant="ghost" size="sm" className="flex items-center text-xs">
                                                    Read More
                                                    <ChevronRight className="ml-1 h-3 w-3" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* More Articles */}
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-semibold mb-6">More Articles</h2>
                                <div className="space-y-6">
                                    {blogPosts.slice(3).map((post) => (
                                        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="grid grid-cols-1 sm:grid-cols-3">
                                                <div className="overflow-hidden h-48 sm:h-full">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <CardContent className="p-6 sm:col-span-2">
                                                    <div className="flex items-center mb-3">
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded">
                              {post.category}
                            </span>
                                                        <span className="text-xs text-muted-foreground ml-3">
                              {post.date}
                            </span>
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs">By {post.author}</span>
                                                        <Button variant="ghost" size="sm" className="flex items-center text-xs">
                                                            Read More
                                                            <ChevronRight className="ml-1 h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <Button variant="outline">Load More Articles</Button>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-4">Categories</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category, index) => (
                                                <Button key={index} variant="outline" size="sm" className="mb-2">
                                                    {category}
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-4">Popular Articles</h3>
                                        <div className="space-y-4">
                                            {blogPosts.slice(0, 3).map((post) => (
                                                <div key={post.id} className="flex items-start space-x-3">
                                                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
                                                        <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-4">Newsletter</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Subscribe to our newsletter for the latest articles, training tips, and exclusive offers.</p>
                                        <div className="space-y-3">
                                            <Input placeholder="Your email address" />
                                            <Button className="w-full">Subscribe</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Blog;