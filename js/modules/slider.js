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


export default slider;