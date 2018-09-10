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
var PICTURES = document.querySelector(".pictures");
var PICTURE_TEMPLATE = document.querySelector("#picture");
var PICTURE = PICTURE_TEMPLATE.content.querySelector(".picture");
var IMAGE = PICTURE_TEMPLATE.content.querySelector(".picture__img");
var PICTURE_COMMENTS = PICTURE_TEMPLATE.content.querySelector(
  ".picture__comments"
);
var PICTURE_LIKES = PICTURE_TEMPLATE.content.querySelector(".picture__likes");
var ITEM = PICTURE_TEMPLATE.content.querySelector("a");
var BIG_PICTURE = document.querySelector(".big-picture");
var SOCIAL_СOMMENT_СOUNT = document.querySelector(".social__comment-count");
var COMMENTS_LOADER = document.querySelector(".comments-loader");
var a = 0;

var generateRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
var generateRandomPhotoUrl = function () {
  var photoNumber = generateRandomNumber(1, 25);
  return "photos/" + photoNumber + ".jpg";
};
var generateRandomLikesNumber = function () {
  return generateRandomNumber(15, 200);
};
var generateComments = function () {
  var comments = [];
  for (var i = 0; i < generateRandomNumber(1, 5); i++) {
    comments.push(COMMENTS[generateRandomNumber(0, COMMENTS.length - 1)]);
  }
  return comments;
};
var generateRandomDescriptionText = function () {
  return DESCRIPTIONS[generateRandomNumber(0, DESCRIPTIONS.length - 1)];
};
var generateArrayOfPhotos = function () {
  var ArrayOfPhotos = [];
  for (var i = 0; i < 25; i++) {
    var photoInfo = {
      url: generateRandomPhotoUrl(),
      likes: generateRandomLikesNumber(),
      comments: generateComments(),
      description: generateRandomDescriptionText()
    };
    ArrayOfPhotos.push(photoInfo);
  }
  return ArrayOfPhotos;
};

var createListOfPhotos = function () {
  for (var i = 0; i < generateArrayOfPhotos().length; i++) {
    importN = document.importNode(ITEM, true);
    IMAGE.setAttribute("src", generateArrayOfPhotos()[i].url);
    PICTURE_COMMENTS.innerHTML = generateArrayOfPhotos()[i].comments.length;
    PICTURE_LIKES.innerHTML = generateArrayOfPhotos()[i].likes;
    PICTURE_TEMPLATE.content.appendChild(importN);
  }
  return PICTURE_TEMPLATE;
};

PICTURES.appendChild(createListOfPhotos().content);

var addBigPictureInfo = function () {
  BIG_PICTURE.classList.remove("hidden");
  BIG_PICTURE.querySelector(
    ".big-picture__img img"
  ).src = generateArrayOfPhotos()[0].url;
  BIG_PICTURE.querySelector(
    ".comments-count"
  ).textContent = generateArrayOfPhotos()[0].comments.length;
  BIG_PICTURE.querySelector(
    ".likes-count"
  ).textContent = generateArrayOfPhotos()[0].likes;
  BIG_PICTURE.querySelector(
    ".social__caption"
  ).textContent = generateArrayOfPhotos()[0].description;
  BIG_PICTURE.querySelector(".social__picture").textContent =
    "img/avatar" + generateRandomNumber(1, 6) + ".svg";
  return BIG_PICTURE;
};

addBigPictureInfo();


SOCIAL_СOMMENT_СOUNT.classList.add("visually-hidden");
COMMENTS_LOADER.classList.add("visually-hidden");
