'use strict';

(function () {

  var uploadPictureElement = document.querySelector('#upload-file');
  var uploadPictureOverlayElement = document.querySelector('.img-upload__overlay');
  uploadPictureElement.addEventListener('change', function () {
    showPopup();
  });

  var showPopup = function () {
    uploadPictureOverlayElement.classList.remove('hidden');

    window.popupForm.activate();
    window.popupScale.activate();
    window.popupSlider.activate();
    window.popupEffects.activate();
  };

  var hidePopup = function () {
    uploadPictureOverlayElement.classList.add('hidden');

    window.popupForm.deactivate();
    window.popupScale.deactivate();
    window.popupSlider.deactivate();
    window.popupEffects.deactivate();
  };
  window.popup = {
    show: showPopup,
    hide: hidePopup
  };
})();
