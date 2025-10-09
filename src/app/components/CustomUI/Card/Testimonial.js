import Image from "next/image";
import styles from "./testimonial.module.css";

import parseUrl from "../../../util/parseUrl";
import parseDate from "../../../util/parseDate";

function Testimonial({
  name,
  review,
  imgUrl,
  place,
  date,
  travelType,
  className = "",
}) {
  return (
    <div className={`${styles.testimonial} ${className}`}>
      {imgUrl && typeof imgUrl === "string" && imgUrl !== "" && (
        <div className={styles.imageWrapper}>
          <Image
            src={parseUrl(imgUrl)}
            alt={`Testimonial from ${name}`}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      )}

      {/* Gradient Overlay for text readability */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <div className={styles.content}>
        {/* <span className={styles.quote}>“</span> */}
        <Image
          src="/images/quote.svg"
          alt="Quote"
          width={40}
          height={40}
          className={styles.quote}
        />
        <h3 className={styles.reviewText}>{review}</h3>
        <p className={styles.attribution}>
          - <span className={styles.name}>{name}</span> . {place}.{" "}
          {parseDate(date)} . {travelType}
        </p>
      </div>
    </div>
  );
}

export default Testimonial;
