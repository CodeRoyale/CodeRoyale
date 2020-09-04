import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './LobbyMain.css';
import CreateRoomView from './CreateRoomView';
import JoinRoomView from './JoinRoomView';
import ChooseRoomView from './ChooseRoomView';
import { connectSocket } from '../../actions/socketActions';
import SocketContext from '../../utils/SocketContext';

function ShareLinkCardFriend({ profileData, connectSocket, socket }) {
  const [chooseOption, setChooseOption] = useState(null);

  // Connect to socket...
  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  // TODO: Give alert if socket is not connected...
  // OnClickChoose...
  let chosenView = null;
  if (socket.error === '') {
    switch (chooseOption) {
      case 'CREATE_ROOM':
        chosenView = (
          <SocketContext.Provider value={socket.socket}>
            <CreateRoomView />
          </SocketContext.Provider>
        );
        break;
      case 'JOIN_ROOM':
        chosenView = (
          <SocketContext.Provider value={socket.socket}>
            <JoinRoomView />
          </SocketContext.Provider>
        );
        break;
      default:
        chosenView = (
          <ChooseRoomView onClickChoose={(option) => setChooseOption(option)} />
        );
    }
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
const mapDispatchToProps = (dispatch) => {
  return {
    connectSocket: () => {
      dispatch(connectSocket());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareLinkCardFriend);
