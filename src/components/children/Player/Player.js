import React, { Component } from 'react'
import axios from 'axios'
import Search from './Search/Search.js'
import Stats from './Stats/Stats.js'
import './Player.css'
import Create from './Create/Create.js'
import CardList from './Card/CardList.js'
import ActiveCard from './Card/ActiveCard.js'
import StatsList from './Stats/StatsList.js'


export default class Player extends Component {
 constructor() {
  super()

  this.state = {
   firstName: '',
   lastName: '',
   year: 2016,
   type: 'regular',
   information_type: 'cumulative_player_stats',
   position: '',
   cards: [],
   activeCards: [],
   hitter: {},
   pitcher: {},
   textToAdd: '',
   toBeEdited: {},
  }

  this.setStatistics = this.setStatistics.bind ( this );
  this.getData = this.getData.bind ( this );
  this.updateFirstName = this.updateFirstName.bind ( this );
  this.updateLastName = this.updateLastName.bind ( this );
  this.updateYear = this.updateYear.bind( this );
  this.addToRoster = this.addToRoster.bind ( this );
  this.deleteFromRoster = this.deleteFromRoster.bind ( this );
  this.editStats = this.editStats.bind ( this );
  this.put = this.put.bind( this );
 }

updateFirstName(name) {
  this.setState({ firstName: name })
}
updateLastName(name) {
  this.setState({ lastName: name })
}
updateYear(year) {
  this.setState({ year: year})
}
updateText(text) {
  this.setState({ textToAdd: text})
}

setStatistics(item) { //<<--------------------------------- BEGINNING OF SETSTATISTICS --------------------------------->

 let { userAuth } = this.props

 let pitcher = {
   battersFaced: 0,
   hits: 0,
   walks: 0,
   putOuts: 0,
 }

 let hitter = {
  plateAppearances: 0,
  hits: 0,
  walks: 0,
  putOuts: 0,
}

if (item.player.Position === "P") {

   let pitcher_first = item.player.FirstName.toLowerCase();
   let pitcher_last = item.player.LastName.toLowerCase();
   let pitcher_id = item.player.ID;

   let pitcher_url = `${pitcher_first}-${pitcher_last}-${pitcher_id}`

   let pitcher_whole_url = `${this.props.mlb_url}/${this.state.year}-${this.state.type}/${this.state.information_type}.json?player=${pitcher_url}`;


   axios.get(pitcher_whole_url, { 'headers': { 'Authorization': userAuth } }).then((res)=> {
   let data = res.data.cumulativeplayerstats.playerstatsentry[0].stats;
   let totalHits = +data.HomerunsAllowed['#text'] + +data.HitsAllowed['#text'] + +data.ThirdBaseHitsAllowed['#text'] + +data.SecondBaseHitsAllowed['#text'];

   pitcher.name = res.data.cumulativeplayerstats.playerstatsentry[0].player.LastName;
   pitcher.year = this.state.year;
   pitcher.ID = res.data.cumulativeplayerstats.playerstatsentry[0].player.ID;
   pitcher.battersFaced = +data.TotalBattersFaced['#text']
   pitcher.hits = totalHits;
   pitcher.walks = +data.PitcherWalks['#text'] + +data.BattersHit['#text'] + +data.PitcherIntentionalWalks['#text'];
   pitcher.putOuts = +data.PitcherGroundOuts['#text'] + +data.PitcherFlyOuts['#text'];

   pitcher.hitPercent = Math.round((pitcher.hits / pitcher.battersFaced) * 100);
   pitcher.walkPercent = Math.round((pitcher.walks / pitcher.battersFaced) * 100);
   pitcher.putOutPercent = Math.round((pitcher.putOuts / pitcher.battersFaced) * 100);
   pitcher.combinedPercent = pitcher.hitPercent + pitcher.walkPercent + pitcher.putOutPercent;
   pitcher.onBaseOtherPercent = 100 - pitcher.combinedPercent;

   this.setState({ pitcher: pitcher })

  })
 }
 else {
  let hitter_first = item.player.FirstName.toLowerCase();
  let hitter_last = item.player.LastName.toLowerCase();
  let hitter_id = item.player.ID;

  let hitter_url = `${hitter_first}-${hitter_last}-${hitter_id}`
 
  let batter_whole_url = `${this.props.mlb_url}/${this.state.year}-${this.state.type}/${this.state.information_type}.json?player=${hitter_url}`;

   
   axios.get(batter_whole_url, { 'headers': { 'Authorization': userAuth } }).then((res)=> {
   let data = res.data.cumulativeplayerstats.playerstatsentry[0].stats;
   let totalHits = +data.Homeruns['#text'] + +data.Hits['#text'] + +data.ThirdBaseHits['#text'] + +data.SecondBaseHits['#text'];

   hitter.name = res.data.cumulativeplayerstats.playerstatsentry[0].player.LastName;
   hitter.ID = res.data.cumulativeplayerstats.playerstatsentry[0].player.ID;
   hitter.year = this.state.year; 
   hitter.plateAppearances = +data.PlateAppearances['#text'];
   hitter.hits = totalHits;
   hitter.walks = +data.BatterWalks['#text'] + +data.HitByPitch['#text'] + +data.BatterIntentionalWalks['#text'];
   hitter.putOuts = +data.BatterGroundOuts['#text'] + +data.BatterFlyOuts['#text'];

   hitter.hitPercent = Math.round((hitter.hits / hitter.plateAppearances) * 100);
   hitter.walkPercent = Math.round((hitter.walks / hitter.plateAppearances) * 100);
   hitter.putOutPercent = Math.round((hitter.putOuts / hitter.plateAppearances) * 100);
   hitter.combinedPercent = hitter.hitPercent + hitter.walkPercent + hitter.putOutPercent;
   hitter.onBaseOtherPercent = 100 - hitter.combinedPercent;
  

   this.setState({ hitter: hitter })
  
  })
 }
 } //<<--------------------------------- END OF SETSTATISTICS --------------------------------->>
 getData() {
  const { userAuth } = this.props;

  if (!this.state.firstName) {

     let new_url = `${this.props.mlb_url}${this.state.year}-${this.state.type}/roster_players.json?player=${this.state.lastName}`

     axios.get(new_url, { 'headers': { 'Authorization': userAuth } }).then((response) => {
      let temp_object = response.data.rosterplayers.playerentry;
      if (temp_object) {
       this.setState({ cards: temp_object})
      }
      else {
       alert(`Sorry, we can't find any player with the last name of ${this.state.lastName}. Check your spelling?`);
       this.setState({ 
         firstName: '',
         lastName: ''
       })
      } 
    })
  }
  else if (!this.state.lastName) {
      alert('You must at least include a last name when searching.');
      this.setState({ 
        firstName: '',
        lastName: ''
      })
  }
  else {
    let new_url = `${this.props.mlb_url}${this.state.year}-${this.state.type}/roster_players.json?player=${this.state.firstName}-${this.state.lastName}`;


    axios.get(new_url, { 'headers': { 'Authorization': userAuth } }).then((response) => {
       let temp_object = response.data.rosterplayers.playerentry; 
       if (temp_object) {
        this.setState({ cards: temp_object })  
       }
       else {
        alert(`Sorry, we can't find any player named ${this.state.firstName} ${this.state.lastName}. Check your spelling?`);
        this.setState({ 
          firstName: '',
          lastName: ''
        })
        }
      
   })
  }
}
//item is pulled from the clicked item
addToRoster(item) {
  //console.log(item.item.player);
 if (this.state.activeCards.length === 0) {
      if (item.player.Position !== "P") {
        alert('Please choose a pitcher first.');
      }
      else {
        const {my_api} = this.props;
        const {cards} = this.state;
        
        //removes player from current list into active list

        for (let i = 0; i < cards.length; i++) {
        if (item.player.ID === cards[i].player.ID) {
          cards.splice(i,1);
        }
        }

        if (!item.created) {
          this.setStatistics(item);
        }
        else {
          let isPitcher = (item.player.Position = 'P') ? true : false;
          if (isPitcher) {
            this.setState({ pitcher : item.player })
          }
          else {
            this.setState({ hitter : item.player })
          }
        }

        axios.post(my_api, { item } ).then((res)=> {
        if (res) {
          this.setState({ activeCards: res.data })
        }
      })
     }
   }
   else if (this.state.activeCards.length === 1) {
      const {my_api} = this.props;
      const {cards} = this.state;

        //removes player from current list into active list
        for (let i = 0; i < cards.length; i++) {
        if (item.player.ID === cards[i].player.ID) {
          cards.splice(i,1);
        }
      }
      this.setStatistics(item);

      axios.post(my_api, { item } ).then((res)=> {
      if (res) {
        this.setState({ activeCards: res.data })
      }
    })
  }
  else if (this.state.activeCards.length === 2) {
    alert(`Sorry, your lineup is full.`);
  }
}
deleteFromRoster(item) {
  const {my_api} = this.props;
  const id = item.item.player.ID;
  axios.delete(`${my_api}${id}`).then((res)=> {
    this.setState({ activeCards: res.data })
  })
 
}
editStats(item) {
  document.getElementById("edit").style.display = "block";
  this.setState({ toBeEdited: item })
}

put() {
  console.log(`NEW: ${JSON.stringify(this.state.toBeEdited, null, 2)}`)
  let url = `${this.props.my_api}${this.state.toBeEdited.ID}`
  let textToAdd = this.state;
  axios.put(url, { textToAdd }).then (response => {

      this.setState({ activeCards: response.data })
    });

  this.setState({ textToAdd: '' })
  this.closeSpan();
}

closeSpan() {
  document.getElementById("edit").style.display = "none";
}

render() {

 let displayList = this.state.cards.map((item, index) => {
    return (
      <CardList newItem={item} 
      addToRoster={this.addToRoster}
      index={index}
      /> 
  );
 })

 let displayPlayerPosition = ''; 

  if (this.state.activeCards.length === 0) {
    displayPlayerPosition = <div className='displayPlayerPosition'><h1>To start, search for a pitcher.</h1></div>
  }
  else if (this.state.activeCards.length === 1) {
    displayPlayerPosition = <div className='displayPlayerPosition'><h1>Next, search for a batter.</h1></div>
  }
  else {
    displayPlayerPosition = <div className='displayPlayerPosition'><h1>Hit predict outcome to compare their statistics and see a likely outcome!</h1></div>
  }

 
 let selectionList = this.state.activeCards.map((item, index) => {
  let position = {};
  let pos = item.item.player.Position;

  if (pos === 'P') {
    position = this.state.pitcher;
  }
  else {
    position = this.state.hitter;
  }

   if (item) {
    
    return (
    <ActiveCard position={position}
    newItem={item}
    deleteFromRoster={this.deleteFromRoster}
    editStats={this.editStats}
    index={index}
    
    />

  );
}
  else {
    return {};
  }
 })



  return (
   <div>
     <div>
      <Search updateFirst={this.updateFirstName} 
      updateLast={this.updateLastName} 
      firstName={this.state.firstName}
      lastName={this.state.lastName}
      updateYear={this.updateYear}
      year={this.state.year}
      whenClicked={this.getData} 
      />

      <Create my_api={this.props.my_api}
      addToRoster={this.addToRoster}

      />

      {displayPlayerPosition}
     </div>
     <div id="edit" className="editModal">
      <div className="editModalContent">
        <input id="inputButton" type="text" placeholder="enter new name" onChange={(e)=>this.updateText(e.target.value)} value={this.state.textToAdd}/>
        <button onClick={()=>this.put()}>Change Name</button>
          <StatsList player={this.state.toBeEdited} />
        <span onClick={()=>this.closeSpan()} className="close">&times;</span>
      </div>
     </div>
     <br/>
     {displayList}
     <div className="selectionListWrapper">
      <div className="selectionList">
        <h1>Selected Roster: </h1>
          {selectionList}
      </div>
      <div id="stats">
          <Stats activeCards={this.state.activeCards}
          pitcher={this.state.pitcher}
          hitter={this.state.hitter}
          />
      </div>
     </div>
   </div>
  );
 }
} 