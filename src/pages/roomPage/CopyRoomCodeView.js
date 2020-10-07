// import React, { useRef } from 'react';

// function CopyRoomCodeView({ room_id }) {
//   const copyTextRef = useRef(null);
//   const onClickCopyToClipboard = () => {
//     var range = document.createRange();
//     range.selectNode(copyTextRef.current);
//     window.getSelection().removeAllRanges();
//     window.getSelection().addRange(range);
//     document.execCommand('copy');
//     window.getSelection().removeAllRanges();
//   };

//   return (
//     <div className=''>
//       <div ref={copyTextRef}>
//         <div>{room_id}</div>
//       </div>
//     </div>
//   );
// }

// export default CopyRoomCodeView;
