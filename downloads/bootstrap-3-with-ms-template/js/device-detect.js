// ----- Detect iOS and Android for Hidden and Visible Classes -----
// ----- Used with device-detect.css -----

var isAndroid = function() {
    if (window.navigator.userAgent.match('Android')) {
        return true;
    } else {
        return false;
    }
};

var isiOS = function() {
    if (window.navigator.userAgent.match('iPad|iPhone|iPod')) {
        return true;
    } else {
        return false;
    }
};

var downloadlink;

$(document).ready(function() {
      
    if (isAndroid()) {
        $(".hidden-android").css("display", "none");
        $(".visible-android").css("display", "block");
    } else if (isiOS()) {
        $(".hidden-ios").css("display", "none");
        $(".visible-ios").css("display", "block");
    }

});