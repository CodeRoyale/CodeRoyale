import React from 'react';
import propTypes from 'prop-types';

const RightColumn = ({ children }) => (
  <div>
    <div className='fixed h-full' style={{ width: '325px' }}>
      {children}
    </div>
  </div>
);

export default RightColumn;

RightColumn.propTypes = {
  children: propTypes.element.isRequired,
};
