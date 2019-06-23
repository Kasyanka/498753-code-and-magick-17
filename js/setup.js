// Файл setup.js
'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var generates = function (array) {
  var variableRandom = Math.floor(Math.random() * array.length);
  var variableArray = array[variableRandom];
  return variableArray;
};

// неповторяющиеся элементы из цыкла
// var getRandomElement = function (array) {
// var element = generates(array);
// var index = array.indexOf(element);
// array.splice(index, 1);
// return element;
// };

var getNextElement = function (array) {
  var element = array.shift();
  array.push(element);
  return element;
};


var wizards = [];

for (var i = 0; i < 4; i++) {
  var wizard = {
    name: generates(WIZARD_NAMES) + generates(WIZARD_SURNAME),
    coatColor: generates(WIZARD_COAT),
    eyesColor: generates(WIZARD_EYES)};

  wizards.push(wizard);
}

for (i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  similarListElement.appendChild(wizardElement);
}

// 4 дз
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');


var onPopupEscPress = function (evt) {

  if (evt.keyCode === ESC_KEYCODE && evt.target.getAttribute('name') !== 'username') {
    closePopup();
  }

};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var coat = document.querySelector('.setup-wizard .wizard-coat');
var eyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

coat.addEventListener('click', function () {
  coat.style.fill = getNextElement(WIZARD_COAT);
  document.querySelector('[name="coat-color"]').value = coat.style.fill;
});
eyes.addEventListener('click', function () {
  eyes.style.fill = getNextElement(WIZARD_EYES);
  document.querySelector('[name="eyes-color"]').value = eyes.style.fill;
});
fireball.addEventListener('click', function () {
  fireball.style.backgroundColor = getNextElement(WIZARD_FIREBALL);
  document.querySelector('[name="fireball-color"]').value = fireball.style.backgroundColor;
});
