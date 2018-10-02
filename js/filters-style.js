'use strict';

(function () {
  var imagePreviewElement = document.querySelector('.img-upload__preview img');

  var EFFECTS = {
    none: {
      effect: 'effects__preview--none'
    },
    chrome: {
      effect: 'effects__preview--chrome',
      minValue: 0,
      maxValue: 1
    },
    sepia: {
      effect: 'effects__preview--sepia',
      minValue: 0,
      maxValue: 1
    },
    marvin: {
      effect: 'effects__preview--marvin',
      minValue: 0,
      maxValue: 100
    },
    phobos: {
      effect: 'effects__preview--phobos',
      minValue: 0,
      maxValue: 3
    },
    heat: {
      effect: 'effects__preview--heat',
      minValue: 1,
      maxValue: 3
    }
  };

  var convertValueToScale = function (max, min, value) {
    return ((max - min) * value) / 100 + min;
  };

  window.filterStyle = {
    createPreviewFilterStyle: function (value) {
      switch (imagePreviewElement.getAttribute('class')) {
        case EFFECTS.chrome.effect:
          return 'grayscale(' + convertValueToScale(EFFECTS.chrome.maxValue, EFFECTS.chrome.minValue, value) + ')';
        case EFFECTS.sepia.effect:
          return 'sepia(' + convertValueToScale(EFFECTS.sepia.maxValue, EFFECTS.sepia.minValue, value) + ')';
        case EFFECTS.marvin.effect:
          return 'invert(' + convertValueToScale(EFFECTS.marvin.maxValue, EFFECTS.marvin.minValue, value) + '%)';
        case EFFECTS.phobos.effect:
          return 'blur(' + convertValueToScale(EFFECTS.phobos.maxValue, EFFECTS.phobos.minValue, value) + 'px)';
        case EFFECTS.heat.effect:
          return 'brightness(' + convertValueToScale(EFFECTS.heat.maxValue, EFFECTS.heat.minValue, value) + ')';
        default:
          return 'none';
      }
    }
  };
})();
