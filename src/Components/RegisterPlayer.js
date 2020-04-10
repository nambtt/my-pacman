import React from 'react';

class RegisterPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            playerName: '',
            secret: '',
        };
    }

    onFormSubmit = (e) => { 
        e.preventDefault();
        if (this.state.playerName) {
            this.props.startGame({playerName: this.state.playerName, secret: this.state.secret});
        }
    }
    
    render() {
        return (
            <>
                <div id="registerModal" className={"modal-content " + (this.props.display ? "": " hide ")}>
                    <h2 className="ui header">Register Your Name</h2>
                    <form onSubmit={this.onFormSubmit} className={"ui form "}>
                        
                        <div className="field">
                            <div className="ui input"><input type="text" placeholder="You name..." value={this.state.playerName} onChange={e => this.setState({playerName: e.target.value})}/></div>
                        </div>
                        <div className="field">
                            <div className="ui input"><input type="text" placeholder="Random secret..." value={this.state.secret} onChange={e => this.setState({secret: e.target.value})}/></div>
                        </div>
                        <button className="ui button primary save-btn" onClick={this.savePlayerName}>Play</button>
                        
                    </form>
                </div>
                <div className={"modal-overlay" + (this.props.display ? " " : " hide ")}></div>
            </>
        )
    }
}

RegisterPlayer.defaultProps = { 
    display: true
}

export default RegisterPlayer;