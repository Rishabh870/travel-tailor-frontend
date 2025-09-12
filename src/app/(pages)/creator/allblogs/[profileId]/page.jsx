'use client';
import Preview from '@/app/components/CustomUI/Card/Preview';
import React from 'react';
import styles from './styles.module.css';
import { useParams } from 'next/navigation';
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
const page = () => {
  const { id } = useParams(params); // ✅ unwraps the Promise
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        All <span>Blogs</span>
      </h2>

      <div className={styles.grid}>
        {blogData.map((blog, index) => (
          <div className={styles.gridItem} key={index}>
            <Preview {...blog} className={styles.preview} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
