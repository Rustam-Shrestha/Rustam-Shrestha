// assets/js/script.js
window.addEventListener('scroll', () => {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

let menu = document.querySelector('.menu');
let toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
});