import React from "react";
import gql from "graphql-tag";
import { ProfileBanner } from "../../components/ProfileBanner";
import { useGetProfileFromUrl } from "../../custom-hooks/useGetProfileFromUrl";
import { useConnectMutation, useMeQuery } from "../../generated/graphql";

export const ProfileBannerController: React.FC = () => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data: profileData, loading: profileLoading } = useGetProfileFromUrl();
  const [connect] = useConnectMutation();

  let body = null;

  const handleConnectBtn = async () => {
    const wantsToFollow = !profileData?.user.user?.connectionStatus;

    // profile has not loaded yet
    if (!profileData?.user) {
      return;
    }

    await connect({
      variables: {
        followingUserId: profileData?.user.user?.id!,
        wantsToFollow,
      },
      update: (cache) => {
        // reading me data from cache
        const meFragment = cache.readFragment<{
          id: number;
          following: number;
        }>({
          id: "User:" + meData?.me?.id,
          fragment: gql`
            fragment ___ on User {
              id
              following
            }
          `,
        });

        // reading profile data from cache
        const profileFragment = cache.readFragment<{
          id: number;
          connectionStatus: boolean;
          followers: number;
        }>({
          id: "User:" + profileData.user.user?.id,
          fragment: gql`
            fragment __ on User {
              id
              connectionStatus
              followers
            }
          `,
        });

        if (profileFragment && meFragment) {
          if (wantsToFollow) {
            // user wants to follow the profile so update cache with new data
            cache.writeFragment<{ following: number }>({
              id: "User:" + meData?.me?.id,
              fragment: gql`
                fragment __ on User {
                  following
                }
              `,
              data: {
                following: meFragment.following + 1,
              },
            });

            cache.writeFragment<{
              connectionStatus: boolean;
              followers: number;
            }>({
              id: "User:" + profileData.user.user?.id,
              fragment: gql`
                fragment __ on User {
                  connectionStatus
                  followers
                }
              `,
              data: {
                connectionStatus: wantsToFollow,
                followers: profileFragment.followers + 1,
              },
            });
          }
          // user wants to unfollow the profile so update cache with new data
          else {
            cache.writeFragment<{ following: number }>({
              id: "User:" + meData?.me?.id,
              fragment: gql`
                fragment __ on User {
                  following
                }
              `,
              data: { following: meFragment.following - 1 },
            });

            cache.writeFragment<{
              connectionStatus: boolean;
              followers: number;
            }>({
              id: "User:" + profileData.user.user?.id,
              fragment: gql`
                fragment __ on User {
                  connectionStatus
                  followers
                }
              `,
              data: {
                connectionStatus: wantsToFollow,
                followers: profileFragment.followers - 1,
              },
            });
          }
          // evicting people from cache so that it refetches to get new people data
          cache.evict({ fieldName: "people" });
        }
      },
    });
  };

  if (profileLoading) {
  } else if (!profileData?.user.user) {
  } else {
    body = (
      <ProfileBanner
        name={profileData.user.user.name}
        profilePicture={profileData.user.user.profilePicture}
        username={profileData.user.user.username}
        showConnectBtn={
          !meData?.me || meLoading || meData?.me.id === profileData.user.user.id
            ? false
            : true
        }
        connectBtnText={
          profileData.user.user.connectionStatus ? "Unfollow" : "Follow"
        }
        connectBtnOnClick={handleConnectBtn}
      />
    );
  }

  if (profileData?.user.errors) {
    body = <span className="text-primary-100">User doesnot exist</span>;
  }

  return <div className="mt-8">{body}</div>;
};
