import React from 'react';
import PropTypes from 'prop-types';
import './CharacterHealth.scss';


function CharacterHeath({ number }) {
  return (
    <div className="character__health">
      <p className="character__health__text">
        {number}
      </p>
      <div className="character__health__progress" style={{ left: `${number}%` }} />
    </div>
  );
}

CharacterHeath.propTypes = {
  number: PropTypes.number.isRequired,
};

export default CharacterHeath;
