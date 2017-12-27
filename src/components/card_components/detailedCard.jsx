import React from 'react';
import cardImageHeader from './cardImageHeader.jsx';
import cardInfo from './cardInfo.jsx';
import attackDetails from './attackDetails.jsx';

const detailedCard = (monster) => {
  /* @TODO make a function that generates the attack descriptions. */
  return (
    <div class="card-full">
      {cardImageHeader(monster)}
      {cardInfo(monster)}
      {attackDetails(monster)}
    </div>
  );
};

export default detailedCard;
