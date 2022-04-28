import React from 'react';
import propTypes from 'prop-types';

const LeftColumn = ({ children }) => (
  <div>
    <div className='fixed h-full' style={{ width: '235px' }}>
      {children}
    </div>
  </div>
);

export default LeftColumn;

LeftColumn.propTypes = {
  children: propTypes.element.isRequired,
};
