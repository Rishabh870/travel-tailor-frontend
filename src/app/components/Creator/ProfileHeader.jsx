import React from "react";
import styles from "./styles.module.css";

const ProfileHeader = ({ data: profileData }) => {
  const {
    coverImage,
    profileImage,
    name,
    bio,
    location,
    tripsCreated,
    tripsHosted,
    rating,
    socialLinks,
    badges,
    stats,
  } = profileData;

  return (
    <div className={styles.profileContainer}>
      {/* Cover Image */}
      <div className={styles.coverImageWrapper}>
        <img src={coverImage} alt="Cover" className={styles.coverImage} />

        <div className={styles.profileImageSection}>
          <div className={styles.profileImgWrapper}>
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImg}
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        <div className={styles.profileText}>
          <h1 className={styles.profileName}>{name}</h1>
          <p className={styles.profileLocation}>{location}</p>
          <p className={styles.profileBio}>{bio}</p>
        </div>
        {/* STATS WRAPPER */}
        <div className={styles.profileStatsWrapper}>
          <div className={styles.profileStats}>
            <div>
              <strong>Trips Hosted:</strong> {tripsHosted}
            </div>
            <div>
              <strong>Rating:</strong> {rating} ⭐
            </div>

            <div>
              <strong>blogs:</strong> {stats.blogs}
            </div>
            <div>
              <strong>Joined:</strong> {stats.joinedDate}
            </div>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                <img
                  src="/images/instagram.png"
                  alt="Instagram"
                  className={styles.socialIcon}
                />
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer">
                <img
                  src="/images/youtube.png"
                  alt="YouTube"
                  className={styles.socialIcon}
                />
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
                <img
                  src="/images/facebook.png"
                  alt="Facebook"
                  className={styles.socialIcon}
                />
              </a>
            )}
          </div>
        </div>

        {/* Stats Section */}
      </div>
    </div>
  );
};

export default ProfileHeader;
