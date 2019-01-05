import React, { Component } from 'react';
import { clearCanvas, getDrawImageFunctionWithContext, loadImages } from '../../Helpers/canvas';
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

function drawHero(loadedImages, drawImage) {
  drawImage(loadedImages.leftArm, 105, 90, 80, 110);
  drawImage(loadedImages.spear, 320, 150, 30, 200, 80);
  drawImage(loadedImages.leftLeg, 80, 150, 80, 80);
  drawImage(loadedImages.body, 0, 40, 150, 150);
  drawImage(loadedImages.rightLeg, 45, 150, 80, 80);
  drawImage(loadedImages.rightArm, 70, 90, 80, 80, 80);
  drawImage(loadedImages.head, 40, 0, 110, 110);
  drawImage(loadedImages.shield, 10, 120, 90, 90);
}


class Hero extends Component {
  async componentDidMount() {
    const loadedImages = await loadImages(images);
    const context = document.getElementById('heroCanvas').getContext('2d');
    const drawImage = getDrawImageFunctionWithContext(context);

    function draw() {
      clearCanvas(context);
      drawHero(loadedImages, drawImage);
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
