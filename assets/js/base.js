console.log("Скрипт который работает вездe");

//burger menu

const iconMenu = document.querySelector(".menu__icon");
const iconMenuSpan = document.querySelector(".menu__icon > span");
const menuBody = document.querySelector(".header__menu");

iconMenu.addEventListener("click", function (e) {
  iconMenu.classList.toggle("_active");
  menuBody.classList.toggle("_active");

  // заекрытие меню по клику на любую область
  // дополниельно делаем проверку клик по спану, что бы отрабатывало закрытие
  window.onclick = function (e) {
    if (e.target !== menuBody && e.target !== iconMenu && e.target !== iconMenuSpan) {
      menuBody.classList.remove("_active");
      iconMenu.classList.remove("_active");
    }
  };
});

//изменения значения кнопки при адаптиве

const headerButton = document.querySelector(".header__in__btn");

if (window.screen.width <= 443) {
  headerButton.innerHTML = "вход в кабинет";
}

if (window.screen.width <= 373) {
  headerButton.innerHTML = "кабинет";
}

// скролл по якорю

const anchors = document.querySelectorAll('a[href*="#"]');

for (const anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//появление шапки про скролле вниз

let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector(".header");

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains("_hide");

window.addEventListener("scroll", () => {
  if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
    //scroll down
    header.classList.add("_hide");
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    header.classList.remove("_hide");

    //закрываем открытое меню по скролу
    menuBody.classList.remove("_active");
    iconMenu.classList.remove("_active");
  }

  lastScroll = scrollPosition();
});
