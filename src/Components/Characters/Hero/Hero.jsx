import React, { Component } from 'react';
import {
  breath,
  BREATH_MIN,
  BREATH_UP,
  clearCanvas,
  getDrawImageFunctionWithContext,
  loadImages,
} from '../../Helpers/canvas';
import '../Character.scss';
import './Hero.scss';
import body from './images/body.png';
import head from './images/head.png';
import leftArm from './images/left-arm.png';
import leftLeg from './images/left-leg.png';
import rightArm from './images/right-arm.png';
import rightLeg from './images/right-leg.png';
import shield from './images/shield.png';
import spear from './images/spear.png';


const images = [
  { name: 'body', src: body },
  { name: 'head', src: head },
  { name: 'leftArm', src: leftArm },
  { name: 'leftLeg', src: leftLeg },
  { name: 'rightArm', src: rightArm },
  { name: 'rightLeg', src: rightLeg },
  { name: 'shield', src: shield },
  { name: 'spear', src: spear },
];

function drawHero(loadedImages, drawImage, breathState) {
  drawImage(loadedImages.leftArm, 105, 85 + 10 * breathState, 80, 110);
  drawImage(loadedImages.spear, 310, 145 + 10 * breathState, 30, 200, 80);
  drawImage(loadedImages.leftLeg, 80, 150, 80, 80);
  drawImage(loadedImages.body, 0, 35 + 10 * breathState, 150, 150);
  drawImage(loadedImages.rightLeg, 45, 150, 80, 80);
  drawImage(loadedImages.rightArm, 80, 85 + 10 * breathState, 80, 80, 80);
  drawImage(loadedImages.head, 45, 10 * breathState, 110, 110);
  drawImage(loadedImages.shield, 15, 115 + 10 * breathState, 90, 90);
}

class Hero extends Component {
  async componentDidMount() {
    const loadedImages = await loadImages(images);
    const context = document.getElementById('heroCanvas').getContext('2d');
    const drawImage = getDrawImageFunctionWithContext(context);
    let breathDirection = BREATH_UP;
    let breathState = BREATH_MIN;

    function draw() {
      ({ breathState, breathDirection } = breath({ breathState, breathDirection }));
      clearCanvas(context);
      drawHero(loadedImages, drawImage, breathState);
      requestAnimationFrame(draw);
    }

    draw();
  }

  render() {
    return (
      <canvas id="heroCanvas" className="character hero" height="230" width="330" />
    );
  }
}

export default Hero;
