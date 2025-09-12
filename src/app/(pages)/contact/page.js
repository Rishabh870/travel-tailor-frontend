'use client';
import React from 'react';
import Contact from '@/app/components/Form/Contact';
import StickyContact from '@/app/components/Form/StickyContact';
import styles from './styles.module.css'; // Page-specific styles for layout

import { Suspense } from 'react';
import Spinner from '@/app/components/CustomUI/Spinner/Spinner';

const EnquiryPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <div className={styles.pageWrapper}>
        {' '}
        {/* Use a wrapper class */}
        <div className={styles.pageContainer}>
          {' '}
          {/* Use a container for max-width and padding */}
          <div className={styles.formColumn}>
            <Contact />
          </div>
          <aside className={styles.stickyColumn}>
            <StickyContact />
          </aside>
        </div>
      </div>
    </Suspense>
  );
};

export default EnquiryPage;
