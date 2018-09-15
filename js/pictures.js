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
  pictureElement.content.querySelector('.picture__img').src = pictureData[index].url;
  pictureElement.content.querySelector('.picture__comments').textContent = pictureData[index].comments.length;
  pictureElement.content.querySelector('.picture__likes').textContent = pictureData[index].likes;
  return pictureElement.content;
};

var renderPhotos = function (parentElement, pictureTemplateElement, picturesData) {
  var photosFragment = document.createDocumentFragment();
  picturesData.forEach(function (pictureData, index) {
    photosFragment.appendChild(renderPhoto(pictureTemplateElement, picturesData, index));
  })
  parentElement.appendChild(photosFragment);
};

var renderBigPictureComment = function (bigPictureCommentElement, comment, index) {
  var commentElement = bigPictureCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
  commentElement.querySelector('.social__text').textContent = comment;
  return commentElement;
};

var renderBigPictureComments = function (parentElement, bigPictureCommentElement, picturesData) {
  var commentFragments = document.createDocumentFragment();
  picturesData[0].comments.forEach(function (comment, index) {
    commentFragments.appendChild(renderBigPictureComment(bigPictureCommentElement, comment, index));
  });
  parentElement.appendChild(commentFragments);
};

var deleteStaticComments = function (comments) {
  for (var i = comments.length - 1; i >= 0; i--) {
    comments[i].parentNode.removeChild(comments[i]);
  }
};

var renderBigPicture = function (bigPictureElement, pictureData) {
  bigPictureElement.classList.remove('hidden');
  socialCommentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
  bigPictureElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
};

var picturesData = generatePicturesData(PHOTOS_NUMBER);
var pictureTemplateElement = document.querySelector('#picture');
var pictureElements = document.querySelector('section.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
var bigPictureCommentElement = document.querySelector('.social__comment');
var bigStartPictureCommentsElement = document.querySelectorAll('.social__comment');
var socialCommentCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');
var socialCommentElement = document.querySelector('.social__comment');

deleteStaticComments(bigStartPictureCommentsElement);
renderPhotos(pictureElements, pictureTemplateElement, picturesData);
renderBigPictureComments(bigPictureCommentsBlockElement, bigPictureCommentElement, picturesData);
renderBigPicture(bigPictureElement, picturesData[0]);
