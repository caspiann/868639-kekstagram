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


  window.load('https://js.dump.academy/kekstagram/data', function (response) {
    window.cachePictures = response;
    var photosFragment = document.createDocumentFragment();
    response.forEach(function (pictureData, index) {
      photosFragment.appendChild(
          renderPhoto(pictureTemplateElement, response[index]).content
      );
    });
    pictureElements.appendChild(photosFragment);
  }, function () { });

})();
