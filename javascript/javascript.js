// COLOUR PALLETTE

// White: #FFFFFF
// Yellow: #FAE5B4
// Organge: #F9B495
// Red: #CC2F4D
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

$(document).ready(function(){
	$('#burger').click(function(){
		$(this).toggleClass('open');
	});
});


navSlide();

const imageFiles = []; 

for (let i = 1; i <= 28; i++) {imageFiles.push(`image${i}.jpg`);}
// Array of image file names

// Function to load images and set up slideshow
function setupSlideshow() {
    const container = document.getElementById("slideshow-images");

    // Load images and append them to container
    imageFiles.forEach(image => {
        const img = new Image();
        img.src = 'images/photos/' + image;
        img.classList.add("slideshow-img");
        container.appendChild(img);
    });

    let currentIndex = 0;
    const images = document.querySelectorAll('.slideshow-img');
    const slideshowContainer = document.getElementById('slideshow-container');

    function slide() {
        currentIndex = (currentIndex) % images.length;
        const offset = -currentIndex * slideshowContainer.offsetWidth;
        container.style.transform = `translateX(${offset}px)`;
    }

    // Auto-transition every 5 seconds
   /*setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        slide();
    }, 10000);
    */

    // Add event listeners for the buttons to navigate the slideshow
    document.getElementById('prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        slide();
    });
    

    document.getElementById('next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        slide();
    });
}

// Call setupSlideshow function when the window loads
window.onload = setupSlideshow;