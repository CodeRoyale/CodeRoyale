export const toFollowingUserIdsArr = (
  followingUserIds: { followingUserId: number }[]
) => {
  return followingUserIds.map((item) => item.followingUserId);
};
