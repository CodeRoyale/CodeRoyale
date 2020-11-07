/*
 * Main Chat component
 */

import React from 'react';
import { connect } from 'react-redux';
import { sendEveryoneMsg } from '../../actions/chatActions';
import Tabs from '../../components/tabs/Tabs';
import TeamChat from './TeamChat';
import EveryoneChat from './EveryoneChat';
import './Chat.css';

const Chat = ({ socketData, roomData, chatData, sendEveryoneMsg }) => {
  const socket = socketData.socket;
  const everyoneMsgList = chatData.everyoneMsgList;
  const teamMsgList = chatData.teamMsgList;
  const userProfilePictures = roomData.data.state.profilePictures;

  // Send message to everyone in room
  const handleEveryoneMsg = (message) => {
    sendEveryoneMsg(socket, { message });
  };

  const handleTeamMsg = (message) => {
    // TODO: To team messaging
    console.log(message);
  };

  return (
    <div className='chat-main-container'>
      <Tabs>
        <div label='Everyone'>
          <EveryoneChat
            everyoneMsgList={everyoneMsgList}
            userProfilePictures={userProfilePictures}
            sendEveryoneMsg={handleEveryoneMsg}
          />
        </div>
        <div label='Team'>
          <TeamChat
            teamMsgList={teamMsgList}
            userProfilePictures={userProfilePictures}
            sendTeamMsg={handleTeamMsg}
          />
        </div>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { sendEveryoneMsg })(Chat);
