



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
                firstName: firstNameInput.ariaValueMax.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
            };

        })

       







    });


    // if(signupModalEl.classList === "is-active") {
    //     console.log("is active");
        
    //     
    //         console.log(signupModalEl);
    //         console.log('First Name:', firstNameEl.val());
    //     }

    //     handleFormSubmit();

    // }


})
