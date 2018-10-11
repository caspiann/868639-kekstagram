'use strict';

(function () {

  var EFFECT_DEFAULT_VALUE = 100;
  var EFFECT_NONE = 'none';
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

  var effectElements = Array.prototype.slice.call(document.querySelectorAll('.effects__item'));
  var imagePreviewElement = document.querySelector('.img-upload__preview img');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelElement = document.querySelector('.effect-level');
  var uploadPictureOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadPictureElement = document.querySelector('#upload-file');

  var convertValueToScale = function (max, min, value) {
    return ((max - min) * value) / 100 + min;
  };

  var createEffectClickHandler = function (effect) {
    return function () {
      var targetElement = effect.querySelector('input');
      var effectName = targetElement.value;
      var effectPercent = effectLevelLineElement.offsetWidth + 'px';

      imagePreviewElement.style.filter = window.popupFilterStyles.createPreviewFilterStyle(EFFECT_DEFAULT_VALUE);
      imagePreviewElement.classList.remove(imagePreviewElement.classList[0]);
      imagePreviewElement.classList.add('effects__preview--' + effectName);

      effectLevelDepthElement.style.width = effectPercent;
      effectLevelPinElement.style.left = effectPercent;

      if (effectName === EFFECT_NONE) {
        effectLevelElement.classList.add('hidden');
      } else {
        effectLevelElement.classList.remove('hidden');
      }
    };
  };

  uploadPictureElement.addEventListener('change', function () {
    uploadPictureOverlayElement.classList.remove('hidden');
    effectLevelDepthElement.style.width = effectLevelPinElement.style.left = effectLevelLineElement.offsetWidth + 'px';
    effectLevelElement.classList.add('hidden');
  });

  effectElements.forEach(function (effect) {
    effect.addEventListener('click', createEffectClickHandler(effect));
  });

  window.popupFilterStyles = {
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
          return EFFECT_NONE;
      }
    }
  };
})();
