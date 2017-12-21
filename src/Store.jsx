import React, { Component } from 'react';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state={ready: false}
  }

  componentDidMount() {
    if (this.props.brouzoff) {
      this.setState({ready: true})
    }
  }

  render() {
    return (
      <div>
        <h2>Store</h2>
        <p>You have &#3647;{this.state.ready && this.props.brouzoff}</p>
        <div className="egg">
          <h4>Kaiju Egg</h4>
          <p className="price">&#3647;50</p>
          <div className="hidden">
          </div>
          <button onClick={this.props.purchaseEgg}>Purchase</button>
        </div>
        <div className="crate">
          <h4>Mech Crate</h4>
          <p className="price">&#3647;50</p>
          <button onClick={this.props.purchaseCrate}>Purchase</button>
        </div>
      </div>
    );
  }
};

export default Store;
