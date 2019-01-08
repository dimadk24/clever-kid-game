import React from 'react';
import CalculateTimeQuestion from './CalculateTimeQuestion/CalculateTimeQuestion';
import CapitalQuestion from './CapitalQuestion/CapitalQuestion';
import ChooseImageQuestion from './ChooseImageQuestion/ChooseImageQuestion';
import CountryQuestion from './CountryQuestion/CountryQuestion';
import GreaterLessOrEqualQuestion from './GreaterLessOrEqualQuestion/GreaterLessOrEqualQuestion';
import ImageQuestion from './ImageQuestion/ImageQuestion';
import ListeningQuestion from './ListeningQuestion/ListeningQuestion';
import LogoQuestion from './LogoQuestion/LogoQuestion';
import MathQuestion from './MathQuestion/MathQuestion';
import MissedSignQuestion from './MissedSignQuestion/MissedSignQuestion';
import MissedWordQuestion from './MissedWordQuestion/MissedWordQuestion';
import NumberToStringQuestion from './NumberToStringQuestion/NumberToStringQuestion';
import TranslateQuestion from './TranslateQuestion/TranslateQuestion';
import TrueFalseQuestion from './TrueFalseQuestion/TrueFalseQuestion';

function mapTaskToQuestion(task, baseOptions) {
  const props = { ...baseOptions };
  switch (task.type) {
    case 'math':
      props.sign = task.sign;
      props.operands = task.operands;
      return <MathQuestion {...props} />;
    case 'listening':
      props.name = task.name;
      return <ListeningQuestion {...props} />;
    case 'translate':
      props.word = task.word;
      props.toLang = task.toLang;
      return <TranslateQuestion {...props} />;
    case 'image':
      props.name = task.name;
      return <ImageQuestion {...props} />;
    case 'logo':
      props.name = task.name;
      return <LogoQuestion {...props} />;
    case 'capital':
      props.country = task.country;
      return <CapitalQuestion {...props} />;
    case 'country':
      props.capital = task.capital;
      return <CountryQuestion {...props} />;
    case 'trueFalse':
      props.question = task.question;
      return <TrueFalseQuestion {...props} />;
    case 'greaterLessOrEqual':
      props.operands = task.operands;
      return <GreaterLessOrEqualQuestion {...props} />;
    case 'missedWord':
      props.parts = task.parts;
      props.suggestions = task.suggestions;
      return <MissedWordQuestion {...props} />;
    case 'missedSign':
      props.operands = task.operands;
      props.equals = task.equals;
      return <MissedSignQuestion {...props} />;
    case 'numberToString':
      props.number = task.number;
      return <NumberToStringQuestion {...props} />;
    case 'chooseImage':
      props.object = task.object;
      props.suggestions = task.suggestions;
      return <ChooseImageQuestion {...props} />;
    case 'calculateTime':
      props.hours = task.hours;
      props.minutes = task.minutes;
      return <CalculateTimeQuestion {...props} />;
    default:
      throw new Error(`Wrong task type: ${task.type}`);
  }
}

export default mapTaskToQuestion;
