// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

function breakout_of_frame() {if (top.location != location) {top.location.href = document.location.href}}

/*
 * Extend jQuery to get $_GET Params
 *
 * We use PHP, so we want a $._GET($name)
 */
$._GET = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results && results[1]) {
        return unescape(results[1]);
    }
    return null;
}


$(document).ready(function(){
    $('form').each(function(index, element) {
        $(element).find('.behavior_tab').each(function(index, element) {
            $(element).attr('focus_index', index);
        });
    });
    $(".behavior_tab").keypress(function(event){
        if(event.which == 13 && !$(event.currentTarget).is('textarea') ) {
            event.preventDefault();
            next_index = parseInt($(event.currentTarget).attr("focus_index")) + 1;
            parent_form = $(event.currentTarget).parents('form');
            if (parent_form.find('.behavior_tab').length <= next_index) {
                next_index = 0;
            }
            parent_form.find('.behavior_tab').eq(next_index).focus();
        }
    });
});