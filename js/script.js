window.addEventListener('DOMContentLoaded', () => {
    //ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ 
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(kusok => {
            kusok.classList.add('hide');
            kusok.classList.remove('show', 'fade');

        });
        tabs.forEach(kusok => {
            kusok.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((kusok, i) => {
                if (target == kusok) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР 
    const deadline = '2021-04-28';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60));

        return {
            'total': t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
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
              seconds = timer.querySelector('#seconds');
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

    setClock('.timer', deadline);

    //МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО 

    const modalTrigger = document.querySelectorAll('.callme'),
            modal = document.querySelector('.modal');

    function modalClose() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = ''; // Да да да тут пустые кавычки.
    };
        
    function modalOpen() {
        modal.classList.add('show'); 
        modal.classList.remove('hide');
        // modal.classList.toggle('show'); // Есть вариант с тогглом.
        document.body.style.overflow = 'hidden'; // На сайте текст не скролится когда открыто окно.
        // clearInterval(modalTimer);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', modalOpen);
    });

    

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == "") {
            modalClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    }); 

    const modalTimer = setTimeout(modalOpen, 50000);

    function showModalByScroll() {
        if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР 

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

    const getResource = async (url) => {
        const res = await  fetch(url);

        if (!res.ok) {
            throw new Error(`Не смог зафетчить ${url}, состояние: ${res.status}`);
        }


        return await res.json();
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // 
    
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
    });

    // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН // АЯКС ДЖЕЙСОН 

    const forms = document.querySelectorAll('form');
          

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await  fetch(url, {
            method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
        });

        return await res.json();
    }

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

            postData('http://localhost:3000/requests', json)
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

    //КРАСИВОЕ СПАСИБО //КРАСИВОЕ СПАСИБО //КРАСИВОЕ СПАСИБО //КРАСИВОЕ СПАСИБО //КРАСИВОЕ СПАСИБО //КРАСИВОЕ СПАСИБО //КРАСИВОЕ СПАСИБО 

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
    
        prevModalDialog.classList.add('hide');
        modalOpen();

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
            modalClose();
        }, 4000);
    }

    // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР // СЛАЙДЕР 

    const slides = document.querySelectorAll('.offer__slide'), // в переменную запихиваем все 4 слайда
             slider = document.querySelector('.offer__slider'), // тут мы запихнули слайдер
             next = document.querySelector('.offer__slider-next'), // кнопка "следующий слайд"
             prev = document.querySelector('.offer__slider-prev'), // кнопка "предыдущий слайд"
             total = document.querySelector('#total'), // число которое показывает сколько всего слайдов (их 4 пока что)
             current = document.querySelector('#current'), // число которое показывает на каком мы сейчас слайде находимся
             slidesWrapper = document.querySelector('.offer__slider-wrapper'), // это враппер, на нём находятся все слайды, которые сшиты один за другим
             slidesField = document.querySelector('.offer__slider-inner'), // это окно через которое показываются слайды, одновременно показывается только один слайд
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

    const reg = /\d/g; // мы прокачали свои скилы и узнали про регулярки, я применю эти знания тут чтобы не слайсить ширину

    function sliceWidth () { // было задание записать функцию для ренулярных выражений
        return +width.match(reg).join(''); // здесь я забыл про ретурн, функция должна возвращать строку, + в начале для того чтобы это было числом, джойн для того чтобы из массива собрать число а регулярное выражение отделит числа от букв (px)
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



    
    
});

