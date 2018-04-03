import React from 'react'

export default function StatsList(props) {
 return( 
  <div>
   {console.log(JSON.stringify(props))}
   {props.player.plateAppearances?<div>Plate Appearances: {props.player.plateAppearances}</div> : <div>Batters Faced: {props.player.battersFaced}</div>}
   <div>Walks: {props.player.walks}</div>
   <div>Hits: {props.player.hits}</div>
   <div>Outs: {props.player.putOuts}</div>
  </div>
 );
}