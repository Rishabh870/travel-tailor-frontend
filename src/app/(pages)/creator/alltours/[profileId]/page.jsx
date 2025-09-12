'use client';
import Preview from '@/app/components/CustomUI/Card/Preview';
import React from 'react';
import styles from './styles.module.css';
import Tour from '@/app/components/CustomUI/Card/Tour';
import { useParams } from 'next/navigation';
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
const page = () => {
  const { id } = useParams(params); // ✅ unwraps the Promise

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        All <span>Tours</span>
      </h2>

      <div className={styles.grid}>
        {tourData.map((tour, index) => (
          <div className={styles.gridItem} key={index}>
            <Tour {...tour} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
