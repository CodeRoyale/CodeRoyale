import React, { useState } from 'react';
import { InputGroup, Input, Icon } from 'rsuite';

function CreateTeamView({ setState }) {
  const [team_name, setCreateTeamInput] = useState('');

  //Styling constants...
  const inputBorderRadius = 50;
  const inputHeight = '40px';
  return (
    <div className='create-team'>
      <div>
        <InputGroup
          style={{
            borderRadius: inputBorderRadius,
            height: inputHeight,
          }}
        >
          <Input
            style={{
              borderTopLeftRadius: inputBorderRadius,
              borderBottomLeftRadius: inputBorderRadius,
            }}
            placeholder='Create Team...'
            value={team_name}
            onChange={(value, event) => {
              setCreateTeamInput(value);
            }}
          />
          <InputGroup.Button
            style={{
              borderTopRightRadius: inputBorderRadius,
              borderBottomRightRadius: inputBorderRadius,
            }}
            onClick={() => {
              console.log(team_name);
              setCreateTeamInput('');
              setState({ action: 'CREATE_TEAM', team_name: team_name });
            }}
          >
            <Icon icon='plus-circle' size='lg' />
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default CreateTeamView;
