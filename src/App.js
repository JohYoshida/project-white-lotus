import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Battle from './Battle.jsx';
import Monsters from './Monsters.jsx';
import Monster from './Monster.jsx';
import Store from './Store.jsx'
import Login from './Login.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={loggedin: false};
    this.purchaseEgg = this.purchaseEgg.bind(this);
    this.purchaseCrate = this.purchaseCrate.bind(this);
  }

  login = (state) => {
    fetch(`/users/${state.email}/${state.password}`).then(res => {
      res.json().then(data => {
        if(data!=='Not found'){
          this.setState({loggedin:true});
          this.setState({user:data});
        }
      }).catch((err)=>{
        console.log(`Promise error in generate_user.js${err}`);
      });
    });
  }

  register = (state) => {
    console.log(state);
    fetch(`/create/${state.email}/${state.password}`).then(res => {
      res.json().then(data => {
        if(data!=='Not found'){
          console.log(data);
          this.setState({loggedin:true});
          this.setState({user:data});
        }
      }).catch((err)=>{
        console.log(`Promise error in add_user.js ${err}`);
      });
    });
  }

  clientCharge(cost) {
    this.setState({
      user: { brouzoff: this.state.user.brouzoff - cost }
    });
  }

  fetchNewMonster(event, creature) {
    fetch('/monsters/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({creature: creature, userid: 1})
    }).then(res => {
      res.json().then(data => {
        console.log('New Monster:', data);
      });
    });
  }

  purchaseEgg(event) {
    event.preventDefault();
    this.clientCharge(50);
    this.fetchNewMonster(event, 'kaiju');
  }

  purchaseCrate(event) {
    event.preventDefault();
    this.clientCharge(50);
    this.fetchNewMonster(event, 'mecha');
  }

  render() {
    if(this.state.loggedin){
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
            <Route path="/store" render={(props) => (
              <Store {...props} user={this.state.user} purchaseEgg={this.purchaseEgg} purchaseCrate={this.purchaseCrate}/>
            )} />
            <Route path="/teams" component={ Teams } />
            <Route path="/battle" component={ Battle }/>
          </div>
        </Router>
      );
    } else {
      return (<Login state = {this.state} login = {this.login} register = {this.register}/>);
    }
  }
}

const Teams = () => (
  <div>
    <h2>Teams</h2>
  </div>
);

export default App;
