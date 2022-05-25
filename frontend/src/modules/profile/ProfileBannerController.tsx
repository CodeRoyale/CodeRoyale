import React from 'react';
import { ProfileBanner } from '../../components/ProfileBanner';
import { useGetProfileFromUrl } from '../../custom-hooks/useGetProfileFromUrl';

export const ProfileBannerController: React.FC = () => {
  const { data, loading } = useGetProfileFromUrl();

  let body = null;

  if (loading) {
  } else if (!data?.user.user) {
  } else {
    body = (
      <ProfileBanner
        name={data.user.user.name}
        profilePicture={data.user.user.profilePicture}
        username={data.user.user.username}
      />
    );
  }

  if (data?.user.errors) {
    body = <span className="text-primary-100">User doesnot exist</span>;
  }

  return <div className="mt-8">{body}</div>;
};
