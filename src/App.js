import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News.js';
// import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API

  state = {
    progress : 0
  }

  setProgress = (progress)=> {
    this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
            <LoadingBar
              color='red'
              height={3}
              progress= {this.state.progress}
              // onLoaderFinished={() => setProgress(0)}
            />
          <Routes>
            <Route exact path='/' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   category="general" country="in" />} />
            <Route exact path='/business' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="business" category="business" country="in" />} />
            <Route exact path='/entertainment' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="entertainment" category="entertainment" country="in" />} />
            <Route exact path='/general' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="general" category="general" country="in" />} />
            <Route exact path='/health' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="health" category="health" country="in" />} />
            <Route exact path='/science' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="science" category="science" country="in" />} />
            <Route exact path='/sports' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="sports" category="sports" country="in" />} />
            <Route exact path='/technology' element={   <News  apikey = {this.apikey} setProgress = {this.setProgress}   key="technology" category="technology" country="in" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
