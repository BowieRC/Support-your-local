var homeNavEl = $('#home-nav');
var aboutNavEl = $('#about-nav');
var contactNavEl = $('#contact-nav');


//Event listener on nav items changes url to other page
aboutNavEl.on('click', function () {
    document.location.replace('./about.html');
  });

contactNavEl.on('click', function () {
    document.location.replace('./contact.html');
});

//Click event causes reload
homeNavEl.on('click', function() {
    location.reload();
});

//Below is script relevant to pages with Back button
function backButton() {
    var backNavEl = $('#back-nav');
    backNavEl.on('click', function () {
        document.location.replace('./index.html');
    });
};

//open and close new windows
$(document).ready(function() {
    var newWindow;

    function openWin() {
        newWindow = window.open(_blank, "", "width=200,height=100");
    }

    function closeWin() {
        newWindow.close();
    }

    document.querySelector('.open-window') {
        openWin('http://127.0.0.1:5500/ts&cs.html');
    }

    document.querySelector('.close-window') {
        closeWin('http://127.0.0.1:5500/ts&cs.html');
    }

    (document.querySelectorAll('.open-window') || []).forEach(($trigger) => {
        const $windowToOpen = $trigger.dataset.href;
        const $target = document.getElementById(windowToOpen);

        $trigger.addEventListener('click', () => {
            openWin($target);
        });
    });
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

  //modal code
    document.addEventListener('DOMContentLoaded', () => {
        //Open and close modal functions
        function openModal($el) {
            $el.classList.add('is-active');
        }

        function closeModal($el) {
            $el.classList.remove('is-active');
        }

        function closeAllModals() {
            (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
            });
        }

    //Click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    //Key event to close modals
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeAllModals();
        }
    });

    //Click event on child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-cancel, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
    
        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });
});






