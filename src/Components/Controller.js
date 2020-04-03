import React from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

class Controller extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    changeDirection(direction) {
        this.props.changeDirection(direction);
    }

    onKeyDown(e) {
        this.rotate(e.keyCode);
    }

    rotate(keyCode) {
        var newDirection = this.props.direction;
        if (keyCode === 37) {
            newDirection = 'left';
        } else if (keyCode === 38) {
            newDirection = 'up';
        } else if (keyCode === 39) {
            newDirection = 'right';
        } else if (keyCode === 40) {
            newDirection = 'down';
        }
        this.props.changeDirection(newDirection);
    }

    randomDirection() {
        var direction = ['left', 'up', 'right', 'down'][Math.floor(Math.random() * 4)];
        this.changeDirection(direction);
    }

    render() {
        return (
            <div className="controller">
                <IoIosArrowBack className="icon-left key" onClick={() => this.changeDirection('left')} />
                <IoIosArrowForward className="icon-right key" onClick={() => this.changeDirection('right')}  />
                <IoIosArrowUp className="icon-up key" onClick={() => this.changeDirection('up')}  />
                <IoIosArrowDown className="icon-down key" onClick={() => this.changeDirection('down')}  />
            </div>
        )
    }
}

export default Controller;