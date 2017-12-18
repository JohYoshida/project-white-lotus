import React from 'react';

const MonsterInfo = ({monster}) => {
  return (
    <div>
      <p>{monster.name}</p>
      <p>{monster.creature}</p>
      <img src={monster.image_url} alt='monster icon' />
      <p>{monster.hp} HP</p>
      <p>Type: {monster.type.name}</p>
    </div>
  );
};

export default MonsterInfo;
