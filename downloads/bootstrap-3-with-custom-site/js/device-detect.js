// ----- Detect iOS and Android for Hidden and Visible Classes -----
// ----- Used with device-detect.css -----

$(function() {
    var isAndroid = function() {
        return window.navigator.userAgent.match('Android');
    };

    var isiOS = function() {
        return window.navigator.userAgent.match('iPad|iPhone|iPod');
    };

    if (isAndroid()) {
        $(".hidden-android").css("display", "none");
        $(".visible-android").css("display", "block");
    } else if (isiOS()) {
        $(".hidden-ios").css("display", "none");
        $(".visible-ios").css("display", "block");
    }
});
