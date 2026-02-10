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

    function setNavPaneHeight() {
        if (!nav) return;
        var h = window.innerHeight + 'px';
        nav.style.setProperty('--viewport-height', h);
        nav.style.height = h;
        nav.style.minHeight = h;
    }

    function openMenu() {
        setNavPaneHeight();
        document.body.classList.add('nav-open');
        nav.classList.add('nav-active');
        navLinks.forEach(function (link, index) {
            link.style.animation = 'navLinkFade 0.35s ease forwards ' + (index * 0.05 + 0.1) + 's';
        });
        if (burger) {
            burger.classList.add('open', 'toggle');
            burger.setAttribute('aria-expanded', 'true');
        }
    }

    window.addEventListener('resize', setNavPaneHeight);
    window.addEventListener('orientationchange', function () {
        setTimeout(setNavPaneHeight, 100);
    });

    function closeMenu() {
        document.body.classList.remove('nav-open');
        nav.classList.remove('nav-active');
        navLinks.forEach(function (link) {
            link.style.animation = '';
        });
        if (burger) {
            burger.classList.remove('open', 'toggle');
            burger.setAttribute('aria-expanded', 'false');
        }
    }

    function toggleMenu() {
        if (nav.classList.contains('nav-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (burger) {
        burger.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMenu();
        });
        burger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    navLinks.forEach(function (link) {
        var a = link.querySelector('a');
        if (!a) return;
        a.addEventListener('click', function () {
            setTimeout(closeMenu, 10);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('nav-active')) {
            closeMenu();
        }
    });

    var backdrop = document.getElementById('nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'nav-backdrop';
        backdrop.className = 'nav-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
    }
    backdrop.addEventListener('click', closeMenu);
}

navSlide();

const imageFiles = [
    "IMG_3990.JPG", "IMG_3991.JPG", "IMG_3992.JPG", "IMG_3993.JPG",
    "IMG_3994.JPG", "IMG_3995.JPG", "IMG_3996.JPG", "IMG_3997.JPG",
    "IMG_3998.JPG", "IMG_3999.JPG", "IMG_4001.JPG"
];

function setupSlideshow() {
    const track = document.getElementById("slideshow-images");
    const slideshowContainer = document.getElementById("slideshow-container");

    if (!track || !slideshowContainer) return;

    imageFiles.forEach(function (image) {
        const img = new Image();
        img.src = "images/photos/highlights/" + image;
        img.classList.add("slideshow-img");
        img.loading = "lazy";
        img.alt = "Run to Give event photo";
        track.appendChild(img);
    });

    const images = track.querySelectorAll(".slideshow-img");
    const totalSlides = images.length;
    const total = totalSlides;

    function setSlideWidths() {
        var w = slideshowContainer.offsetWidth;
        if (!w) return;
        track.style.width = (totalSlides * w) + "px";
        images.forEach(function (img) {
            img.style.flex = "0 0 " + w + "px";
            img.style.minWidth = w + "px";
            img.style.maxWidth = w + "px";
        });
    }

    setSlideWidths();
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
        setSlideWidths();
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