'use strict';

(function () {
  var pictureElements = document.querySelector('.pictures');
  var pictureTemplateElement = document.querySelector('#picture');

  var renderPhoto = function (pictureTemplate, pictureData) {
    var pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.content.querySelector('.picture__img').src = pictureData.url;
    pictureElement.content.querySelector('.picture__comments').textContent =
      pictureData.comments.length;
    pictureElement.content.querySelector('.picture__likes').textContent =
      pictureData.likes;
    return pictureElement;
  };

  var renderPhotos = function (parentElement, pictureTemplate, dataOfPictures) {
    var photosFragment = document.createDocumentFragment();
    dataOfPictures.forEach(function (pictureData, index) {
      photosFragment.appendChild(
          renderPhoto(pictureTemplateElement, dataOfPictures[index]).content
      );
    });
    parentElement.appendChild(photosFragment);
  };
  renderPhotos(pictureElements, pictureTemplateElement, window.generatedData.picturesData);
})();
