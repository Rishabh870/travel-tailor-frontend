'use client';

import { useRef } from 'react';
import Preview from '../CustomUI/Card/Preview';
import ScrollBtn from '../CustomUI/Button/ScrollBtn';
import styles from './styles.module.css';

function BlogsList({ data }) {
  const scrollRefs = useRef({});

  const handleTagClick = (tag) => {
    const element = document.getElementById(tag);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = (tag, direction) => {
    const scrollAmount = 350; // Adjust as needed
    if (scrollRefs.current[tag]) {
      if (direction === 'left') {
        scrollRefs.current[tag].scrollLeft -= scrollAmount;
      } else {
        scrollRefs.current[tag].scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className={styles.blogsPage}>
      {/* Left: Category Navigation */}
      <nav className={styles.categoryNav}>
        <h3 className={styles.navTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          {data.list.map(({ tag }) => (
            <li key={tag}>
              <a
                className={styles.categoryLink}
                onClick={() => handleTagClick(tag)}>
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Blogs Display */}
      <main className={styles.blogsContainer}>
        {data.list.map(({ tag, blogs }) => (
          <section key={tag} id={tag} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{tag}</h2>
              <ScrollBtn
                onScrollLeft={() => handleScroll(tag, 'left')}
                onScrollRight={() => handleScroll(tag, 'right')}
              />
            </div>
            <div
              className={styles.blogsCarousel}
              ref={(el) => (scrollRefs.current[tag] = el)}>
              {blogs.map((blog) => (
                <Preview
                  key={blog.slug}
                  title={blog.title}
                  description={blog.description}
                  imgUrl={blog.imgUrl}
                  url={`/blogs/${blog.slug}`}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default BlogsList;
