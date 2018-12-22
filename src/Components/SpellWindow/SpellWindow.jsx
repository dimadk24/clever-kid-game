import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Helpers/Button/Button';
import './SpellWindow.scss';

function SpellWindow({ onHeal, onAttack }) {
  return (
    <div className="spell__window">
      <Button onClick={onHeal} className="heal-button">
        Heal
      </Button>
      <Button onClick={onAttack} className="attack-button">
        Attack
      </Button>
    </div>
  );
}

SpellWindow.propTypes = {
  onHeal: PropTypes.func.isRequired,
  onAttack: PropTypes.func.isRequired,
};

export default SpellWindow;
