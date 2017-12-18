import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:""
    }
  }

  login = (event) =>{
    console.log(this.state)
    this.props.login(this.state);
  }
  changeEmail = (e) =>{
    this.setState({email:e.target.value});
  }
  changePass = (e) =>{
    this.setState({password:e.target.value});
  }
  render() {
    return (

        <div>
          <label>
          Email:
          <input onChange  = {this.changeEmail} />
          </label>
          <label>
          Password
          <input type = "password" onChange = {this.changePass} />
          </label>

          <button onClick={(event )=> this.login(event)}>Submit</button>
          </div>
    );
  }
}

export default Login;
