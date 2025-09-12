'use client';

import Calender from '@/app/components/Featured/Calender';
import Spinner from '@/app/components/CustomUI/Spinner/Spinner';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

export default function CalenderPage() {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/apihome/months`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        },
      );
      const data = await response.json();
      setMonths(data.list);
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.calender}>
        {months?.length > 0 ? <Calender months={months} /> : <Spinner />}
      </div>
    </main>
  );
}
