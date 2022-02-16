import React from 'react';
import LeftHeader from '../../components/header/LeftHeader';

const DashboardPage = () => (
  <div className='grid grid-cols-3 gap-3 w-screen h-screen p-4'>
    <div className='bg-button-primary-default text-white p-8'>
      <LeftHeader />
    </div>
    <div className='bg-button-primary-default text-white p-8'>Mathew</div>
    <div className='bg-button-primary-default text-white p-8'>Koshy</div>
  </div>
);

export default DashboardPage;
