import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, MapPin, Calendar, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.musement.com/cover/0003/14/koh-samui-xxl-jpg_header-213595.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl xl:text-7xl font-bold mb-6 text-white leading-tight">
            Personalized travel for those who
            <span className="text-orange-600 font-handwriting text-6xl xl:text-7xl block mt-2">
              seek more.
            </span>
          </h1>
          <p className="text-lg xl:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crafted by travellers. Designed for depth. Made only for you.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Where to?"
                  className="pl-10 h-13 bg-background border-border"
                />
              </div>

              <Select className="w-full">
                <SelectTrigger className="h-12 w-full py-6">
                  <div className="flex items-center gap-2 py-[15rem]">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <SelectValue placeholder="Month" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                </SelectContent>
              </Select>

              <Button className="h-12 col-span-2 xl:col-span-1 bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" />
                Search Trips
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
