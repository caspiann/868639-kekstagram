'use strict';

(function () {

  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var STEP = 25;

  var imgPreviewElement = document.querySelector('.img-upload__preview');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlValueElement = document.querySelector('.scale__control--value');

  scaleControlValueElement.value = MAX_VALUE + '%';
  imgPreviewElement.style.transform = 'scale(' + MAX_VALUE / 100 + ')';

  var changePictureScale = function (scaleValue) {
    var currentScale = parseInt(scaleControlValueElement.value, 10);
    currentScale = currentScale + (scaleValue);

    if (currentScale >= MIN_VALUE && currentScale <= MAX_VALUE) {
      scaleControlValueElement.value = currentScale + '%';
      imgPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };

  scaleControlBiggerElement.addEventListener('click', function () {
    changePictureScale(STEP);
  });

  scaleControlSmallerElement.addEventListener('click', function () {
    changePictureScale(-STEP);
  });

})();
