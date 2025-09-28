import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, MapPin, Calendar, Star } from 'lucide-react';
import { useState } from 'react';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      router.push(
        `/creator/search?q=${encodeURIComponent(trimmed)}&filter=all`,
      );
    } else {
      router.push(`/creator/search`);
    }
  };
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('https://images.musement.com/cover/0003/14/koh-samui-xxl-jpg_header-213595.jpeg')`,
        }}>
        <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent' />
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 text-center'>
        <div className='max-w-4xl mx-auto animate-fade-in'>
          <h1 className='text-5xl xl:text-7xl font-bold mb-6 text-white leading-tight'>
            Personalized travel for those who
            <span className='text-orange-600 font-handwriting text-6xl xl:text-7xl block mt-2'>
              seek more.
            </span>
          </h1>
          <p className='text-lg xl:text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Crafted by travellers. Designed for depth. Made only for you.
          </p>

          {/* Search Bar */}
          {/* <div className='bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto animate-slide-up'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 '>
              <div className='relative  col-span-1 md:col-span-2 xl:col-span-3'>
                <MapPin className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
                <Input
                  placeholder='Search Travel Stories and Trips '
                  className='pl-10 rounded-l-full h-12 bg-background border-border'
                />
              </div>

              <Button className='h-12 rounded-r-full col-span-2 xl:col-span-1 bg-orange-600 hover:bg-orange-700/90'>
                <Search className='mr-2 h-5 w-5' />
                Search Trips
              </Button>
            </div>
          </div> */}

          {/* Search Bar */}
          <div className='rounded-2xl p-6  max-w-4xl mx-auto animate-slide-up'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 '>
              <div className='relative bg-transparent backdrop-blur-md col-span-1 md:col-span-2 xl:col-span-3'>
                <MapPin className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
                <Input
                  placeholder='Search Travel Stories and Trips'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className='pl-10 rounded-l-full h-12 bg-background border-border'
                />
              </div>

              <Button
                onClick={handleSearch}
                className='h-12 rounded-r-full col-span-2 xl:col-span-1 bg-orange-600 hover:bg-orange-700/90'>
                <Search className='mr-2 h-5 w-5' />
                Search Trips
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float'>
        <div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse' />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
