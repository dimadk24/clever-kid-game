import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../Helpers/Button/Button';
import { forEach } from '../../Questions/questionTypes';
import '../../Questions/registrator';
import './ChooseTaskWindow.scss';
import '../../utils.scss';

function ChooseTaskWindow(props) {
  const { onChoose, onClose } = props;
  const questionNames = [];
  forEach((item, name) => questionNames.push(name));
  return (
    <div className="choose-task-window horizontal-center">
      <Button onClick={onClose} className="choose-task-window__close">
        <i className="icon-close" />
      </Button>
      <div className="choose-task-window__tasks">
        {
          questionNames.map(
            name => <Button onClick={() => onChoose(name)} key={name}>{name}</Button>,
          )
        }
      </div>
    </div>
  );
}

ChooseTaskWindow.propTypes = {
  onChoose: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChooseTaskWindow;
