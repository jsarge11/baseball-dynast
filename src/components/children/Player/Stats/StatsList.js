import React from 'react'

export default function StatsList(props) {
 return( 
  <div>
   <br/>
  <div>
     {(props.player.year === 2018) ? <h3>Current Stats for {props.player.year}</h3> : <h3>Basic Stats for {props.player.year}</h3> }
   </div>
   <br/>
   <p>{props.player.plateAppearances?<div>Plate Appearances: {props.player.plateAppearances}</div> : <div>Batters Faced: {props.player.battersFaced}</div>}
   <div>Walks: {props.player.walks}</div>
   <div>Hits: {props.player.hits}</div>
   <div>Outs: {props.player.putOuts}</div></p>
  </div>
 );
}