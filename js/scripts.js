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

/*** On page load
return {Void}
*/

$(document).ready(function() {
  $window = $(window);

  $window.resize(function() {
    determineSizeAndUpdateText($window);
  });

  determineSizeAndUpdateText($window);
});
