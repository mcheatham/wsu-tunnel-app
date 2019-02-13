import React from 'react';
import Map from './Map';
import FAQ from './FAQ';
import About from './About';
import './Views.css';

import SwipableRoutes from 'react-swipeable-routes';
import {HashRouter, Route} from 'react-router-dom';


const Views = props =>{
    return(
      <div className={'myDiv'}>
          <HashRouter>
          <SwipableRoutes>
              <Route exact path="Map" component={Map}/>
              <Route exact path='About' component ={About}/>
              <Route exact path="FAQ" component={FAQ}/>
          </SwipableRoutes>
          </HashRouter>
      </div>
    );

};
export default Views