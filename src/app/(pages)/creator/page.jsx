'use client';

import TestimonialsSection from '../../components/Creator/ReviewSection';
import AdvisorCarousel from '../../components/Creator/AdvisoreCarousel';
import HeroSection from '../../components/Creator/HeroSection';
import ExpandableGridSection from '../../components/Creator/TourGridSection';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Preview from '../../components/CustomUI/Card/Preview';
import Tour from '../../components/CustomUI/Card/Tour';
import TourGridSection from '../../components/Creator/TourGridSection';
import BlogGridSection from '../../components/Creator/BlogGridSection';

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  const endpoint = useMemo(() => {
    if (!API_URL) return '/api/creatorHome'; // fallback to Next route handler on same origin

    return `${API_URL}/api/creatorHome`;
  }, []);

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setError('API endpoint not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/creatorHome`,
        {
          // cache: "force-cache",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch (${res.status} ${res.statusText})`);
      }

      const json = await res.json();
      console.log('json', json);

      setData(json || { blogs: [], tours: [], creators: [] });
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setError(err?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
    return () => controllerRef.current?.abort();
  }, [fetchData]);

  const blogs = data?.blogs || [];
  const tours = data?.tours || [];
  const creators = data?.creators || [];
  const reviews = data?.reviews || [];

  console.log(blogs, tours, creators, 'reviews', reviews);

  return (
    <div className='min-h-screen'>
      <HeroSection />
      <AdvisorCarousel data={creators} />

      {/* Tours Grid */}
      <div className='mt-20 w-full max-w-[95rem] mx-auto'>
        <TourGridSection
          title='Featured Tours'
          allUrl={`/creator/home`}
          type={`tours`}
          url={`/creator/tour`}
          description='Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you.'
          data={tours}
          visibleCount={4}
          CardComponent={Tour}
        />
      </div>
      <TestimonialsSection data={reviews} />
      {/* Tours Grid */}
      <div className='  w-full max-w-[95rem] mx-auto'>
        <BlogGridSection
          title='Blog Highlights'
          allUrl={`/creator/blog`}
          type={`blogs`}
          url={`/creator/blog`}
          description='Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you.'
          data={blogs}
          visibleCount={3}
          CardComponent={Preview}
        />
      </div>
    </div>
  );
};

export default Index;
