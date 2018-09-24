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
};

var validateTags = function (tagsString) {
  var normalizedTagsString = tagsString.toLowerCase().trim().replace(/\s{2,}/g, ' ');

  if (normalizedTagsString === '') {
    return {
      isValid: true,
      errors: null
    };
  }

  var tags = normalizedTagsString.split(' ');
  var errors = [];

  var checkTagsStartWithHash = function () {
    var isValid = tags.every(function (tag) {
      return tag.startsWith('#');
    });

    if (!isValid) {
      errors.push('Every hash must start fromm "#"');
    }
  };

  var checkTagsOnlyHashSimbol = function () {
    var isValid = tags.some(function (tag) {
      return tag !== '#';
    });
    if (!isValid) {
      errors.push('You can\'t use only "#" for your hastag');
    }
  };

  var checkTagsRepeatTags = function () {
    var findRepeatTags = function () {
      var obj = {};
      for (var i = 0; i < tags.length; i++) {
        var str = tags[i];
        obj[str] = true;
      }
      var uniqArray = Object.keys(obj);
      return tags.length === uniqArray.length ? true : false;
    };
    var isValid = findRepeatTags();
    if (!isValid) {
      errors.push('You can\'t use simular hashtags');
    }
  };

  var checkTagsMoreThanFiveTags = function () {
    if (tags.length > 5) {
      errors.push('You can\'t use more than 5 hashtags');
    }
  };

  var checkTagsMoreThanTwentyChars = function () {
    var isValid = tags.some(function (tag) {
      return tag.length < 20;
    });
    if (!isValid) {
      errors.push('Your hashtags length can\'t be more than 20 characters');
    }
  };

  [
    checkTagsStartWithHash,
    checkTagsOnlyHashSimbol,
    checkTagsRepeatTags,
    checkTagsMoreThanFiveTags,
    checkTagsMoreThanTwentyChars
  ].forEach(function (checkFunction) {
    checkFunction(tags);
  });

  return {
    isValid: errors.length > 0 ? false : true,
    errors: errors
  };
};

var inputHashtagsElement = document.querySelector('.text__hashtags');

var picturesData = generatePicturesData(PHOTOS_NUMBER);
var pictureTemplateElement = document.querySelector('#picture');
var pictureElements = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCommentsBlockElement = document.querySelector(
    '.social__comments'
);
var bigPictureCommentElement = document.querySelector('.social__comment');
var socialCommentCountElement = document.querySelector(
    '.social__comment-count'
);
var commentsLoaderElement = document.querySelector('.comments-loader');
var closeBigPictureElement = bigPictureElement.querySelector(
    '.big-picture__cancel'
);
var uploadPictureElement = document.querySelector('#upload-file');
var uploadPictureOverlayElement = document.querySelector(
    '.img-upload__overlay'
);
var closeEditPictureFormElement = uploadPictureOverlayElement.querySelector(
    '.img-upload__cancel'
);
var imagePreviewElement = document.querySelector('.img-upload__preview img');
var effectElements = Array.prototype.slice.call(
    document.querySelectorAll('.effects__item')
);

deleteComments(bigPictureCommentsBlockElement);
renderPhotos(pictureElements, pictureTemplateElement, picturesData);

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
});

closeEditPictureFormElement.addEventListener(
    'click',
    handleKeydownCloseEditingForm
);

document.removeEventListener('click', handleKeydownCloseEditingForm);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    handleKeydownCloseEditingForm();
  }
  document.removeEventListener('keydown', handleKeydownCloseEditingForm);
});

effectElements.forEach(function (effect) {
  effect.addEventListener('click', function () {
    handleClickEffect(effect);
  });
});

inputHashtagsElement.addEventListener('change', function () {
  var validation = validateTags(inputHashtagsElement.value);
  if (!validation.isValid === true) {
    inputHashtagsElement.setCustomValidity(validation.errros[0]);
  } else {
    inputHashtagsElement.setCustomValidity('');
  }
});
