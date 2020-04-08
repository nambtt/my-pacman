import React from 'react';
import Firebase from "firebase/app";

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
            Firebase.database().ref('/players').push({name: this.state.playerName});
            this.props.startGame(this.state.playerName);
        }
    }
    
    render() {
        return (
            <form onSubmit={this.onFormSubmit} className={this.props.display ? "": "hide"}>
                <div className={"modal-content " + (this.props.display ? " " : "hide")}>
                    <h2>Register Your Name</h2>
                    <br />
                    <input type="text" value={this.state.playerName} onChange={e => this.setState({playerName: e.target.value})}></input>
                    <button className="save-btn" onClick={this.savePlayerName}>Play</button>
                </div> 
                <div className={"modal-overlay" + (this.props.display ? " " : "hide")}></div>
            </form>
        )
    }
}

RegisterPlayer.defaultProps = { 
    display: true
}

export default RegisterPlayer;