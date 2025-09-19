import { Card, CardContent } from "../ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Anjali Gupta",
    location: "Mumbai",
    rating: 5,
    text: "GetSetTravel made our Kerala trip absolutely magical! The houseboat experience and personalized itinerary exceeded all expectations. Our advisor Priya was incredibly knowledgeable and helpful.",
    trip: "Kerala Backwaters Package",
    avatar: "AG",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    location: "Delhi",
    rating: 5,
    text: "Best travel experience ever! The Goa trip was perfectly planned with amazing accommodations and activities. The team handled everything seamlessly.",
    trip: "Goa Beach Paradise",
    avatar: "RS",
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Exceptional service and attention to detail. Our Rajasthan heritage tour was like living in a fairy tale. Thank you for making our anniversary so special!",
    trip: "Rajasthan Royal Heritage",
    avatar: "MP",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-orange-500 font-handwriting">
              {" "}
              Traveller's{" "}
            </span>
            Picks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real travelers who discovered their perfect
            journey with us.
          </p>
        </div>

        {/* Google Reviews Stats */}
        <div className="text-center mb-12 animate-scale-in">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="font-semibold">Google Reviews</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-bold">4.9/5</span>
            <span className="text-muted-foreground">(2,340 reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-xl p-0 border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12  bg-orange-500 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-orange-500/20" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4">
            <div className="text-2xl font-bold text-orange-500">2,340+</div>
            <div className="text-muted-foreground">Happy Travelers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
