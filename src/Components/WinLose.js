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
                <div id="winLoseModal" className={"modal-content " + (this.props.finished ? " " : " hide ")}>
                    {this.getGameResult()}
                    <h3 className="ui header">Score: <b style={{color: 'red', fontSize: '20pt'}}>{this.props.score}</b></h3>
                    <div className="modal-actions">
                        <button className="ui button primary play-again-btn" onClick={this.props.playAgain}>Improve your score!</button>
                    </div>
                </div> 
                <div className={"modal-overlay" + (this.props.finished ? " " : " hide ")}></div>
            </>
        )
    }
}

WinLose.defaultProps = {
    lost: false,
    finished: false
}

export default WinLose;