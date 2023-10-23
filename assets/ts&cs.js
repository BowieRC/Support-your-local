// This page needs to be closed so that the modal doesn't disappear from the previous page. 
$(document).ready(function () {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
});

//Below is script relevant to pages with close-window button
// $(document).ready(function () {
//     function closeWindow() {
        
        
        
//         closeWindowNavEl.on('click', function () {
//             console.log('#close-window');
//             window.close();
//         });
//     };
// });

