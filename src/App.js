import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Battle from './Battle.jsx';
import Monsters from './Monsters.jsx';
import Monster from './Monster.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Monsters</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/battle">Battle</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={ Monsters } />
          <Route path="/monsters/:id" component={ Monster } />
          <Route path="/store" component={ Store } />
          <Route path="/teams" component={ Teams } />
          <Route path="/battle" component={ Battle }/>
        </div>
      </Router>
    );
  }
}

const Store = () => (
  <div>
    <h2>Store</h2>
  </div>
);

const Teams = () => (
  <div>
    <h2>Teams</h2>
  </div>
);

export default App;
