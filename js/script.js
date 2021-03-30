window.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    //ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ ТАБЫ 
=======
    //ТАБЫ
>>>>>>> main
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

<<<<<<< HEAD
    //ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР ТАЙМЕР 
=======
    //ТАЙМЕР
>>>>>>> main
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
<<<<<<< HEAD

    //МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО МОДАЛЬНОЕ ОКНО 

    const modalTrigger = document.querySelectorAll('.callme'),
            modalCloseBtn = document.querySelector('.modal__close'),
            modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show'); 
            modal.classList.remove('hide');
            // modal.classList.toggle('show'); // Есть вариант с тогглом.
            document.body.style.overflow = 'hidden'; // На сайте текст не скролится когда открыто окно.
        });        
    
    });

    function modalClose() {
        modal.classList.add('hide');
        modal.classList.remove('show');

        // modal.classList.toggle('show');
        document.body.style.overflow = ''; // Да да да тут пустые кавычки.
    }

    modalCloseBtn.addEventListener('click', modalClose);
        
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        // // modal.classList.toggle('show');
        // document.body.style.overflow = ''; // Да да да тут пустые кавычки.



    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modalClose();
            // modal.classList.add('hide');
            // modal.classList.remove('show');
            // // modal.classList.toggle('show');
            // document.body.style.overflow = ''; // Да да да тут пустые кавычки.
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    }); 
    

=======
>>>>>>> main
});