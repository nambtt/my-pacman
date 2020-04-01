import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {points: 0, playing: true};
    }

    increase() {
        if (this.state.playing) {
            var currentPoints = this.state.points + 1;
            this.setState({points: currentPoints});
        }
    }

    render() {
        return (
            <div className="header">
                <div className="left title">Pacman</div>
                <div className="right score">SCORES: <span className="points">{this.state.points}</span></div>
            </div>
        )
    }
}

Header.defaultProps = {

}

export default Header;