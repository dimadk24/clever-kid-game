import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Helpers/Button/Button';
import './SpellWindow.scss';
import '../utils.scss';
import { shouldHandleShortcutEvent } from '../Helpers/utils';

class SpellWindow extends Component {
  constructor(props) {
    super(props);
    this.keyUpCallback = e => this.onKeyUp(e);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.keyUpCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyUpCallback);
  }

  onKeyUp({ code, target }) {
    if (!shouldHandleShortcutEvent(target.tagName)) return;
    const { onAttack, onHeal, healIsActive } = this.props;
    if (code === 'KeyA') onAttack();
    else if (code === 'KeyH' && healIsActive) onHeal();
  }

  render() {
    const { onHeal, onAttack, healIsActive } = this.props;
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
}

SpellWindow.propTypes = {
  onHeal: PropTypes.func.isRequired,
  onAttack: PropTypes.func.isRequired,
  healIsActive: PropTypes.bool.isRequired,
};

export default SpellWindow;
