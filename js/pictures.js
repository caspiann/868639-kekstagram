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
  return 'photos/' + generateNumber(1, 25) + '.jpg';
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
    var photoInfo = {
      url: generateUrl(),
      likes: generateLikes(),
      comments: generateComments(),
      description: generateDescription()
    };
    photos.push(photoInfo);
  }
  return photos;
};
var createPhotos = function () {
  for (var i = 0; i < generatePhotos().length; i++) {
    importN = document.importNode(item, true);
    image.setAttribute('src', generatePhotos()[i].url);
    picture_comments.innerHTML = generatePhotos()[i].comments.length;
    picture_likes.innerHTML = generatePhotos()[i].likes;
    picture_template.content.appendChild(importN);
  }
  return picture_template;
};
var addInfo = function () {
  big_picture.classList.remove('hidden');
  big_picture.querySelector(
    '.big-picture__img img'
  ).src = generatePhotos()[0].url;
  big_picture.querySelector(
    '.comments-count'
  ).textContent = generatePhotos()[0].comments.length;
  big_picture.querySelector(
    '.likes-count'
  ).textContent = generatePhotos()[0].likes;
  big_picture.querySelector(
    '.social__caption'
  ).textContent = generatePhotos()[0].description;
  big_picture.querySelector('.social__picture').textContent =
    'img/avatar' + generateNumber(1, 6) + '.svg';
  return big_picture;
};

var pictures = document.querySelector('.pictures');
var picture_template = document.querySelector('#picture');
var image = picture_template.content.querySelector('.picture__img');
var picture_comments = picture_template.content.querySelector(
  '.picture__comments'
);
var picture_likes = picture_template.content.querySelector('.picture__likes');
var item = picture_template.content.querySelector('a');
var big_picture = document.querySelector('.big-picture');
var social_сomment_сount = document.querySelector('.social__comment-count');
var comments_loader = document.querySelector('.comments-loader');

pictures.appendChild(createPhotos().content);
addInfo();
social_сomment_сount.classList.add('visually-hidden');
comments_loader.classList.add('visually-hidden');
