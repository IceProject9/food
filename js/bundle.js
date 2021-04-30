/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span'); // записали результат калькулятора, обращаю внимание что в селекьторы записан не только класс но и спан (там два спана, но выберется первый спан, который отвечает за число)

    let sex, height, weight, age, ratio // просто создали переменные которые отвечают за пол, рост, вес, возраст, и ратио (активность)

    if (localStorage.getItem('sex')) { // играемся с локалсторожем, если в стороже сохранён какой то пол, то
        sex = localStorage.getItem('sex') // в калькуляторе присваивается этот пол
    } else {
        sex = 'female'; // если в стороже нету пола то по умолчанию своит "женщина"
        localStorage.setItem('sex', 'female'); // и в сторож тоже записывается женщина
    }

    if (localStorage.getItem('ratio')) { // та же фигня что и сверху только для ратио
        ratio = localStorage.getItem('ratio') // та же фигня что и сверху только для ратио
    } else {
        ratio = 1.375; // та же фигня что и сверху только для ратио
        localStorage.setItem('ratio', 1.375); // та же фигня что и сверху только для ратио
    }

    function initLocalSettings(selector, activeClass) { // вобщем, так как при обновлении сайта значения пола и ратио не стоят по умолчанию, для исправления данного бага мы создадим новую функцию
        const elements = document.querySelectorAll(selector) // тупо выбрали все статичные элементы
        elements.forEach(elem => { // смысл данной функции в том чтобы сначала удалить у всех статичных элементов класс активности а потом повесить класс той кнопке, которая сохранилась в локал стороже
            elem.classList.remove(activeClass); // тут удаляется активный класс
            if (elem.getAttribute('id') === localStorage.getItem('sex')) { // если в локал стороже есть значение пола которое совпадает с названием пола на кнопках (то есть, если в локал стороже есть какой то пол)
                elem.classList.add(activeClass); // то на эту кнопку вешается класс активности
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // то же самое с дата ратио
                elem.classList.add(activeClass); // то же самое
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active'); // просто вызываем функцию с локал сторожем для статики и для динамики
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() { // создаём функцию для вычисления ккал
        if (!sex || !height || !weight || !age || !ratio ) { // но начинаем мы её с проверки, если хоть какого-то значения нет или его не ввели (оператор ! означает отрицание)
            result.textContent = "____" // то результат не будет выводится
            return; // прерывание функции, она остановится здесь
        }

        if (sex === 'female') { //если выбран пол "женщина"
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio) // ну тут взята формула из сайта по расчёту нормы ккал и умноженая на ратио, то есть активность, добавили Math.round стобы калькулятор выдавал целые значения

        } else { // но если "пол" выбран "мужчина", то...

            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio) // тут формула расчёта для мужчин, добавили Math.round стобы калькулятор выдавал целые значения
        }

        
    }    
    calcTotal(); // вызываем функцию сверху, обрати внимание что мы должны тсавить эту функцию в конце функции по заданию статических и динамических данных калькулятора, снизу больше инфы

    function getStaticInformation (selector, activeClass) { // создаём функцию для получения статической инфы (это та инфа которая не меняется но которую можно выбрать переключателями, т.е. пол и ратио), записали в перменные родителя и активный класс (нет такого метода вызова как parentSelector, не путайся!!! в перменные можно записывать что угодно лишь бы тебе удобно было)
        const elements = document.querySelectorAll(selector); // слушай сюда, мы просто в элементы записали ВСЕХ родителей дива, если посмотреть вёрстку то там есть айди и после него идёт див, то есть сюда записываются все айди и метки которые мы ставили, то есть все ратио и пол мужчина / женщина.

        elements.forEach(elem => { // прописываем каждому родителю 
            elem.addEventListener('click', (e) => { // просто вешаем на какого то родителя клик, обрати внимание как вызывается родитель, и мы также повесили само событие 'e'
                if (e.target.getAttribute('data-ratio')) { // вобщем суть в том что тут мы пишем функцию для двух типов кнопок, если под таргетом мыши есть аттрибут ОТ дата-ратио (то есть если мы кликнули на любое ратио)
                    ratio = +e.target.getAttribute('data-ratio'); // то ратио будет равно атрибуту от дата-ратио (они там равны 1.2, 1.375 итд) и потом оно идёт в формулу
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // чтобы инфа. которую забивает пользователь в калькулятор сохранялась, мы в локалсторож будем помещать значение ратио и пола ниже
    
                } else { // НО если мы кликнули на пол мужчина или женщина то
                     sex = e.target.getAttribute('id'); // в форумулу пойдёт айди под мышкой, а это либо male либо female
                     localStorage.setItem('sex', e.target.getAttribute('id')); // записываем в локалсторож пол
                }
    
    
    
                elements.forEach(elem => { // дальше мы прописываем для всех статичных элементов в калькуляторе функцию forEach...
                    elem.classList.remove(activeClass); // которая убирает у всех элементов класс активации (подсвечивает их)
                    
                });
                e.target.classList.add(activeClass); // и после этого когда класс активации пропал у всех кнопок мы добавляем класс активации именно той кнопке на которую кликаем.
    
                calcTotal(); // дело в том что мы должны пересчитывать итоговое значение после каждого действия пользователя, поэтому это не последний раз когда мы видим эту функцию
    
            })
        })

       
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); // вызываем прописанную функцию сначала для гендера, в скобках указываем айди гендерного блока, а потом класс активации кнопки (подсветки)
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // вызываем функцию для ратио и активируем кнопку

    function getDynamicInformation(selector) { // ага, это функция для получения инпутов в калькуляторе, причём для любого из трёх.
        const input = document.querySelector(selector);

        input.addEventListener('input', () => { // вешаем обработчик событий "пользователь чото вводит" на окно ввода данных

            if(input.value.match(/\D/g)) { // мы хотим сказать пользователю что он ввёл неверные данные, поэтому если в инпуте у нас введены НЕ ЧИСЛА (/\D/), то
                input.style.border = '1px solid red'; // ну например пусть граница у инпута окрасится в красный цвет
            } else {
                input.style.border = 'none'; // ну а если введены числа то ничего не происходит
            }

            switch(input.getAttribute('id')) { //функция свич, первый раз встречается в курсе, её смысл такой: она заменяет несколько if, а фраза брейк запускает проверку заново
                case 'height': // если была запись в "росте"
                    height = +input.value; // то в переменную "рост" в формуле записывается значение инпута
                    break; 
                case 'weight': // то же с весом
                    weight = +input.value; // то же с весом
                    break;
                case 'age': //то же с возрастом
                    age = +input.value; // то же с возрастом
                    break;
            }
            calcTotal(); // это последний раз когда мы пересчитываем итоговое значение калькулятора, благодаря пересчёту калькулятор меняется динамически при изменении инпута

        })
        
    }
    getDynamicInformation('#height'); // просто вызывает функцию три раза с тремя разными переменными
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chanceToUAH();
        }

        chanceToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }



    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
          

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
   function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
    }, 4000);

}

}

   /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalClose": () => (/* binding */ modalClose),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = ''; // Да да да тут пустые кавычки.
};
    
function modalOpen(modalSelector, modalTimerId  ) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show'); 
    modal.classList.remove('hide');
    // modal.classList.toggle('show'); // Есть вариант с тогглом.
    document.body.style.overflow = 'hidden'; // На сайте текст не скролится когда открыто окно.

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector);



    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
    });

    

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == "") {
            modalClose(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector);
        }
    }); 

    function showModalByScroll() {
        if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
    
        prevModalDialog.classList.add('hide');
        modalOpen(modalSelector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose(modalSelector);
        }, 4000);
    }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide), // в переменную запихиваем все 4 слайда
             slider = document.querySelector(container), // тут мы запихнули слайдер
             next = document.querySelector(nextArrow), // кнопка "следующий слайд"
             prev = document.querySelector(prevArrow), // кнопка "предыдущий слайд"
             total = document.querySelector(totalCounter), // число которое показывает сколько всего слайдов (их 4 пока что)
             current = document.querySelector(currentCounter), // число которое показывает на каком мы сейчас слайде находимся
             slidesWrapper = document.querySelector(wrapper), // это враппер, на нём находятся все слайды, которые сшиты один за другим
             slidesField = document.querySelector(field), // это окно через которое показываются слайды, одновременно показывается только один слайд
             width = window.getComputedStyle(slidesWrapper).width; // ширина ВСЕХ слайдов, добытая при помощи getComputedStyle (данное св-во предоставляет доступ ко всем стилям на объекте враппер и свойство width добывает свойство ширины)

    let slideIndex = 1; // пусть номер первого слайда всегда будет равен 1 
    let offset = 0; // положение оффсета по умолчанию НОЛЬ
    function currentZero () {          // я записал эти две функции чтобы сократить код, данная функция просто пришивает нуль спереди общему числу слайдов если их меньше 10 и не пришивает если больше 10
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function sliceWidth() {
        return +width.match(/\d/g).join('');
    }

    function dotsOpacity () { // функция для сокращения кода, добавляет всем точкам опасити 50% и дорбавляет точке на которой мы сейчас находимся опасити 100%
        indicators.forEach(dot => dot.style.opacity = '.5'); 
        indicators[slideIndex - 1].style.opacity = 1;
    }    

    if (slides.length < 10) { // если количество всех слайдов меньше 10
        total.textContent = `0${slides.length}`; // то к числу которое показывает сколько у нас всего слайдов мы пришьём спереди нуль
        current.textContent = `0${slideIndex}`; // то же самое мы сделаем с числом которое показывает на каком мы слайде
    } else { // но если слайдов больше 10 
        total.textContent = slides.length; // то мы ничего не будем им пришивать спереди
        current.textContent = slideIndex; // и тут тоже
    }

    slidesField.style.width = 100 * slides.length + '%'; // здесь мы вычисляем ширину для поля показа окна, она равна 400% (100 * кол-во слайдов + %)
    slidesField.style.display = 'flex'; // стилю дисплей придаём флекс (зачем?)
    slidesField.style.transition = '0.5s all'; // это стиль транзишн, с его помощью происходит плавный переход от одного слайда к следующему

    slidesWrapper.style.overflow = 'hidden'; //так как у нас широкое поле мы прячем оверфлоу чтобы показывался одновременно только один слайд

    slides.forEach(slide => { // в слайдах для каждого слайда 
        slide.style.width = width; //мы подгоняем все слайды под одну ширину (??? зачем я закомментил эьтот код и всё было хорошо, но слайды и так подобраны с одинаковой шириной, вобщем оставлю пока так) 

    });

    slider.style.position = 'relative'; // позиция слайдера относительная

    const dots = document.createElement('ol'), // создаём упорядоченный список (organized list) и запихиваем в dots (у Ивана был indicators)
          indicators = []; // просто присваиваем массив к переменной indicators (у ивана был dots)
    dots.classList.add('carousel-indicators'); // не знаю зачем но прикрутили всем точкам для слайдов класс карусель-индикаторс
    dots.style.cssText = ` 
    position: absolute; 
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `; // пишем цсс текст со стилями расположения ко всем точкам, их взяли из файла к уроку 

    slider.append(dots); // добавляем к слайдеру точки

    for (let i = 0; i < slides.length; i++ ) { // короче данная функция будет создавать столько объектов сколько запишешь в slides.length (пока что 4)
        const dot = document.createElement('li'); // создаётся 4 пункта для списка (это будут точки на слайдере) 
        dot.setAttribute('data-slide-to', i + 1) // тут мы просто кажой точке присвоили атрибут data-slide-to и пронумеровали их от 1 до 4 (потому что i для первого слайда будет равен нулю лул)
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `; // пишем стили для каждой точки
        if (i==0) { // если мы находимся на первом слайде то точка
            dot.style.opacity = 1; // становится белее (первая точка)

        }

        dots.append(dot); // добавляем к списку ol пункты li (то есть добавляем к расположению точке сами точки)
        indicators.push(dot); // запушим в массив все пункты li (все 4 точки)
    }

    next.addEventListener('click', () => { //КНОПКА ВЕРЁД мы на неё кликаем и что то происходит
        if (offset == sliceWidth() * (slides.length - 1)) { //короче тут сложное вычисление нашего текущего положения на слайдере: плюс делает наш объект числом, слайс вырезает из строки символы - нуль это начало, width.length это ширина в пикселях и мы две буквы px вырезаем при помощи -2
            offset = 0; // короче, если мы находились в конце слайдо шоу то мы вернёмся в начало 
        } else {
            offset += sliceWidth(); // если мы не в конце мы пролистнём слайд вперёд
        }
        slidesField.style.transform = `translateX(-${offset}px)`; // тут всему филду присваивается класс стиля трансформ 

        if (slideIndex == slides.length) { // если мы находимся в конце слайдера, то
            slideIndex = 1; // если нажмём кнопку "вперёд" мы переместимся в начало слайдера
        } else {
            slideIndex++; // но если мы не находимся в конце слайдера мы просто переместимся на один слайд вперёд
        }
        currentZero(); // эти две функции я прописал в самом начале этого блока. эта функция пришивает или не пришивает нуль перед числом, которое показывает наше текущее местоположение
        dotsOpacity(); // а эта функция прописывает опасити точкам (видимость), она присваивает 50% опасити всем точкам и 100% опасити точке на которой мы сейчас находимся
        })

        prev.addEventListener('click', () => {  //КНОПКА НАЗАД
        if (offset == 0) {                  //ЕСЛИ МЫ НАХОДИМСЯ В НАЧАЛЕ СЛАЙДШОУ
            offset = sliceWidth() * (slides.length - 1) //ТО ПРИ НАЖАТИИ КНОПКИ НАЗАД МЫ ПЕРЕМЕСТИМСЯ НП ПОСЛЕДНИЙ СЛАЙД 
        } else { // ИНАЧЕ
            offset -= sliceWidth(); // МЫ ПРОСТО ПЕРЕМЕСТИМСЯ НА ПРЕДЫДУЩИЙ СЛАЙД
        }
        slidesField.style.transform = `translateX(-${offset}px)`; // присваиваем всем слайдам css стиль трансформ и прописываем на сколько px он будет перемещаться при каждом нажатии кнопки

        if (slideIndex == 1) { // если при перемещении НАЗАД мы находимся на первой странице, то 
            slideIndex = slides.length; // мы уходим на последний слайд ( то есть возврат с 1го на 4й)
        } else {
            slideIndex--; // ну а если мы не на первом слайде то мы от числа слайдИндекс отнимаем 1
        }
        currentZero(); // просто функция которая пришивает нуль перед числом, я уже её описывал выше
        dotsOpacity(); // просто функция, которая задаёт опасити точкам и точке на которой мы сейчас находимся, описывал её выше
        })

        indicators.forEach(dot => { // каждой точке в массиве
            dot.addEventListener('click', (e) => { //вешаем событие клик мышью
                const slideTo = e.target.getAttribute('data-slide-to') // тут мы получаем id от той точки на которую кликнули
                slideIndex = slideTo; // присваиваем числу которое будет показывать на каком мы слайде id точки на которую кликнули
                offset = sliceWidth() * (slideTo - 1) // выставляем положение слайдера в то место куда надо 
                slidesField.style.transform = `translateX(-${offset}px)`; // плавно пересещаем слайдер при помощи стиля трансформ

                currentZero(); // использовал функцию которая пришивает ноль перед числом
                dotsOpacity(); // опять та же функция про опасити
            })


        });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) { // когда нибудь я напишу что происходит в этом модуле Kappa
    const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(kusok => {
            kusok.classList.add('hide');
            kusok.classList.remove('show', 'fade');

        });
        tabs.forEach(kusok => {
            kusok.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((kusok, i) => {
            if (target == kusok) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }

    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {


    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( (t / (1000 * 60 * 60 * 24)) ),
              seconds = Math.floor((t / 1000) % 60),
              minutes = Math.floor((t / 1000 / 60) % 60),
              hours = Math.floor((t / (1000 * 60 * 60) % 24));
              

        return {
            'total': t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
        };         
    }

    function getZero(num) {
        if (num >=0 && num <10) {
            return `0${num}`;
        } else {
        return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();


        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <=0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    let res = await  fetch(url, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Не смог зафетчить ${url}, состояние: ${res.status}`);
    }


    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.modalOpen)('.modal', modalTimerId), 50000);
    
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-12-12');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',


    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map