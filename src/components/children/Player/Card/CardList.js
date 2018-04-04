import React from 'react'

export default function CardList(props) {
  return (
   <div className="rosterList" key={props.newItem + props.index}>
    <div>
    </div>
    <div key={props.newItem + props.index}>
     <div>
      Player: {`${props.newItem.player.FirstName} ${props.newItem.player.LastName}`}
     </div>
     <div>
      Team: {`${props.newItem.team.City} ${props.newItem.team.Name}`}<br/>
      Position: {`${props.newItem.player.Position}`}
     </div>
     <button onClick={()=>props.addToRoster(props.newItem)}></button>
    </div>
   </div>
  );
 
}