import React from 'react';
import {ReactComponent as PacmanSVG} from './../../src/assets/images/pacman.svg';

class Pacman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            looking: 'right',
            death: false
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        this.moveInterval = setInterval(this.move.bind(this), 100);
    }

    onKeyDown(e) {
        if (!this.state.death)
            this.rotate(e.keyCode);
    }

    rotate(keyCode) {
        var newDirection = this.state.looking;
        if (keyCode === 37) {
            newDirection = 'left';
        } else if (keyCode === 38) {
            newDirection = 'up';
        } else if (keyCode === 39) {
            newDirection = 'right';
        } else if (keyCode === 40) {
            newDirection = 'down';
        }
        this.setState({looking: newDirection});
    }

    move() {
		var currentLeft = this.state.position.left;
		var currentTop = this.state.position.top;
        if (this.state.looking === 'right') {
            var distanceToRightBorder = window.innerWidth - 2*this.props.border - currentLeft - this.props.pacmanSize;
            var step = Math.min(this.props.velocity, distanceToRightBorder);
            this.setState({position: {left: currentLeft + step, top: currentTop}});
        }
        if (this.state.looking === 'left') {
            var distanceToLeftBorder = currentLeft;
            step = Math.min(this.props.velocity, distanceToLeftBorder);
            this.setState({position: {left: currentLeft - step, top: currentTop}});
        }
        if (this.state.looking === 'down') {
            var distanceToBottomBorder = window.innerHeight - this.props.topBarHeight - 2*this.props.border - currentTop - this.props.pacmanSize;
            step = Math.min(this.props.velocity, distanceToBottomBorder);
            this.setState({position: {top: currentTop + step, left: currentLeft}});
        }
        if (this.state.looking === 'up') {
            var distanceToTopBorder = currentTop;
            step = Math.min(this.props.velocity, distanceToTopBorder);
            this.setState({position: {top: currentTop - step, left: currentLeft}});
        }
        
        if (!step) {
            this.rotate([37, 38, 39, 40][Math.floor(Math.random() * 4)]);
        }
    }

    killed() {
        this.setState({death: true});
        clearInterval(this.moveInterval);
    }

    render() {
        return (
            <div className={'pacman ' + (this.state.looking) + (this.state.death ? " death " : "")} style={this.state.position}>
                <PacmanSVG />
            </div>
        )
    }
}

Pacman.defaultProps = {
    border: 10,
    topBarHeight: 40,
    pacmanSize: 60,
    velocity: 20

};

export default Pacman;
