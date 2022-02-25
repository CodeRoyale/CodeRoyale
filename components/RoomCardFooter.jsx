import React from 'react';
import propTypes from 'prop-types';
import Button from './Button';
import RoomCardIconButton from './RoomCardIconButton';

const RoomCardFooter = ({ admin }) => {
  const justifyContent = admin ? 'justify-between' : 'justify-end';

  return (
    <div
      className={`flex items-center ${justifyContent} bg-primary-700 p-4 rounded-b-md`}
    >
      {admin ? (
        <div>
          <RoomCardIconButton icon='settings' />
          <RoomCardIconButton
            icon='closeRoom'
            style={{ marginLeft: '0.5rem' }}
          />
        </div>
      ) : null}
      <div>
        <Button
          buttonClass='dark'
          size='normal'
          style={{ marginRight: '0.5rem' }}
        >
          Leave
        </Button>
        {admin ? (
          <Button buttonClass='dark' size='normal'>
            Start Competition
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default RoomCardFooter;

RoomCardFooter.propTypes = { admin: propTypes.bool.isRequired };
