/*** Get device/window width, height, and pixel ratio

return {Object}

Device's pixel ratio / density
return {Object.pixelRatio} Number

Device's screen size (based on a dpr of 1)
return {Object.resoltion.height} Number
return {Object.resoltion.width} Number

Device's screen size (based on dpr)
return {Object.window.height} Number
return {Object.window.width} Number

*/

function onResize ($window) {

  var dpr = (window.devicePixelRatio || 1);

  return {
    
    pixelRatio: dpr,
    screen: {
      height: window.screen.height,
      width: window.screen.width
    },
    window: {
      height: $window.height(),
      width: $window.width()
    }

  }
}

/*** Update relevant text
return {Void}
*/

function updateText (size) {
  $('#output-px').text(size.window.width)
  $('#output-dppx').text(size.pixelRatio)
  $('#output-res').text(size.screen.width)
}

/*** What we want
return {Void}
*/

function determineSizeAndUpdateText ($window) {
  var size = onResize($window);
  updateText(size);
}

/*** Open new page with url & resolution desired
return {Void}
*/

function windowOpenWithRes (url, res) {
  window.open(url, 'newWin', 'width=' + res.width + ',height=' + res.height + '')
}

/*** On page load
return {Void}
*/

$(document).ready(function() {

  //var origin  = top.window.location.origin, - No worky, CORS
  var origin  = document.referrer,
      $window = $(window)

  $window.resize(function() {
    determineSizeAndUpdateText($window);
  });

  determineSizeAndUpdateText($window);

  var devices = {

    'iphone': {
      height: 480,
      width: 320
    },

    'iphone5': {
      height: 568,
      width: 320
    },

    'ipad-p': {
      height: 1024,
      width: 768
    },

    'ipad-l': {
      height: 768,
      width: 1024
    },

    'nexus5': {
      height: 640,
      width: 360
    },

    'nexus7-p': {
      height: 960,
      width: 600
    },

    'nexus7-l': {
      height: 600,
      width: 960
    },

    'nexus10-p': {
      height: 1280,
      width: 800
    },

    'nexus10-l': {
      height: 800,
      width: 1280
    }

  }

  $('.open-new-window').on('click', function(e) {
    e.preventDefault()

    var device = e.target.id.split(/-(.+)?/)[1];

    windowOpenWithRes(origin, {height: devices[device].height, width: devices[device].width})
  });

});
