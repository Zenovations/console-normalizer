/**
* Console Normalizer, https://github.com/Zenovations/console-normalizer
* @version 2013-04-10
* @license MIT
*/
(function (root) {
    "use strict";
    if(typeof root !== "object"){
        return;
    }
    /*********************************************************************************************
     * Make sure console exists because IE blows up if it's not open and you attempt to access it
     * Create some dummy functions if we need to, so we don't have to if/else everything
     *********************************************************************************************/
    var console = root.console || {
        error : function () {},
        info : function () {},
        log : function () {},
        warn : function () {}
    };
    
    //credits: taken from bind_even_never in this discussion: https://prototype.lighthouseapp.com/projects/8886/tickets/215-optimize-bind-bindaseventlistener#ticket-215-9
    Function.prototype.bind = Function.prototype.bind || function (context) {
        var fn = this,
        args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(context, Array.prototype.concat.apply(args, arguments));
        };
    };
    
    // IE 9 won't allow us to call console.log.apply (WTF IE!) It also reports typeof(console.log) as 'object' (UNH!)
    // but together, those two errors can be useful in allowing us to fix stuff so it works right
    if (typeof(console.log) === 'object') {
        console.error = Function.prototype.call.bind(console.error, console);
        console.info = Function.prototype.call.bind(console.info, console);
        console.log = Function.prototype.call.bind(console.log, console);
        console.warn = Function.prototype.call.bind(console.warn, console);
    }
    
    /**
     * Support group and groupEnd functions
     */
    console.group = console.group || function (msg) {
        console.info("\n------------\n" + msg + "\n------------");
    };
    
    console.groupEnd = console.groupEnd || function () {};
    /**
     * Support time and timeEnd functions
     */
    
    console.trackedTimes = {};
    
    console.time = console.time || function (msg) {
        console.trackedTimes[msg] = new Date().getTime();
    };
    
    console.timeEnd = console.timeEnd || function (msg) {
        var end = new Date().getTime(),
        time = end - (console.trackedTimes[msg] || end);
        console.info(msg + ': ' + time + 'ms');
    };
    
    root.console = console;
}(window));
