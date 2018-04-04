import React, {Component} from 'react'
import './create.css'

export default class Create extends Component {

 constructor() {
 super();


 this.state = {
  item: {
   player: {
    FirstName: '',
    LastName: '',
    plateappearances: 0,
    walks: 0,
    hits: 0,
    outs: 0,
    hitPercent: 0,
    walkPercent: 0,
    putOutPercent: 0,
    onBaseOtherPercent: 0,
    onBaseOnError: 0,
    Position: 'P',
    ID: String((Math.floor((Math.random() * 1000)))),
   },
   team: {
    City: 'Custom',
    Name: 'Player',
   },
   created: true,
  }
 }
}
 setStatistics() {
  let data = this.state.player;
  let city = this.state.team.city;
  let name = this.state.team.name;
  let tempWalks = Math.round((data.walks / data.plateappearances) * 100);
  let tempHits = Math.round((data.hits / data.plateappearances) * 100);
  let tempOuts = Math.round((data.outs / data.plateappearances) * 100);
  let newNum = tempWalks + tempHits + tempOuts;
  let tempOnBaseOnError = 100 - newNum;

  let temp = Object.assign({}, this.state.item, {
   player: {
    hitPercent: tempHits,
    walkPercent: tempWalks,
    putOutPercent: tempOuts,
    onBaseOtherPercent: tempOnBaseOnError,
   },
   team: {
    City: city,
    Name: name
   }
  })

  this.setState({ item: temp })
 }
 updateFirst(e) {
  let temp = Object.assign({}, this.state.item);
  temp.player.FirstName = e;
  this.setState({ item : temp});

 }
 updateLast(e) {
  let temp = Object.assign({}, this.state.item);
  temp.player.LastName = e;
  this.setState({ item: temp });
 }
 updatePA(e) {
  let temp = Object.assign({}, this.state.item);
  temp.player.plateappearances = e;
  this.setState({ item: temp });
 }
 updateWalks(e) {
  let temp = Object.assign({}, this.state.item);
  temp.player.walks = e;
  this.setState({ item: temp });
}
 updateHits(e) {
  let temp = Object.assign({}, this.state.item);
  temp.player.hits = e;
  this.setState({ item: temp });
 }
 updateOuts(e) {
  let temp = Object.assign({}, this.state.item);
  temp.player.outs = e;
  this.setState({ item: temp });
 }
 updateOnBaseOnError(e) {
  // let temp = Object.assign({}, this.state.player, {FirstName:e});
  // this.setState({ player: temp });
 }
 updatePosition(e) {
  if (e === 'Pitcher') {
   document.getElementById("plateAppearanceOrBatterFaced").innerHTML = `Batters Faced: `;
  }
  else {
   document.getElementById("plateAppearanceOrBatterFaced").innerHTML = `Plate Appearances: `;
  }
  
  let temp = Object.assign({}, this.state.player, {position:e});
  this.setState({ player: temp });
 }


 showCreatePlayerModal() {
  document.getElementById("createModal").style.display = "block";
 }
 createPlayer() {
  let { FirstName, LastName, plateappearances } = this.state.item.player;

  if (!FirstName || !LastName) {
   document.getElementById("alertReq").innerHTML = `Please fill out both name fields!`;
  }
  else if (!plateappearances) {
   document.getElementById("alertReq").innerHTML = `Your player must have at least one plate appearance or batter faced.`;
  }
  else {
   this.closeSpan();
   this.props.addToRoster(this.state.item);

  }
 }
 closeSpan() {
  document.getElementById("createModal").style.display = "none";
 }

 render() {
  let alertReq = <div id="alertReq"></div>;

  return (
   <div>
  
     <button onClick={()=>this.showCreatePlayerModal()} plus button eventually></button>
     <div id="createModal" className="createModalWrapper">

         <div className="modalContent">

           <span onClick={()=>this.closeSpan()} className="close">&times;</span>
           Create a player! Add Stats Below:<br/><br/>

           <p>Name: <input onChange={(e)=>this.updateFirst(e.target.value)}type="text" placeholder="FirstName" value={this.state.item.player.FirstName}/>

           <input onChange={(e)=>this.updateLast(e.target.value)}type="text" placeholder="LastName" value={this.state.item.player.LastName}/></p><br/>

           <div className="pitcherOrHitter"><p id="plateAppearanceOrBatterFaced">Batters Faced: </p><input onChange={(e)=>this.updatePA(e.target.value)}type="text" placeholder="plate appearances ..." value={this.state.item.player.plateappearances}/></div><br/>

           <p>Walks: <input onChange={(e)=>this.updateWalks(e.target.value)} type="text" placeholder="walks ..."value={this.state.item.player.walks}/></p><br/>

           <p>Hits: <input onChange={(e)=>this.updateHits(e.target.value)} type="text" placeholder="hits ..." value={this.state.item.player.hits} /></p><br/>

           <p>Outs <input onChange={(e)=>this.updateOnBaseOnError(e.target.value)} type="text" placeholder="outs ..." value={this.state.item.player.outs} /></p><br/>

           <select onChange={(e)=>this.updatePosition(e.target.value)}>
             <option value="Pitcher">Pitcher</option>
             <option value="Batter">Batter</option>
           </select>
           <br/>
           <button onClick={()=>this.createPlayer()}>Create Player</button><br/><br/>
           {alertReq}
          </div>
         </div>
   </div>
  );
}
}