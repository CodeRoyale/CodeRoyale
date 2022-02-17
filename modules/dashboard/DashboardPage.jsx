import React from 'react';
import LeftHeader from '../../components/header/LeftHeader';
import MiddleHeader from '../../components/header/MiddleHeader';
import RightHeader from '../../components/header/RightHeader';
import PeopleFollowingController from './PeopleFollowingController';
import PublicRoomsController from './PublicRoomsController';

const DashboardPage = () => (
  <div className='px-16'>
    <div
      className='grid gap-5'
      style={{ gridTemplateColumns: '235px 640px 325px', margin: '0 auto' }}
    >
      <div>
        <div className='fixed h-full' style={{ width: '235px' }}>
          <LeftHeader />
          <PeopleFollowingController />
        </div>
      </div>
      <div className='h-screen' style={{ width: '640px' }}>
        <MiddleHeader />
        <PublicRoomsController />
      </div>
      <div>
        <div className='fixed h-full' style={{ width: '325px' }}>
          <RightHeader />
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;

// className='relative grid gap-3 justify-center w-screen h-screen px-16'
// style={{ gridTemplateColumns: '1fr 2fr 1fr' }}
