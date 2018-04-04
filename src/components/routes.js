import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Nav from './children/Nav/Nav'
import LiveUpdates from './children/LiveUpdates/LiveUpdates'
import ViewStats from './children/ViewStats/ViewStats'
import Home from './Home'


export default (
   <div>
    <Nav />
     <Switch>
       <Route exact path='/' component={Home}/>
       <Route path='liveupdates' component={LiveUpdates} />
       <Route path='viewstats' component={ViewStats} />
      </Switch>
   </div>

)
