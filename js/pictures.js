"use strict";

var COMMENTS = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

var DESCRIPTIONS = [
  "Тестим новую камеру!",
  "Затусили с друзьями на море",
  "Как же круто тут кормят",
  "Отдыхаем...",
  "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
  "Вот это тачка!"
];

var GENERATE_RANDOM_NUMBER = 25;
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
    for (var i = 1; i < GENERATE_RANDOM_NUMBER + 1; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];
  uniqueRandoms.splice(index, 1);
  return "photos/" + val + ".jpg";
};

var generateLikes = function () {
  return generateNumber(GENERATE_LIKES_MIN, GENERATE_LIKES_MAX);
};

var generateComments = function () {
  var comments = [];
  for (
    var i = 0; i < generateNumber(GENERATE_COMMENTS_MIN, GENERATE_COMMENTS_MAX); i++
  ) {
    comments.push(COMMENTS[generateNumber(0, COMMENTS.length - 1)]);
  }
  return comments;
};

var generateDescription = function () {
  return DESCRIPTIONS[generateNumber(0, DESCRIPTIONS.length - 1)];
};

var generatePhotoData = function () {
  var photos = [];
  for (var i = 0; i < GENERATE_RANDOM_NUMBER; i++) {
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
  for (var i = 0; i < picture.length; i++) {
    var importN = document.importNode(itemElement, true);
    pictureImageElement.setAttribute("src", picture[i].url);
    pictureCommentsElement.innerHTML = picture[i].comments.length;
    pictureLikesElement.innerHTML = picture[i].likes;
    pictureTemplateElement.content.appendChild(importN);
  }
  return pictureTemplateElement;
};

var renderBigPicture = function (bigPicture, picture) {
  bigPicture.classList.remove("hidden");
  bigPicture.querySelector(".big-picture__img img").src = picture[0].url;
  bigPicture.querySelector(".comments-count").textContent = picture[0].comments.length;
  bigPicture.querySelector(".likes-count").textContent = picture[0].likes;
  bigPicture.querySelector(".social__caption").textContent = picture[0].description;
  bigPicture.querySelector(".social__picture").textContent = "img/avatar" + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + ".svg";
};

var picture = generatePhotoData();
var pictureElements = document.querySelector(".pictures");
var pictureTemplateElement = document.querySelector("#picture");
var pictureImageElement = pictureTemplateElement.content.querySelector(".picture__img");
var pictureCommentsElement = pictureTemplateElement.content.querySelector(".picture__comments");
var pictureLikesElement = pictureTemplateElement.content.querySelector(".picture__likes");
var itemElement = pictureTemplateElement.content.querySelector("a");
var bigPictureElement = document.querySelector(".big-picture");
var socialCommentCountElement = document.querySelector(".social__comment-count");
var commentsLoaderElement = document.querySelector(".comments-loader");

pictureElements.appendChild(createPhotos().content);
renderBigPicture(bigPictureElement, picture);
socialCommentCountElement.classList.add("visually-hidden");
commentsLoaderElement.classList.add("visually-hidden");
