import React from 'react';
import copy from 'copy-to-clipboard';
import './ShareLinkCardFriend.css';

function ShareLinkCardFriend(props) {
  const profileData = props.profileData;
  const friendLink = props.sharableLink;

  const onClickCopyButton = () => {
    //TODO: write down this function...
    copy(friendLink);
  };

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
              <button
                className='share-link-card-copy-button'
                onClick={onClickCopyButton}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareLinkCardFriend;