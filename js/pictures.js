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

var generateUrl = function () {
  var uniqueRandoms = [];
  if (!uniqueRandoms.length) {
    for (var i = 1; i < PHOTOS_NUMBER + 1; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];
  uniqueRandoms.splice(index, 1);
  return 'photos/' + val + '.jpg';
};

var generateLikes = function () {
  return generateNumber(GENERATE_LIKES_MIN, GENERATE_LIKES_MAX);
};

var generateComments = function () {
  var comments = [];
  for (var i = 0; i < generateNumber(GENERATE_COMMENTS_MIN, GENERATE_COMMENTS_MAX); i++) {
    comments.push(COMMENTS[generateNumber(0, COMMENTS.length - 1)]);
  }
  return comments;
};

var generateDescription = function () {
  return DESCRIPTIONS[generateNumber(0, DESCRIPTIONS.length - 1)];
};

var generatePicturesData = function () {
  var photos = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos.push({
      url: generateUrl(),
      likes: generateLikes(),
      comments: generateComments(),
      description: generateDescription()
    });
  }
  return photos;
};

var renderPhotos = function () {
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    var importN = document.importNode(itemElement, true);
    pictureImageElement.setAttribute("src", picturesData[i].url);
    pictureCommentsElement.innerHTML = picturesData[i].comments.length;
    pictureLikesElement.innerHTML = picturesData[i].likes;
    pictureTemplateElement.content.appendChild(importN);
  }
  return pictureTemplateElement;
};

var renderBigPicture = function (bigPictureElement, picturesData) {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = picturesData.url;
  bigPictureElement.querySelector('.comments-count').textContent = picturesData.comments.length;
  bigPictureElement.querySelector('.likes-count').textContent = picturesData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picturesData.description;
  bigPictureElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
};

var deleteStaticComments = function (comments) {
  for (var i = comments.length - 1; i >= 0; i--) {
    comments[i].parentNode.removeChild(comments[i]);
  }
}

var renderBigPictureComments = function (commentsBlock) {
  generateComments().forEach(function (item) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = 'img/avatar-' + generateNumber(1, 6) + '.svg';
    img.alt = 'Profile image';
    img.width = 35;
    img.height = 35;
    var textComment = document.createElement('p');
    textComment.classList.add('social__text');
    textComment.textContent = item;
    comment.appendChild(img);
    comment.appendChild(textComment);
    socialCommentsBlockElement.appendChild(comment);
  });
}

var picturesData = generatePicturesData();
var pictureElements = document.querySelector('.pictures');
var pictureTemplateElement = document.querySelector('#picture');
var pictureImageElement = pictureTemplateElement.content.querySelector('.picture__img');
var pictureCommentsElement = pictureTemplateElement.content.querySelector('.picture__comments');
var pictureLikesElement = pictureTemplateElement.content.querySelector('.picture__likes');
var itemElement = pictureTemplateElement.content.querySelector('a');
var bigPictureElement = document.querySelector('.big-picture');
var socialCommentsBlockElement = document.querySelector('.social__comments');
var socialCommentElements = document.querySelectorAll('.social__comment');
var socialCommentCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');
var randomNumber = generateNumber(GENERATE_COMMENTS_MIN, GENERATE_COMMENTS_MAX);

pictureElements.appendChild(renderPhotos().content);
deleteStaticComments(socialCommentElements);
socialCommentCountElement.classList.add('visually-hidden');
commentsLoaderElement.classList.add('visually-hidden');
renderBigPicture(bigPictureElement, picturesData[0]);
renderBigPictureComments(socialCommentsBlockElement);
