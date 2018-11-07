function showError(container, errorMessage) {
  container.className = 'error';
  var msgElem = document.createElement('span');
  msgElem.className = "error-message";
  msgElem.innerHTML = errorMessage;
  container.appendChild(msgElem);
}

function resetError(container) {
  container.className = '';
  if (container.lastChild.className == "error-message") {
      container.removeChild(container.lastChild);
  }
}

function validate(form) {
  var elems = form.elements;

  resetError(elems.fname.parentNode);
  if (!elems.fname.value) {
      showError(elems.fname.parentNode, ' Укажите имя.');
  } else if (/[^a-z^а-я^ё]/gi.test(elems.fname.value)) {
      showError(elems.fname.parentNode, ' Имя содержит только буквы.');
  }

  resetError(elems.phone.parentNode);
  if (!elems.phone.value) {
      showError(elems.phone.parentNode, ' Укажите телефон.');
  } else if (!/\+7\(\d{3}\)\d{3}\-\d{4}/.test(elems.phone.value)) {
      showError(elems.phone.parentNode, ' Телефон подчиняется шаблону +7(000)000-0000');
  }

  resetError(elems.email.parentNode);
  if (!elems.email.value) {
      showError(elems.email.parentNode, ' Укажите E-mail.');
  } else if (!/^[a-z]+[a-z0-9\.+\-+]*@[a-z]+\.[a-z]+$/gi.test(elems.email.value)) {
      showError(elems.email.parentNode, ' E-mail выглядит как ' +
          'mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru');
  }

  resetError(elems.message.parentNode);
  if (!elems.message.value) {
      showError(elems.message.parentNode, ' Отсутствует текст.');
  }

}