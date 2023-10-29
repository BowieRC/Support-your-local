//onload event that checks remember me status and will open logged in to reflect local storage values
window.onload = (event) => {
        function checkRememberMe() {
            //run function after checking that storage is not empty
            var userDataFromStorage = JSON.parse(localStorage.getItem('user'));
            if (typeof userDataFromStorage === 'undefined' || userDataFromStorage === null) {
                console.log(typeof userDataFromStorage === 'undefined' || userDataFromStorage === null, "null or undefined so return");
                return;
            } else if (userDataFromStorage.rememberMeChoice === false) {
                console.log(userDataFromStorage.rememberMeChoice === false, "remember me is false")
                return;
            } else if (userDataFromStorage.rememberMeChoice === true) {
                function runLoggedInState() {
                if(!userDataFromStorage.loggedInState) {
                        console.log(userDataFromStorage.loggedInState + " userDataFromStorage.loggedInState " + "so running original settings");
                    return;

                    } else {
                    $("#root-login-button").addClass("is-hidden");
                    $("#root-signup-button").addClass("is-hidden");
                    $("#root-logout-button").toggleClass("is-hidden");
                    $("#root-logout-button").addClass("js-code-trigger");
                    $(".navbar-burger").toggleClass("is-active");
                    $(".navbar-menu").toggleClass("is-active");
                    $("#subtitle").remove();
                            
                    var loggedInUserEl = document.querySelector("#user-placeholder");
                    loggedInUserEl.textContent = "Logged in: " + userDataFromStorage.firstName;
                    return;
                    };
                };
                runLoggedInState();
                return;
            };
        };

    checkRememberMe();
};

//end onload event checking remember me

var homeNavEl = $('#home-nav');
var aboutNavEl = $('#about-nav');
var contactNavEl = $('#contact-nav');
var recipesNavEl = $('#recipes-nav');


//Event listener on nav items changes url to other page
aboutNavEl.on('click', function () {
    document.location.assign('./about.html');
  });

contactNavEl.on('click', function () {
    document.location.assign('./contact.html');
});

recipesNavEl.on('click', function () {
    document.location.assign('./recipes.html');
})

//Click event causes reload
homeNavEl.on('click', function() {
    location.reload();
});
//end event listener nav items code



//code for nav hamburger to toggle 
$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
});
//end nav burger toggle code

  //open any modal code
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
        (document.querySelectorAll('.js-code-trigger') || []).forEach(($trigger) => {
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
    //end open any modal code

//log out button code
document.addEventListener('DOMContentLoaded', () => {
    var logoutButton = document.querySelector("#see-ya-button");

    logoutButton.addEventListener("click", function(event) {
        console.log('reload about to happen');

        //Change storage loggedinState
        function storeLoggedInState() {
            var userDataFromStorage = JSON.parse(localStorage.getItem('user'));
            userDataFromStorage.loggedInState = false; 
            localStorage.setItem('user', JSON.stringify(userDataFromStorage));
        };   
        storeLoggedInState();
        location.reload();
    });
});
//end log out button code



