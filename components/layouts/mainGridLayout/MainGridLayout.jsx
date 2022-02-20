import React from 'react';
import propTypes from 'prop-types';

/* 
  - The grid is a 3 column grid
  - The left and right column elements are display: fixed
*/

const MainGridLayout = ({ children }) => (
  <div className='px-16'>
    <div
      className='grid gap-5'
      style={{ gridTemplateColumns: '235px 640px 325px', margin: '0 auto' }}
    >
      {children}
    </div>
  </div>
);

export default MainGridLayout;

MainGridLayout.propTypes = {
  children: propTypes.element.isRequired,
};
