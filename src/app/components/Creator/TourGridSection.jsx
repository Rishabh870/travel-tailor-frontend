"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";
import Tour from "../CustomUI/Card/Tour";

const ITEMS_PER_PAGE = 4;

const TourGridSection = ({
  url = "/creator",
  allUrl = "/creator",
  title,
  description,
  data,
  visibleCount,
  className = "",
  type,
}) => {
  const isExpanded = visibleCount >= data?.length;
  const router = useRouter();

  console.log("data", data);

  return (
    <section className={styles.section + " " + className + " "}>
      <h2 className={styles.sectionTitle}>
        <span>{title.split(" ")[0]}</span> {title.split(" ").slice(1).join(" ")}
      </h2>

      {description && (
        <p className={styles.sectionDescription}>{description}</p>
      )}
      <div className={styles.gridWrapper + ` max-w-[90rem] mx-auto `}>
        {data?.slice(0, visibleCount).map((item, index) => (
          <div key={index} className={styles.gridItem}>
            <Tour
              description={item.description}
              imgUrl={item.heroImg || item.displayImg}
              title={item.title}
              slug={item.slug}
              id={item._id}
              tag={`${item?.details?.totalDays} Days`}
              type={"tours"}
              className={type === "blogs" ? styles.creatorBlogs : className}
            />
          </div>
        ))}
      </div>

      {data?.length && (
        <div className={styles.centerBtn}>
          <button
            className={styles.customButton}
            onClick={() => router.push(allUrl)}
          >
            {"Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TourGridSection;
