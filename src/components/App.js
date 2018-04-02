import React, { Component } from 'react';
import Player from './children/Player/Player.js'
// import axios from 'axios'
import './App.css';
import '../reset.css';
import logo from '../img/BD.gif'

class App extends Component {
  constructor() {
    super()

    this.state = {
      key: 'whats up',
      base_first_api_URL: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/',
      my_api: '/api/players'
    }
    this.encodeUserData = this.encodeUserData.bind( this );
  }

  componentDidMount() {
    let auth_key = "Basic ";
    auth_key += this.encodeUserData();
    this.setState({ key: auth_key });
  }

  encodeUserData() {
    return window.btoa("jsarge11:jsArge11");
  }


  render() {
    return (
      <div className="wrapper">
        <div className="App"> 
            <img className="logo" src={logo} alt="logo"/>
          
        <Player userAuth={this.state.key} 
                mlb_url={this.state.base_first_api_URL}
                my_api={this.state.my_api}
                />
          
        </div>
      </div>
    );
  }
}

export default App;
