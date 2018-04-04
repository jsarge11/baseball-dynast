import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import routes from './routes'

export default class App extends Component {
 render() {
  return (
   <HashRouter>
     {routes}
   </HashRouter>
  );
 }
}