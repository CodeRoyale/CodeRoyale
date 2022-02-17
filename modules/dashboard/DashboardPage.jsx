import React from 'react';
import LeftHeader from '../../components/header/LeftHeader';
import MiddleHeader from '../../components/header/MiddleHeader';
import RightHeader from '../../components/header/RightHeader';

const DashboardPage = () => (
  <div className='px-16'>
    <div
      className='grid gap-3'
      style={{ gridTemplateColumns: '250px auto 325px', margin: '0 auto' }}
    >
      <div>
        <div className='fixed h-full text-white' style={{ width: '250px' }}>
          <LeftHeader />
        </div>
      </div>
      <div className='text-white'>
        <MiddleHeader />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea veritatis
        sit nam, quod maxime fugit facere illum cumque! Non officiis iusto iste
      </div>
      <div>
        <div className='fixed h-full text-white' style={{ width: '325px' }}>
          <RightHeader />
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;

// className='relative grid gap-3 justify-center w-screen h-screen px-16'
// style={{ gridTemplateColumns: '1fr 2fr 1fr' }}
