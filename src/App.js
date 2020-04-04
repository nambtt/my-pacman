import React from 'react';
import Header from './Components/Header';
import Scene from './Components/Scene';
import Controller from './Components/Controller';
import WinLose from './Components/WinLose';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.headerRef = React.createRef();
    this.sceneRef = React.createRef();
    this.controllerRef = React.createRef();
    this.state = {
      gameKey: Math.random()*1000000,
      playing: true, 
      direction: 'right', 
      finished: false, 
      lost: false, 
      points: 0
    };
    this.baseState = this.state;
  }
  increaseValue() {
    var newPoints = this.state.points + 1;
    this.setState({points: newPoints});
  }

  gameOver() {
    if ( ! this.state.finished)
      this.setState({finished: true, lost: true});
  }

  win() {
    this.setState({finished: true, lost: false});
  }

  pause(playing) {
    this.setState({playing: playing});
  }

  changeDirection(direction) {
    this.setState({direction: direction});
  }

  playAgain() {
    this.setState(this.baseState);
    this.setState({gameKey: Math.random()*1000000});
  }

  randomDirection() {
    this.controllerRef.current.randomDirection();
  }

  render() {
    return (
      <div className="App pacman-app" key={this.state.gameKey}>
        <Header ref={this.headerRef}
          points={this.state.points}
          playing={this.state.playing} 
          pause={this.pause.bind(this)}>
        </Header>
        <Scene ref={this.sceneRef} 
          playing={this.state.playing}
          direction={this.state.direction}
          points={this.state.points}
          gameOver={this.gameOver.bind(this)} 
          win={this.win.bind(this)} 
          increase={this.increaseValue.bind(this)} 
          randomDirection={this.randomDirection.bind(this)}></Scene>
        <Controller ref={this.controllerRef} 
          changeDirection={this.changeDirection.bind(this)}/>
        <WinLose 
          lost={this.state.lost} 
          finished={this.state.finished} 
          playAgain={this.playAgain.bind(this)}/>
      </div>
    );
  }
}

export default App;
