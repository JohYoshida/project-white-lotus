import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Battle from './Battle.jsx';
import Monsters from './Monsters.jsx';
import Monster from './Monster.jsx';
import Store from './Store.jsx'
import Login from './Login.jsx'
import { instanceOf } from 'prop-types';
import {withCookies,Cookies} from 'react-cookie';
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state={ loggedin: false };
    this.purchaseEgg = this.purchaseEgg.bind(this);
    this.purchaseCrate = this.purchaseCrate.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    if (cookies.get('id')){
      this.setState ({ id: cookies.get('id'), loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
  }

  login = (state) => {
    const { cookies } = this.props;
    fetch(`/users/${state.email}/${state.password}`).then(res => {
      res.json().then(data => {
        if (data!=='Not found'){
          cookies.set('id', data.id, { path:'/' });
          this.setState({ loggedin: true, user: data, id: data.id });
        }
      }).catch((err)=>{
        console.log(`Promise error in generate_user.js ${err}`);
      });
    });
  }
  logout = (event)=>{
    const { cookies } = this.props;
    cookies.remove('id');
    this.setState({loggedin:false,id:""});
  }

  register = (state) => {
    const { cookies } = this.props;
    console.log(state);
    fetch(`/create/${state.email}/${state.password}`).then(res => {
      res.json().then(data => {
        if (data !== 'Not found'){
          cookies.set('id', data.id, { path:'/' });
          this.setState({ loggedin: true, user: data, id: data.id  });
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
    const { id } = this.state;
    if (this.state.loggedin) {
      return(
        <Router>
          <div>
            <h1> {id}</h1>
            <button onClick = {(event)=> this.logout(event)} >Log out</button>
            <div hidden={!this.state.loggedin}>
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
          </div>
        </Router>
      );
    } else {
      return(
        <Login
          state = {this.state}
          login = {this.login}
          register = {this.register}
          hidden = {this.state.loggedin}
        />);
    }
  }
}

const Teams = () => (
  <div>
    <h2>Teams</h2>
  </div>
);

export default withCookies(App);
