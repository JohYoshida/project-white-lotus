import React, { Component } from 'react';

class MessageBox extends Component {
  renderMessages(){
    const messages = [];
    this.props.messages.forEach((message, i) => {
      messages.unshift(<p className='message' key={i}>{message}</p>);
    });
    return messages;
  }
  render() {
    return (
      <section className={this.props.className}>
        <section className='column messages-content'>
          {this.renderMessages()}
        </section>
      </section>
    )
  }
}

export default MessageBox;
