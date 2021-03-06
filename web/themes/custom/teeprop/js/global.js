/**
 * Global JS file.
 */

(function($, Drupal) {
  'use strict';

  /**
   * Iniatiates DropKickJS.
   */
  Drupal.behaviors.dropkickjsinit = {
    attach: function(context, settings) {
      if ($('.layout-container select').length > 0) {
        $('.layout-container select').once('dropkickjsinit').dropkick();
      }
    }
  };

  /**
   * Opens and closes mobile version of main menu.
   */
  Drupal.behaviors.menuToggle = {
    attach: function(context, settings) {
      var $dropdownEl = $('header.header');
      var openClass = 'menu-open';
      $('.header__menu-toggle').on('click tap touch', function() {
        // Close.
        if ($dropdownEl.hasClass(openClass)) {
          $dropdownEl.removeClass(openClass);
        }
        // Open.
        else {
          $dropdownEl.addClass(openClass);
          $dropdownEl.mouseleave(function() {

            $(document).click(function(e) {
              e.stopPropagation();

              // Check if the clicked area is dropdown or not.
              if ($dropdownEl.has(e.target).length === 0) {
                $dropdownEl.removeClass(openClass);
              }
            })
          });
        }
      });

      // Close menu when menu item is clicked.
      $('.menu--main .menu-item a').on('click tap touch', function() {
        $dropdownEl.removeClass(openClass);
      });
    }
  }

  /**
   * Add class to body when header becomes sticky.
   */
  Drupal.behaviors.headerStickyClass = {
    attach: function(context, settings) {
      var headerStickyClass = 'header-sticky';
      var $bodyEl = $('body');
      var $headerEl = $('header.header');
      var logoHeight = $('.logo').outerHeight();
      $(window).scroll(function() {
        if ($(window).width() > 680) {
          if ($(window).scrollTop() > logoHeight) {
            $bodyEl.addClass(headerStickyClass);
          }
          else {
            $bodyEl.removeClass(headerStickyClass);
          }
        }
      });
    }
  }

})(jQuery, Drupal);
