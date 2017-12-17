import React, { Component } from 'react';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, id:1};
    this.joinGame = () => {
      this.setState({ready:true});
      this.socket = new WebSocket('ws://localhost:3001/battles/1');
      this.socket.addEventListener('open', () => {
        /* @TODO: Make this.state.id a prop passed down from app. */
        this.socket.send(JSON.stringify({team:'123', userid: this.state.id}));
      });
      this.socket.addEventListener('message', (event) => {
        console.log(event.data);
        this.setState({players: JSON.parse(event.data)});
        this.setState({ready:true})
      });
    };
    this.sendAttack = this.sendAttack.bind(this);
  }
  sendMessage(message){
    this.state.socket.send(JSON.parse(message));
  }
  sendAttack(event){
    const attackName = event.target.dataset.name;
    this.sendMessage({attack:attackName, options:null});
  }
  render() {
    return (
      <main>
        {!this.state.ready && <button onClick={this.joinGame}>Join</button>}
        {this.state.ready &&
          <section>
            <h2>Gojira</h2>
            <button data-name="scratch" onClick={this.sendAttack}>Scratch</button>
            <button data-name="scratch" onClick={this.sendAttack}>Scratch</button>
          </section>
        }
      </main>
    );
  }
}

export default Battle;
