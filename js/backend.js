'use strict';

(function () {
  var URL_GET_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND_DATA = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_TIME = 10000;
  var STATUS_OK = 200;

  var makeRequest = function (onLoad, onError) {

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
    return xhr;
  };

  var getData = function (onLoad, onError) {
    var xhr = makeRequest(onLoad, onError);
    xhr.open('GET', URL_GET_DATA);
    xhr.send();
  };

  var sendData = function (data, onSuccess, onError) {
    var xhr = makeRequest(onSuccess, onError);
    xhr.open('POST', URL_SEND_DATA);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };

})();
