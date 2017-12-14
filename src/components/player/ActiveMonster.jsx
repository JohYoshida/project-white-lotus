import React, { Component } from 'react';

class ActiveMonster extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section class="active-monster">
        <div class="monster-icon"></div>
        <div class="monster-health">100 HP</div>
      </section>
    )
  }
}

export default ActiveMonster;
