// http://mspangenberg.github.io/Bootstrap-3-Grids/
// http://bootstrap-3-grids.dev/

(function() {
    var path = "http://mspangenberg.github.io/Bootstrap-3-Grids/",
        containerEl = document.createElement("div"),
        frameEl = document.createElement("iframe"),
        styleEl = document.createElement("link");
    
    /*
    var sanitizePostMessage = function (e) {
        if (e.origin === "http://mspangenberg.github.io/Bootstrap-3-Grids/") {
            return false;
        }
 
        if (typeof e.data === "string") {
            return e.data;
        }
 
        return false;
    };
    */

    var generateScript = function(source) {
        var script = document.createElement('script')
        script.setAttribute("type","text/javascript")
        script.setAttribute("src", source)
    }
 
    var generateStyle = function () {
        styleEl.setAttribute("type", "text/css");
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.setAttribute("charset", "UTF-8");
        styleEl.setAttribute("href", path + "css/bookmarklet.css?r=" + Math.random());
    };
 
    var setElementClasses = function () {
        containerEl.setAttribute("id","bookmarklet-container");
    };
 
    var render = function() {
        document.head.appendChild(styleEl);
        document.body.appendChild(containerEl);
        containerEl.appendChild(frameEl);
    };
    
    /*
    var attachEvents = function () {
        window.addEventListener("message", function (event) {
            var message = sanitizePostMessage(event);
 
            switch (message) {
                case "close":
                    close();
                    break;
            }
        });
    };
    */
 
    var setFrameOptions = function () {
        frameEl.setAttribute("allowTransparency", true);
        frameEl.setAttribute("src", path + "bookmarklet.html?r=" + Math.random());
    };
 
    var close = function () {
        document.body.removeChild(containerEl);
    };
 
    var hasClass = function (el, name) {
        return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
    };
 
    var addClass = function (el, name) {
        if (!hasClass(el, name)) {
            el.className += (el.className ? ' ' : '') + name;
        }
    };
 
    var removeClass = function (el, name) {
        if (hasClass(el, name)) {
          el.className=el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
       }
    };
 
    if (document.getElementById("bookmarklet-container") === null) {
        generateStyle();
        //generateScript(path + 'js/scripts.js');
        setElementClasses();
        setFrameOptions();
        render();
        //attachEvents();
    }

}());