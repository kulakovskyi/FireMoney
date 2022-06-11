console.log("Скрипт который работает вездe");

//изменения значения кнопки при адаптиве

const headerButton = document.querySelector(".header__in__btn");

if (window.screen.width <= 443) {
  headerButton.innerHTML = "вход в кабинет";
}

if (window.screen.width <= 373) {
  headerButton.innerHTML = "кабинет";
}
