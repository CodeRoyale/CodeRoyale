// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import './LobbyMain.css';
// import CreateRoomView from './CreateRoomView';
// import JoinRoomView from './JoinRoomView';
// import { connectSocket } from '../../actions/socketActions';
// import Button from '../../components/button/Button';

// function ChooseRoomCard({ profileData, connectSocket, socketData }) {
//   const [createRoomShow, setCreateRoomShow] = useState(false);
//   const [joinRoomShow, setJoinRoomShow] = useState(false);

//   // Connect to socket...
//   useEffect(() => {
//     connectSocket();
//   }, [connectSocket]);

//   // Main Render...
//   return (
//     <div className='choose-room'>
//       <div className='choose-room-left'>
//         <div className='choose-room-user-details'>
//           <img
//             className='choose-room-image'
//             src={profileData.imageUrl}
//             alt=''
//           />
//           <div className='choose-room-username'>
//             <b>{profileData.username}</b>
//           </div>
//         </div>
//       </div>
//       <div className='choose-room-right'>
//         <div>
//           <div className='choose-create-room-button'>
//             <Button
//               type='button'
//               onClick={() => setCreateRoomShow(true)}
//               buttonStyle='btn--primary--normal'
//               buttonSize='btn--medium'
//             >
//               Create Room
//             </Button>
//           </div>
//           <div className='choose-join-room-button'>
//             <Button
//               type='button'
//               onClick={() => setJoinRoomShow(true)}
//               buttonStyle='btn--primary--normal'
//               buttonSize='btn--medium'
//             >
//               Join Room
//             </Button>
//           </div>
//         </div>
//       </div>
//       <CreateRoomView show={createRoomShow} onClose={setCreateRoomShow} />
//       <JoinRoomView show={joinRoomShow} onClose={setJoinRoomShow} />
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     socketData: state.socketData,
//   };
// };
// export default connect(mapStateToProps, { connectSocket })(ChooseRoomCard);
