import React, { Component } from 'react';

const MonsterInfo = ({monster}) => {
  return (
    <div>
      <p>{monster.name}</p>
      <p>{monster.body.creature}</p>
      <img src={monster.body.image_url} alt='monster icon' />
      <p>{monster.body.hp} HP</p>
      <p>Type: {monster.type.name}</p>
    </div>
  )
}

export default MonsterInfo;
