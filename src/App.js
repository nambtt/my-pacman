import React from 'react';
import Firebase from "firebase";
import firebaseConfig from './firebase.config';

import RegisterPlayer from './Components/RegisterPlayer';
import Header from './Components/Header';
import Scene from './Components/Scene';
import Controller from './Components/Controller';
import WinLose from './Components/WinLose';
import Scoreboard from './Components/Scoreboard';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    // init Firebase
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }

    this.headerRef = React.createRef();
    this.sceneRef = React.createRef();
    this.controllerRef = React.createRef();
    this.baseState = {
      gameKey: Math.random()*1000000,
      showingRegister: false,
      showingHelp: false,
      showingScore: false,
      direction: 'right', 
      finished: false, 
      lost: false, 
      points: 0
    };
    this.fullBaseState = Object.assign({}, this.baseState, {playerKey: '', playerName: ''});
    this.state = this.fullBaseState;
  }

  componentDidMount() {
    this.playAgain(this.state.gameKey);
  }

  increaseValue() {
    var newPoints = this.state.points + 1;
    this.setState({points: newPoints});
  }

  gameOver = () => {
    if ( ! this.state.finished) {

      this.setState({finished: true, lost: true});

      Firebase.database().ref('players/' + this.state.playerKey).set({
        name: this.state.playerName,
        score: this.state.points,
        won: false,
        date: new Date().toLocaleString()
      });
    }
  }

  win() {
    this.setState({finished: true, lost: false});
  }

  showHideHelp(hide) {
    this.setState({showingHelp: !hide});
  }

  changeDirection(direction) {
    this.setState({direction: direction});
  }

  playAgain(playerName) {
    if (!this.state.playerKey) {
      const playerKey = Firebase.database().ref('/players').push({name: playerName}).key;
      this.setState(this.baseState);
      this.setState({gameKey: Math.random()*1000000});
      this.setState({playerKey: playerKey});
      this.setState({playerName: playerName});
      this.setState({showingRegister: false});
    } else {
      this.setState(this.baseState);
      this.setState({gameKey: Math.random()*1000000});
      this.setState({showingRegister: false});
    }
    
  }

  randomDirection() {
    this.controllerRef.current.randomDirection();
  }

  render() {
    return (
      <div className="App pacman-app" key={this.state.gameKey}>
        <RegisterPlayer startGame={this.playAgain.bind(this)} display={this.state.showingRegister}/>
        <Header ref={this.headerRef}
          points={this.state.points}
          playing={!this.state.showingHelp} 
          showHideHelp={this.showHideHelp.bind(this)}>
        </Header>
        <Scene ref={this.sceneRef} 
          playing={!this.state.showingHelp && !this.state.showingRegister}
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
          finished={true} 
          playAgain={this.playAgain.bind(this)}>
            <Scoreboard 
            playerKey={this.state.playerKey} 
            playerName={this.state.playerName} />

          </WinLose>
      </div>
    );
  }
}

export default App;
