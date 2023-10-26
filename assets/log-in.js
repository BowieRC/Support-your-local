



//run this code to hold other code for when modal is showing

document.addEventListener('DOMContentLoaded', () => {
    
    var signupModalEl = $("#modal-sign-up")
    var signUpButton = document.querySelector("#signup-button");
    // var openModal = $(signupModalEl).show();

    //
    function checkOpen() {
        $(signupModalEl).hasClass('is-active');
            return true
        
    }

    if (checkOpen()) {
        console.log('checked - modal open');
        
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
            
            var inputRootEl = $('#signup-body');

     
            //This returns all input fields within the signup section
            var inputEls = inputRootEl.children().children().children('input').val();
            
            //Not working yet - this function currently writes the content of only 1 input field to the console. I want it to check whether it is empty. 
            //Only returning the first input field
            console.log(inputEls);
            
            //function works but the inputEls only has on field
            function checkInputEls() {
                for (var i=0; i < inputEls.length; i++) {
                    
                    console.log(inputEls.length);
                    console.log(inputEls[i]);

                     if (!inputEls[i]) {
                         console.log([i] + " is empty");
                                
                    } else if (inputEls[i]) {
                        console.log([i] + " says " + inputEls);
                    }
                };
            };

            checkInputEls();

            //confirm password must match password in order to progress. 
            
            //Sign up button only available when all fields are full and when checkbox ticked.
            //Added these classes to index.html <input type="checkbox" id="agreeTerms" name="agree" value="agreement">

            var agreeCheckbox = document.querySelector('#agreeTerms');
            

            //SUCCESSFUL CODE
            // if (!agreeCheckbox.checked || confirmPassword.value !== passwordInput.value) {
            //     console.log("Please check you have filled in the form correctly.");
            // } else {
            //            localStorage.setItem("user", JSON.stringify(user));
            //             var userCredentials = localStorage.getItem("user");
            //             console.log(JSON.parse(userCredentials), "userCredentials");  
            // }

            if (!agreeCheckbox.checked || confirmPassword.value !== passwordInput.value) {
                console.log("success");
             
            } else {
                       localStorage.setItem("user", JSON.stringify(user));
                        var userCredentials = localStorage.getItem("user");
                        console.log(JSON.parse(userCredentials), "userCredentials");  
            }

            // Clear input fields
            $('input[type="text"]').val('');
            $('input[type="email"]').val('');
            $('input[type="checkbox"]').prop('checked', false);

        });
       


    };

});

$(document).ready(function() {
    $("#terms-link").click(function() {
        window.open("ts&cs.html", "_blank");
    });
})