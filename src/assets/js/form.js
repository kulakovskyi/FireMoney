console.log("Работает только на form");

//тамер обратного отсчета

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  //let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  //let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    //days: days,
    //hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  //let daysSpan = document.querySelector(".days");
  //let hoursSpan = document.querySelector(".form__timer__hours");
  let minutesSpan = document.querySelector(".form__timer__hours span");
  let secondsSpan = document.querySelector(".form__timer__minutes span");

  function updateClock() {
    let t = getTimeRemaining(endtime);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      //и тут меняем значение, что бы счетчик сбрасывался
      let deadline = new Date(Date.parse(new Date()) + 180 * 1000);
      initializeClock("countdown", deadline);
    }

    //daysSpan.innerHTML = t.days;
    //hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

//тут вводим количестов секунд до начала отсчета
let deadline = new Date(Date.parse(new Date()) + 180 * 1000);
initializeClock("countdown", deadline);

//slider range

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

//form validation

//заголовок на форме, которы мы скрываем после первого шага
const title = document.querySelector(".form__title");
//полоска состояния
const sideLine = document.querySelector(".sidebar__line");
//первая позиция формы
const formStep1 = document.querySelector(".form__step__1");
//вторая позиция формы
const formStep2 = document.querySelector(".form__step__2");
//третья позиция формы
const formStep3 = document.querySelector(".form__step__3");
//четвертая позиция формы
const formStep4 = document.querySelector(".form__step__4");
//пятая позиция формы
const formStep5 = document.querySelector(".form__step__5");
//шестая позиция формы
const formStep6 = document.querySelector(".form__step__6");
//седьмой позиция формы
const formStep7 = document.querySelector(".form__step__7");
//седьмой позиция формы
const formStep8 = document.querySelector(".form__step__8");
//кнопка на первой форме
const buttonStep1 = document.querySelector(".btn-step1");
//кнопка на второй форме
const buttonStep2 = document.querySelector(".btn-step2");
//кнопка на четвертой форме
const buttonStep4 = document.querySelector(".btn-step4");
//кнопка на пятой форме
const buttonStep5 = document.querySelector(".btn-step5");
//кнопка на пятой форме
const buttonStep6 = document.querySelector(".btn-step6");
//счетчик форм на странице
const stepCounter = document.querySelector(".step-counter");
//инпуты на первом шаге
const formInputs1 = document.querySelectorAll(".js-input-1");
const checkBox = document.querySelector(".js-check");
const labelCheck = document.querySelector(".label-check");
//sidebar
const sideBar = document.querySelector(".form__sidebar");

let count = 1;

//функция запрета ввода цыфр в текстовые поля
function noDigits(event) {
  if ("1234567890".indexOf(event.key) != -1) event.preventDefault();
}
/* в html вставляем <input type="text" onkeypress="noDigits(event)" />**/

/**************************************************/

//mask on tel
const telInput = document.querySelector(".js-tel");
let maskOptions = {
  mask: "+{7}(000)000-00-00",
};
let mask = IMask(telInput, maskOptions);

//валидация первого шага

buttonStep1.addEventListener("click", (event) => {
  //массив из всех пустых инпутов
  emptyInputs = Array.from(formInputs1).filter((input) => input.value === "");
  //проверка инпута на пустоту
  formInputs1.forEach(function (input) {
    if (input.value === "") {
      input.classList.add("_error");
    } else {
      input.classList.remove("_error");
    }
  });

  //проверка чекбокса на пустоту
  if (!checkBox.checked) {
    labelCheck.classList.add("_error");
  } else {
    labelCheck.classList.remove("_error");
  }

  //блокировка кнопки до момента, пока все инпуты не будут заполнены
  if (emptyInputs.length !== 0 || !checkBox.checked) {
    console.log("inputs not filled");
  } else {
    //off title
    title.style.display = "none";
    //off step1
    formStep1.classList.add("_close");
    //on step1
    formStep2.classList.add("_open");
    //off btn1
    buttonStep1.style.display = "none";
    //on btn2
    buttonStep2.style.display = "block";

    count++;
    stepCounter.innerHTML = count;
  }
});

buttonStep2.addEventListener("click", () => {
  count++;
  stepCounter.innerHTML = count;
  formStep2.style.display = "none";
  formStep3.classList.add("_open");
  sideLine.classList.add("_count2");
  buttonStep2.style.display = "none";
  buttonStep4.style.display = "block";
  buttonStep4.disabled = true;

  //убираем загрузку спустя 3 секунд
  if (formStep3.classList.contains("_open")) {
    function closestep3() {
      formStep3.classList.remove("_open");
      formStep3.style.display = "none";
      sideLine.classList.add("_count3");
      count++;
      stepCounter.innerHTML = count;
      buttonStep4.disabled = false;
      formStep4.classList.add("_open");
    }

    setTimeout(closestep3, 3000);
  }
});

//step4
buttonStep4.addEventListener("click", () => {
  formStep4.classList.remove("_open");
  formStep4.style.display = "none";
  formStep5.classList.add("_open");
  sideLine.classList.add("_count4");
  buttonStep4.style.display = "none";
  buttonStep5.style.display = "block";
  count++;
  stepCounter.innerHTML = count;

  //функция для таймера в 60 секунд
  function initializeClock(id, endtime) {
    let secondsSpan = document.querySelector(".counter__sms");

    function updateClock() {
      let t = getTimeRemaining(endtime);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
  }

  //тут вводим количестов секунд до начала отсчета
  let deadline = new Date(Date.parse(new Date()) + 180 * 1000);
  initializeClock("countdown", deadline);
});

//step6
buttonStep5.addEventListener("click", () => {
  formStep5.classList.remove("_open");
  formStep5.style.display = "none";
  formStep6.classList.add("_open");
  sideLine.classList.add("_count5");
  buttonStep5.style.display = "none";
  buttonStep6.style.display = "block";
  count++;
  stepCounter.innerHTML = count;
});

//step

buttonStep6.addEventListener("click", () => {
  formStep6.classList.remove("_open");
  formStep6.style.display = "none";
  formStep7.classList.add("_open");
  sideLine.classList.add("_count6");
  buttonStep6.style.display = "none";
  count++;
  stepCounter.innerHTML = count;

  //убираем загрузку спустя 5 секунд
  if (formStep7.classList.contains("_open")) {
    //уберем рамку на последнем етапе
    let formBack = document.querySelector(".form__back");

    function closestep7() {
      formStep7.classList.remove("_open");
      formStep7.style.display = "none";
      sideBar.style.display = "none";
      formStep8.classList.add("_open");
      formBack.classList.add("_remove");
    }

    setTimeout(closestep7, 5000);
  }
});

/********************************************************************/
//acordeon step2

class ItcAccordion {
  constructor(target, config) {
    this._el = typeof target === "string" ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350,
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener("click", (e) => {
      const elHeader = e.target.closest(".accordion__header");
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector(".accordion__item_show");
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector(".accordion__body");
    if (elBody.classList.contains("collapsing") || el.classList.contains("accordion__item_show")) {
      return;
    }
    elBody.style["display"] = "block";
    const height = elBody.offsetHeight;
    elBody.style["height"] = 0;
    elBody.style["overflow"] = "hidden";
    elBody.style["transition"] = `height ${this._config.duration}ms ease`;
    elBody.classList.add("collapsing");
    el.classList.add("accordion__item_slidedown");
    elBody.offsetHeight;
    elBody.style["height"] = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove("collapsing");
      el.classList.remove("accordion__item_slidedown");
      elBody.classList.add("collapse");
      el.classList.add("accordion__item_show");
      elBody.style["display"] = "";
      elBody.style["height"] = "";
      elBody.style["transition"] = "";
      elBody.style["overflow"] = "";
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector(".accordion__body");
    if (elBody.classList.contains("collapsing") || !el.classList.contains("accordion__item_show")) {
      return;
    }
    elBody.style["height"] = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style["display"] = "block";
    elBody.style["height"] = 0;
    elBody.style["overflow"] = "hidden";
    elBody.style["transition"] = `height ${this._config.duration}ms ease`;
    elBody.classList.remove("collapse");
    el.classList.remove("accordion__item_show");
    elBody.classList.add("collapsing");
    window.setTimeout(() => {
      elBody.classList.remove("collapsing");
      elBody.classList.add("collapse");
      elBody.style["display"] = "";
      elBody.style["height"] = "";
      elBody.style["transition"] = "";
      elBody.style["overflow"] = "";
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains("accordion__item_show") ? this.hide(el) : this.show(el);
  }
}

new ItcAccordion(document.querySelector(".accordion"), {
  alwaysOpen: false,
});
