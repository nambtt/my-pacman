import React from 'react';
import Firebase from 'firebase/app';

class Scoreboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }

    onPlayerChanged = () => {

        function compare( a, b ) {
            if ( a.score < b.score ){
              return 1;
            }
            if ( a.score > b.score ){
              return -1;
            }
            return 0;
          }

        var playersRef = Firebase.database().ref('players');
        playersRef.on('child_added', data => {
            var players = this.state.players;
            players.push(Object.assign({}, data.val(), {key: data.key}));
            players.sort(compare);
            this.setState({players: players});
        });

        playersRef.on('child_changed', data => {
            var players = this.state.players;
            players.forEach(function(p) {
                if (p.key === data.key) {
                    p.score = data.val().score;
                    p.date = data.val().date;
                    p.won = data.val().won;
                }
            });
            players.sort(compare);
            this.setState({players: [...players]});
        });
    }

    componentDidMount = () => {

        this.onPlayerChanged();

        if (this.state.players.length)
            return;
        // Firebase.database().ref('players')
        //     .orderByChild('score')
        //     //.limitToLast(5)
        //     .once('value', (snapshot) => {
        //         var players = [];
        //         //var inTopPlayers = false;
        //         snapshot.forEach(player => {
        //             // if (this.props.playerKey === player.key){
        //             //     inTopPlayers = true;
        //             // }
        //             players.push(Object.assign({}, player.val(), {key: player.key}));
        //         });
        //         this.setState({players: players});
        //         // if (!inTopPlayers) {
        //         //     players.push({key:'dummy1', name: '...'});
        //         //     Firebase.database().ref('players/' + this.props.playerKey)
        //         //         .once('value', curPlayerSnapshot => {
        //         //             players.push(Object.assign({}, curPlayerSnapshot.val(), {key: curPlayerSnapshot.key}));
        //         //             players.push({key:'dummy2', name: '...'});
        //         //             this.setState({players: players});
        //         //         });
        //         // } else {
        //         //     this.setState({players: players});
        //         // }
                
        //     });
    }
    
    render() {
        return (
            <div className="score-board">
                <table className="ui single line table">
                    <thead>
                        <tr>
                        <th></th>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.players.map((player, i) => {
                            return (
                                <tr key={player.key} className={this.props.playerKey === player.key ? 'positive' : ''}>
                                <td>{i}</td>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td>{player.date}</td>
                                <td>{player.won}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

Scoreboard.defaultProps = { 
    display: false
}

export default Scoreboard;