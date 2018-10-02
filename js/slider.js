'use strict';

(function () {

  window.slider = {
    getMovePinValue: function () {
      window.domElements.effectLevelPinElement.addEventListener('mousedown', function (mouseDownEvent) {
        var pinCoordsLeft = window.domElements.effectLevelPinElement.getBoundingClientRect().left;
        var sliderCoordsLeft = window.domElements.effectLevelLineElement.getBoundingClientRect().left;
        var sliderOffsetWidth = window.domElements.effectLevelLineElement.offsetWidth;

        var mouseMoveHandler = function (mouseMoveEvent) {
          var pinOffsetLeftValue = Math.min(
              Math.max(0, mouseMoveEvent.pageX - mouseDownEvent.pageX + pinCoordsLeft - sliderCoordsLeft),
              sliderOffsetWidth
          );

          var effectPercentValue = Math.round((pinOffsetLeftValue / sliderOffsetWidth) * 100);

          window.domElements.effectValueElement.value = effectPercentValue;
          window.domElements.effectLevelPinElement.style.left = pinOffsetLeftValue + 'px';
          window.domElements.effectLevelDepthElement.style.width = window.domElements.effectLevelPinElement.style.left;

          window.domElements.imagePreviewElement.style.filter = window.filterStyle.createPreviewFilterStyle(effectPercentValue);
        };
        var mouseUpHandler = function () {
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      });
    }
  };
})();
