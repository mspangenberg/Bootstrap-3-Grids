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

  var dpr          = (window.devicePixelRatio || 1),
      windowHeight = $window.height(),
      windowWidth  = $window.width()

  return {
    
    pixelRatio: dpr,
    resolution: {
      height: windowHeight * dpr,
      width: windowWidth * dpr
    },
    window: {
      height: windowHeight,
      width: windowWidth
    }

  }
}

/*** Update relevant text
return {Void}
*/

function updateText (size) {
  $('#output-px').text(size.window.width)
  $('#output-dppx').text(size.pixelRatio)
  $('#output-res').text(size.resolution.width)
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
  var origin  = top.window.location.origin,
      $window = $(window)

  $window.resize(function() {
    determineSizeAndUpdateText($window);
  });

  determineSizeAndUpdateText($window);

  $('#dropup-iphone').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 320, width: 480})
  });

  $('#dropup-iphone5').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 320, width: 568})
  });

  $('#dropup-ipad-p').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 1024, width: 768})
  });

  $('#dropup-ipad-l').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 768, width: 1024})
  });

  $('#dropup-nexus5').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 640, width: 320})
  });

  $('#dropup-nexus7-p').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 960, width: 600})
  });

  $('#dropup-nexus7-l').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 600, width: 960})
  });

  $('#dropup-nexus10-p').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 1280, width: 800})
  });

  $('#dropup-nexus10-l').on('click', function(e) {
    e.preventDefault()

    windowOpenWithRes(origin, {height: 800, width: 1280})
  });

});
