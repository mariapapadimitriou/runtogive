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
for (let i = 1; i <= 28; i++) { imageFiles.push(`image${i}.jpg`); }

function setupSlideshow() {
    const track = document.getElementById("slideshow-images");
    const slideshowContainer = document.getElementById("slideshow-container");

    if (!track || !slideshowContainer) return;

    imageFiles.forEach(function (image) {
        const img = new Image();
        img.src = "images/photos/" + image;
        img.classList.add("slideshow-img");
        img.loading = "lazy";
        img.alt = "Run to Give event photo";
        track.appendChild(img);
    });

    const images = track.querySelectorAll(".slideshow-img");
    const totalSlides = images.length;
    track.style.width = (totalSlides * 100) + "%";
    images.forEach(function (img) {
        img.style.flex = "0 0 " + (100 / totalSlides) + "%";
    });
    const total = totalSlides;
    let currentIndex = 0;
    let autoPlayTimer = null;
    const AUTO_PLAY_MS = 5000;

    function getOffset() {
        return -currentIndex * slideshowContainer.offsetWidth;
    }

    function goToSlide(index) {
        currentIndex = (index + total) % total;
        track.style.transform = "translateX(" + getOffset() + "px)";
    }

    function next() {
        goToSlide(currentIndex + 1);
    }

    function prev() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(next, AUTO_PLAY_MS);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    track.style.transition = "transform 0.5s ease";

    var prevBtn = document.getElementById("prev-button");
    var nextBtn = document.getElementById("next-button");
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); startAutoPlay(); });

    slideshowContainer.addEventListener("mouseenter", stopAutoPlay);
    slideshowContainer.addEventListener("mouseleave", startAutoPlay);
    slideshowContainer.addEventListener("focusin", stopAutoPlay);
    slideshowContainer.addEventListener("focusout", startAutoPlay);

    var touchStartX = 0;
    var touchEndX = 0;
    slideshowContainer.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
    }, { passive: true });
    slideshowContainer.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
            startAutoPlay();
        }
    }, { passive: true });

    function onResize() {
        track.style.transition = "none";
        track.style.transform = "translateX(" + getOffset() + "px)";
        requestAnimationFrame(function () {
            track.style.transition = "transform 0.5s ease";
        });
    }
    window.addEventListener("resize", onResize);

    goToSlide(0);
    startAutoPlay();
}

window.addEventListener("load", setupSlideshow);