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
  picturesData.comments.forEach(function (comment) {
    var commentElement = bigPictureCommentElement.cloneNode(true);
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

var handleClickCloseBigPicture = function () {
  bigPictureElement.classList.add('hidden');
  deleteComments(bigPictureCommentsBlockElement);
};

var handleKeydownCloseEditingForm = function () {
  uploadPictureElement.value = '';
  uploadPictureOverlayElement.classList.add('hidden');
};

var handleClickEffect = function (effect) {
  var target = effect.querySelector('input');
  var effectName = target.value;
  imagePreviewElement.classList.remove(imagePreviewElement.classList[0]);
  imagePreviewElement.classList.add('effects__preview--' + effectName);
  changeEffectsValue(100);
  effectLevelDepthElement.style.width = effectLevelPinElement.style.left = effectLevelLineElement.offsetWidth + 'px';
  if (imagePreviewElement.classList[0] === 'effects__preview--none') {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }
};

var handleKeydownEscPress = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    handleKeydownCloseEditingForm();
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

var getProportion = function (max, min, value) {
  return ((max - min) * value) / 100 + min;
};

var getMovePinValue = function () {
  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    var getCoords = function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        left: box.left + pageXOffset
      };
    };
    var pinCoords = getCoords(effectLevelPinElement);
    var shiftX = evt.pageX - pinCoords.left;
    var sliderCoords = getCoords(effectLevelLineElement);
    var mouseMove = function (e) {
      var newLeft = e.pageX - shiftX - sliderCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = effectLevelLineElement.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
      effectLevelPinElement.style.left = newLeft + 'px';
      effectLevelDepthElement.style.width = effectLevelPinElement.style.left;
      var effectValue = Math.round((newLeft / rightEdge) * 100);
      effectValueElement.value = effectValue;
      changeEffectsValue(effectValueElement.value);
    };
    var mouseUp = function () {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
};

var changeEffectsValue = function (value) {
  var filterName = imagePreviewElement.getAttribute('class');
  switch (filterName) {
    case EFFECTS.none.effect:
      imagePreviewElement.style.filter = 'none';
      break;
    case EFFECTS.chrome.effect:
      imagePreviewElement.style.filter = 'grayscale(' + getProportion(EFFECTS.chrome.maxValue, EFFECTS.chrome.minValue, value) + ')';
      break;
    case EFFECTS.sepia.effect:
      imagePreviewElement.style.filter = 'sepia(' + getProportion(EFFECTS.sepia.maxValue, EFFECTS.sepia.minValue, value) + ')';
      break;
    case EFFECTS.marvin.effect:
      imagePreviewElement.style.filter = 'invert(' + getProportion(EFFECTS.marvin.maxValue, EFFECTS.marvin.minValue, value) + '%)';
      break;
    case EFFECTS.phobos.effect:
      imagePreviewElement.style.filter = 'blur(' + getProportion(EFFECTS.phobos.maxValue, EFFECTS.phobos.minValue, value) + 'px)';
      break;
    case EFFECTS.heat.effect:
      imagePreviewElement.style.filter = 'brightness(' + getProportion(EFFECTS.heat.maxValue, EFFECTS.heat.minValue, value) + ')';
      break;
    default:
      break;
  }
};

var inputHashtagsElement = document.querySelector('.text__hashtags');
var inputCommentsElement = document.querySelector('.text__description');
var picturesData = generatePicturesData(PHOTOS_NUMBER);
var pictureTemplateElement = document.querySelector('#picture');
var pictureElements = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
var bigPictureCommentElement = document.querySelector('.social__comment');
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

closeBigPictureElement.addEventListener('click', handleClickCloseBigPicture);

document.removeEventListener('click', handleClickCloseBigPicture);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    handleClickCloseBigPicture();
  }
  document.removeEventListener('keydown', handleClickCloseBigPicture);
});

uploadPictureElement.addEventListener('change', function () {
  uploadPictureOverlayElement.classList.remove('hidden');
  effectLevelDepthElement.style.width = effectLevelPinElement.style.left = effectLevelLineElement.offsetWidth + 'px';
  effectLevelElement.classList.add('hidden');
});

closeEditPictureFormElement.addEventListener('click', handleKeydownCloseEditingForm);
document.removeEventListener('click', handleKeydownCloseEditingForm);

document.addEventListener('keydown', handleKeydownEscPress);
document.removeEventListener('keydown', handleKeydownEscPress);

inputHashtagsElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', handleKeydownEscPress);
});
inputHashtagsElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', handleKeydownEscPress);
});
inputCommentsElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', handleKeydownEscPress);
});
inputCommentsElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', handleKeydownEscPress);
});

effectElements.forEach(function (effect) {
  effect.addEventListener('click', function () {
    handleClickEffect(effect);
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
