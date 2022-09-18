import { useMeQuery } from "../generated/graphql";
import { useRoom } from "../global-stores";

export const userCanVote = () => {
  const room = useRoom((state) => state.room);
  const { data } = useMeQuery();

  if (room?.competition.veto.votedUserIds.includes(data?.me?.id!)) {
    return false;
  }

  return true;
};
