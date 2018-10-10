'use strict';

(function () {
  var URL_GET_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL_POST_DATA = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_TIME = 1000;
  var STATUS_OK = 200;

  var createRequest = function (url, method) {
    return function (onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError('Error! Request status: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Connection error');
      });

      xhr.addEventListener('timeout', function () {
        onError('The request failed to complete in ' + xhr.timeout + 'ms');
      });

      xhr.timeout = TIMEOUT_TIME;

      xhr.open(method, url);
      xhr.send(data);
    };
  };

  window.backend = {
    getData: createRequest(URL_GET_DATA, 'GET'),
    sendData: createRequest(URL_POST_DATA, 'POST')
  };
})();
