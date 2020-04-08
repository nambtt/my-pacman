import React from 'react';
const ReactMarkdown = require('react-markdown')

const input = 
`## Game play and rules
You, as the Pacman will try to eat all the food and to not collide with four ghosts. If the Pacman hits any of the ghosts, you'll lose. Each food you eat, giving you a point. When the Pacman eats the whole food on the ground, you'll win.
### Control the Pacman
- Just simple as using keyboard arrows **Up, Down, Left, Right** to change Pacman's direction`;


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    showHideHelp(playing) {
        this.props.showHideHelp(playing);
    }

    render() {
        return (
            <div className="header">
                <div id="howTo" style={{display: this.props.playing ? 'none' : 'block'}}>
                    <ReactMarkdown source={input} />
                    <button className="lets-play" onClick={ () => this.showHideHelp(true)}>Resume</button>
                </div>
                <div className="head">
                    <div className="left title">Pacman</div>
                    <div className="right score">SCORES: <span className="points">{this.props.points}</span></div>
                </div>
                <div className="author">
                    <div>Created by: Nam Btt</div>
                    <div>
                    <a href="mailto:namnamit89@gmail.com">namnamit89@gmail.com</a>
                    </div>
                    <div>
                    <a href="#" onClick={ () => this.pause(false)}>Help?</a>
                    </div>
                </div>
            </div>
        )
    }
}

Header.defaultProps = {
    points: 0, 
    playing: true
}

export default Header;