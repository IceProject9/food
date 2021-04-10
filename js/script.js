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

    const slides = document.querySelectorAll('.offer__slide'),
             next = document.querySelector('.offer__slider-next'),
             prev = document.querySelector('.offer__slider-prev'),
             total = document.querySelector('#total'),
             current = document.querySelector('#current');
    let slideIndex = 1;
    

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach( item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }


    prev.addEventListener('click', () => {
        plusSlides(-1);
   
    });

    next.addEventListener('click', () => {
        plusSlides(1);
        
    });
});