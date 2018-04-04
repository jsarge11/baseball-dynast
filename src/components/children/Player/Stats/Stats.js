import React, { Component } from 'react'
import './stats.css'


export default class Stats extends Component { 
 constructor() {
  super()

  this.state = {
   outcomes: []
  }
 } //end of constructor

 randomAction(hit, walk, out, other) {

  let tempMessage = '';

  let play_ball = ((Math.random() * 100) + 1);

  if (play_ball < hit) {
   tempMessage = `${this.props.hitter.name} got a hit!`;
  }
  else if (play_ball < walk) {
   tempMessage = `${this.props.hitter.name} walked.`;
  }
  else if (play_ball < out) {
   tempMessage = `${this.props.hitter.name} was thrown out!`;
  }
  else if (play_ball < other) {
   tempMessage=`${this.props.hitter.name} got on base on an error.`;
  }

   return tempMessage;
 }
 predictOutcome() {
  var modal = document.getElementById('myModal');
  let tempMessage = '';

  if (this.props.activeCards.length < 2) {
   let message = (this.props.activeCards.length === 1) ? `Please add another player` : `You have no players selected!`;
   alert(message);
  }
  else {
   modal.style.display = "block";
   let {pitcher, hitter} = this.props;
   let avgHit = (pitcher.hitPercent + hitter.hitPercent) / 2;
   let avgWalk = (pitcher.walkPercent + hitter.walkPercent) / 2;
   let avgOut = (pitcher.putOutPercent + hitter.putOutPercent) / 2;
   let avgOBO = (pitcher.onBaseOtherPercent + hitter.onBaseOtherPercent) / 2;

   //deciding what happens based on play_ball
  
   
   let hit = avgHit;
   let walk = hit + avgWalk
   let out = walk + avgOut;
   let other = out + avgOBO;

   tempMessage = this.randomAction(hit, walk, out, other);

   }
   
  
  this.setState({ outcome: tempMessage});
 }
closeSpan() {
 var modal = document.getElementById('myModal');
 modal.style.display = "none";
}

 render() {
  
  return (
   <div className="stats">
      <button className="predictOutcome" onClick={()=>this.predictOutcome()} >Predict Outcome</button><br/>

      <div id="myModal" className="modal">

         <div className="modal-content">
           <span onClick={()=>this.closeSpan()} className="close">&times;</span>
          
           <button onClick={()=>this.predictOutcome()} className="predictOutcome"> Go Again </button>
           <br/>
           {`Based off of ${this.props.pitcher.name}'s performance in ${this.props.pitcher.year}, and ${this.props.hitter.name}'s performance in ${this.props.hitter.year}`}
           <br/>
           {this.state.outcome}
         </div>

      </div>
   </div>
  );
 }

}