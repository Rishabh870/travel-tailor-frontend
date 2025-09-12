'use client';

import ExpandableGridSection from '../../../components/Creator/ExpandableGridSection';
import ProfileHeader from '../../../components/Creator/ProfileHeader';
import Preview from '../../../components/CustomUI/Card/Preview';
import Tour from '../../../components/CustomUI/Card/Tour';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export const profileData = {
  coverImage: '/images/spider.png', // truncated for clarity
  profileImage:
    'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
  name: 'John Doe',
  bio: `Hey there! I'm John — a full-time travel creator and explorer. Over the past 6 years, I've journeyed across 50+ countries capturing experiences, curating offbeat itineraries, and leading unforgettable group adventures. Whether it's hiking in the Himalayas, scuba diving in Bali, or exploring the streets of Istanbul, I aim to blend culture, adventure, and community into every trip. Let’s make your next escape epic.`,
  location: 'Bali, Indonesia',
  tripsHosted: 8,
  rating: 4.8,
  socialLinks: {
    instagram: 'https://instagram.com/johndoe_travels',
    youtube: 'https://youtube.com/@JohnTravels',
    facebook: 'https://johndoetravels.com',
  },
  badges: ['Top Host', 'Explorer', 'Verified'],
  stats: {
    blogs: 234,
    joinedDate: 'March 2021',
  },
};

export const tourData = [
  {
    title: 'Bali Island Retreat',
    description:
      'Experience the tropical paradise of Bali with serene beaches, waterfalls, and spiritual temples.',
    slug: 'bali-island-retreat',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1699626665487-12e6eb2c5c35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    tag: '6 Night',
  },
  {
    title: 'Himalayan Trek Adventure',
    description:
      'Conquer the trails of the Himalayas with guided treks and breathtaking mountain views.',
    slug: 'himalayan-trek',
    imgUrl:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    tag: '9 Night',
  },
  {
    title: 'Venice Romantic Escape',
    description:
      'Glide through the canals of Venice, enjoy Italian cuisine, and embrace timeless romance.',
    slug: 'venice-romantic-escape',
    imgUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    tag: '7 Night',
  },
  {
    title: 'Dubai Desert Safari',
    description:
      'Dune bashing, camel rides, and a magical desert sunset with a BBQ dinner experience.',
    slug: 'dubai-desert-safari',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1690749740484-89660d6003f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    tag: '4 Night',
  },
  {
    title: 'Tokyo Culture Tour',
    description:
      'Immerse yourself in Japanese traditions, temples, sushi experiences, and city vibes.',
    slug: 'tokyo-culture-tour',
    imgUrl: '/images/spider.png',
    tag: '5 Night',
  },
  {
    title: 'South Africa Safari',
    description:
      'Explore wildlife in Kruger National Park and experience Africa’s stunning nature.',
    slug: 'south-africa-safari',
    imgUrl: '/images/spider.png',
    tag: '8 Night',
  },
  {
    title: 'Santorini Sunsets',
    description:
      'Whitewashed houses, blue domes, and the best sunset views in the Aegean Sea.',
    slug: 'santorini-sunsets',
    imgUrl: '/images/spider.png',
    tag: '6 Night',
  },
];

export const blogData = [
  {
    title: 'Bali Island Retreat',
    description:
      'Experience the tropical paradise of Bali with serene beaches, waterfalls, and spiritual temples.',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1699626665487-12e6eb2c5c35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    url: '/blogs/bali-island-retreat',
    className: '',
    btn: 'Read more',
  },
  {
    title: 'Himalayan Trek Adventure',
    description:
      'Conquer the trails of the Himalayas with guided treks and breathtaking mountain views.',
    imgUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    url: '/blogs/himalayan-trek',
    className: '',
    btn: 'Read more',
  },
  {
    title: 'Venice Romantic Escape',
    description:
      'Glide through the canals of Venice, enjoy Italian cuisine, and embrace timeless romance.',
    imgUrl:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    url: '/blogs/venice-romantic-escape',
    className: '',
    btn: 'Read more',
  },
  {
    title: 'Dubai Desert Safari',
    description:
      'Dune bashing, camel rides, and a magical desert sunset with a BBQ dinner experience.',
    imgUrl: '/images/tours/dubai.jpg',
    url: '/blogs/dubai-desert-safari',
    className: '',
    btn: 'Read more',
  },
  {
    title: 'Tokyo Culture Tour',
    description:
      'Immerse yourself in Japanese traditions, temples, sushi experiences, and city vibes.',
    imgUrl: '/images/tours/tokyo.jpg',
    url: '/blogs/tokyo-culture-tour',
    className: '',
    btn: 'Read more',
  },
  {
    title: 'South Africa Safari',
    description:
      'Explore wildlife in Kruger National Park and experience Africa’s stunning nature.',
    imgUrl: '/images/tours/safari.jpg',
    url: '/blogs/south-africa-safari',
    className: '',
    btn: 'Read more',
  },
  {
    title: 'Santorini Sunsets',
    description:
      'Whitewashed houses, blue domes, and the best sunset views in the Aegean Sea.',
    imgUrl: '/images/tours/santorini.jpg',
    url: '/blogs/santorini-sunsets',
    className: '',
    btn: 'Read more',
  },
];

// ✅ This receives the route parameter like /create/123 → params.id = "123"
export default function Page({ params }) {
  const { id } = useParams(params); // ✅ unwraps the Promise
  // data/profileData.js

  const [visibleTours, setVisibleTours] = useState(4);
  const [visibleBlogs, setVisibleBlogs] = useState(3);

  return (
    <div>
      <ProfileHeader data={profileData} />

      {/* Tours Grid */}
      <ExpandableGridSection
        title='Curated Tours'
        allUrl={`/creator/allblogs/${id}`}
        type={`/tours`}
        description='Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you.'
        data={tourData}
        visibleCount={visibleTours}
        setVisibleCount={setVisibleTours}
        CardComponent={Tour}
      />

      <ExpandableGridSection
        title='Latest Blogs'
        url={`/creator/blogs`}
        allUrl={`/creator/allblogs/${id}`}
        data={blogData}
        visibleCount={visibleBlogs}
        setVisibleCount={setVisibleBlogs}
        CardComponent={Preview}
        type='blogs'
      />
    </div>
  );
}
