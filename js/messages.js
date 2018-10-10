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

  var createSendError = function (message) {
    var successButtonClickHandler = function () {
      closePopupHandler(successPopupElement);
    };

    var documentKeydownHandler = function (evt) {
      if (evt.keyCode === KEY_CODE_ESC) {
        closePopupHandler(successPopupElement);
      }
    };

    var documentClickHandler = function (evt) {
      evt.stopPropagation();
      if (evt.target === successPopupElement) {
        closePopupHandler(successPopupElement);
      }
    };

    var closePopupHandler = function (popup) {
      popup.parentNode.removeChild(popup);
      successButtonElement.removeEventListener('click', successButtonClickHandler);
      document.removeEventListener('keydown', documentKeydownHandler);
      document.removeEventListener('click', documentClickHandler);
    };

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
    var successPopupElement = mainElement.querySelector('.success');
    var successButtonElement = mainElement.querySelector('.success__button');


    successButtonElement.addEventListener('click', successButtonClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  window.messages = {
    createError: createPopupError,
    createFailedSend: createSendError,
    createSuccessSend: createSendError,
  };
})();
