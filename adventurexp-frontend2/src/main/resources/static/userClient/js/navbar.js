$(window).scroll(function () {
    if ($(window).scrollTop() >= 50) {
        $('.navbar').css('background-color','#2e3627c9');
    } else {
        $('.navbar').css('background-color','#2e3627fc');
    }
});