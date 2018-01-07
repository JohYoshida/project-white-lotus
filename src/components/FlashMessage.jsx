import React, { Component } from 'react';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="flash-message">{this.props.message}</section>
    );
  }
}

export default FlashMessage;
