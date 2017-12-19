import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      register:false,
      buttontxt:"Sign up"
    }
  }
  toggle = (event) =>{
    if(this.state.register){
    this.setState({register:false,buttontxt:"Login"});
    }else{
      this.setState({register:true,buttontxt:"Sign up"});
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
      <div >
        <div hidden = {this.state.register}>
          Login
          <br/>
          <label>
          Email:
          <input onChange  = {this.changeEmail} />
          </label>
          <br/>
          <label>
          Password
          <input type = "password" onChange = {this.changePass} />
          </label>

          <button onClick={(event )=> this.login(event)}>Submit</button>
           Or
          <button onClick = {(event)=> this.toggle(event)}>Sign Up</button>
          </div>

          <br/>

          <div hidden = {!this.state.register }>
            <button onClick = {(event)=> this.toggle(event)}>Login</button>
            <br/>
            Please input your email and password
            <br/>
          <label>
          Email:
          <input onChange  = {this.changeEmail} />
          </label>
          <br/>
          <label>
          Password
          <input type = "password" onChange = {this.changePass} />
          </label>
          <br/>
           <button onClick={(event )=> this.props.register(this.state)}>Submit</button>
          </div>
          </div>
    );
  }
}


export default Login;
