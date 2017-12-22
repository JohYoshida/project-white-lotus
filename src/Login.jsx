import React, { Component } from 'react';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {register:false};
    this.toggle = this.toggle.bind(this);
  }
  toggle(event){
    if(this.state.register){
      this.setState({register:false, buttontxt:"Login"});
    }else{
      this.setState({register:true, buttontxt:"Sign up"});
    }
  }
  render() {
    return (
      <div>
        <div hidden={this.state.register}>
          <h4>Login</h4>
          <form id="loginForm">
            <label>Username</label>
            <input id='username' type='text'/>
            <label>Password</label>
            <input id='password' type='password' />
            <button onClick={this.props.login}>Submit</button>
          </form>
          <p>Or</p>
          <button onClick={this.toggle}>Sign Up</button>
        </div>
        <div hidden={!this.state.register}>
          <h4>Register</h4>
          <form id="registerForm">
            <label>Username</label>
            <input id='username' type='text'/>
            <label>Password</label>
            <input id='password' type='password' />
            <button onClick={this.props.register}>Submit</button>
          </form>
          <p>Or</p>
          <button onClick={this.toggle}>Login</button>
        </div>
      </div>
    );
  }
}


export default Login;
