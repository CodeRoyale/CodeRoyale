import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './LobbyMain.css';
import CreateRoomView from './CreateRoomView';
import JoinRoomView from './JoinRoomView';
import ChooseRoomView from './ChooseRoomView';
import { connectSocket } from '../../actions/socketActions';

function ShareLinkCardFriend({ profileData, connectSocket, socket }) {
  const [chooseOption, setChooseOption] = useState(null);

  // Connect to socket...
  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  // OnClickChoose...
  let chosenView = null;
  if (socket.error !== 'CONNECTION_DENY') {
    switch (chooseOption) {
      case 'CREATE_ROOM':
        chosenView = <CreateRoomView />;
        break;
      case 'JOIN_ROOM':
        chosenView = <JoinRoomView />;
        break;
      default:
        chosenView = (
          <ChooseRoomView onClickChoose={(option) => setChooseOption(option)} />
        );
    }
  } else {
    //TODO: Give Alert message here...
  }

  // Main Render...
  return (
    <div className='share-link-card'>
      <div className='share-link-card-body'>
        <div className='share-link-card-body-left'>
          <div>
            <div className='share-link-card-image-container'>
              <img
                className='share-link-card-image'
                src={profileData.imageUrl}
                alt=''
              />
            </div>
            <div className='share-link-card-username'>
              <b>{profileData.username}</b>
            </div>
          </div>
        </div>
        <div className='share-link-card-body-right'>{chosenView}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketData,
  };
};
export default connect(mapStateToProps, { connectSocket })(ShareLinkCardFriend);
