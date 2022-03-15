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

(function($) {
    window.fnames = new Array(); 
    window.ftypes = new Array();
    fnames[0]='EMAIL';
    ftypes[0]='email';
    fnames[1]='FNAME';
    ftypes[1]='text';
    fnames[2]='LNAME';
    ftypes[2]='text';
    fnames[3]='ADDRESS';
    ftypes[3]='address';
    fnames[4]='PHONE';
    ftypes[4]='phone';
    fnames[5]='BIRTHDAY';
    ftypes[5]='birthday';
}

(jQuery));

var $mcj = jQuery.noConflict(true);

