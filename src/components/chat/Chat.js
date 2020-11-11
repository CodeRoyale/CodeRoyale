/*
 * Main Chat component
 */

import React from 'react';
import { connect } from 'react-redux';
import { sendEveryoneMsg, sendTeamMsg } from '../../actions/chatActions';
import Tabs from '../../components/tabs/Tabs';
import TeamChat from './TeamChat';
import EveryoneChat from './EveryoneChat';
import './Chat.css';

const Chat = ({
  style,
  restricted,
  socketData,
  roomData,
  chatData,
  sendEveryoneMsg,
  sendTeamMsg,
}) => {
  const socket = socketData.socket;
  const everyoneMsgList = chatData.everyoneMsgList;
  const teamMsgList = chatData.teamMsgList;

  let userProfilePictures;
  if (roomData.data !== null) {
    userProfilePictures = roomData.data.state.profilePictures;
  }

  // Send message to everyone in room
  const handleEveryoneMsg = (message) => {
    sendEveryoneMsg(socket, { message });
  };

  // Send message to teammates
  const handleTeamMsg = (message) => {
    sendTeamMsg(socket, { message });
  };

  let content = (
    <div style={style} className='chat-main-container'>
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

  if (restricted) {
    content = (
      <div style={style} className='chat-main-container'>
        <Tabs>
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
  }

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { sendEveryoneMsg, sendTeamMsg })(Chat);
