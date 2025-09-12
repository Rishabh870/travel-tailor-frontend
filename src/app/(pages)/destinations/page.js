'use client';

import { useState, useEffect } from 'react';
import List from '@/app/components/List/List';
import TextList from '@/app/components/TextList/TextList';
import Spinner from '@/app/components/CustomUI/Spinner/Spinner';

import styles from './styles.module.css';

export default function DestinationsPage() {
  const [destinationData, setDestinationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/apihome/destinations/`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        setDestinationData(data);
      } catch (err) {
        console.error('Failed to fetch destinations:', err);
        setError(err.message || 'Failed to fetch destination data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.destinations}>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        // Display error message
        <div
          style={{
            padding: 'var(--pd-page)',
            color: 'red',
            textAlign: 'center',
          }}>
          Error: {error}
        </div>
      ) : !destinationData ||
        !destinationData.list ||
        destinationData.list.length === 0 ? (
        <div
          style={{
            padding: 'var(--pd-page)',
            textAlign: 'center',
            color: 'var(--color-grey)',
          }}>
          No destinations found.
        </div>
      ) : (
        // <List
        //   data={destinationData}
        //   itemBasePath="/destinations"
        //   itemKeyName="destinations"
        // />
        <TextList
          data={destinationData}
          itemBasePath='/destinations'
          itemKeyName='destinations'
        />
      )}
    </section>
  );
}
