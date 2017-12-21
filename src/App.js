import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Battle from './Battle.jsx';
import Monsters from './Monsters.jsx';
import Monster from './Monster.jsx';
import Store from './Store.jsx';
import Login from './Login.jsx';
import { instanceOf } from 'prop-types';
import {withCookies,Cookies} from 'react-cookie';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.purchaseEgg = this.purchaseEgg.bind(this);
    this.purchaseCrate = this.purchaseCrate.bind(this);
    this.getBrouzoff = this.getBrouzoff.bind(this);
    this.state = {
      id: '',
      loggedin: false
    };
  }

  componentWillMount() {
    const { cookies } = this.props;
    if(cookies.get('id')){
      this.setState ({ id: cookies.get('id'), loggedin: true });
    }
  }

  getBrouzoff() {
    const { cookies } = this.props;
    if(cookies.get('id')){
      // get Brouzoff
      fetch(`/users/${this.state.id}`).then(res => {
        res.json().then(data => {
          this.setState({brouzoff: data.brouzoff, email: data.email});
        });
      });
    }
  }

  login(event) {
    event.preventDefault();
    const { cookies } = this.props;
    const form = event.target.parentNode;
    const userName = form.elements['username'].value;
    const password = form.elements['password'].value;
    fetch(`/login`, {
      method: 'POST',
      body: encodeURI(`email=${userName}&password=${password}`),
      headers: {
        'content-type' : 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      res.json().then(data => {
        if(!data.error){
            cookies.set('id', data.id, {path: '/'});
            this.setState({ id: cookies.get('id'), loggedin: true });
          }
        }).then(() => {
          this.getBrouzoff();
        }).catch((err)=>{
          console.log('Promise error in generate_user.js', err);
        });
    });
  }

  logout(event) {
    const { cookies } = this.props;
    cookies.remove('id');
    this.setState({ id: null, email: null, loggedin: false, brouzoff: null});
  }

  register(event) {
    event.preventDefault();
    const { cookies } = this.props;
    const form = event.target.parentNode;
    const userName = form.elements['username'].value;
    const password = form.elements['password'].value;
    // Send user info as a post request
    fetch(`/users`, {
      method: 'POST',
      body: encodeURI(`email=${userName}&password=${password}`),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      res.json().then(data => {
        if(!data.error){
            cookies.set('id', data.id, {path: '/'});
            this.setState({ id: cookies.get('id'), loggedin: true });
            this.getBrouzoff();
          }
        }).catch((err)=>{
          console.log('Promise error in generate_user.js', err);
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
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({creature: creature, cost: 50})
    }).then(res => {
      res.json().then(data => {
        this.setState({brouzoff: data.brouzoff});
      });
    });
  }

  purchaseEgg(event) {
    event.preventDefault();
    // this.clientCharge(50);
    this.fetchNewMonster(event, 'kaiju');
  }

  purchaseCrate(event) {
    event.preventDefault();
    // this.clientCharge(50);
    this.fetchNewMonster(event, 'mecha');
  }

  render() {
      const { email } = this.state;
      if (this.state.loggedin){
        return (
          <Router>
            <div>
            <h1>{ email }</h1>
            <Link to="/">
              <button onClick = {this.logout} >Log out</button>
            </Link>
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
                <Store {...props} brouzoff={this.state.brouzoff} purchaseEgg={this.purchaseEgg} purchaseCrate={this.purchaseCrate}/>
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
