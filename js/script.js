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
            modalCloseBtn = document.querySelector('.modal__close'),
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

    modalCloseBtn.addEventListener('click', modalClose);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modalClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    }); 

    // const modalTimer = setTimeout(modalOpen, 5000);

    function showModalByScroll() {
        if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР КОНСТРУКТОР 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chanceToUAH();
        }

        chanceToUAH() {
            this.price = this.price * this.transfer
        }
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    </div>
             `;
             this.parent.append(element);       
        }
    }

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        5,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        `Меню “Постное”`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        7,
        '.menu .container'
    ).render();
});