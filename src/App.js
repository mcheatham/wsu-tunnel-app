import React, { Component} from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'

import Toolbar from "./Components/Toolbar/Toolbar.js"
import SideDrawer from './Components/SideDrawer/SideDrawer.js';
import Backdrop from './Components/Backdrop/Backdrop.js';
import Map from  './Components/Views/Map.js';
import About from './Components/Views/About.js';
import FAQ from "./Components/Views/FAQ.js";
import MyFooter  from './Components/Footer/MyFooter';






class App extends Component {
  state={
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
      this.setState({sideDrawerOpen:true});

  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen:false});
  };



  render() {
    let backdrop;

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop clicky={this.backdropClickHandler}/>;
    }

    return (

        <HashRouter>
        <div style={{height: '100%'}}>
        <Toolbar drawerClick={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} clicky={this.backdropClickHandler}/>
        {backdrop}


          <Redirect to="/Map" />
        <Route sytle={{margin:64}} exact path="/Map" component={Map}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/FAQ" component={FAQ}/>
        <MyFooter/>
        </div>
        </HashRouter>



    );
  }
}

export default App;
