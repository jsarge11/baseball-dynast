import React from 'react'

export default function ActiveCard(props) {
 return (
  <div className="searchList" key={props.newItem + props.index}>
  <hr/>
   <div>
   <span onClick={()=>props.deleteFromRoster(props.newItem)} className="close">&times;</span>
     Name: {`${props.newItem.item.player.FirstName} ${props.newItem.item.player.LastName}`}<br/>
     Position: {`${props.newItem.item.player.Position}`}<br/>
     Team: {`${props.newItem.item.team.City} ${props.newItem.item.team.Name}`} <br/> 
    
    <div>
     <span onClick={()=>props.editStats(props.position)} className="edit">	&#9999;</span>
    </div>
    <hr/>
   </div>
 </div>
  );
 
}

