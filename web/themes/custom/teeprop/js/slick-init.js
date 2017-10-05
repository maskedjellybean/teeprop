/**
 * JS to init Slick.
 */

(function($, Drupal) {
  'use strict';

  $('.slideshow').slick({
    arrows: true,
    dots: true,
    swipe: true,
    autoplay: true,
    pauseOnDotsHover: true,
    autoplaySpeed: 5000,
    speed: 600,
  });

})(jQuery, Drupal);
