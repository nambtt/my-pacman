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
      showingRegister: true,
      showingHelp: false,
      showingScore: false,
      direction: 'right', 
      finished: false, 
      lost: false, 
      points: 0
    };
    this.fullBaseState = Object.assign({}, this.baseState, {playerKey: '', playerName: '', noOfRetry: 0});
    this.state = this.fullBaseState;
  }

  componentDidMount() {
    //this.playAgain(this.state.gameKey);
  }

  increaseValue() {
    var newPoints = this.state.points + 1;
    this.setState({points: newPoints});
  }

  gameOver = () => {
    if ( ! this.state.finished) {

      this.setState({finished: true, lost: true});

      Firebase.database().ref('players/' + this.state.playerKey).update({
        score: this.state.points,
        won: false,
		date: new Date().toLocaleString(),
		noOfRetry: this.state.noOfRetry
      });
    }
  }

  win() {
	this.setState({finished: true, lost: false});
	Firebase.database().ref('players/' + this.state.playerKey).update({
        score: this.state.points,
        won: true,
		date: new Date().toLocaleString(),
		noOfRetry: this.state.noOfRetry
      });
  }

  showHideHelp(hide) {
    this.setState({showingHelp: !hide});
  }

  changeDirection(direction) {
    this.setState({direction: direction});
  }

  playAgain(player) {
    if (!this.state.playerKey) {
      const playerKey = Firebase.database().ref('/players').push({name: player.playerName, secret: player.secret}).key;
      this.setState(this.baseState);
      this.setState({gameKey: Math.random()*1000000});
      this.setState({playerKey: playerKey});
      this.setState({playerName: player.playerName});
      this.setState({showingRegister: false});
    } else {
		
      this.setState(this.baseState);
      this.setState({gameKey: Math.random()*1000000});
      this.setState({showingRegister: false});
	  var noOfRetry = this.state.noOfRetry + 1;
	  this.setState({noOfRetry: noOfRetry});
    }
    
  }

  randomDirection() {
    this.controllerRef.current.randomDirection();
  }

  render() {
    return (

      <div className="ui two column stackable grid pacman-app" key={this.state.gameKey}>
        <RegisterPlayer startGame={this.playAgain.bind(this)} display={this.state.showingRegister}/>
          <Header ref={this.headerRef}
            points={this.state.points}
            playing={!this.state.showingHelp} 
            showHideHelp={this.showHideHelp.bind(this)}>
            <Scoreboard 
              playerKey={this.state.playerKey} 
              playerName={this.state.playerName} />
          </Header>
          <Scene ref={this.sceneRef} 
            playing={!this.state.showingRegister && !this.state.finished}
            direction={this.state.direction}
            points={this.state.points}
            gameOver={this.gameOver.bind(this)} 
            win={this.win.bind(this)} 
            increase={this.increaseValue.bind(this)} 
            randomDirection={this.randomDirection.bind(this)}></Scene>
        <Controller ref={this.controllerRef} 
          changeDirection={this.changeDirection.bind(this)}/>
        <WinLose 
          score={this.state.points}
          lost={this.state.lost} 
          finished={this.state.finished} 
          playAgain={this.playAgain.bind(this)}>
          </WinLose>
      </div>
    );
  }
}

export default App;
