import React, { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import io from 'socket.io-client';
import './ShareLinkCardFriend.css';
import Button from '../../components/button/Button';

function ShareLinkCardFriend(props) {
  const profileData = props.profileData;
  const friendLink = props.sharableLink;
  const userName = profileData.username;
  const CONNECTION_ACK = 'CONNECTION_ACK';
  const CONNECTION_DENY = 'CONNECTION_DENY';
  const COPY_CLIPBOARD = 'Copy to clipboard';
  const GENERATE_LINK = 'Generate Link';
  const ENDPOINT = 'http://localhost:2500';
  const [generateButtonName, setGenerateButtonName] = useState(GENERATE_LINK);
  const [connectionResponse, setConnectionResponse] = useState('');
  //const [roomId, setRoomId] = useState('');
  const [socket, setSocket] = useState(null);
  console.log(socket);

  const onClickGenerateButton = () => {
    if (generateButtonName === COPY_CLIPBOARD) {
      copy(friendLink);
    } else {
      // TODO: Write here...
      setGenerateButtonName(COPY_CLIPBOARD);
    }
  };

  // For Connection to the server...
  useEffect(() => {
    if (generateButtonName === COPY_CLIPBOARD) {
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
        console.log('Connected');
        setConnectionResponse(CONNECTION_ACK);
      });
      socket.on(CONNECTION_DENY, () => {
        console.log('Connection Denied');
        setConnectionResponse(CONNECTION_DENY);
      });
      socket.emit('CREATE_ROOM', {}, (data) => {
        console.log(data);
      });
    }
  }, [generateButtonName, userName]);

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
          <div>
            <div className='share-link-card-link'>{friendLink}</div>
            <div className='share-link-card-copy-button-container'>
              <Button
                type='button'
                onClick={onClickGenerateButton}
                buttonStyle='btn--primary--normal'
                buttonSize='btn--medium'
              >
                {generateButtonName}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareLinkCardFriend;
