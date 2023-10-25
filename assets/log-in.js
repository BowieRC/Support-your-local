



//run this code to access a toggleswitch when modal is open (.is-active)

document.addEventListener('DOMContentLoaded', () => {
    
    var signupModalEl = $("#modal-sign-up")
    var signUpButton = document.querySelector("#signup-button");
    

    $(signupModalEl).show('show', function() {
        console.log('modal showing');
        
        signUpButton.addEventListener("click", function(event) {
            event.preventDefault;

            var firstNameInput = document.querySelector('input[name="first-name"]');
            var lastNameInput = document.querySelector('input[name="last-name"]');
            var emailInput = document.querySelector('input[name="email"]');
            var passwordInput = document.querySelector('input[name="password"]');
            var confirmPassword = document.querySelector('input[name="')

            var user = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
            };

            //confirm password must match password in order to progress. 
            
            //Sign up button only available when all fields are full and when checkbox ticked.
            //Added these classes to index.html <input type="checkbox" id="agreeTerms" name="agree" value="agreement">

            var agreeCheckbox = document.querySelector('#agreeTerms');
            

            // agreeCheckbox.addEventListener("change", () => {
            //     if(!agreeCheckbox.checked || $('.class') === "") {
            //         //add appending text next
            //         console.log("Please check you've filled in the form correctly");
            //         //working but only after sign up button pressed
            //     } else {
            //         localStorage.setItem("user", JSON.stringify(user));
            //         var userCredentials = localStorage.getItem("user");
            //         console.log(JSON.parse(userCredentials), "userCredentials");
            //     }

            // });
            if (!agreeCheckbox.checked) {
                console.log("Please check you have filled in the form correctly.");
            } else {
                       localStorage.setItem("user", JSON.stringify(user));
                        var userCredentials = localStorage.getItem("user");
                        console.log(JSON.parse(userCredentials), "userCredentials");  
            }

        });

    });

});
