import React from 'react';
import Confs from './Configurations';
const ReactMarkdown = require('react-markdown');

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
            <div id="leftPanel" className="column five wide">
                <div class="box">
                    <div class="row header">
                        <div className="ui huge header center aligned">
                            PACMAN
                        </div>
                    </div>
                    <div class="row content">
                    {this.props.children}
                    </div>
                    <div class="row footer">
                        <div className="author">
                            <div class="ui label">
                                <i class="hand peace icon"></i>Bui Tran Thanh Nam
                            </div> <br />
                            <div class="ui label">
                                <a href="mailto:namnamit89@gmail.com">
                                    <i class="mail icon"></i>Namnamit89@gmail.com
                                </a>
                            </div>
                            <div class="ui label">
                                <a href="https://github.com/CuteWorm/my-pacman" target="_blank">
                                    <i class="github icon"></i>https://github.com/CuteWorm/my-pacman
                                </a>
                            </div>
                        </div>
                        <div className="tags" style={{marginTop: '1em'}}>
                            <span>Tags: </span>
                            <div class="ui label">
                                Javascript
                            </div>
                            <div class="ui label">
                                ReacJs
                            </div>
                            <div class="ui label">
                                Firebase
                            </div>
                            <div class="ui label">
                                Realtime
                            </div>
                            <div class="ui label">
                                Pacman
                            </div>
                            <div class="ui label">
                                Live score
                            </div>
                        </div>
                        <div id="btnHelp" class="ui">
                            <a href="#" onClick={() => this.showHideHelp(false)} title="How to play?">
                                <i class="question circle icon"></i>
                            </a>
                            <div id="howTo">
                                <ReactMarkdown source={Confs.howTo} />
                            </div>
                        </div>
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