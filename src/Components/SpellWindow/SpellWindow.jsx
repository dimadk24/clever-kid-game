import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Helpers/Button/Button';
import './SpellWindow.scss';
import '../utils.scss';

function SpellWindow({ onHeal, onAttack, healIsActive }) {
  return (
    <div className="spell__window horizontal-center">
      <Button onClick={onHeal} className="heal-button" disabled={!healIsActive}>
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
  healIsActive: PropTypes.bool.isRequired,
};

export default SpellWindow;
