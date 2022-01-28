// COLOUR PALLETTE

// White: #FFFFFF
// Yellow: #FAE5B4
// Organge: #F9B495
// Pink: #F0576B
// Purple: #8C86AA
// Blue: #46B1C9

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => { 
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.2}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
}


navSlide();