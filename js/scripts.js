/**
 * @author Ryan Van Etten
 * @see http://ryanve.com/lab/dimensions/
 */
(function(window, document, screen) {
    jQuery(function($) {
        var docElem = document.documentElement
          , $html = $(docElem)
          , $win = $(window)
          , $doc = $(document)
          , verge = window.verge // npm: verge
          , viewportW = verge['viewportW']
          , viewportH = verge['viewportH']
          , mM = window['matchMedia'] || window['msMatchMedia']
          , outputs = []
          , prev = [];

        /**
         * @param {string} feature (e.g. "min-width")
         * @param {string=} unit
         * @param {number=} init
         * @param {number=} step
         * @return {number} the highest value that (feature:value) matches
         * @link http://gist.github.com/ryanve/7924792 for a more robust method
         */
        function maxMedia(feature, unit, init, step) {
            if (typeof init != 'number') init = 0;
            if (!mM) return init;
            if (typeof unit != 'string') unit = '';
            if (typeof step != 'number') step = 1;
            while (mM.call(window, '(' + feature + ':' + (init+=step) + unit + ')')['matches']) {}
            return init-step;
        }

        function update() {
            var l, i = 0, updates = [], prefix = '#output-';
            updates[1] = $win.width();
            updates[2] = updates[25] = docElem.clientWidth;
            updates[3] = window.innerWidth;
            updates[4] = window.outerWidth;
            updates[5] = $doc.width();
            updates[6] = $win.height();
            updates[7] = updates[26] = docElem.clientHeight;
            updates[8] = window.innerHeight;
            updates[9] = window.outerHeight;
            updates[10] = $doc.height();
            updates[11] = screen.width;
            updates[12] = screen.availWidth;
            updates[13] = screen.height;
            updates[14] = screen.availHeight;
            updates[15] = document.body.clientWidth;
            updates[16] = document.body.clientHeight;
            updates[17] = docElem.scrollWidth;
            updates[18] = document.body.scrollWidth;
            updates[19] = docElem.scrollHeight;
            updates[20] = document.body.scrollHeight;
            updates[21] = docElem.offsetWidth;
            updates[22] = document.body.offsetWidth;
            updates[23] = docElem.offsetHeight;
            updates[24] = document.body.offsetHeight;
            updates[27] = maxMedia('min-width', 'px');
            updates[28] = maxMedia('min-height', 'px');
            updates[29] = maxMedia('min-device-width', 'px');
            updates[30] = maxMedia('min-device-height', 'px');
            updates[31] = viewportW();
            updates[32] = viewportH();
            for (l = updates.length; i < l; i++)
                i in updates && updates[i] !== prev[i] && (outputs[i] = outputs[i] || $(prefix + i)).text(updates[i]);
            prev = updates;
        }
        
        $html.removeClass('no-js').addClass('js');
        mM && $('a.match-media').attr('data-via', mM === window['matchMedia'] ? 'matchMedia' : 'msMatchMedia');
        update();
        $win.on('resize', update);
    });
}(window, document, screen));

/**
 * @author Ryan Van Etten
 * @see http://ryanve.com/lab/resolution/
 * @see ./ender.min.js
 */

(function(win, screen, require) {
    var $ = require('ender')
      , res = require('res')
      , aok = require('aok')
      , annex = require('annex')
      , explain = aok.explain
      , button = '<button style="margin:1em 0">Refresh output</button>'
      , emitter = $({})
      , run = 'run_lab';

    annex.find = $.fn.pushStack = $;
    $.fn.slice = $.fn.slice = [].slice;

    function output(id, result) {
        var prev, elem = aok.id(id = 'output-' + id);
        if (!id) return void aok.warn('#' + id + ' was not found.');
        prev = annex.text(elem);
        result = explain(result);
        result === prev || $(elem).text(result);
    }

    function infer(n) {
        output(n, explain(this[n]));
    }
    
    function result(n) {
        output(n, aok.result(this, n));
    }
    
    function refresh(ev) {
        emitter.trigger(run, 'Output refreshed on ' + ev.type);
    }
    
    emitter.on(run, function(ev, msg) {
        aok.fail(['dppx', 'dpcm', 'dpi'], result, res);
        aok.fail(['devicePixelRatio'], result, win);
        aok.fail(['matchMedia', 'msMatchMedia'], infer, win);
        aok.fail([
            'deviceXDPI', 'deviceYDPI'
          , 'logicalXDPI', 'logicalYDPI'
          , 'systemXDPI', 'systemYDPI'
        ], result, screen);
        msg && aok.log(msg);
    }).trigger(run, 'Output initialized');
    
    $(win).on('resize', refresh);
    $('.refresh').append(button).find('button').on('click', refresh);

}(window, screen, require));