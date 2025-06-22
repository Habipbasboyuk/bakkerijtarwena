const $hamburgerOpener = document.querySelector('.hamburger');
const $nav = document.querySelector('.nav__list');
$hamburgerOpener.addEventListener('click', () => {
    $nav.classList.toggle('active');
})
