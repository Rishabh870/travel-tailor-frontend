"use client";

import TestimonialsSection from "../../../components/Creator/ReviewSection";
import AdvisorCarousel from "../../../components/Creator/AdvisoreCarousel";
import BlogSection from "../../../components/Creator/BlogSection";
import DestinationsGrid from "../../../components/Creator/DestinationGrid";
import HeroSection from "../../../components/Creator/HeroSection";
import ExpandableGridSection from "../../../components/Creator/ExpandableGridSection";
import { useParams } from "next/navigation";
import { useState } from "react";
import Preview from "../../../components/CustomUI/Card/Preview";
import Tour from "../../../components/CustomUI/Card/Tour";
export const tourData = [
  {
    title: "Bali Island Retreat",
    description:
      "Experience the tropical paradise of Bali with serene beaches, waterfalls, and spiritual temples.",
    slug: "bali-island-retreat",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1699626665487-12e6eb2c5c35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    tag: "6 Night",
  },
  {
    title: "Himalayan Trek Adventure",
    description:
      "Conquer the trails of the Himalayas with guided treks and breathtaking mountain views.",
    slug: "himalayan-trek",
    imgUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    tag: "9 Night",
  },
  {
    title: "Venice Romantic Escape",
    description:
      "Glide through the canals of Venice, enjoy Italian cuisine, and embrace timeless romance.",
    slug: "venice-romantic-escape",
    imgUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    tag: "7 Night",
  },
  {
    title: "Dubai Desert Safari",
    description:
      "Dune bashing, camel rides, and a magical desert sunset with a BBQ dinner experience.",
    slug: "dubai-desert-safari",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1690749740484-89660d6003f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    tag: "4 Night",
  },
  {
    title: "Tokyo Culture Tour",
    description:
      "Immerse yourself in Japanese traditions, temples, sushi experiences, and city vibes.",
    slug: "tokyo-culture-tour",
    imgUrl: "/images/spider.png",
    tag: "5 Night",
  },
  {
    title: "South Africa Safari",
    description:
      "Explore wildlife in Kruger National Park and experience Africa’s stunning nature.",
    slug: "south-africa-safari",
    imgUrl: "/images/spider.png",
    tag: "8 Night",
  },
  {
    title: "Santorini Sunsets",
    description:
      "Whitewashed houses, blue domes, and the best sunset views in the Aegean Sea.",
    slug: "santorini-sunsets",
    imgUrl: "/images/spider.png",
    tag: "6 Night",
  },
];

export const blogData = [
  {
    title: "Bali Island Retreat",
    description:
      "Experience the tropical paradise of Bali with serene beaches, waterfalls, and spiritual temples.",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1699626665487-12e6eb2c5c35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    url: "/blogs/bali-island-retreat",
    className: "",
    btn: "Read more",
  },
  {
    title: "Himalayan Trek Adventure",
    description:
      "Conquer the trails of the Himalayas with guided treks and breathtaking mountain views.",
    imgUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    url: "/blogs/himalayan-trek",
    className: "",
    btn: "Read more",
  },
  {
    title: "Venice Romantic Escape",
    description:
      "Glide through the canals of Venice, enjoy Italian cuisine, and embrace timeless romance.",
    imgUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    url: "/blogs/venice-romantic-escape",
    className: "",
    btn: "Read more",
  },
  {
    title: "Dubai Desert Safari",
    description:
      "Dune bashing, camel rides, and a magical desert sunset with a BBQ dinner experience.",
    imgUrl: "/images/tours/dubai.jpg",
    url: "/blogs/dubai-desert-safari",
    className: "",
    btn: "Read more",
  },
  {
    title: "Tokyo Culture Tour",
    description:
      "Immerse yourself in Japanese traditions, temples, sushi experiences, and city vibes.",
    imgUrl: "/images/tours/tokyo.jpg",
    url: "/blogs/tokyo-culture-tour",
    className: "",
    btn: "Read more",
  },
  {
    title: "South Africa Safari",
    description:
      "Explore wildlife in Kruger National Park and experience Africa’s stunning nature.",
    imgUrl: "/images/tours/safari.jpg",
    url: "/blogs/south-africa-safari",
    className: "",
    btn: "Read more",
  },
  {
    title: "Santorini Sunsets",
    description:
      "Whitewashed houses, blue domes, and the best sunset views in the Aegean Sea.",
    imgUrl: "/images/tours/santorini.jpg",
    url: "/blogs/santorini-sunsets",
    className: "",
    btn: "Read more",
  },
];
const Index = () => {
  const params = "sjdhijashid";
  const { id } = useParams(params); // ✅ unwraps the Promise
  // data/profileData.js

  const [visibleTours, setVisibleTours] = useState(4);
  const [visibleBlogs, setVisibleBlogs] = useState(4);
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AdvisorCarousel />
      {/* Tours Grid */}
      <div className="mt-20 w-full max-w-[95rem] mx-auto">
        <ExpandableGridSection
          title="Featured Tours"
          allUrl={`/creator/home`}
          type={`/tours`}
          description="Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you."
          data={tourData}
          visibleCount={visibleTours}
          setVisibleCount={setVisibleTours}
          CardComponent={Tour}
        />
      </div>
      <TestimonialsSection />
      {/* Tours Grid */}
      <div className="  w-full max-w-[95rem] mx-auto">
        <ExpandableGridSection
          title="Blog Highlights"
          allUrl={`/creator/home`}
          type={`blogs`}
          description="Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you."
          data={blogData}
          visibleCount={visibleBlogs}
          setVisibleCount={setVisibleBlogs}
          CardComponent={Preview}
        />
      </div>
    </div>
  );
};

export default Index;
