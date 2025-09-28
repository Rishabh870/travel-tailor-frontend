"use client";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/bg.jpg"
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60  to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-16">
          <h1 className="text-2xl font-semibold text-white tracking-wider">
            TRAVEL
            <span className="text-orange-600">TAILOR</span>
          </h1>
        </div>

        {/* Main Heading */}
        <h2 className="text-6xl mb-4 xl:text-8xl font-light text-orange-600 tracking-tight font-handwriting">
          Every Step,
          <br />
          <span className="text-white font-sans text-5xl xl:text-7xl ">
            Every Journey
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-md md:text-2xl xl:text-4xl text-white/90 mb-6 xl:mb-12 font-light">
          Fly above the ordinary, travel today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={() => router.push("/home")}
            className="bg-orange-600 hover:bg-white hover:text-orange-600 text-white font-medium px-12 py-4 rounded-full text-lg transition-all duration-300"
          >
            Main
          </Button>

          <Button
            size="lg"
            onClick={() => router.push("/creator")}
            className="bg-white hover:text-white hover:bg-orange-600 text-orange-600 font-medium px-12 py-4 rounded-full text-lg transition-all duration-300"
          >
            Creator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
