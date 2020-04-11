import React from 'react';
import Firebase from 'firebase/app';

class Scoreboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            tops: []
        };
    }

    onPlayerChanged = () => {

        var playersRef = Firebase.database().ref('players');
        playersRef.on('child_added', data => {
            var players = this.state.players;
            players.push(Object.assign({}, data.val(), {key: data.key}));
            var tops = this.getScoreboardData(players);
            this.setState({players: [...players], tops: tops});
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
            var tops = this.getScoreboardData(players);
            this.setState({players: [...players], tops: tops});
        });
    }

    compare( a, b ) {
        if ( !a.score || a.score < b.score ){
          return 1;
        }
        if ( !b.score || a.score > b.score ){
          return -1;
        }
        return 0;
    }

    getScoreboardData = players => {
        // sort by score
        players.sort(this.compare);
        // set ranks
        var tops = players.slice(0, 5).map((item, i) => { return Object.assign({}, item, {rank: i + 1})});
        var isCurrentPlayerInTops = tops.filter(top => { return top.key === this.props.playerKey}).length;
        if (this.props.playerKey && !isCurrentPlayerInTops) {

            // add current player
            let curRank = -1;
            var curPlayer = players
                .filter((p, index) => { 
                    if (p.key === this.props.playerKey) {
                        curRank = index + 1;
                        return true;
                    }
                })[0];

            // add sencond top players
            if (curRank > 6) {
                tops.push({key:'dummy1', name: '...', rank: ''});
            }

            tops.push(Object.assign({}, curPlayer, {rank: curRank}));

            // lowest rank players
            if (players.length > curRank) {
                if (players.length > curRank + 1){
                    tops.push({key:'dummy2', name: '...', rank: ''});
                }
                tops.push(Object.assign({}, players[players.length - 1], {rank: players.length}));
            }
        } else {
            if (players.length == 6) {
                tops.push(Object.assign({}, players[players.length - 1], {rank: players.length}));
            } else if (players.length > 6) {
                tops.push({key:'dummy1', name: '...', rank: ''});
                tops.push(Object.assign({}, players[players.length - 1], {rank: players.length}));
            }
        }
        
        return tops;
    }

    componentDidMount = () => {
        this.onPlayerChanged();
    }
    
    render() {
        return (
            <div className="score-board">
                <table className="ui small table striped">
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th className="center aligned">Score</th>
                        <th>Date</th>
                        {/* <th>Winner</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tops.map((player, i) => {
                            return (
                                <tr key={player.key} className={this.props.playerKey === player.key ? 'positive' : ''}>
                                    <td className="collapsing">{player.rank}</td>
                                    <td>{player.name}</td>
                                    <td className="center aligned">{player.score}</td>
                                    <td>{player.date}</td>
                                    {/* <td>{player.won}</td> */}
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