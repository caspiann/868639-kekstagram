'use strict';

(function () {
  window.filterStyle = {
    convertValueToScale: function (max, min, value) {
      return ((max - min) * value) / 100 + min;
    },
    createPreviewFilterStyle: function (value) {
      switch (window.domElements.imagePreviewElement.getAttribute('class')) {
        case window.variables.EFFECTS.chrome.effect:
          return 'grayscale(' + this.convertValueToScale(window.variables.EFFECTS.chrome.maxValue, window.variables.EFFECTS.chrome.minValue, value) + ')';
        case window.variables.EFFECTS.sepia.effect:
          return 'sepia(' + this.convertValueToScale(window.variables.EFFECTS.sepia.maxValue, window.variables.EFFECTS.sepia.minValue, value) + ')';
        case window.variables.EFFECTS.marvin.effect:
          return 'invert(' + this.convertValueToScale(window.variables.EFFECTS.marvin.maxValue, window.variables.EFFECTS.marvin.minValue, value) + '%)';
        case window.variables.EFFECTS.phobos.effect:
          return 'blur(' + this.convertValueToScale(window.variables.EFFECTS.phobos.maxValue, window.variables.EFFECTS.phobos.minValue, value) + 'px)';
        case window.variables.EFFECTS.heat.effect:
          return 'brightness(' + this.convertValueToScale(window.variables.EFFECTS.heat.maxValue, window.variables.EFFECTS.heat.minValue, value) + ')';
        default:
          return 'none';
      }
    }
  };
})();
