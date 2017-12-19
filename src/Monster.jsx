import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import MonsterInfo from './MonsterInfo';

class Monster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      monster: null
    };
  }

  componentDidMount() {
    // TODO: move to helper function
    fetch(`/monsters/${this.props.match.params.id}`).then(res => {
      res.json().then(data => {
        this.setState({monster: data});
        this.setState({ready: true});
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Monster</h2>
        <div>
          <Link to="/">
            <button>Show All</button>
          </Link>
          { this.state.monster ? <MonsterInfo monster={this.state.monster} />
            : <div /> }
        </div>
      </div>
    );
  }
}

export default Monster;
