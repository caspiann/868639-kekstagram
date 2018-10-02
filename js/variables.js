'use strict';

(function () {
  window.variables = {
    GENERATE_AVATAR_MIN: 1,
    GENERATE_AVATAR_MAX: 6,
    GENERATE_COMMENTS_MIN: 1,
    GENERATE_COMMENTS_MAX: 5,
    GENERATE_LIKES_MIN: 15,
    GENERATE_LIKES_MAX: 200,
    PHOTOS_NUMBER: 25,
    KEY_CODE_ESC: 27,
    VALIDATION_TAGS_LENGTH: 5,
    VALIDATION_TAG_LENGTH: 20,
    EFFECT_DEFAULT_VALUE: 100,
    COMMENTS: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
    DESCRIPTIONS: [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ],
    EFFECTS: {
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
    },
    effectElements: Array.prototype.slice.call(document.querySelectorAll('.effects__item')),
  };
})();
