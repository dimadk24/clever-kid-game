import './index.scss';
import screenSource1 from './images/screenshots/2.png';
import screenSource2 from './images/screenshots/3.png';

function createImg(src, alt) {
  const elem = document.createElement('img');
  elem.src = src;
  elem.alt = alt;
  return elem;
}

const wrapper = document.querySelector('section.screenshots');
const screenshot1 = createImg(screenSource1, 'Clever Kid Game screenshot 1');
const screenshot2 = createImg(screenSource2, 'Clever Kid Game screenshot 2');
wrapper.appendChild(screenshot1);
wrapper.appendChild(screenshot2);
