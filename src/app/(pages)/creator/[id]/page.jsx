'use client';

import ProfileHeader from '../../../components/Creator/ProfileHeader';
import Preview from '../../../components/CustomUI/Card/Preview';
import Tour from '../../../components/CustomUI/Card/Tour';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TourGridSection from '../../../components/Creator/TourGridSection';
import BlogGridSection from '../../../components/Creator/BlogGridSection';

// ✅ This receives the route parameter like /create/123 → params.id = "123"
export default function Page({ params }) {
  const { id } = useParams(params);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/${id}`,
        );
        const data = await response.json();
        console.log('data', data);

        setProfileData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  console.log(profileData);

  return (
    <div>
      <ProfileHeader
        backgroundImg={profileData?.user.backgroundImg}
        profileImage={profileData?.user.profileImg}
        name={profileData?.user.name}
        bio={profileData?.user.bio}
        location={profileData?.user.location}
        socialLinks={profileData?.user.social}
        badges={profileData?.badges}
        stats={profileData?.blog.length}
        createdAt={profileData?.user.createdAt}
        tripsHosted={profileData?.tour.length}
      />

      {/* Tours Grid */}
      <TourGridSection
        title='Curated Tours'
        allUrl={`/creator/allblogs/${id}`}
        type={`tours`}
        description='Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you.'
        data={profileData?.tour}
        CardComponent={Tour}
        visibleCount={4}
      />

      <BlogGridSection
        title='Latest Blogs'
        url={`/creator/blogs`}
        allUrl={`/creator/allblogs/${id}`}
        data={profileData?.blog}
        CardComponent={Preview}
        type='blogs'
        visibleCount={4}
      />
    </div>
  );
}
