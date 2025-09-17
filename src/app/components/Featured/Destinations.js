import styles from "./styles.module.css";

import Button from "../CustomUI/Button/Button";
import Tour from "../CustomUI/Card/Tour";

import parsePrice from "../../util/parsePrice";

function Destinations({ destinations }) {
  return (
    <div className={styles.destinations}>
      <div className={styles.destinationsBox}>
        {destinations.map((destination) => (
          <Tour
            key={destination.title}
            className={styles.boxItem}
            {...destination}
            type="destinations"
            tag={`Trips starting from ${parsePrice(destination.tag)}`}
          />
        ))}
      </div>

      <Button className="sm" varient="outline" href="/destinations">
        View all
      </Button>
    </div>
  );
}

export default Destinations;
