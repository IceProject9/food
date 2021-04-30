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


export default tabs;