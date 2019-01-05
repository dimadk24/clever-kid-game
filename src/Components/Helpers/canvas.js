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

export { getDrawImageFunctionWithContext, clearCanvas, loadImages };
