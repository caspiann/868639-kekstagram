var commentsArray = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];
var descriptionText = [
  "Тестим новую камеру!",
  "Затусили с друзьями на море",
  "Как же круто тут кормят",
  "Отдыхаем...",
  "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
  "Вот это тачка!"
];

var randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
// url
var url = function () {
  var photoNumber = randomNumber(1, 25);
  return "photos/" + photoNumber + ".jpg";
};
//likes
var likes = function () {
  return randomNumber(15, 200);
};
//comments
var generateComments = function () {
  var comments = [];
  for (var i = 0; i < randomNumber(1, 5); i++) {
    comments.push(commentsArray[randomNumber(0, commentsArray.length - 1)]);
  }
  return comments;
};
// description
var description = function () {
  return descriptionText[randomNumber(0, descriptionText.length - 1)];
};
// generate array
var arrayOfPhotos = function () {
  var arr = [];
  for (var i = 0; i < 25; i++) {
    var photoInfo = {
      url: url(),
      likes: likes(),
      comments: generateComments(),
      description: description()
    };
    arr.push(photoInfo);
  }
  return arr;
};


var picture = document.querySelector(".pictures");

var createListPhotos = function () {
  var pictureTemplate = document.querySelector("#picture");
  var picture = pictureTemplate.content.querySelector(".picture");
  var image = pictureTemplate.content.querySelector(".picture__img");
  var pictureComments = pictureTemplate.content.querySelector(
    ".picture__comments"
  );
  var pictureLikes = pictureTemplate.content.querySelector(".picture__likes");
  var item = pictureTemplate.content.querySelector("a");
  var a = 0;
  for (var i = 1; i < arrayOfPhotos().length; i++) {
    a = document.importNode(item, true);
    image.setAttribute("src", arrayOfPhotos()[i].url);
    pictureComments.innerHTML = arrayOfPhotos()[i].comments.length;
    pictureLikes.innerHTML = arrayOfPhotos()[i].likes;
    pictureTemplate.content.appendChild(a);
  }
  return pictureTemplate
};

picture.appendChild(createListPhotos().content);

var bigPicture = document.querySelector('.big-picture');

var infoBigPicture = function () {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = arrayOfPhotos()[0].url;
  bigPicture.querySelector('.comments-count').textContent = arrayOfPhotos()[0].comments.length;
  bigPicture.querySelector('.likes-count').textContent = arrayOfPhotos()[0].likes;
  bigPicture.querySelector('.social__caption').textContent = arrayOfPhotos()[0].description;
  bigPicture.querySelector('.social__picture').textContent = 'img/avatar' + randomNumber(1,6) + '.svg';
  // bigPicture.querySelector('.social__comments:last-child li').textContent = arrayOfPhotos().comments;
  return bigPicture;
};

infoBigPicture();

var socialСommentСount = document.querySelector('.social__comment-count');
socialСommentСount.classList.add('visually-hidden');
var commentsloader = document.querySelector('.comments-loader');
commentsloader.classList.add('visually-hidden');
