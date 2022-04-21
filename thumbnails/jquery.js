/* Reference: https://stanhub.com/scroll-to-top-then-fixed-navigation-effect-with-jquery-and-css-free-download/ */

$(document).ready(function(){
    $(window).bind('scroll', function() {
    var navHeight = $( window ).height() - 70;
          if ($(window).scrollTop() > navHeight) {
              $('nav').addClass('fixed');
          }
          else {
              $('nav').removeClass('fixed');
          }
     });
 });