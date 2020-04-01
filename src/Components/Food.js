import React from 'react';
import ReactDOM from 'react-dom';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            hidden: false
        }
    }

    componentDidMount() {

    }

    ate() {
        this.setState({hidden: true});
    }

    render() {
        return (
            <div className={"food" + (this.state.hidden ? " hidden " : "")} style={this.state.position}>
                <div className="effective-food"></div>
            </div>
        )
    }
}

export default Food;