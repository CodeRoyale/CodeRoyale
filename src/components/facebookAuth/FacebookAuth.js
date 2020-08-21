import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookAuth = (props) => {
  const facebookAppID = process.env.REACT_APP_APP_ID;
  // Successful login from facebook...
  const responseSuccess = (response) => {
    console.log(response);
  };

  return (
    <div>
      <FacebookLogin
        appId={facebookAppID}
        autoLoad={true}
        size='small'
        textButton={props.text}
        fields='name,email,picture'
        callback={responseSuccess}
      />
    </div>
  );
};

export default FacebookAuth;
