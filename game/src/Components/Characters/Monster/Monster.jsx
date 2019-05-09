import React, { Component } from 'react';
import '../Character.scss';
import './Monster.scss';
import {
  breath,
  BREATH_MIN,
  BREATH_UP,
  clearCanvas,
  getDrawImageFunctionWithContext,
  loadImages,
} from '../../Helpers/canvas';
import { getRandom } from '../../Helpers/utils';

function getRandomId() {
  return getRandom(1, 3);
}

function getPartsIds() {
  return {
    bodyId: getRandomId(),
    headId: getRandomId(),
    armsId: getRandomId(),
  };
}

async function getImages() {
  const { bodyId, headId, armsId } = getPartsIds();
  const { default: body } = await import(`./images/bodies/${bodyId}.png`);
  const { default: head } = await import(`./images/heads/${headId}.png`);
  const { default: arms } = await import(`./images/arms/${armsId}.png`);
  return [
    { name: 'body', src: body },
    { name: 'head', src: head },
    { name: 'arms', src: arms },
  ];
}

function drawMonster(loadedImages, drawImage, breathState) {
  drawImage(loadedImages.arms, 0, 35 + 15 * breathState, 200, 100);
  drawImage(loadedImages.head, 35, 15 * breathState, 130, 110);
  drawImage(loadedImages.body, 0, 108, 200, 150);
}

class Monster extends Component {
  async componentDidMount() {
    const images = await getImages();
    const loadedImages = await loadImages(images);
    const context = document.getElementById('monsterCanvas').getContext('2d');
    const drawImage = getDrawImageFunctionWithContext(context);
    let breathDirection = BREATH_UP;
    let breathState = BREATH_MIN;

    function draw() {
      ({ breathState, breathDirection } = breath({ breathState, breathDirection }));
      clearCanvas(context);
      drawMonster(loadedImages, drawImage, breathState);
      requestAnimationFrame(draw);
    }

    draw();
  }

  render() {
    return (
      <canvas id="monsterCanvas" className="character monster" height="260" width="200" />
    );
  }
}

export default Monster;
