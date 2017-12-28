import React, { Component } from 'react';
// This will throw warning 'Route is defined but never used'
// but it's required for routing between monsters#index and monsters#show
import { BrowserRouter as Route, Link } from 'react-router-dom';
import MonsterInfo from './components/MonsterInfo';

class Monster extends Component {

  constructor(props) {
    super(props);
    this.deleteMonster = this.deleteMonster.bind(this);
    this.state = {
      monster: null
    };
  }

  componentDidMount() {
    fetch(`/monsters/${this.props.match.params.id}`).then(res => {
      res.json().then(data => {
        this.setState({monster: data});
        this.props.loadApp();
      });
    });
  }

  deleteMonster(event) {
    const monsterId = event.target.dataset.id;
    fetch(`/monsters/${monsterId}`, {
      method: 'delete'
    }).then(res => {
      res.json().then((data) => {
        console.log(data.flash);
      })
    });
  }

  render() {
    return (
      <div>
        <h2>Monster</h2>
        <div className='container'>
          {this.state.monster && <div className='monster'>
            <Link to="/">
              <button className='show-monster'>Show All</button>
            </Link>
            <MonsterInfo monster={this.state.monster} />
            <Link to="/">
              <button onClick={this.deleteMonster} data-id={this.state.monster.id}>Delete Monster</button>
            </Link>
          </div>}
        </div>
      </div>
    );
  }
}

export default Monster;
