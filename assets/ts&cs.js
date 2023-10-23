// This page needs to be opened in new window and closed separately so that the modal doesn't disappear from the previous page. 
$(document).ready(function () {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
});

