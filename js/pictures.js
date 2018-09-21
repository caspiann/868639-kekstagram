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
  while (clonedComments !== 0 && total > 0) {
    var randomComment = clonedComments[total];
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

var renderPhoto = function (pictureTemplateElement, pictureData, index) {
  var pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.content.querySelector('.picture__img').src =
    pictureData[index].url;
  pictureElement.content.querySelector('.picture__comments').textContent =
    pictureData[index].comments.length;
  pictureElement.content.querySelector('.picture__likes').textContent =
    pictureData[index].likes;
  return pictureElement.content;
};

var renderPhotos = function (
  parentElement,
  pictureTemplateElement,
  picturesData
) {
  var photosFragment = document.createDocumentFragment();
  picturesData.forEach(function (pictureData, index) {
    photosFragment.appendChild(
      renderPhoto(pictureTemplateElement, picturesData, index)
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

var deleteStaticComments = function (comments) {
  for (var i = comments.length - 1; i >= 0; i--) {
    comments[i].parentNode.removeChild(comments[i]);
  }
};

var renderBigPicture = function (bigPictureElement, picturesData) {
  bigPictureElement.classList.remove('hidden');
  socialCommentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');
  bigPictureElement.querySelector('.big-picture__img img').src =
    picturesData.url;
  bigPictureElement.querySelector('.comments-count').textContent =
    picturesData.comments.length;
  bigPictureElement.querySelector('.likes-count').textContent =
    picturesData.likes;
  bigPictureElement.querySelector('.social__caption').textContent =
    picturesData.description;
  bigPictureElement.querySelector('.social__picture').src =
    'img/avatar-' +
    generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) +
    '.svg';
  renderBigPictureComments(bigPictureCommentsBlockElement, picturesData);
};

var closeBigPicture = function () {
  var newCommentElements = document.querySelectorAll('.social__comment');
  bigPictureElement.classList.add('hidden');
  deleteStaticComments(newCommentElements);
};

var closeEditingForm = function () {
  uploadPictureElement.value = '';
  uploadPictureOverlayElement.classList.add('hidden');
};

var changeFilter = function (index) {
  var deleteLastClass = imagePreviewElement.classList.remove(imagePreviewElement.classList[0]);
  switch (index) {
    case 0:
      deleteLastClass;
      imagePreviewElement.classList.add('effects__preview--none');
      break;
    case 1:
      deleteLastClass;
      imagePreviewElement.classList.add('effects__preview--chrome');
      break;
    case 2:
      deleteLastClass;
      imagePreviewElement.classList.add('effects__preview--sepia');
      break;
    case 3:
      deleteLastClass;
      imagePreviewElement.classList.add('effects__preview--marvin');
      break;
    case 4:
      deleteLastClass;
      imagePreviewElement.classList.add('effects__preview--phobos');
      break;
    case 5:
      deleteLastClass;
      imagePreviewElement.classList.add('effects__preview--heat');
      break;
    default:
      imagePreviewElement.classList.remove(imagePreviewElement.classList[0]);
      imagePreviewElement.classList.add('effects__preview--none');
  }
};

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
var bigStartPictureCommentsElement = document.querySelectorAll(
  '.social__comment'
);
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

deleteStaticComments(bigStartPictureCommentsElement);
renderPhotos(pictureElements, pictureTemplateElement, picturesData);

var pictureListElements = document.querySelectorAll('.picture');
pictureListElements.forEach(function (element, index) {
  element.addEventListener('click', function () {
    renderBigPicture(bigPictureElement, picturesData[index]);
  });
});

closeBigPictureElement.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closeBigPicture();
  }
});

uploadPictureElement.addEventListener('change', function () {
  uploadPictureOverlayElement.classList.remove('hidden');
});

closeEditPictureFormElement.addEventListener('click', closeEditingForm);
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closeEditingForm();
  }
});

effectElements.forEach(function (effect, index) {
  effect.addEventListener('click', function () {
    changeFilter(index);
  });
});
