function modal() {
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
}

module.exports = modal;