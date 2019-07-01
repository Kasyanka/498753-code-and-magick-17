// Файл popup.js
'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var form = setup.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {

    if (evt.keyCode === ESC_KEYCODE && evt.target.getAttribute('name') !== 'username') {
      closePopup();
    }

  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    form.addEventListener('submit', onSubmitForm);
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

  // событие - отправка формы на сервер
  var onSubmitForm = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    form.removeEventListener('submit', onSubmitForm);
  };
})();
