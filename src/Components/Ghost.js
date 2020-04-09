import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from 'react-svg-inline';
import {ReactComponent as GhostSVG} from './../../src/assets/images/ghost.svg';
import {isMobile} from 'react-device-detect';

class Ghost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            direction: this.props.direction,
            color: this.props.color,
            death: false
        }
    }

    componentDidMount() {
        this.moveInterval = setInterval(this.move.bind(this), isMobile ? 250 : 150);
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), 2000);
    }

    componentWillUnmount() {   
        clearInterval(this.moveInterval);
        clearInterval(this.changeDirectionInterval);
    }

    changeDirection() {
        var directions = ['left', 'right', 'up', 'down'];
        var changedDirection = directions[Math.floor(Math.random() * 4)];
        this.setStateWhilePlaying({direction: changedDirection});
    }

    move() {
		var currentLeft = this.state.position.left;
		var currentTop = this.state.position.top;
        if (this.state.direction === 'right') {
            var distanceToRightBorder = this.props.sceneWidth - currentLeft - this.props.ghostSize;
            var step = Math.min(this.props.velocity, distanceToRightBorder);
            this.setStateWhilePlaying({position: {left: currentLeft + step, top: currentTop}});
        }
        if (this.state.direction === 'left') {
            var distanceToLeftBorder = currentLeft;
            step = Math.min(this.props.velocity, distanceToLeftBorder);
            this.setStateWhilePlaying({position: {left: currentLeft - step, top: currentTop}});
        }
        if (this.state.direction === 'down') {
            var distanceToBottomBorder = this.props.sceneHeight - currentTop - this.props.ghostSize;
            step = Math.min(this.props.velocity, distanceToBottomBorder);
            this.setStateWhilePlaying({position: {top: currentTop + step, left: currentLeft}});
        }
        if (this.state.direction === 'up') {
            var distanceToTopBorder = currentTop;
            step = Math.min(this.props.velocity, distanceToTopBorder);
            this.setStateWhilePlaying({position: {top: currentTop - step, left: currentLeft}});
        }

        if (!step) {
            this.changeDirection();
        }
    }

    killed() {
        this.setStateWhilePlaying({color: 'white'});
        clearInterval(this.moveInterval);
        clearInterval(this.changeDirectionInterval);
    }

    setStateWhilePlaying(val) {
        if (this.props.playing) {
            this.setState(val);
        }
    }

    render() {
        return (
            <div className={this.state.color + " ghost"} style={this.state.position}>
                <GhostSVG />
            </div>
        )
    }
}

Ghost.defaultProps = {
    ghostSize: 60,
    velocity: 20,
    direction: 'left'
};

export default Ghost;