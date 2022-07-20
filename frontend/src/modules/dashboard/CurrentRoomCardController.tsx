import { useRouter } from 'next/router';
import React from 'react';
import { CurrentRoomCard } from '../../components/CurrentRoomCard';
import { useRoom } from '../../global-stores';

export const CurrentRoomCardController: React.FC<{}> = () => {
  const router = useRouter();
  const room = useRoom((state) => state.room);

  return (
    <div className="mt-8">
      <CurrentRoomCard
        title={room?.config.title!}
        creatorUsername="joel"
        launchOnClick={() => router.push(`/room/${room?.config.id}`)}
        leaveRoomOnClick={() => console.log('Leave Room from dashboard')}
      />
    </div>
  );
};
