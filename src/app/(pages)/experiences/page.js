'use client';

import { useState, useEffect } from 'react';
import List from '@/app/components/List/List';
import Spinner from '@/app/components/CustomUI/Spinner/Spinner';
import styles from './styles.module.css';

export default function ExperiencesPage() {
  const [experienceData, setExperienceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/apihome/experiences/`,
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
        setExperienceData(data);
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
        setError(err.message || 'Failed to fetch experience data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.experiences}>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div
          style={{
            padding: 'var(--pd-page)',
            color: 'red',
            textAlign: 'center',
          }}>
          Error: {error}
        </div>
      ) : !experienceData ||
        !experienceData.list ||
        experienceData.list.length === 0 ? (
        <div
          style={{
            padding: 'var(--pd-page)',
            textAlign: 'center',
            color: 'var(--color-grey)',
          }}>
          No experiences found.
        </div>
      ) : (
        <List
          data={experienceData}
          itemBasePath='/experiences'
          itemKeyName='experiences'
        />
      )}
    </section>
  );
}
