import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';






const $hamburgerOpener = document.querySelector('.hamburger');
const $nav = document.querySelector('.nav__list');
$hamburgerOpener.addEventListener('click', () => {
    $nav.classList.toggle('active');
})


const $dateDiv = document.querySelector('.footer__date');

const currentYear = new Date().getFullYear();
$dateDiv.textContent = currentYear;

const API_URL = 'http://localhost:1337/api/specialties?populate=*';

const fetchSpecialties = async() => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


const $specialtiesContainer = document.querySelector('.specialties__list');

const BASE_URL = 'http://localhost:1337';


fetchSpecialties().then(specialties => {
    if (specialties) {
        specialties.slice(0, 3).forEach(specialty => {
            const imgUrl = BASE_URL + specialty.foto.formats.medium.url;
            $specialtiesContainer.insertAdjacentHTML('beforeend', `
                <article class="specialties__item">
                    <img class="specialties__img" src="${imgUrl}" alt="Heerlijke taarten">
                    <h3 class="specialties__title">${specialty.titel}</h3>
                    <p class="specialties__description">${specialty.beschrijving}</p>
                    <div class="specialties__price">
                        <p class="price">$${specialty.prijs}</p>
                        <button class="btn specialties__btn">Bestellen</button>
                    </div>
                </article>
            `);
        });
    }
});

const $assortimentContainer = document.querySelector('.assortiment__container');

if ($assortimentContainer) {
    fetchSpecialties().then(specialties => {
        if (specialties) {
            specialties.forEach(specialty => {
                const imgUrl = BASE_URL + specialty.foto.formats.medium.url;
                $assortimentContainer.insertAdjacentHTML('beforeend', `
                    <article class="specialties__item">
                        <img class="specialties__img" src="${imgUrl}" alt="Heerlijke taarten">
                        <h3 class="specialties__title">${specialty.titel}</h3>
                        <p class="specialties__description">${specialty.beschrijving}</p>
                        <div class="specialties__price">
                            <p class="price">$${specialty.prijs}</p>
                            <button class="btn specialties__btn">Bestellen</button>
                        </div>
                    </article>
                `);
            });
        }
    });
}


const $hero = document.querySelector('.hero');
const DOT_COUNT = 5;
const dots = [];
const images = [
    'images/donuts.png',
    'images/croissant.png',
    'images/cake.webp'
];

for (let i = 0; i < DOT_COUNT; i++) {
    const dot = document.createElement('img');
    dot.classList.add('hero__dot-img');
    dot.src = images[Math.floor(Math.random() * images.length)];
    dot.style.position = 'absolute';
    const top = Math.random() * 80 + 10;
    const left = Math.random() * 90;
    dot.dataset.top = top;
    dot.dataset.left = left;
    dot.dataset.speed = (Math.random() * 0.2 + 0.05).toString();
    dot.dataset.phase = (Math.random() * Math.PI * 2).toString();
    $hero.appendChild(dot);
    dots.push(dot);
}

function animateDots(time) {
    dots.forEach(dot => {
        const speed = parseFloat(dot.dataset.speed);
        const phase = parseFloat(dot.dataset.phase);
        const baseTop = parseFloat(dot.dataset.top);
        const baseLeft = parseFloat(dot.dataset.left);

        const newTop = baseTop + Math.sin(time * 0.002 * speed + phase) * 5;
        const newLeft = baseLeft + Math.cos(time * 0.002 * speed + phase) * 5;

        dot.style.top = `${newTop}%`;
        dot.style.left = `${newLeft}%`;

        // Knipperen
    });
    requestAnimationFrame(animateDots);
}

requestAnimationFrame(animateDots);

