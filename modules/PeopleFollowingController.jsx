import React from 'react';
import PeopleCard from '../components/PeopleCard';

const PeopleFollowingController = () => {
  const tempPeopleData = [
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
      fullName: 'Chirag Bablani',
      matchStatus: false,
      online: true,
    },
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
      fullName: 'Joel Mathew',
      matchStatus: true,
      online: true,
    },
  ];

  return (
    <div className='flex flex-col mt-8'>
      <h1 className='text-primary-100 font-bold text-2xl'>People</h1>
      <span className='text-primary-300 text-sm mt-4'>Online</span>
      <div className='py-4'>
        {tempPeopleData.map(({ avatarUrl, fullName, matchStatus, online }) => (
          <PeopleCard
            avatarUrl={avatarUrl}
            fullName={fullName}
            matchStatus={matchStatus}
            online={online}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleFollowingController;
