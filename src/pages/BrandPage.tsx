import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByBrand, getBrands, products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, ArrowRight, Search, Filter } from 'lucide-react';
import BrandHero from '@/components/BrandHero';
import BrandCollections, { CollectionItem } from '@/components/BrandCollections';
import BrandCategories, { CategoryItem } from '@/components/BrandCategories';
import { Separator } from '@/components/ui/separator';

export interface BrandHeroSlide {
  image: string;
  title: string;
  subtitle?: string;
}

interface BrandContent {
  description: string;
  longDescription: string;
  heroImage: string;
  bgColor: string;
  accentColor: string;
  collections: CollectionItem[];
  categories: CategoryItem[];
  heroSlides: BrandHeroSlide[];
}

const brandContent: Record<string, BrandContent> = {
  "Nike": {
    description: "Just do it. Innovation that inspires athletes to dream bigger and achieve more. Experience the future of performance with Nike's cutting-edge footwear technology.",
    longDescription: "Nike leads the industry in innovation and design, creating products that empower every athlete to perform at their best. From the revolutionary Air technology to React cushioning, Nike continues to push boundaries in performance footwear. At RunnersPeak, we offer an extensive collection of Nike's most coveted running shoes, including the Pegasus, Vaporfly, and Alphafly series that dominate both recreational and competitive running scenes worldwide.",
    heroImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    bgColor: "bg-gradient-to-r from-orange-50 to-red-50",
    accentColor: "from-orange-500 to-red-500",
    collections: [
      {
        name: "Air Zoom",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Responsive cushioning for fast-paced runs and races with Nike's innovative Air Zoom technology."
      },
      {
        name: "Pegasus",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The workhorse trainer that delivers mile after mile of comfort and durability."
      },
      {
        name: "Vaporfly",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Breaking records and barriers with carbon fiber plate technology for elite performance."
      }
    ],
    categories: [
      {
        name: "Road",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engineered for the pavement with durability and cushioning.",
        link: "/categories/road"
      },
      {
        name: "Trail",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Grip and protection for the most challenging terrain.",
        link: "/categories/trail"
      },
      {
        name: "Track",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight speed for the oval.",
        link: "/categories/track"
      }
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Run Without Limits",
        subtitle: "Discover Nike's latest performance innovations"
      },
      {
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Pegasus 40",
        subtitle: "The iconic trainer returns with more responsive cushioning"
      },
      {
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "AlphaFly Next%",
        subtitle: "The marathon record-breaking technology"
      }
    ]
  },
  "Adidas": {
    description: "Run on energy. Glory in every rep. Live without limits. Explore all the very latest innovations from adidas here.",
    longDescription: "Adidas are one of the world leaders in creating high performance footwear and clothing - at RunnersPeak we're proud of our wide selection of adidas running shoes, including the world famous adidas Ultra Boost, and the brand new adizero adios pro. We also stock the widest range of adidas trail shoes, including the adidas Agravic and the walking and outdoor specific adidas Terrex range.",
    heroImage: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80",
    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
    accentColor: "from-blue-500 to-indigo-600",
    collections: [
      {
        name: "",
        image: "https://images.prismic.io/sportsshoesprod/Z1wh4JbqstJ98eVS_Adidas-ShopBy-Supernova.png?auto=format,compress",
        description: "Experience the legendary comfort and energy return of Boost cushioning technology."
      },
      {
        name: "",
        image: "https://images.prismic.io/sportsshoesprod/Z1wh35bqstJ98eVR_Adidas-ShopBy-Adizero.png?auto=format,compress",
        description: "Lightweight speed for race day performance and record-breaking potential."
      },
      {
        name: "",
        image: "https://images.prismic.io/sportsshoesprod/Z1wh4pbqstJ98eVT_Adidas-ShopBy-Terrex.png?auto=format,compress",
        description: "Rugged durability and grip for conquering any trail and outdoor adventure."
      }
    ],
    categories: [
      {
        name: "Шоссе",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engineered for the pavement with energy-returning cushioning.",
        link: "/categories/road"
      },
      {
        name: "Трейлы",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Conquer any terrain with Continental™ rubber outsoles.",
        link: "/categories/trail"
      },
      {
        name: "Старты",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight speed for competition and personal bests.",
        link: "/categories/racing"
      },
      {
        name: "Аммортизация",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight speed for competition and personal bests.",
        link: "/categories/racing"
      },
      {
        name: "Шиповки",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight speed for competition and personal bests.",
        link: "/categories/racing"
      },
      {
        name: "Стабилизация",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight speed for competition and personal bests.",
        link: "/categories/racing"
      }
    ],
    heroSlides: [
      {
        image: "https://storage.googleapis.com/bitr-cdn/wp-content/uploads/2024/10/adidas-adios-pro-4-final-feature-.jpg",
        title: "Run on Energy",
        subtitle: "Feel the boost in every step"
      },
      {
        image: "https://therunningchannel.com/wp-content/uploads/2024/09/AP4-header.jpg",
        title: "Ultraboost 23",
        subtitle: "More boost, more comfort, more miles"
      },
      {
        image: "https://storage.googleapis.com/bitr-cdn/wp-content/uploads/2024/06/Adidas-Adizero-SL-2-side.jpg",
        title: "Terrex Collection",
        subtitle: "Engineered for the outdoors"
      }
    ]
  },
  "New Balance": {
    description: "Fearlessly independent since 1906. Crafted for comfort, engineered for excellence. Experience the perfect balance.",
    longDescription: "New Balance has built its reputation on creating shoes that blend superior comfort with technical innovation. With a commitment to domestic manufacturing and a refusal to rely on celebrity endorsements, New Balance stands out as a brand that lets its products speak for themselves. Their Fresh Foam and FuelCell technologies represent the pinnacle of cushioning and energy return, making them favorites among serious runners seeking both performance and longevity.",
    heroImage: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    bgColor: "bg-gradient-to-r from-gray-50 to-slate-100",
    accentColor: "from-gray-600 to-slate-700",
    collections: [
      {
        name: "Fresh Foam",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Experience the plush, cloud-like feel of Fresh Foam cushioning technology."
      },
      {
        name: "FuelCell",
        image: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Propulsive power for explosive speed and energy return in every stride."
      },
      {
        name: "Made in USA",
        image: "https://images.unsplash.com/photo-1574668392358-60fc1b62cfce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Premium craftsmanship and domestic manufacturing for exceptional quality."
      }
    ],
    categories: [
      {
        name: "Road",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engineered for daily training and long-distance comfort.",
        link: "/categories/road"
      },
      {
        name: "Trail",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Rugged construction for off-road adventures and technical terrain.",
        link: "/categories/trail"
      },
      {
        name: "Stability",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Supportive designs for runners who need pronation control.",
        link: "/categories/stability"
      }
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "The Perfect Balance",
        subtitle: "Where comfort meets performance"
      },
      {
        image: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "FuelCell Technology",
        subtitle: "Experience the future of energy return"
      },
      {
        image: "https://images.unsplash.com/photo-1574668392358-60fc1b62cfce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Made in USA Collection",
        subtitle: "Premium craftsmanship, uncompromising quality"
      }
    ]
  },
  "Asics": {
    description: "Sound Mind, Sound Body. Scientifically engineered for maximum performance and injury prevention.",
    longDescription: "ASICS, derived from the Latin phrase 'Anima Sana In Corpore Sano' (a sound mind in a sound body), has dedicated over 70 years to creating running shoes that emphasize both performance and protection. Their GEL cushioning system and Impact Guidance System are innovative technologies developed through extensive research at their Institute of Sport Science. ASICS shoes are renowned for their durability, support, and consistent performance across training cycles.",
    heroImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    bgColor: "bg-gradient-to-r from-red-50 to-blue-50",
    accentColor: "from-red-500 to-blue-500",
    collections: [
      {
        name: "Gel-Kayano",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The flagship stability shoe offering premium support and cushioning for overpronators."
      },
      {
        name: "Gel-Nimbus",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The ultimate neutral running shoe for plush comfort and maximum cushioning."
      },
      {
        name: "MetaSpeed",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Carbon-plated racing shoes designed for breaking personal records."
      }
    ],
    categories: [
      {
        name: "Road",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Scientifically engineered for road running with GEL technology.",
        link: "/categories/road"
      },
      {
        name: "Trail",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "All-terrain traction and protection for off-road adventures.",
        link: "/categories/trail"
      },
      {
        name: "Stability",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engineered support for overpronators and motion control.",
        link: "/categories/stability"
      }
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
        title: "Sound Mind, Sound Body",
        subtitle: "The science of better running"
      },
      {
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "GEL Technology",
        subtitle: "Superior shock absorption for every stride"
      },
      {
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "MetaSpeed Series",
        subtitle: "The competitive edge for record-breaking performance"
      }
    ]
  },
  "Saucony": {
    description: "Run for good. Precision-engineered performance with a legacy of excellence dating back to 1898.",
    longDescription: "Founded in 1898 along the banks of Saucony Creek, this historic brand combines heritage with cutting-edge technology. Saucony has earned a devoted following among runners who appreciate their perfect balance of cushioning, stability, and lightweight design. Their PWRRUN cushioning and innovative SPEEDROLL technology continue to evolve, offering runners exceptional energy return and smooth transitions mile after mile.",
    heroImage: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    bgColor: "bg-gradient-to-r from-red-50 to-yellow-50",
    accentColor: "from-red-500 to-yellow-500",
    collections: [
      {
        name: "Endorphin",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Speed-focused collection featuring SPEEDROLL technology for effortless forward momentum."
      },
      {
        name: "Kinvara",
        image: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight, responsive trainers for fast-paced runs and uptempo workouts."
      },
      {
        name: "Triumph",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Plush, maximum cushioning for long-distance comfort and recovery runs."
      }
    ],
    categories: [
      {
        name: "Road",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Advanced cushioning technologies for road running excellence.",
        link: "/categories/road"
      },
      {
        name: "Trail",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Rugged outsoles and protection for trail running adventures.",
        link: "/categories/trail"
      },
      {
        name: "Racing",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Performance-engineered speed for competition day.",
        link: "/categories/racing"
      }
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Run For Good",
        subtitle: "A legacy of excellence since 1898"
      },
      {
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Endorphin Collection",
        subtitle: "Feel the SPEEDROLL advantage"
      },
      {
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "PWRRUN Technology",
        subtitle: "Cushioning that energizes your run"
      }
    ]
  },
  "Brooks": {
    description: "Run Happy. Biomechanically engineered for your unique stride, delivering personalized performance.",
    longDescription: "Brooks has built its reputation as a brand singularly focused on the science of running. Their commitment to creating shoes that work in harmony with a runner's unique biomechanics has earned them a loyal following among everyday runners and elite athletes alike. Through their advanced DNA LOFT cushioning and GuideRails support system, Brooks continues to innovate while maintaining their core promise: delivering a comfortable, consistent running experience.",
    heroImage: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    bgColor: "bg-gradient-to-r from-blue-50 to-green-50",
    accentColor: "from-blue-500 to-green-500",
    collections: [
      {
        name: "Ghost",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The smooth-riding neutral shoe perfect for daily training and long runs."
      },
      {
        name: "Adrenaline GTS",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The Go-To-Support shoe with GuideRails technology for stability runners."
      },
      {
        name: "Glycerin",
        image: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Premium cushioning for ultimate comfort on every run."
      }
    ],
    categories: [
      {
        name: "Road",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engineered for comfort and smooth transitions on paved surfaces.",
        link: "/categories/road"
      },
      {
        name: "Trail",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Rugged designs with enhanced traction for off-road adventures.",
        link: "/categories/trail"
      },
      {
        name: "Stability",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "GuideRails support system for runners who need motion control.",
        link: "/categories/stability"
      }
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "Run Happy",
        subtitle: "Engineered for the perfect run"
      },
      {
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "GuideRails Support",
        subtitle: "Keeping you in your natural motion path"
      },
      {
        image: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "DNA LOFT Cushioning",
        subtitle: "Softness without sacrificing responsiveness"
      }
    ]
  },
  "Hoka": {
    description: "Time to Fly. Revolutionary maximalist cushioning with a surprisingly lightweight feel.",
    longDescription: "HOKA disrupted the running industry with their unique 'maximalist' approach to shoe design. Known for their oversized midsoles and distinctive geometries, HOKA shoes deliver exceptional cushioning without sacrificing weight. Their Meta-Rocker technology promotes a smooth rolling motion, enhancing the efficiency of each stride. Popular among ultramarathoners and everyday runners alike, HOKA continues to expand their range while maintaining their core principle: creating shoes that make running feel easier.",
    heroImage: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2112&q=80",
    bgColor: "bg-gradient-to-r from-blue-50 to-orange-50",
    accentColor: "from-blue-500 to-orange-500",
    collections: [
      {
        name: "Clifton",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The perfect balance of soft and light for everyday training runs."
      },
      {
        name: "Bondi",
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Maximum cushioning and supreme comfort for long-distance runs."
      },
      {
        name: "Speedgoat",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Named after ultrarunning legend Karl Meltzer, built for conquering technical trails."
      }
    ],
    categories: [
      {
        name: "Road",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Distinctive maximalist cushioning for road running comfort.",
        link: "/categories/road"
      },
      {
        name: "Trail",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "All-terrain traction and protection for off-road adventures.",
        link: "/categories/trail"
      },
      {
        name: "Racing",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight, responsive shoes for race day performance.",
        link: "/categories/racing"
      }
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2112&q=80",
        title: "Time To Fly",
        subtitle: "Experience the unique HOKA advantage"
      },
      {
        image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "Maximalist Design",
        subtitle: "More cushioning, less weight"
      },
      {
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
        title: "Meta-Rocker Technology",
        subtitle: "Engineered for a smooth, efficient stride"
      }
    ]
  }
};

const defaultBrandContent: BrandContent = {
  description: "Discover premium running performance with our advanced footwear technology.",
  longDescription: "Explore our collection of high-performance running shoes designed for every type of runner and terrain. Each pair combines cutting-edge technology with exceptional comfort to enhance your running experience.",
  heroImage: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
  accentColor: "from-gray-600 to-gray-700",
  collections: [
    {
      name: "Performance",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Our premium line of high-performance running shoes for serious athletes."
    },
    {
      name: "Training",
      image: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Versatile shoes designed for daily training and long-lasting comfort."
    },
    {
      name: "Racing",
      image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Lightweight, responsive shoes engineered for race day performance."
    }
  ],
  categories: [
    {
      name: "Road",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Designed for maximum performance on paved surfaces.",
      link: "/categories/road"
    },
    {
      name: "Trail",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Rugged construction for off-road adventures.",
      link: "/categories/trail"
    },
    {
      name: "Track",
      image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Specialized shoes for track and competitive running.",
      link: "/categories/track"
    }
  ],
  heroSlides: [
    {
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Performance",
      subtitle: "Discover our range of advanced running shoes"
    },
    {
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Engineered for Excellence",
      subtitle: "Experience superior comfort and durability"
    },
    {
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "For Every Runner",
      subtitle: "Find the perfect shoe for your running style"
    }
  ]
};

const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const formattedBrandName = brandName?.replace(/-/g, ' ');
  const products = getProductsByBrand(formattedBrandName || '');
  const allBrands = getBrands();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const isBrandValid = allBrands.some(
      brand => brand.toLowerCase() === formattedBrandName?.toLowerCase()
  );

  const displayBrandName = formattedBrandName
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const content = (displayBrandName && brandContent[displayBrandName as keyof typeof brandContent]) || defaultBrandContent;

  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(
          products.filter(product =>
              product.tags?.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()))
          )
      );
    }
  }, [activeCategory, products]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderVisible(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandName]);

  if (!isBrandValid) {
    return (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 py-16 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center my-20">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Brand Not Found</h1>
                <p className="text-xl text-black/70 mb-8">
                  Sorry, we couldn't find the brand you're looking for.
                </p>
                <Button asChild>
                  <Link to="/brands">View All Brands</Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <BrandHero
            brand={displayBrandName || ''}
            description={content.description}
            slides={content.heroSlides}
            accentColor={content.accentColor}
        />

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg md:text-xl text-black/80 leading-relaxed">
              {content.longDescription}
            </p>
          </div>
        </section>

        <BrandCollections
            brandName={displayBrandName || ''}
            collections={content.collections}
            accentColor={content.accentColor}
        />

        <BrandCategories
            categories={content.categories}
            accentColor={content.accentColor}
        />

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">{displayBrandName} Products</h2>
              <div className={`h-1 w-20 bg-gradient-to-r ${content.accentColor} mx-auto mb-6`}></div>
              <p className="text-xl text-black/70 max-w-3xl mx-auto">
                Explore our complete range of {displayBrandName} running shoes.
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto" onValueChange={setActiveCategory}>
              <TabsList className="w-full flex justify-center overflow-x-auto p-1 mb-12">
                <TabsTrigger value="all">All Products</TabsTrigger>
                {content.categories.map(category => (
                    <TabsTrigger key={category.name} value={category.name.toLowerCase()}>
                      {category.name}
                    </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {visibleProducts.map((product) => (
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

                {visibleProducts.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-lg text-black/70 mb-6">
                        No products found in this category.
                      </p>
                      <Button asChild>
                        <Link to="/brands">Explore Other Brands</Link>
                      </Button>
                    </div>
                )}
              </TabsContent>

              {content.categories.map(category => (
                  <TabsContent key={category.name} value={category.name.toLowerCase()} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {visibleProducts.map((product) => (
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

                    {visibleProducts.length === 0 && (
                        <div className="text-center py-16">
                          <p className="text-lg text-black/70 mb-6">
                            No products found in this category.
                          </p>
                          <Button asChild>
                            <Link to="/brands">Explore Other Brands</Link>
                          </Button>
                        </div>
                    )}
                  </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </div>
  );
};

export default BrandPage;