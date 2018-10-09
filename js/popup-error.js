'use strict';

(function () {
  var ERROR_POPUP_TIMEOUT = 3000;
  var KEY_CODE_ESC = 27;
  var errorBlockStyles = 'display: flex; justify-content: center; background: #EFFF00; color: #FF0000; width: 100%; padding: 5px 0; position: absolute; font-size: 20px';
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var mainElement = document.querySelector('main');


  var createPopupError = function (message) {
    var errorElement = document.createElement('div');
    errorElement.style = errorBlockStyles;
    errorElement.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorElement);

    setTimeout(function () {
      errorElement.parentNode.removeChild(errorElement);
    }, ERROR_POPUP_TIMEOUT);

  };

  var closePopupHandler = function (popup) {
    popup.parentNode.removeChild(popup);
  };

  var createSendError = function (message) {
    if (!message) {
      mainElement.appendChild(errorTemplate);
      var errorPopupElement = mainElement.querySelector('.error');
      var errorButtonsElement = mainElement.querySelectorAll('.error__button');

      errorButtonsElement.forEach(function (button) {
        button.addEventListener('click', function () {
          closePopupHandler(errorPopupElement);
        });
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEY_CODE_ESC) {
          closePopupHandler(errorPopupElement);
        }
      });

      document.addEventListener('click', function (evt) {
        evt.stopPropagation();
        if (evt.target === errorPopupElement) {
          closePopupHandler(errorPopupElement);
        }
      });
    }
    mainElement.appendChild(successTemplate);
    var successButtonElement = mainElement.querySelector('.success__button');
    var successPopupElement = mainElement.querySelector('.success');

    successButtonElement.addEventListener('click', function () {
      closePopupHandler(successPopupElement);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE_ESC) {
        closePopupHandler(successPopupElement);
      }
    });

    document.addEventListener('click', function (evt) {
      evt.stopPropagation();
      if (evt.target === successPopupElement) {
        closePopupHandler(successPopupElement);
      }
    });
  };

  // var destroyPopupError = function () {

  // };

  window.popupError = {
    createLoadError: createPopupError,
    createSendError: createSendError,
  };
})();
