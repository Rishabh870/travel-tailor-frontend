// No need for getServerSideProps, just directly fetch data in the server component.
import TestimonialsSection from "../../components/Creator/ReviewSection";
import AdvisorCarousel from "../../components/Creator/AdvisoreCarousel";
import HeroSection from "../../components/Creator/HeroSection";
import TourGridSection from "../../components/Creator/TourGridSection";
import BlogGridSection from "../../components/Creator/BlogGridSection";

export default async function Creator() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/creatorHome`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: { revalidate: 60 }, // Optional: revalidation to refresh data every minute
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch (${res.status} ${res.statusText})`);
    }

    const data = await res.json();
    const { blogs = [], tours = [], creators = [], reviews = [] } = data;

    return (
      <div className="min-h-screen">
        <HeroSection />
        {creators.length > 0 && <AdvisorCarousel data={creators} />}

        {/* Tours Grid */}
        {tours.length > 0 && (
          <div className="mt-20 w-full max-w-[95rem] mx-auto">
            <TourGridSection
              title="Featured Tours"
              allUrl={`/tours`}
              type={`tours`}
              url={`/tours`}
              description="Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you."
              data={tours}
              visibleCount={4}
            />
          </div>
        )}

        {reviews.length > 0 && <TestimonialsSection data={reviews} />}

        {/* Blog Grid */}
        {blogs.length > 0 && (
          <div className="w-full max-w-[95rem] mx-auto">
            <BlogGridSection
              title="Blog Highlights"
              allUrl={`/blogs`}
              type={`blogs`}
              url={`/blogs`}
              description="Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you."
              data={blogs}
              visibleCount={3}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Something went wrong: {error.message}</p>
      </div>
    );
  }
}
