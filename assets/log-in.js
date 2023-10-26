



//run this code to hold other code for when modal is showing

document.addEventListener('DOMContentLoaded', () => {
    
    // var signupModalEl = $("#modal-sign-up");
    var signupModalEl = document.getElementById('modal-sign-up');
    console.log(signupModalEl, 'signupModalEl');
    var signUpButton = document.querySelector("#signup-button");

    

   
    //successful code
    // if ($("#modal-sign-up").hasClass("is-active")) {
    //     console.log('sign up is active');

    // } else {
    //     console.log('it is not open');
    // }
    
        signUpButton.addEventListener("click", function(event) {
            event.preventDefault;
            

            var firstNameInput = document.querySelector('input[name="first-name"]');
            var lastNameInput = document.querySelector('input[name="last-name"]');
            var emailInput = document.querySelector('input[name="email"]');
            var passwordInput = document.querySelector('input[name="password"]');
            
            var confirmPassword = document.querySelector('input[name="confirm-password"]')

            var user = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
            };
            
            var firstName = $(firstNameInput).val();
            var lastName = $(lastNameInput).val();
            var email = $(emailInput).val();
            var password = $(passwordInput).val();
            var confirm = $(confirmPassword).val();
            
            var agreeCheckbox = document.querySelector('#agree-terms');

            if(!firstName || !lastName || !email || !password || !confirm || !agreeCheckbox.checked) {
                console.log('Please check that all fields are complete.');
                return;
            } else if (confirmPassword.value !== passwordInput.value) {
                console.log('Passwords do not match');
                return;
            } else {
                localStorage.setItem("user", JSON.stringify(user));
                var userCredentials = localStorage.getItem("user");
                console.log(JSON.parse(userCredentials), "userCredentials");
            }





            // var inputRootEl = $('#signup-body');

     
            // //This returns all input fields within the signup section
            // var inputEls = inputRootEl.children().children().children('input').val();
            
            // //Not working yet - this function currently writes the content of only 1 input field to the console. I want it to check whether it is empty. 
            // //Only returning the first input field
            // console.log(inputEls);
            
            //function works but the inputEls only has on field
            // function checkInputEls() {
            //     for (var i=0; i < inputEls.length; i++) {
                    
            //         console.log(inputEls.length);
            //         console.log(inputEls[i]);

            //          if (!inputEls[i]) {
            //              console.log([i] + " is empty");
                                
            //         } else if (inputEls[i]) {
            //             console.log([i] + " says " + inputEls);
            //         }
            //     };
            // };

            //confirm password must match password in order to progress. 
            
            //Sign up button only available when all fields are full and when checkbox ticked.
            //Added these classes to index.html <input type="checkbox" id="agreeTerms" name="agree" value="agreement">

           
                      

            //SUCCESSFUL CODE
            // if (!agreeCheckbox.checked || confirmPassword.value !== passwordInput.value) {
            //     console.log("Please check you have filled in the form correctly.");
            // } else {
            //            localStorage.setItem("user", JSON.stringify(user));
            //             var userCredentials = localStorage.getItem("user");
            //             console.log(JSON.parse(userCredentials), "userCredentials");  
            // }

            // // Clear input fields
            // $('input[type="text"]').val('');
            // $('input[type="email"]').val('');
            // $('input[type="checkbox"]').prop('checked', false);


        });
       


    });

$(document).ready(function() {
    $("#terms-link").click(function() {
        window.open("ts&cs.html", "_blank");
    });
});