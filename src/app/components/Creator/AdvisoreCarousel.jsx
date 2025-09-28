"use client";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Star, MapPin } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const advisor1 =
  "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1570&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const advisor2 =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const advisor3 =
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1641&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const advisors = [
  {
    id: 1,
    name: "Priya Sharma",
    image: advisor1,
    rating: 4.9,
    reviews: 234,
    specialization: "Cultural & Heritage Tours",
    location: "Mumbai, India",
    tripCount: "500+ trips planned",
  },
  {
    id: 2,
    name: "Arjun Patel",
    image: advisor2,
    rating: 4.8,
    reviews: 189,
    specialization: "Adventure & Trekking",
    location: "Bangalore, India",
    tripCount: "350+ trips planned",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    image: advisor3,
    rating: 4.9,
    reviews: 412,
    specialization: "Luxury Travel",
    location: "New Delhi, India",
    tripCount: "800+ trips planned",
  },
  {
    id: 4,
    name: "Rahul Kumar",
    image: advisor1,
    rating: 4.7,
    reviews: 156,
    specialization: "Budget Backpacking",
    location: "Goa, India",
    tripCount: "200+ trips planned",
  },
  {
    id: 5,
    name: "Maya Singh",
    image: advisor2,
    rating: 4.8,
    reviews: 298,
    specialization: "Wildlife & Nature",
    location: "Rishikesh, India",
    tripCount: "450+ trips planned",
  },
  {
    id: 6,
    name: "Vikram Reddy",
    image: advisor3,
    rating: 4.9,
    reviews: 321,
    specialization: "Spiritual Journeys",
    location: "Varanasi, India",
    tripCount: "600+ trips planned",
  },
  {
    id: 11,
    name: "Priya Sharma",
    image: advisor1,
    rating: 4.9,
    reviews: 234,
    specialization: "Cultural & Heritage Tours",
    location: "Mumbai, India",
    tripCount: "500+ trips planned",
  },
  {
    id: 12,
    name: "Arjun Patel",
    image: advisor2,
    rating: 4.8,
    reviews: 189,
    specialization: "Adventure & Trekking",
    location: "Bangalore, India",
    tripCount: "350+ trips planned",
  },
  {
    id: 31,
    name: "Sarah Johnson",
    image: advisor3,
    rating: 4.9,
    reviews: 412,
    specialization: "Luxury Travel",
    location: "New Delhi, India",
    tripCount: "800+ trips planned",
  },
  {
    id: 41,
    name: "Rahul Kumar",
    image: advisor1,
    rating: 4.7,
    reviews: 156,
    specialization: "Budget Backpacking",
    location: "Goa, India",
    tripCount: "200+ trips planned",
  },
  {
    id: 15,
    name: "Maya Singh",
    image: advisor2,
    rating: 4.8,
    reviews: 298,
    specialization: "Wildlife & Nature",
    location: "Rishikesh, India",
    tripCount: "450+ trips planned",
  },
  {
    id: 16,
    name: "Vikram Reddy",
    image: advisor3,
    rating: 4.9,
    reviews: 321,
    specialization: "Spiritual Journeys",
    location: "Varanasi, India",
    tripCount: "600+ trips planned",
  },
];

const AdvisorCarousel = ({ data }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your perfect next trip. Via
            <br />
            <span className="text-orange-600 text-3xl md:text-4xl font-handwriting">
              Travel Influencers & expert Travel advisors
            </span>
          </h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            Book hot deals from our Influencers' Travel Stores or reach out to
            our travel advisors to have them craft trips tailored to your
            preferences.
          </p>
        </div>

        {/* Advisor Cards */}
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="-ml-6">
            {data.map((advisor, index) => (
              <CarouselItem
                key={advisor._id}
                className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 "
              >
                <Card className="group p-0 overflow-hidden  hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-0">
                  <CardContent className="p-0 relative h-80">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${advisor.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {advisor.name}
                      </h3>

                      <div className="flex items-center gap-2  ">
                        <MapPin className="h-4 w-4 text-white/70" />
                        <span className="text-sm text-white/70">
                          {advisor.location}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default AdvisorCarousel;
