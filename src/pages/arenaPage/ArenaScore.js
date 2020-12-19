import React from 'react'
import { connect } from 'react-redux';

function ArenaScore({roomData, quesCodes}) {
    let scoreboard = {};
    let problemCodes = [];

    if(quesCodes !== null){
        problemCodes = quesCodes;
    }

    if(roomData.data !== null){
        scoreboard = roomData.data.competition.scoreboard;
    }

    let scoreRows = [];
    for(let teamName in scoreboard){
        scoreRows.push(
            <tr key={teamName}>
                <td style={{textAlign: 'left', padding: '0px'}}><b>{teamName}</b></td>
                {
                    problemCodes.map(
                        code => (
                            <td key={code}>
                                {
                                    scoreboard[teamName].includes(code) ?
                                    <img 
                                        style={{height: '18px', width: '18px'}} 
                                        src='./images/tick.svg' 
                                        alt=''
                                    /> :
                                    <img
                                        style={{height: '12px', width: '12px'}}
                                        src='./images/minus.svg'
                                        alt=''
                                    />
                                }
                            </td>
                        )
                    )
                }
            </tr>
        )
    }

    return (
        <div className='arena-score'>
            <table className='arena-score-table'>
                <thead></thead>
                <tbody>
                    <tr>
                        <td></td>
                        {
                            problemCodes.map(code => 
                                <td key={code}>
                                    <b>{code}</b>
                                </td>
                            )
                        }
                        
                    </tr>
                    {scoreRows}
                </tbody>
            </table>            
        </div>
    )
}
const mapStateToProps = (state) => ({
    roomData: state.roomData
  });
  
  export default connect(mapStateToProps)(ArenaScore);
