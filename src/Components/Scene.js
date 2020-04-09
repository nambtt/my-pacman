
import './Scene.css';
import React from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Food from './Food';

class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.pacmanRef = React.createRef();
        this.scene = React.createRef();
        this.ghostRefs = [];
        this.foodRefs = [];
        var maxLine = Math.max(window.innerHeight, this.getSceneWidth());
        console.log(window.innerHeight);
        console.log(this.getSceneWidth());
        this.noOfGhosts = Math.floor(maxLine/250);
        for (var i=0; i<this.noOfGhosts; i++) {
            this.ghostRefs.push(React.createRef());
        }
        this.noOfFoodColumns = 0;
        this.noOfFoodRows = 0;
        this.ghostColors = ['red', 'invi', 'green', 'invi', 'blue', 'invi', 'orange'];
        this.directions = ['left', 'up', 'right', 'down'];
    }

    componentDidMount() {
        this.crashed = false;
        this.intervalCrash = setInterval(this.lookForCrash.bind(this), 100);
        this.intervalFood = setTimeout(setInterval(this.lookForFood.bind(this), 100), 3000);
    }

    componentWillUnmount() {   
        clearInterval(this.intervalCrash);
        clearInterval(this.intervalFood);
    }

    lookForCrash() {
        if ( ! this.props.playing)
        return;
        var pacman = this.pacmanRef.current;
        for (var i in this.ghostRefs) {
            var ghost = this.ghostRefs[i].current;
            if (this.isRectanglesColliding(
                    pacman.state.position.left, 
                    pacman.state.position.top,
                    pacman.props.pacmanSize,
                    pacman.props.pacmanSize,
                    ghost.state.position.left, 
                    ghost.state.position.top,
                    ghost.props.ghostSize,
                    ghost.props.ghostSize)) {
                this.crashed = true;
            }
    
            if (this.crashed) {
                this.props.gameOver();
                pacman.killed();
                ghost.killed();
                clearInterval(this.intervalCrash);
                break;
            }
        }
    }

    lookForFood() {
        if ( ! this.props.playing)
        return;
        var pacman = this.pacmanRef.current;
        if (!pacman)
            return;
        for (var i in this.foodRefs) {
            for (var j in this.foodRefs[i]) {
                var food = this.foodRefs[i][j].current;
                if (!food.state.hidden && this.isRectanglesColliding(
                        pacman.state.position.left, 
                        pacman.state.position.top,
                        pacman.props.pacmanSize,
                        pacman.props.pacmanSize,
                        food.state.position.left + 25, 
                        food.state.position.top  + 25,
                        this.props.foodCollidingSize,
                        this.props.foodCollidingSize)) {
                    food.ate();
                    this.props.increase();
                    if (this.props.points == this.noOfFoodColumns * this.noOfFoodRows) {
                        this.props.win();
                    }
                }
            }
        }
    }

    isRectanglesColliding(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
        if (r1x + r1w >= r2x &&     // r1 right edge past r2 left
            r1x <= r2x + r2w &&       // r1 left edge past r2 right
            r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
            r1y <= r2y + r2h) {       // r1 bottom edge past r2 top
              return true;
          }
          return false;
    }

    getSceneWidth() {
        return window.innerWidth * 0.6875;
    }

    render() {
        var foods = [];
        this.noOfFoodColumns = Math.round(this.getSceneWidth()/this.props.foodSize);
        this.noOfFoodRows = Math.round(window.innerHeight/this.props.foodSize);

        for (var i = 0; i < this.noOfFoodRows; i++) {
            if (this.foodRefs.length < this.noOfFoodRows)
                this.foodRefs.push([]);
            for (var j = 0; j < this.noOfFoodColumns; j++) {
                if (this.foodRefs[i].length < this.noOfFoodColumns)
                    this.foodRefs[i].push(React.createRef());
                var position = {top: this.props.foodSize*i, left: this.props.foodSize*j};
                foods.push(<Food ref={this.foodRefs[i][j]} position={position} key={`${i}_${j}`}/>)
            }
        }
        let ghosts = [];
        for (var i=0; i<this.noOfGhosts; i++) {
            ghosts.push(<Ghost 
                ref={this.ghostRefs[i]} 
                key={i}
                sceneWidth={this.getSceneWidth()}
                sceneHeight={window.innerHeight}
                playing={this.props.playing} 
                position={{top: (i + 1) * window.innerHeight/(this.noOfGhosts + 1), left: (i + 1) * this.getSceneWidth()/(this.noOfGhosts + 1)}} 
                color={this.ghostColors[i]}
                direction={this.directions[Math.floor(Math.random() * 4)]}></Ghost>);
        }
        return (
            <div className="column eleven wide" style={{paddingLeft: 0, paddingBottom: 0}}>
                <div className="scene" ref={this.scene}>
                    {foods}
                    <Pacman ref={this.pacmanRef} 
                        sceneWidth={this.getSceneWidth()}
                        sceneHeight={window.innerHeight}
                        playing={this.props.playing} 
                        position={{top: 0, left: 0}}
                        direction={this.props.direction}
                        randomDirection={this.props.randomDirection}></Pacman>
                    {ghosts}
                </div>
            </div>
        )
    }
}

Scene.defaultProps = {
    foodSize: 60,
    foodCollidingSize: 10
}

export default Scene;