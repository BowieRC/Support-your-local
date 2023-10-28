



//run this code to hold other code for when modal is showing

document.addEventListener('DOMContentLoaded', () => {
    
    // var signupModalEl = $("#modal-sign-up");
    var signupModalEl = document.getElementById('modal-sign-up');
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
            
                var anchorMsgAtEnd = $("#checkbox-label");
                var checkInputMsg = $('<p></p>');
                checkInputMsg.addClass ('has-text-success');
                checkInputMsg.text("Something's missing in the form, can you add it?");
                anchorMsgAtEnd.append(checkInputMsg);
                return;
                
            } else if (confirmPassword.value !== passwordInput.value) {
                var anchorMsg = $("#confirm-password-label");
                var passwordMsg = $('<p></p>');
                passwordMsg.addClass('has-text-success');
                passwordMsg.text("Oops. The passwords don't match yet.");
                anchorMsg.append(passwordMsg);
                //empty password fields only
                $(passwordInput).val('');
                $(confirmPassword).val('');
              
                //disable Signup button
                return;
            } else {
                localStorage.setItem("user", JSON.stringify(user));
                function clearInputEls() {
                    //Working on this: var signupBody = document.querySelector("#signup-body");

                   //Working on this: $(signupBody).children.children.children("input.input").text("");

                    $(firstNameInput).val('');
                    $(lastNameInput).val('');
                    $(emailInput).val('');
                    $(passwordInput).val('');
                    $(confirmPassword).val('');    
                    $(agreeCheckbox).prop('checked', false);
                };
                clearInputEls();
             
                $(signupModalEl).hide();
                $("#root-signup-button").css({"visibility": "hidden"});

                var userDataStored = localStorage.getItem("user");
                console.log(JSON.parse(userDataStored), "userDataStored")
                var userData = JSON.parse(userDataStored);
                console.log(userData);
                
                var logInPrompt1 = $('<h3></h3>');
                var logInPrompt2 = $('<h3></h3>');
                var anchorSubtitle = $("#subtitle");

                logInPrompt1.addClass('has-text-white is-text-weight-medium has-background-black');
                $(logInPrompt1).css({"line-height": "4rem", "font-size": "1.5rem", "font-style": "oblique"});
                logInPrompt2.addClass('has-text-success is-text-weight-medium has-background-black');
                $(logInPrompt2).css({"line-height": "4rem", "font-size": "1.5rem", "font-style": "oblique"});


                logInPrompt1.text("Welcome " + userData.firstName + "!");
                logInPrompt2.text("Please log in to change your food shopping experience.")
                anchorSubtitle.append(logInPrompt1);
                anchorSubtitle.append(logInPrompt2);



                //  This piece to append details from local storage
              




            }
                

            


            //



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

            // // Clear input fields
            // $('input[type="text"]').val('');
            // $('input[type="email"]').val('');
            // $('input[type="checkbox"]').prop('checked', false);


        });
       


    });
//Access for reading terms and conditions in modal
$(document).ready(function() {
    $("#terms-link").click(function() {
        window.open("ts&cs.html", "_blank");
    });
});

//  This piece to append details from local storage
//               var userCredentials = localStorage.getItem("user");
// console.log(JSON.parse(userCredentials), "userCredentials");