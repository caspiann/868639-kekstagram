'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var PHOTOS_NUMBER = 25;
var GENERATE_COMMENTS_MIN = 1;
var GENERATE_COMMENTS_MAX = 5;
var GENERATE_AVATAR_MIN = 1;
var GENERATE_AVATAR_MAX = 6;
var GENERATE_LIKES_MIN = 15;
var GENERATE_LIKES_MAX = 200;
var KEY_CODE_ESC = 27;
var VALIDATION_TAGS_LENGTH = 5;
var VALIDATION_TAG_LENGTH = 20;
var EFFECT_DEFAULT_VALUE = 100;

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

var generateNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var generateComments = function () {
  var total = generateNumber(GENERATE_COMMENTS_MIN, GENERATE_COMMENTS_MAX);
  var clonedComments = COMMENTS.slice(0, COMMENTS.length);
  var resultComments = [];
  while (clonedComments.length !== 0 && total > 0) {
    var randomComment = clonedComments[generateNumber(0, total)];
    resultComments.push(randomComment);
    clonedComments.splice(total, 1);
    total--;
  }
  return resultComments;
};

var generatePicturesData = function (count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: generateNumber(GENERATE_LIKES_MIN, GENERATE_LIKES_MAX),
      comments: generateComments(),
      description: DESCRIPTIONS[generateNumber(0, DESCRIPTIONS.length - 1)]
    });
  }
  return photos;
};

var renderPhoto = function (pictureTemplateElement, pictureData) {
  var pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.content.querySelector('.picture__img').src = pictureData.url;
  pictureElement.content.querySelector('.picture__comments').textContent =
    pictureData.comments.length;
  pictureElement.content.querySelector('.picture__likes').textContent =
    pictureData.likes;
  return pictureElement;
};

var renderPhotos = function (
    parentElement,
    pictureTemplateElement,
    picturesData
) {
  var photosFragment = document.createDocumentFragment();
  picturesData.forEach(function (pictureData, index) {
    photosFragment.appendChild(
        renderPhoto(pictureTemplateElement, picturesData[index]).content
    );
  });
  parentElement.appendChild(photosFragment);
};

var renderBigPictureComments = function (parentElement, picturesData) {
  var commentFragments = document.createDocumentFragment();
  var commentElement = bigPictureCommentElement.cloneNode(true);

  picturesData.comments.forEach(function (comment) {
    commentElement.querySelector('.social__text').textContent = comment;
    commentElement.querySelector('.social__picture').src =
      'img/avatar-' +
      generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) +
      '.svg';
    commentFragments.appendChild(commentElement);
  });
  parentElement.appendChild(commentFragments);
};

var deleteComments = function (comments) {
  comments.innerHTML = '';
};

var renderBigPicture = function (bigPictureElement, pictureData) {
  bigPictureElement.classList.remove('hidden');
  socialCommentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');
  bigPictureElement.querySelector('.big-picture__img img').src =
    pictureData.url;
  bigPictureElement.querySelector('.comments-count').textContent =
    pictureData.comments.length;
  bigPictureElement.querySelector('.likes-count').textContent =
    pictureData.likes;
  bigPictureElement.querySelector('.social__caption').textContent =
    pictureData.description;
  bigPictureElement.querySelector('.social__picture').src =
    'img/avatar-' +
    generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) +
    '.svg';
  renderBigPictureComments(bigPictureCommentsBlockElement, pictureData);
};

var closeBigPictureClickHandler = function () {
  bigPictureElement.classList.add('hidden');
  deleteComments(bigPictureCommentsBlockElement);
};

var closeEditingFormKeydownHandler = function () {
  uploadPictureElement.value = '';
  uploadPictureOverlayElement.classList.add('hidden');
};

var effectClickHandler = function (effect) {
  var target = effect.querySelector('input');
  var effectName = target.value;
  var effectPercent = effectLevelLineElement.offsetWidth + 'px';

  imagePreviewElement.style.filter = createPreviewFilterStyle(EFFECT_DEFAULT_VALUE); //
  imagePreviewElement.classList.remove(imagePreviewElement.classList[0]);
  imagePreviewElement.classList.add('effects__preview--' + effectName);

  effectLevelDepthElement.style.width = effectPercent;
  effectLevelPinElement.style.left = effectPercent;

  if (effectName === 'none') {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }
};

var keydownEscPressHandler = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closeEditingFormKeydownHandler();
  }
};

var validateTags = function (tagsString) {
  var normalizedTagsString = tagsString
    .toLowerCase()
    .trim()
    .replace(/\s{2,}/g, ' ');

  if (normalizedTagsString === '') {
    return {
      isValid: true,
      errors: null
    };
  }

  var checkTagsStartWithHash = function (tags) {
    var isValid = tags.every(function (tag) {
      return tag.startsWith('#');
    });

    if (!isValid) {
      return 'Every hash must start fromm "#"';
    }
    return null;
  };

  var checkTagsOnlyHashSymbol = function (tags) {
    var isValid = tags.some(function (tag) {
      return tag !== '#';
    });

    if (!isValid) {
      return 'You can\'t use only "#" for your hashtag';
    }
    return null;
  };

  var checkTagsRepeatTags = function (tags) {
    var hasDifferentTags = function () {
      var uniqArray = {};
      for (var i = 0; i < tags.length; i++) {
        uniqArray[tags[i]] = true;
      }
      return tags.length === uniqArray.length ? false : true;
    };

    if (hasDifferentTags()) {
      return 'You can\'t use similar hashtags';
    }
    return null;
  };

  var checkTagsMoreThanFiveTags = function (tags) {
    if (tags.length > VALIDATION_TAGS_LENGTH) {
      return 'You can\'t use more than 5 hashtags';
    }
    return null;
  };

  var checkTagsMoreThanTwentyChars = function (tags) {
    var isValid = tags.some(function (tag) {
      return tag.length < VALIDATION_TAG_LENGTH;
    });
    if (!isValid) {
      return 'Your hashtags length can\'t be more than 20 characters';
    }
    return null;
  };

  var tags = normalizedTagsString.split(' ');

  var errors = [
    checkTagsStartWithHash,
    checkTagsOnlyHashSymbol,
    checkTagsRepeatTags,
    checkTagsMoreThanFiveTags,
    checkTagsMoreThanTwentyChars
  ].reduce(function (accumulator, checkFunction) {
    var error = checkFunction(tags);

    if (error) {
      accumulator.push(error);
    }

    return accumulator;
  }, []);

  return {
    isValid: !errors.length ? false : true,
    firstError: errors[0]
  };
};

var convertValueToScale = function (max, min, value) {
  return ((max - min) * value) / 100 + min;
};

var getMovePinValue = function () {
  effectLevelPinElement.addEventListener('mousedown', function (mouseDownEvent) {
    var pinCoordsLeft = effectLevelPinElement.getBoundingClientRect().left;
    var sliderCoordsLeft = effectLevelLineElement.getBoundingClientRect().left;
    var sliderOffsetWidth = effectLevelLineElement.offsetWidth;

    var mouseMoveHandler = function (mouseMoveEvent) {
      var pinOffsetLeftValue = Math.min(
          Math.max(0, mouseMoveEvent.pageX - mouseDownEvent.pageX + pinCoordsLeft - sliderCoordsLeft),
          sliderOffsetWidth
      );

      var effectPercentValue = Math.round((pinOffsetLeftValue / sliderOffsetWidth) * 100);

      effectValueElement.value = effectPercentValue;
      effectLevelPinElement.style.left = pinOffsetLeftValue + 'px';
      effectLevelDepthElement.style.width = effectLevelPinElement.style.left;

      imagePreviewElement.style.filter = createPreviewFilterStyle(effectPercentValue);
    };
    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
};

var createPreviewFilterStyle = function (value) {
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
      return 'none';
  }
};

var inputHashtagsElement = document.querySelector('.text__hashtags');
var inputCommentsElement = document.querySelector('.text__description');
var picturesData = generatePicturesData(PHOTOS_NUMBER);
var pictureTemplateElement = document.querySelector('#picture');
var pictureElements = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');

var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
var bigPictureCommentElement = document.querySelector('.social__comment'); // @TODO: clone

var socialCommentCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');
var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');
var uploadPictureElement = document.querySelector('#upload-file');
var uploadPictureOverlayElement = document.querySelector('.img-upload__overlay');
var closeEditPictureFormElement = uploadPictureOverlayElement.querySelector('.img-upload__cancel');
var imagePreviewElement = document.querySelector('.img-upload__preview img');

var effectElements = Array.prototype.slice.call(document.querySelectorAll('.effects__item'));
var effectLevelElement = document.querySelector('.effect-level');
var effectLevelLineElement = document.querySelector('.effect-level__line');
var effectLevelDepthElement = document.querySelector('.effect-level__depth');
var effectLevelPinElement = document.querySelector('.effect-level__pin');
var effectValueElement = document.querySelector('.effect-level__value');

deleteComments(bigPictureCommentsBlockElement);
renderPhotos(pictureElements, pictureTemplateElement, picturesData);
getMovePinValue();

var pictureListElements = document.querySelectorAll('.picture');

pictureListElements.forEach(function (element, index) {
  element.addEventListener('click', function () {
    renderBigPicture(bigPictureElement, picturesData[index]);
  });
});

closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);

document.removeEventListener('click', closeBigPictureClickHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closeBigPictureClickHandler();
  }
  document.removeEventListener('keydown', closeBigPictureClickHandler);
});

uploadPictureElement.addEventListener('change', function () {
  uploadPictureOverlayElement.classList.remove('hidden');
  effectLevelDepthElement.style.width = effectLevelPinElement.style.left = effectLevelLineElement.offsetWidth + 'px';
  effectLevelElement.classList.add('hidden');
});

closeEditPictureFormElement.addEventListener('click', closeEditingFormKeydownHandler);
document.removeEventListener('click', closeEditingFormKeydownHandler);

document.addEventListener('keydown', keydownEscPressHandler);
document.removeEventListener('keydown', keydownEscPressHandler);

inputHashtagsElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', keydownEscPressHandler);
});
inputHashtagsElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', keydownEscPressHandler);
});
inputCommentsElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', keydownEscPressHandler);
});
inputCommentsElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', keydownEscPressHandler);
});

effectElements.forEach(function (effect) {
  effect.addEventListener('click', function () {
    effectClickHandler(effect);
  });
});

inputHashtagsElement.addEventListener('change', function () {
  var validation = validateTags(inputHashtagsElement.value);
  if (validation.isValid) {
    inputHashtagsElement.setCustomValidity(validation.firstError);
  } else {
    inputHashtagsElement.setCustomValidity('');
  }
});
