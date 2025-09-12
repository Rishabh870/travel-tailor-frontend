'use client';
import { useState, useEffect } from 'react';

import ImageGallery from '../../../components/Curator/ImageGallery';
import TourOverview from '../../../components/Curator/TourOverview';
import TourHighlights from '../../../components/Curator/TourHighLight';
import TourStays from '../../../components/Curator/TourStay';
import TourMoments from '../../../components/Curator/TourMoment';
import TourMap from '../../../components/Curator/TourMap';
import TourInclusions from '../../../components/Curator/TourInclusions';
import TourItinerary from '../../../components/Curator/TourItinerary';
import TourReviews from '../../../components/Curator/TourReview';
import MakeReview from '../../../components/Curator/MakeReview';
import TourFAQ from '../../../components/Curator/TourFAQ';
import BookingCard from '../../../components/Curator/BookingCard';
import tourData from '../../../util/data';
import TourHero from '../../../components/Curator/TourHero';
import UserCard from '../../../components/Curator/UserCard';

export default function TourPage() {
  const { tour } = tourData;
  const image =
    'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg';
  // sticky menu config
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'stays', label: 'Stays' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'gallery', label: 'Gallery' },
  ];
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'overview';
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Sticky Menu */}

      {/* Hero Section */}
      <div className=''>
        <TourHero
          title={tour.title}
          subtitle={tour.subtitle}
          location={tour.location}
          rating={tour.rating}
          reviewCount={tour.reviewCount}
          bookingCount={tour.bookingCount}
          badges={tour.badges}
          heroImage={tour.images.hero}
        />
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div
          className={` font-sans sticky top-[3.7rem] md:top-17 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 mb-6`}>
          {/* Desktop */}
          <div className='hidden md:flex justify-center gap-6 px-4 py-3'>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-sm font-medium ${
                  active === s.id
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-500'
                }`}>
                {s.label}
              </a>
            ))}
          </div>
          {/* Mobile */}
          <div className='flex md:hidden overflow-x-auto gap-4 px-4 py-2 scrollbar-hide'>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`whitespace-nowrap text-xs font-medium ${
                  active === s.id
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-500'
                }`}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-12'>
            {/* Tour Overview */}
            <section id='overview' className='scroll-mt-28'>
              <TourOverview
                duration={tour.overview.duration}
                groupSize={tour.overview.groupSize}
                ageRange={tour.overview.ageRange}
                languages={tour.overview.languages}
                description={tour.overview.description}
                tagMonths={tour.tagMonths}
              />
            </section>

            {/* Tour Highlights */}
            <section id='highlights' className='scroll-mt-28'>
              <TourHighlights highlights={tour.highlights} />
            </section>

            {/* What's Included/Excluded */}
            <section id='inclusions' className='scroll-mt-28'>
              <TourInclusions
                included={tour.included}
                excluded={tour.excluded}
              />
            </section>

            {/* Itinerary */}
            <section id='itinerary' className='scroll-mt-28'>
              <TourItinerary itinerary={tour.itinerary} />
            </section>

            {/* Hotel Stays */}
            <section id='stays' className='scroll-mt-28'>
              <TourStays stays={tour.stays} />
            </section>

            {/* Memorable Moments */}
            <section id='moments' className='scroll-mt-28'>
              <TourMoments moments={tour.moments} />
            </section>

            {/* Reviews */}
            <section id='reviews' className='scroll-mt-28'>
              <TourReviews
                reviews={tour.reviews}
                overallRating={tour.rating}
                totalReviews={tour.reviewCount}
              />
            </section>

            {/* Make Review */}
            <section id='make-review' className='scroll-mt-28'>
              <MakeReview />
            </section>

            {/* FAQ */}
            <section id='faq' className='scroll-mt-28'>
              <TourFAQ faqs={tour.faq} />
            </section>

            {/* Location Map */}
            <section id='map' className='scroll-mt-28'>
              <TourMap mapEmbed={tour.mapEmbed} />
            </section>

            {/* Image Gallery */}
            <section id='gallery' className='scroll-mt-28'>
              <h2 className='text-2xl font-semibold mb-4 mt-6'>Gallery</h2>
              <ImageGallery images={tour.images.gallery} />
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className='lg:col-span-1'>
            {/* Mobile: Show booking at top */}
            <div className='lg:hidden mb-8'>
              <BookingCard
                basePrice={tour.booking.pricing.adult}
                currency={tour.price.currency}
                tourDuration={parseInt(tour.overview.duration.split(' ')[0])}
                tagMonths={tour.tagMonths}
              />
            </div>

            {/* Desktop: sticky sidebar */}
            <div className='hidden lg:block lg:sticky lg:top-30'>
              <BookingCard
                basePrice={tour.booking.pricing.adult}
                currency={tour.price.currency}
                tourDuration={parseInt(tour.overview.duration.split(' ')[0])}
                tagMonths={tour.tagMonths}
              />
              <div className='w-full mt-4'>
                <UserCard
                  avatar={image}
                  name='John Doe'
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nunc, eget aliquam nisl nunc vel nisl. Curabitur euismod nunc vel nisl.'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
