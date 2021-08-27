function loadImages(imagesToLoad) {
  const loadedImages = {};
  const totalImages = imagesToLoad.length;
  let imagesLoaded = 0;
  return new Promise((resolve) => {
    function onImageLoad() {
      imagesLoaded += 1;
      if (imagesLoaded === totalImages) resolve(loadedImages);
    }

    imagesToLoad.forEach((image) => {
      loadedImages[image.name] = new Image();
      loadedImages[image.name].onload = onImageLoad;
      loadedImages[image.name].src = image.src;
    });
  });
}

function getDrawImageFunctionWithContext(context) {
  function drawImage(image, x, y, width, height, angle) {
    if (angle) {
      context.translate(x, y);
      context.rotate(angle * Math.PI / 180);
      context.translate(-x, -y);
    }
    context.drawImage(image, x, y, width, height);
    if (angle) {
      context.translate(x, y);
      context.rotate(-angle * Math.PI / 180);
      context.translate(-x, -y);
    }
  }

  return drawImage;
}


function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

const BREATH_UP = 0;
const BREATH_DOWN = 1;
const BREATH_MIN = 0;
const BREATH_MAX = 1;
const BREATH_INC = 0.01;

function breath({ breathDirection, breathState }) {
  const response = { breathState, breathDirection };
  if (breathDirection === BREATH_UP) {
    response.breathState += BREATH_INC;
    if (breathState >= BREATH_MAX) response.breathDirection = BREATH_DOWN;
  } else {
    response.breathState -= BREATH_INC;
    if (breathState <= BREATH_MIN) response.breathDirection = BREATH_UP;
  }
  return response;
}

export {
  getDrawImageFunctionWithContext,
  clearCanvas,
  loadImages,
  breath,
  BREATH_UP,
  BREATH_MIN,
};
