import React, { Component } from 'react';

class ActiveMonster extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    return (
      <section className="active-monster">
        <div className="monster-icon"></div>
        <div className="monster-health">100 HP</div>
      </section>
    )
  }
}

export default ActiveMonster;
