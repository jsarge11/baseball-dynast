import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

export default class Nav extends Component {
 render() {
  return (
        <div className="navBar">
               
                <Link className="navItems" to='/'><p>Home</p></Link>
                <Link className="navItems" to='/viewstats'><p>View Stats</p></Link>
                <Link className="navItems" to='/liveupdates'><p>Live Updates</p></Link>
                
        </div>
  );
 }

}