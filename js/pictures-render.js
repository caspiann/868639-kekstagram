'use strict';

(function () {
  var pictureElements = document.querySelector('.pictures');
  var pictureTemplateElement = document.querySelector('#picture');
  var photosFragment = document.createDocumentFragment();

  var renderPhoto = function (pictureTemplate, pictureData) {
    var pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.content.querySelector('.picture__img').src = pictureData.url;
    pictureElement.content.querySelector('.picture__comments').textContent =
      pictureData.comments.length;
    pictureElement.content.querySelector('.picture__likes').textContent =
      pictureData.likes;
    return pictureElement;
  };

  window.generatedData.picturesData.forEach(function (pictureData, index) {
    photosFragment.appendChild(
        renderPhoto(pictureTemplateElement, window.generatedData.picturesData[index]).content
    );
  });
  pictureElements.appendChild(photosFragment);
})();
