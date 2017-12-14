import React, { Component } from 'react';

class Bench extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <aside class="bench">
        <section class="bench-monster">
          <div class="monster-icon"></div>
          <div class="monster-health">100 HP</div>
        </section>

        <section class="bench-monster">
          <div class="monster-icon"></div>
          <div class="monster-health">100 HP</div>
        </section>
      </aside>
    )
  }
}

export default Bench;
