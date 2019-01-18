import React, { Component } from 'react';

import './App.css';
import Button from './components/Button/Button';
import Pokemon from './components/pokemon/pokemon';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Button />
        <Pokemon />
      </div>
    );
  }
}

export default App;
