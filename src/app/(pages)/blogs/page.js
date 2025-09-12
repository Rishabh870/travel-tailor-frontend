'use client';

import BlogsList from '@/app/components/BlogsList/BlogsList';
import Spinner from '@/app/components/CustomUI/Spinner/Spinner';

import { useState, useEffect } from 'react';

function Blogs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/apihome/blogs/`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <section style={{ minHeight: '500px' }}>
      {data ? <BlogsList data={data} /> : <Spinner />}
    </section>
  );
}

export default Blogs;
