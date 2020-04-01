import React from 'react';
import Header from './Components/Header';
import Scene from './Components/Scene';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.headerRef = React.createRef();
  }
  increaseValue() {
    this.headerRef.current.increase();
  }

  gameOver() {
    this.headerRef.current.gameOver();
  }

  render() {
    return (
      <div className="App pacman-app">
        <Header ref={this.headerRef}></Header>
        <Scene gameOver={this.gameOver.bind(this)} increase={this.increaseValue.bind(this)}></Scene>
      </div>
    );
  }
}

export default App;
