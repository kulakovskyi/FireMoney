console.log("Работает только на индексеі");

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
  }

  lastScroll = scrollPosition();
});

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

/********************************/

const toolBack = document.querySelector(".tooltip__back");
const toolPrice = document.querySelector(".tooltip__price-mounth");

let range1 = "65000";
let range2 = "8";
let percent = 0.5;

const calc = () => {
  toolBack.innerHTML = Math.round(range1 * (percent + (percent / (1 + percent)) * range2 - 1));
  toolPrice.innerHTML = Math.round(range1 / range2);
};

//slider range sum

const rangeSliderSum = document.querySelector(".range__slider__sum");
const sumOut = document.querySelector(".tooltip__sum");

noUiSlider.create(rangeSliderSum, {
  start: 65000,
  connect: "lower",
  tooltips: true,
  step: 1000,
  range: {
    min: 1000,
    max: 100000,
  },
  tooltips: {
    to: function (value) {
      return parseInt(value);
    },
    to: function (value) {
      return parseInt(value);
    },
  },
});

rangeSliderSum.noUiSlider.on("update", function (values) {
  range1 = parseInt(values[0]);
  sumOut.innerHTML = parseInt(values[0]);
  calc();
});

//slider range date

const rangeSliderDate = document.querySelector(".range__slider__date");
const dateOut = document.querySelector(".tooltip__date");

noUiSlider.create(rangeSliderDate, {
  start: 8,
  connect: "lower",
  tooltips: true,
  step: 1,
  range: {
    min: 3,
    max: 30,
  },
  tooltips: {
    to: function (value) {
      if (value <= 4) {
        return parseInt(value) + " дня";
      } else {
        return parseInt(value) + " дней";
      }
    },
    to: function (value) {
      if (value <= 4) {
        return parseInt(value) + " дня";
      } else {
        return parseInt(value) + " дней";
      }
    },
  },
});

//калькулятор

const months = {
  1: "января",
  2: "февраля",
  3: "марта",
  4: "апреля",
  5: "мая",
  6: "июня",
  7: "июля",
  8: "августа",
  9: "сентября",
  10: "октября",
  11: "ноября",
  12: "декабря",
};

rangeSliderDate.noUiSlider.on("update", function (values) {
  range2 = parseInt(values[0]);
  //берем сегодняшнюю дату
  const today = new Date();
  //обьявляем ещё одну, для изменения её
  const deadlineDate = new Date();
  //меняем дату при value
  deadlineDate.setDate(today.getDate() + parseInt(values[0]));

  dateOut.innerHTML =
    deadlineDate.getDate() +
    "  " +
    months[deadlineDate.getMonth()] +
    "  " +
    deadlineDate.getFullYear();

  calc();
});

/**************swiper weare*****************/

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 28,
  autoplay: {
    delay: 3000,
    speed: 1000,
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 35,
    },

    807: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    // when window width is >= 480px
    1193: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/**************swiper clients*****************/

const swiper2 = new Swiper(".swiper2", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 15,
  autoplay: {
    delay: 2500,
    speed: 1000,
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },

    842: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    1256: {
      slidesPerView: 3,
    },

    // when window width is >= 640px
  },
});

/****************ACORDERON***************/

const btnList = document.querySelectorAll(".faq__btn");

btnList.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    toggle(e.currentTarget.parentNode, 500);
  });
});

function show(el, duration) {
  const elBody = el.querySelector(".faq__text");
  const btn = el.querySelector(".faq__btn");
  const title = el.querySelector(".faq__title");
  const arrow = el.querySelector(".faq__arrow");
  if (elBody.classList.contains("collapsing") || el.classList.contains("show")) {
    return;
  }
  elBody.style["display"] = "block";
  const height = elBody.offsetHeight;
  elBody.style["height"] = 0;
  elBody.style["overflow"] = "hidden";
  elBody.style["transition"] = `height ${duration}ms ease`;
  elBody.classList.add("collapsing");
  el.classList.add("faq__item--open");
  btn.classList.add("faq__btn--open");
  arrow.classList.add("faq__arrow--open");
  title.classList.add("faq__title--open");
  elBody.offsetHeight;
  elBody.style["height"] = `${height}px`;
  window.setTimeout(() => {
    elBody.classList.remove("collapsing");
    elBody.classList.add("collapse");
    el.classList.add("show");
    elBody.style["display"] = "";
    elBody.style["height"] = "";
    elBody.style["transition"] = "";
    elBody.style["overflow"] = "";
  }, duration);
}
function hide(el, duration) {
  const elBody = el.querySelector(".faq__text");
  const btn = el.querySelector(".faq__btn");
  const title = el.querySelector(".faq__title");
  const arrow = el.querySelector(".faq__arrow");
  if (elBody.classList.contains("collapsing") || !el.classList.contains("show")) {
    return;
  }
  elBody.style["height"] = `${elBody.offsetHeight}px`;
  elBody.offsetHeight;
  elBody.style["display"] = "block";
  elBody.style["height"] = 0;
  elBody.style["overflow"] = "hidden";
  elBody.style["transition"] = `height ${duration}ms ease`;
  elBody.classList.remove("collapse");
  el.classList.remove("show");
  el.classList.remove("faq__item--open");
  btn.classList.remove("faq__btn--open");
  title.classList.remove("faq__title--open");
  arrow.classList.remove("faq__arrow--open");
  elBody.classList.add("collapsing");
  window.setTimeout(() => {
    elBody.classList.remove("collapsing");
    elBody.classList.add("collapse");
    elBody.style["display"] = "";
    elBody.style["height"] = "";
    elBody.style["transition"] = "";
    elBody.style["overflow"] = "";
  }, duration);
}
function toggle(el, duration) {
  if (el.classList.contains("show")) {
    hide(el, duration);
  } else {
    show(el, duration);
  }
}
