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
  var effectDefaultElement = document.querySelector('.effects__item:first-child');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelElement = document.querySelector('.effect-level');
  var imagePreviewElement = document.querySelector('.img-upload__preview img');

  var convertValueToScale = function (max, min, value) {
    return ((max - min) * value) / 100 + min;
  };

  var createEffectClickHandler = function (effectElement) {
    return function () {
      var effectInputElement = effectElement.querySelector('input');
      var effectName = effectInputElement.value;
      var effectValue = effectLevelLineElement.offsetWidth + 'px';

      imagePreviewElement.className = 'effects__preview--' + effectName;
      imagePreviewElement.style.filter = window.popupEffects.createPreviewFilterStyle(EFFECT_DEFAULT_VALUE);

      effectLevelDepthElement.style.width = effectValue;
      effectLevelPinElement.style.left = effectValue;

      if (effectName === EFFECT_NONE) {
        effectLevelElement.classList.add('hidden');
      } else {
        effectLevelElement.classList.remove('hidden');
      }
    };
  };

  var handlers = effectElements.map(function (effectElement) {
    return createEffectClickHandler(effectElement);
  });

  window.popupEffects = {
    activate: function () {
      imagePreviewElement.className = 'effects__preview--' + EFFECT_NONE;
      imagePreviewElement.style.filter = 'none';
      effectLevelElement.classList.add('hidden');
      effectDefaultElement.querySelector('.effects__radio').checked = true;

      effectElements.forEach(function (effectElement, index) {
        effectElement.addEventListener('click', handlers[index]);
      });
    },
    deactivate: function () {
      effectElements.forEach(function (effectElement, index) {
        effectElement.removeEventListener('click', handlers[index]);
      });
    },
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
