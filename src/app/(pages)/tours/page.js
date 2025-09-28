'use client';

import { useState, useEffect } from 'react';
import List from '../../components/List/List';
import Spinner from '../../components/CustomUI/Spinner/Spinner';
import styles from './styles.module.css';

export default function ToursPage() {
  const [tourData, setTourData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tour/`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTourData(data);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
        setError(err.message || 'Failed to fetch tour data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.tours}>
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
      ) : !tourData || !tourData.list || tourData.list.length === 0 ? (
        <div
          style={{
            padding: 'var(--pd-page)',
            textAlign: 'center',
            color: 'var(--color-grey)',
          }}>
          No tours found.
        </div>
      ) : (
        <List data={tourData} itemBasePath='/tours' itemKeyName='tours' />
      )}
    </section>
  );
}
