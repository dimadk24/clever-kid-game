import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

function Button({ children, className = '', ...other }) {
  return (
    <button type="button" className={`button ${className}`} {...other}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
