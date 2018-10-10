'use strict';
(function () {
  var effectValueElement = document.querySelector('.effect-level__value');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var imagePreviewElement = document.querySelector('.img-upload__preview img');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');

  effectLevelPinElement.addEventListener('mousedown', function (mouseDownEvent) {
    var pinCoordsLeft = effectLevelPinElement.getBoundingClientRect().left;
    var sliderCoordsLeft = effectLevelLineElement.getBoundingClientRect().left;
    var sliderOffsetWidth = effectLevelLineElement.offsetWidth;

    var mouseMoveHandler = function (mouseMoveEvent) {
      var pinOffsetLeftValue = Math.min(
          Math.max(0, mouseMoveEvent.pageX - mouseDownEvent.pageX + pinCoordsLeft - sliderCoordsLeft),
          sliderOffsetWidth
      );

      var effectPercentValue = Math.round((pinOffsetLeftValue / sliderOffsetWidth) * 100);

      effectValueElement.value = effectPercentValue;
      effectLevelPinElement.style.left = pinOffsetLeftValue + 'px';
      effectLevelDepthElement.style.width = effectLevelPinElement.style.left;

      imagePreviewElement.style.filter = window.popupFilterStyles.createPreviewFilterStyle(effectPercentValue);
    };
    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
