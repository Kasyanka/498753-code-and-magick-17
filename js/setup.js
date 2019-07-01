// Файл setup.js
'use strict';
(function () {
  var WIZARD_COAT = ['rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)', 'rgb(101, 137, 164)'];
  var WIZARD_EYES = ['red', 'blue', 'yellow', 'green', 'black'];
  var WIZARD_FIREBALL = ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830'];
  document.querySelector('.setup-similar').classList.remove('hidden'); // появляются похожие маги 4 шт
  var userDialog = document.querySelector('.setup'); // попап - окно с магами
  userDialog.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list'); // сюда будут вставляться маги 4 шт
  var similarWizardTemplate = document.querySelector('#similar-wizard-template') // темлейт магов
    .content
    .querySelector('.setup-similar-item');

  // функция выбора из массива элемнет последовательно и по кругу
  var getNextElement = function (array) {
    var element = array.shift();
    array.push(element);
    return element;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  // функция при клике на главном маге переключать цвета мантии, глаз и файербола
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
    document.querySelector('[name="fireball-color"]').value = getNextElement(WIZARD_FIREBALL);
    fireball.style.backgroundColor = document.querySelector('[name="fireball-color"]').value;
  });
})();
