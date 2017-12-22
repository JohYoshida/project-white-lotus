import React, { Component } from 'react';
// This will throw warning 'Route is defined but never used'
// but it's required for routing between monsters#index and monsters#show
import { BrowserRouter as Route, Link } from 'react-router-dom';
import MonsterInfo from './MonsterInfo';
import './Monsters.css';

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
        <div className='container'>
          <div className='monster'>
            <Link to="/">
              <button className='show-monster'>Show All</button>
            </Link>
            { this.state.monster ? <MonsterInfo monster={this.state.monster} />
            : <div /> }
          </div>
        </div>
      </div>
    );
  }
}

export default Monster;
