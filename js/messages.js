'use strict';

(function () {
  var ERROR_POPUP_TIMEOUT = 3000;
  var KEY_CODE_ESC = 27;

  var errorBlockStyles = 'display: flex; justify-content: center; background: #EFFF00; color: #FF0000; width: 100%; padding: 5px 0; position: absolute; font-size: 20px';
  var mainElement = document.querySelector('main');
  var popupSuccessTemplate = document.querySelector('#success');
  var popupFailedTemplate = document.querySelector('#error');

  var createErrorLoad = function (message) {
    var errorElement = document.createElement('div');
    errorElement.style = errorBlockStyles;
    errorElement.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorElement);

    setTimeout(function () {
      errorElement.parentNode.removeChild(errorElement);
    }, ERROR_POPUP_TIMEOUT);
  };

  var createDocumentKeydownHandler = function (popupElement, closePopup) {
    return function (evt) {
      if (evt.keyCode === KEY_CODE_ESC) {
        closePopup(popupElement);
      }
    };
  };

  var createDocumentClickHandler = function (popupElement, closePopup) {
    return function (evt) {
      evt.stopPropagation();
      if (evt.target === popupElement) {
        closePopup(popupElement);
      }
    };
  };

  var createPopupMessage = function (popupElementTemplate) {
    return function () {
      var popupElement = popupElementTemplate.content.firstElementChild.cloneNode(true);
      var popupButtonElements = popupElement.querySelectorAll('button');
      var popupButtonClickHandler = function () {
        closePopup();
      };

      var closePopup = function () {
        mainElement.removeChild(popupElement);
        popupButtonElements.forEach(function (buttonElement) {
          buttonElement.removeEventListener('click', popupButtonClickHandler);
        });
        document.removeEventListener('keydown', documentKeydownHandler);
        document.removeEventListener('click', documentClickHandler);
      };

      var documentKeydownHandler = createDocumentKeydownHandler(popupElement, closePopup);
      var documentClickHandler = createDocumentClickHandler(popupElement, closePopup);

      mainElement.appendChild(popupElement);

      popupButtonElements.forEach(function (buttonElement) {
        buttonElement.addEventListener('click', popupButtonClickHandler);
      });
      document.addEventListener('keydown', documentKeydownHandler);
      document.addEventListener('click', documentClickHandler);
    };
  };

  window.messages = {
    createErrorLoad: createErrorLoad,
    createFailedSend: createPopupMessage(popupFailedTemplate),
    createSuccessSend: createPopupMessage(popupSuccessTemplate),
  };
})();
