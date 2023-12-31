document.addEventListener('DOMContentLoaded', () => {
    
    // var signupModalEl = $("#modal-sign-up");
    var signupModalEl = document.getElementById('modal-sign-up');
    //This is signup button within modal, NOT the signup button visible on the landing page. See script.js js-code-trigger for that.
    var signUpButton = document.querySelector("#signup-button");
    
        signUpButton.addEventListener("click", function(event) {
            event.preventDefault;
            
            var firstNameInput = document.querySelector('input[name="first-name"]');
            var lastNameInput = document.querySelector('input[name="last-name"]');
            var emailInput = document.querySelector('input[name="email"]');
            var passwordInput = document.querySelector('input[name="password"]');
            
            var confirmPassword = document.querySelector('input[name="confirm-password"]')
            var agreeCheckbox = document.querySelector('#agree-terms');
            var rememberMeCheckbox = document.querySelector('#remember-me');

            var user = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
                terms: agreeCheckbox.checked,
                rememberMeChoice: rememberMeCheckbox.checked,
                loggedInState: false,
            };
            
            var firstName = $(firstNameInput).val();
            var lastName = $(lastNameInput).val();
            var email = $(emailInput).val();
            var password = $(passwordInput).val();
            var confirm = $(confirmPassword).val();
            
            

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
                return;

            } else {
                localStorage.setItem("user", JSON.stringify(user));

                function clearInputEls() {

                    $(firstNameInput).val('');
                    $(lastNameInput).val('');
                    $(emailInput).val('');
                    $(passwordInput).val('');
                    $(confirmPassword).val('');    
                    $(agreeCheckbox).prop('checked', false);
                };
                clearInputEls();
             
                $(signupModalEl).hide();
                $("#root-signup-button").addClass("is-hidden");

                var userDataFromStorage = JSON.parse(localStorage.getItem('user'));
                
                var logInPrompt1 = $('<h3></h3>');
                var logInPrompt2 = $('<h3></h3>');
                var anchorSubtitle = $("#subtitle");

                logInPrompt1.addClass('has-text-white is-text-weight-medium has-background-black');
                $(logInPrompt1).css({"line-height": "4rem", "font-size": "1.5rem", "font-style": "oblique"});
                logInPrompt2.addClass('has-text-success is-text-weight-medium has-background-black');
                $(logInPrompt2).css({"line-height": "4rem", "font-size": "1.5rem", "font-style": "oblique"});


                logInPrompt1.text("Welcome " + userDataFromStorage.firstName + "!");
                logInPrompt2.text("Please log in to change your food shopping experience.")
                anchorSubtitle.append(logInPrompt1);
                anchorSubtitle.append(logInPrompt2);
            }          
        });

    //Access for reading terms and conditions in modal
    $(document).ready(function() {
        $("#terms-link").click(function() {
            window.open("ts&cs.html", "_blank");
        });
    });
 
    var loginButton = document.querySelector("#login-button");
    var loginModal = document.querySelector("#modal-log-in");

        loginButton.addEventListener("click", function(event) {
            event.preventDefault;
            
            var emailLoginEl = document.querySelector('input[name="email-login"]');
            var passwordLoginEl = document.querySelector('input[name="password-login"]');

            //bring out userDataFromStorage from storage
            var userDataFromStorage = JSON.parse(localStorage.getItem('user'));

            var emailLogin = $(emailLoginEl).val();
            var passwordLogin = $(passwordLoginEl).val();
            console.log(emailLogin);
            console.log(passwordLogin);

            //update rememberme value as per input

            var rememberMeCheckbox = document.querySelector('#remember-me');
            
            //brings data from storage, changes rememberme value and resets it back 
            function storeRememberMe() {
                // var userDataFromStorage = JSON.parse(localStorage.getItem('user'));
                userDataFromStorage.rememberMeChoice = rememberMeCheckbox.checked; 
                localStorage.setItem('user', JSON.stringify(userDataFromStorage));
                // localStorage.setItem(user["rememberMeChoice"], JSON.stringify(rememberMeCheckbox.checked));     
            };

            storeRememberMe();

            //end update  rememberme value as per input


            function checkPasswordMatch() {
                    if (!emailLogin || !passwordLogin) {
                        var loginCheckInputMsg = $('<p></p>');
                        loginCheckInputMsg.addClass ('has-text-success');
                        loginCheckInputMsg.text("Something's missing in the form, can you add it?");
                        rememberMeEl.append(loginCheckInputMsg);
                        //clear fields
                        $(emailLoginEl).val()=("");
                        $(passwordLoginEl).val()=("");
                        return;

                    } else if (emailLogin !== userDataFromStorage.email || passwordLogin !== userDataFromStorage.password) {
                        var matchAlertMsg = $('<p></p>');
                        matchAlertMsg.addClass('has-text-success');
                        matchAlertMsg.text("Details don't match your sign-up details. Please try again.");
                        rememberMeEl.append(matchAlertMsg);
                        console.log("details don't match stoarge");
                        //clear fields
                        $(emailLoginEl).val('');
                        $(passwordLoginEl).val('');
                        return;

                    } else if (emailLogin === userDataFromStorage.email && passwordLogin === userDataFromStorage.password) {
                        console.log('logged in');
                        return true;
                    };          
            };

            function runLoggedInState() {
                if(!userDataFromStorage.loggedInState) {
                    console.log(userDataFromStorage.loggedInState + "userDataFromStorage.loggedInState" + "run original settings");
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

            if (checkPasswordMatch()) {
                $(loginModal).hide();
                userDataFromStorage.loggedInState = true;
                localStorage.setItem('user', JSON.stringify(userDataFromStorage)); 

                runLoggedInState();               
            };
        });
}); 
