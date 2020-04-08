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
                <div id="winLoseModal" className={"modal-content " + (this.props.finished ? " " : "hide")}>
                    {this.getGameResult()}
                    {this.props.children}
                    <div className="modal-actions">
                        <button className="ui button primary play-again-btn" onClick={this.props.playAgain}>Play again</button>
                        <button className="ui button quit-btn">Quit</button>
                    </div>
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