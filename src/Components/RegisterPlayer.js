import React from 'react';

class RegisterPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            playerName: '',
        };
    }

    onFormSubmit = (e) => { 
        e.preventDefault();
        if (this.state.playerName) {
            this.props.startGame(this.state.playerName);
        }
    }
    
    render() {
        return (
            <>
                <div id="registerModal" className={"modal-content " + (this.props.display ? "": "hide")}>
                    <form onSubmit={this.onFormSubmit} className={"ui form "}>
                        <h2 className="ui header">Register Your Name</h2>
                        <div className={"fields " + (this.props.display ? " " : "hide")}>
                            <div className="field">
                                <div className="ui input"><input type="text" placeholder="You name..." value={this.state.playerName} onChange={e => this.setState({playerName: e.target.value})}/></div>
                            </div>
                            <div className="field">
                                <button className="ui button save-btn" onClick={this.savePlayerName}>Play</button>
                            </div>
                        </div> 
                        
                    </form>
                </div>
                <div className={"modal-overlay" + (this.props.display ? " " : "hide")}></div>
            </>
        )
    }
}

RegisterPlayer.defaultProps = { 
    display: true
}

export default RegisterPlayer;