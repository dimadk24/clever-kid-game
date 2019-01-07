import React from 'react';
import CapitalQuestion from './CapitalQuestion/CapitalQuestion';
import CountryQuestion from './CountryQuestion/CountryQuestion';
import ImageQuestion from './ImageQuestion/ImageQuestion';
import ListeningQuestion from './ListeningQuestion/ListeningQuestion';
import LogoQuestion from './LogoQuestion/LogoQuestion';
import MathQuestion from './MathQuestion/MathQuestion';
import TranslateQuestion from './TranslateQuestion/TranslateQuestion';

function mapTaskToQuestion(task, baseOptions) {
  const props = { ...baseOptions };
  switch (task.type) {
    case 'math':
      props.sign = task.math.sign;
      props.operands = task.math.operands;
      return <MathQuestion {...props} />;
    case 'listening':
      props.name = task.listening.name;
      return <ListeningQuestion {...props} />;
    case 'translate':
      props.word = task.translate.word;
      props.toLang = task.translate.toLang;
      return <TranslateQuestion {...props} />;
    case 'image':
      props.name = task.image.name;
      return <ImageQuestion {...props} />;
    case 'logo':
      props.name = task.logo.name;
      return <LogoQuestion {...props} />;
    case 'capital':
      props.country = task.capital.country;
      return <CapitalQuestion {...props} />;
    case 'country':
      props.capital = task.country.capital;
      return <CountryQuestion {...props} />;
    default:
      throw new Error(`Wrong task type: ${task.type}`);
  }
}

export default mapTaskToQuestion;
