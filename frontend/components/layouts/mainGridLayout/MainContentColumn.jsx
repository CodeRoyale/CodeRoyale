import React from 'react';
import propTypes from 'prop-types';

const MainContentColumn = ({ children }) => (
  <div className='h-screen' style={{ width: '640px' }}>
    {children}
  </div>
);

export default MainContentColumn;

MainContentColumn.propTypes = {
  children: propTypes.element.isRequired,
};
