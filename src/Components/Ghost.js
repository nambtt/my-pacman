import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from 'react-svg-inline';
import {ReactComponent as GhostSVG} from './../../src/assets/images/ghost.svg';

class Ghost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            direction: 'left',
            color: this.props.color,
            death: false
        }
    }

    componentDidMount() {
        this.moveInterval = setInterval(this.move.bind(this), 200);
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), 2000);
    }

    changeDirection() {
        var directions = ['left', 'right', 'up', 'down'];
        var changedDirection = directions[Math.floor(Math.random() * 4)];
        this.setState({direction: changedDirection});
    }

    move() {
		var currentLeft = this.state.position.left;
		var currentTop = this.state.position.top;
        if (this.state.direction === 'right') {
            var distanceToRightBorder = window.innerWidth - 2*this.props.border - currentLeft - this.props.ghostSize;
            var step = Math.min(this.props.velocity, distanceToRightBorder);
            this.setState({position: {left: currentLeft + step, top: currentTop}});
        }
        if (this.state.direction === 'left') {
            var distanceToLeftBorder = currentLeft;
            step = Math.min(this.props.velocity, distanceToLeftBorder);
            this.setState({position: {left: currentLeft - step, top: currentTop}});
        }
        if (this.state.direction === 'down') {
            var distanceToBottomBorder = window.innerHeight - this.props.topBarHeight - 2*this.props.border - currentTop - this.props.ghostSize;
            step = Math.min(this.props.velocity, distanceToBottomBorder);
            this.setState({position: {top: currentTop + step, left: currentLeft}});
        }
        if (this.state.direction === 'up') {
            var distanceToTopBorder = currentTop;
            step = Math.min(this.props.velocity, distanceToTopBorder);
            this.setState({position: {top: currentTop - step, left: currentLeft}});
        }

        if (!step) {
            this.changeDirection();
        }
    }

    killed() {
        this.setState({color: 'white'});
        clearInterval(this.moveInterval);
        clearInterval(this.changeDirectionInterval);
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
    border: 10,
    topBarHeight: 40,
    ghostSize: 60,
    velocity: 20
};

export default Ghost;