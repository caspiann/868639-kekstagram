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
var generateNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
var generateUrl = function () {
  var uniqueRandoms = [];
  var numRandoms = 25;
  if (!uniqueRandoms.length) {
    for (var i = 1; i < numRandoms + 1; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];
  uniqueRandoms.splice(index, 1);
  return 'photos/' + val + '.jpg';
};
var generateLikes = function () {
  return generateNumber(15, 200);
};
var generateComments = function () {
  var comments = [];
  for (var i = 0; i < generateNumber(1, 5); i++) {
    comments.push(COMMENTS[generateNumber(0, COMMENTS.length - 1)]);
  }
  return comments;
};
var generateDescription = function () {
  return DESCRIPTIONS[generateNumber(0, DESCRIPTIONS.length - 1)];
};
var generatePhotos = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    photos.push({
      url: generateUrl(),
      likes: generateLikes(),
      comments: generateComments(),
      description: generateDescription()
    });
  }
  return photos;
};

var createPhotos = function () {
  for (var i = 0; i < photos.length; i++) {
    var importN = document.importNode(item, true);
    image.setAttribute('src', photos[i].url);
    pictureComments.innerHTML = photos[i].comments.length;
    pictureLikes.innerHTML = photos[i].likes;
    pictureTemplate.content.appendChild(importN);
  }
  return pictureTemplate;
};
var addInfo = function () {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photos[0].url;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.social__caption').textContent = photos[0].description;
  bigPicture.querySelector('.social__picture').textContent = 'img/avatar' + generateNumber(1, 6) + '.svg';
  return bigPicture;
};

var photos = generatePhotos();
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture');
var image = pictureTemplate.content.querySelector('.picture__img');
var pictureComments = pictureTemplate.content.querySelector('.picture__comments');
var pictureLikes = pictureTemplate.content.querySelector('.picture__likes');
var item = pictureTemplate.content.querySelector('a');
var bigPicture = document.querySelector('.big-picture');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

pictures.appendChild(createPhotos().content);
addInfo();
socialCommentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');
