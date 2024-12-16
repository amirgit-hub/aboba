
let secondMiniMainContainer = document.getElementById('second-mini-main-container');
let miniNavContainer = document.getElementById('mini-navigation-container');
let miniMainContainer = document.getElementById('mini-main-container');
let anotherContainer = document.getElementById('another-container');
let mainContainer = document.getElementById('main-container');
let navigations = document.getElementById('navigations');
let burgerMenu = document.getElementById('burger-menu');
let lines = [...document.querySelectorAll('.line')];
let navBtn = document.getElementById('btn-in-nav');
let arrowSc = document.getElementById('arrow-sc');
let slides = document.querySelectorAll('.slide');
let arrow = document.getElementById('arrow');
let dots = document.querySelectorAll('.dot');
let isNavigationOpen = 0;
let pastIndex = 0;
let scrollHeight;
let intervalId;
let x;

burgerMenu.addEventListener('click', () => {
    if (miniNavContainer.style.height === '0px' || miniNavContainer.style.height === '') {
        scrollHeight = miniNavContainer.scrollHeight;
        scrollHeight += scrollHeight/5;
        scrollHeight += 'px';
        miniNavContainer.style.height = scrollHeight;
        isNavigationOpen = 1;
        lines[0].style.transform = 'rotate(45deg) translate(4.25px, 4.25px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(4.25px, -4.25px)';
    } else {
        miniNavContainer.style.height = '0';
        isNavigationOpen = 0;
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
})

if (window.innerWidth <= 900) {
    miniNavContainer.appendChild(navBtn);
    anotherContainer.appendChild(secondMiniMainContainer);
} else {
    navigations.appendChild(navBtn);
    miniMainContainer.appendChild(secondMiniMainContainer);
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
        miniNavContainer.appendChild(navBtn);
        if (isNavigationOpen) {
            miniNavContainer.style.height = scrollHeight;
        } else {
            miniNavContainer.style.height = '0';
        }
        anotherContainer.appendChild(secondMiniMainContainer);
    } else {
        navigations.appendChild(navBtn);
        miniNavContainer.style.height = 'auto';
        miniMainContainer.appendChild(secondMiniMainContainer);
    }
});

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(() => arrowSc.click(), 5000);
}

run();

function updateActiveSlide(index) {
    if (pastIndex === index) {
        return;
    }
    slides[pastIndex].classList.remove('active');
    dots[pastIndex].classList.remove('active');

    pastIndex = index;

    slides[pastIndex].classList.add('active');
    dots[pastIndex].classList.add('active');

    run();
}

arrow.addEventListener('click', () => {
    x = pastIndex - 1;
    if (x < 0) {
        x = dots.length - 1;
    }
    updateActiveSlide(x);
})

arrowSc.addEventListener('click', () => {
    x = (pastIndex + 1) % dots.length;
    updateActiveSlide(x);
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateActiveSlide(index));
})