import React from 'react';


const cardImageHeader = (monster) => {
  return (
    <div class="card-image-header">
      <img src={monster.image_url} alt={monster.name} />
    </div>
  );
};

export default cardImageHeader;
