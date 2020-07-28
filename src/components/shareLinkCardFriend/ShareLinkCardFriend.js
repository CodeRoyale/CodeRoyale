import React, { useState, useEffect } from 'react';
// import copy from 'copy-to-clipboard';
// import CreateRoomView from '../createRoomView/CreateRoomView';
import JoinRoomView from '../joinRoomView/JoinRoomView';
import io from 'socket.io-client';
import './ShareLinkCardFriend.css';

function ShareLinkCardFriend(props) {
  const profileData = props.profileData;
  const userName = profileData.username;
  const CREATE_ROOM = 'CREATE_ROOM';
  const CONNECTION_ACK = 'CONNECTION_ACK';
  const CONNECTION_DENY = 'CONNECTION_DENY';
  const COPY_CLIPBOARD = 'Copy to clipboard';
  const GENERATE_LINK = 'Generate Link';
  const ENDPOINT = 'http://localhost:2500';
  const [generateButtonName] = useState(GENERATE_LINK);
  const [connectionResponse, setConnectionResponse] = useState('');
  const [, setRoomId] = useState('');
  const [socket, setSocket] = useState(null);

  // Connection to server...
  useEffect(() => {
    const options = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${userName}`,
          },
        },
      },
    };
    console.log('sending req');
    let socket = io.connect(ENDPOINT, options);
    setSocket(socket);
    socket.on(CONNECTION_ACK, () => {
      setConnectionResponse(CONNECTION_ACK);
    });
    socket.on(CONNECTION_DENY, () => {
      setConnectionResponse(CONNECTION_DENY);
    });
  }, [userName]);

  // After connection response comes...
  useEffect(() => {
    if (connectionResponse === CONNECTION_ACK) {
      console.log(CONNECTION_ACK);
    } else if (connectionResponse === CONNECTION_DENY) {
      console.log(CONNECTION_DENY);
    } else {
      console.log('No Connection yet...');
    }
  }, [connectionResponse]);

  // Create room...
  useEffect(() => {
    if (generateButtonName === COPY_CLIPBOARD) {
      socket.emit(CREATE_ROOM, {}, (data) => {
        console.log(data);
        setRoomId(userName);
      });
    }
  });

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
        <div className='share-link-card-body-right'>
          {
            // <CreateRoomView />
            <JoinRoomView />
          }
        </div>
      </div>
    </div>
  );
}

export default ShareLinkCardFriend;
