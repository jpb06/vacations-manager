import React, { Component } from 'react';
import './styles/App.scss';
import { Routes } from './Routes.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
