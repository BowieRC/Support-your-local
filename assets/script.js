var homeNavEl = $('#home-nav');
var aboutNavEl = $('#about-nav');
var contactNavEl = $('#contact-nav');


//Event listener on nav items changes url to other page
aboutNavEl.on('click', function () {
    document.location.assign('./about.html');
  });

contactNavEl.on('click', function () {
    document.location.assign('./contact.html');
});

//Click event causes reload
homeNavEl.on('click', function() {
    location.reload();
});


//Below is script relevant to Contact and About Pages
var backNavEl = $('#back-nav');

backNavEl.on('click', function () {
    document.location.assign('./index.html');
})

//code for nav hamburger to toggle 
$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
  });