import React from 'react';
import PropTypes from 'prop-types';
import './HealthBar.scss';


function HealthBar({ number }) {
  return (
    <div className="health-bar">
      <p className="health-bar__text">
        {number}
      </p>
      <div className="health-bar__progress" style={{ left: `${number}%` }} />
    </div>
  );
}

HealthBar.propTypes = {
  number: PropTypes.number.isRequired,
};

export default HealthBar;
