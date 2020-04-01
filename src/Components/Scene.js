
import './Scene.css';
import React from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Food from './Food';

class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.pacmanRef = React.createRef();
        this.ghostRefs = [];
        this.foodRefs = [];
        for (var i=0; i<4; i++) {
            this.ghostRefs.push(React.createRef());
        }
        
    }

    componentDidMount() {
        this.crashed = false;
        this.intervalCrash = setInterval(this.lookForCrash.bind(this), 100);
        this.intervalFood = setTimeout(setInterval(this.lookForFood.bind(this), 100), 3000);
    }

    lookForCrash() {
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
                //this.props.gameOver();
                pacman.killed();
                ghost.killed();
                clearInterval(this.intervalCrash);
                break;
            }
        }
        
    }

    lookForFood() {
        var pacman = this.pacmanRef.current;
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
                    console.log(food);
                    food.ate();
                    this.props.increase();
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

    render() {
        var foods = [];
        
        var noOfFoodColumns = Math.round((window.innerWidth - 2*this.props.border)/this.props.foodSize);
        var noOfFoodRows = Math.round((window.innerHeight - this.props.topBarHeight - 2*this.props.border)/this.props.foodSize);
        for (var i = 0; i < noOfFoodRows; i++) {
            if (this.foodRefs.length < noOfFoodRows)
                this.foodRefs.push([]);
            for (var j = 0; j < noOfFoodColumns; j++) {
                if (this.foodRefs[i].length < noOfFoodColumns)
                    this.foodRefs[i].push(React.createRef());
                var position = {top: this.props.foodSize*i, left: this.props.foodSize*j};
                foods.push(<Food ref={this.foodRefs[i][j]} position={position} key={`${i}-${j}`}/>)
            }
        }

        return (
            <div className="scene">
                {foods}
				<Pacman ref={this.pacmanRef} position={{top: 50, left: 100}}></Pacman>
				<Ghost ref={this.ghostRefs[0]} position={{top: 150, left: 30}} color="red"></Ghost>
				<Ghost ref={this.ghostRefs[1]} position={{top: 240, left: 200}} color="green"></Ghost>
				<Ghost ref={this.ghostRefs[2]} position={{top: 350, left: 330}} color="blue"></Ghost>
				<Ghost ref={this.ghostRefs[3]} position={{top: 550, left: 420}} color="orange"></Ghost>
            </div>
        )
    }
}

Scene.defaultProps = {
    border: 10,
    topBarHeight: 40,
    foodSize: 60,
    foodCollidingSize: 10,
    foodBorderBottomDistance: 10
}

export default Scene;