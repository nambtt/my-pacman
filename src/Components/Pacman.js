import React from 'react';
import {ReactComponent as PacmanSVG} from './../../src/assets/images/pacman.svg';

class Pacman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            death: false
        }
    }
    componentDidMount() {
        this.moveInterval = setInterval(this.move.bind(this), 100);
    }

    componentWillUnmount() {   
        clearInterval(this.moveInterval);
    }

    move() {
		var currentLeft = this.state.position.left;
		var currentTop = this.state.position.top;
        if (this.props.direction === 'right') {
            var distanceToRightBorder = this.props.sceneWidth - currentLeft - this.props.pacmanSize;
            var step = Math.min(this.props.velocity, distanceToRightBorder);
            this.setStateWhilePlaying({position: {left: currentLeft + step, top: currentTop}});
        }
        if (this.props.direction === 'left') {
            var distanceToLeftBorder = currentLeft;
            step = Math.min(this.props.velocity, distanceToLeftBorder);
            this.setStateWhilePlaying({position: {left: currentLeft - step, top: currentTop}});
        }
        if (this.props.direction === 'down') {
            var distanceToBottomBorder = this.props.sceneHeight - currentTop - this.props.pacmanSize;
            step = Math.min(this.props.velocity, distanceToBottomBorder);
            this.setStateWhilePlaying({position: {top: currentTop + step, left: currentLeft}});
        }
        if (this.props.direction === 'up') {
            var distanceToTopBorder = currentTop;
            step = Math.min(this.props.velocity, distanceToTopBorder);
            this.setStateWhilePlaying({position: {top: currentTop - step, left: currentLeft}});
        }
        
        if (!step) {
            this.props.randomDirection();
        }
    }

    killed() {
        this.setStateWhilePlaying({death: true});
        clearInterval(this.moveInterval);
    }

    setStateWhilePlaying(val) {
        if (this.props.playing) {
            this.setState(val);
        }
    }

    render() {
        return (
            <div className={'pacman ' + (this.props.direction) + (this.state.death ? " death " : "")} 
                style={this.state.position}>
                <PacmanSVG />
            </div>
        )
    }
}

Pacman.defaultProps = {
    sceneWidth: 400,
    sceneHeight: 400,
    pacmanSize: 60,
    velocity: 20,
    direction: 'right'
};

export default Pacman;
