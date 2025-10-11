"use client";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Star, MapPin } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const fallback = "/images/avatar.webp";

const AdvisorCarousel = ({ data }) => {
  // console.log(data);

  return (
    <section className="py-16  bg-gradient-to-b from-background to-muted/30">
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
          className="w-full "
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
          <CarouselContent className="-ml-6 px-3">
            {data.map((advisor, index) => (
              <CarouselItem
                key={advisor._id}
                className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 "
              >
                <Card className="group p-0 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-0">
                  <CardContent className="p-0 relative h-80">
                    <a href={`/creator/${advisor._id}`}>
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={advisor.profileImg || fallback}
                          alt={advisor.name}
                          className="w-full h-full object-cover transition-transform scale-110 duration-700 ease-in-out group-hover:scale-100 group-hover:origin-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">
                          {advisor.name}
                        </h3>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-white/70" />
                          <span className="text-sm text-white/70">
                            {advisor.location}
                          </span>
                        </div>
                      </div>
                    </a>
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
