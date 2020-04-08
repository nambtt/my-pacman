import React from 'react';

class WinLose extends React.Component {

    constructor(props) {
        super(props);
    }

    getGameResult() {
        if (this.props.lost)
            return <h1 className="lost">Game Over</h1>;
        else 
            return <h1 className="won">You Won!</h1>;
    }

    render() {
        return (
            <>
                <div className={"modal-content " + (this.props.finished ? " " : "hide")}>
                    {this.getGameResult()}
                    <br />
                    <button className="play-again-btn" onClick={this.props.playAgain}>Play again</button>
                    <button className="quit-btn">Quit</button>
                </div> 
                <div className={"modal-overlay" + (this.props.finished ? " " : "hide")}></div>
            </>
        )
    }
}

WinLose.defaultProps = {
    lost: false,
    finished: false
}

export default WinLose;