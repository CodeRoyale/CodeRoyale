export const mapStateToProps = (state) => {
  return {
    socketData: state.socketData,
    roomData: state.roomData,
    teamData: state.teamData,
    chatData: state.chatData,
  };
};
