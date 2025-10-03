"use client";

import Spinner from "../CustomUI/Spinner/Spinner"; // Import Spinner component
import styles from "./styles.module.css"; // Import Tailwind CSS classes

export default function TourList({
  tourData,
  isLoading,
  error,
  handleTourTypeChange,
  handleLoadMore, // Function passed to load more data
  tourType,
}) {
  console.log("tourData", tourData); // Logging tourData for debugging

  // Infinite Scroll - Triggered when user scrolls to the bottom
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoading) {
      handleLoadMore(); // Call handleLoadMore when the bottom is reached
    }
  };

  return (
    <div className="flex mx-auto max-w-[95rem]">
      <div className="p-10 flex flex-col gap-3  ">
        <h3 className="text-lg text-gray-800">Tour Types</h3>
        <ul className=" flex flex-col items-start ">
          <li>
            <button
              onClick={() => handleTourTypeChange("fixed_date")}
              className={`w-full text-sm py-2 transition-colors duration-300 
              ${
                tourType === "fixed_date"
                  ? "text-orange-600 " // Active button
                  : "bg-transparent text-black   hover:text-orange-600 " // Non-active button
              }`}
            >
              Fixed Date
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTourTypeChange("selectable_date")}
              className={`w-full text-sm py-2  transition-colors duration-300 
              ${
                tourType === "selectable_date"
                  ? "text-orange-600 " // Active button
                  : "bg-transparent text-black   hover:text-orange-600 " // Non-active button
              }`}
            >
              Selectable Date
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTourTypeChange("both")}
              className={`w-full text-sm py-2  transition-colors duration-300 
              ${
                tourType === "both"
                  ? "text-orange-600 " // Active button
                  : "bg-transparent text-black   hover:text-orange-600 " // Non-active button
              }`}
            >
              Both
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 px-14" onScroll={handleScroll}>
        {isLoading && tourData?.length > 0 ? (
          <Spinner />
        ) : error ? (
          <div
            style={{
              padding: "var(--pd-page)",
              color: "red",
              textAlign: "center",
            }}
          >
            Error: {error}
          </div>
        ) : !tourData || tourData.length === 0 ? (
          <div
            style={{
              padding: "var(--pd-page)",
              textAlign: "center",
              color: "var(--color-grey)",
            }}
          >
            No tours found.
          </div>
        ) : (
          <div className="px-14 py-10">
            <h2 className="text-4xl mb-6">
              {tourType === "fixed_date"
                ? "Fixed Date"
                : tourType === "selectable_date"
                ? "Selectable Date"
                : "Both"}{" "}
              Tours
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tourData.map((tour, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/creator/tour/${tour.slug}`)
                  } // On click redirect
                >
                  {/* Image Wrapper */}
                  <div className="relative">
                    {tour.heroImg ? (
                      <img
                        src={tour.heroImg}
                        alt={tour.title}
                        className="w-full h-64 object-cover rounded-t-2xl transform transition-transform duration-300 ease-in-out scale-105 hover:scale-100"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-2xl">
                        No Image
                      </div>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-lg font-[700] text-white truncate">
                        {tour.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
