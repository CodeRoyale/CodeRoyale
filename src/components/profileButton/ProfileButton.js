import React from 'react';
import { Header, Popup, Grid } from 'semantic-ui-react';
import './ProfileButton.css';

function ProfileButton() {
  return (
    <Popup
      trigger={<div className='profile-button'></div>}
      on='click'
      offset='10px'
      position='bottom center'
    >
      <div className='profile-popup'>
        <Grid centered divided rows={3}>
          <Grid.Row textAlign='center'>
            <Header as='h4'>UserName</Header>
            <p>Recoil</p>
            <hr></hr>
          </Grid.Row>
          <Grid.Row textAlign='center'>
            <Header as='h4'>Rank</Header>
            <p>1234</p>
            <hr></hr>
          </Grid.Row>
          <Grid.Row textAlign='center'>
            <Header as='h4'>Signout</Header>
          </Grid.Row>
        </Grid>
      </div>
    </Popup>
  );
}

export default ProfileButton;
