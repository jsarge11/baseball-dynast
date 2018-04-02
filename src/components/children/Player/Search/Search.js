import React from 'react'
import './Search.css'
import mg_img from '../../../../img/icon_mg.png'

export default function Search(props) {
 return (
  <div className="searchInput">
    <input className="input" id="firstName" onChange={(e)=>props.updateFirst(e.target.value)} placeholder="first name" value={props.firstName}/> 
    <input className="input" id="lastName" onChange={(e)=>props.updateLast(e.target.value)} placeholder="last name" value={props.lastName}/>

    <select onChange={(e)=>props.updateYear(e.target.value)} id="dropdown" className="button">
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
    </select>

     <button className="button" id="getListButton" onClick={props.whenClicked} type="button"><img src={mg_img} height="40px"/></button>
  </div>
 );
}