'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Connection error');
    });

    xhr.addEventListener('timeout', function () {
      onError('The request failed to complete in ' + xhr.timeout + 'ms');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
