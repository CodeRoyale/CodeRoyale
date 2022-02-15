import React from 'react';
import propTypes from 'prop-types';

const Tag = ({ title, ...props }) => (
  <div
    className='bg-primary-600 py-1 px-2 text-sm font-semibold text-primary-100 rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-primary-300'
    {...props}
  >
    {title}
  </div>
);

export default Tag;

Tag.propTypes = {
  title: propTypes.string.isRequired,
};
