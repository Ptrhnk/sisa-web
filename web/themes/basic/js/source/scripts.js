/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function (Drupal, $) {
  "use strict";

  function localizeTourTableHeaders(context) {
    var lang = $("html").attr("lang") || "";
    var path = window.location.pathname || "";
    var isSk = lang.indexOf("sk") === 0;
    var isTourPage =
      path.indexOf("/tour") !== -1 || path.indexOf("/koncerty") !== -1 || /\/node\/59(?:\/|$)/.test(path);
    var selector =
      "#block-views-block-tour-dates-block-1 table thead th, #block-views-block-tour-dates-block-2 table thead th";

    console.log("[tour-localize] attach start", {
      lang: lang,
      path: path,
      isSk: isSk,
      isTourPage: isTourPage,
    });

    if (!isSk || !isTourPage) {
      console.log("[tour-localize] skip: language/path condition not met");
      return;
    }

    var translations = {
      "Tour date": "Datum",
      City: "Mesto",
      Club: "Klub",
      Project: "Projekt",
      Tickets: "Vstupenky",
    };

    var $headers = $(selector, context);
    console.log("[tour-localize] headers found in context", $headers.length, context);

    $headers.each(
      function () {
        var $th = $(this);
        var current = $.trim($th.text());

        console.log("[tour-localize] inspecting header", {
          current: current,
          alreadyLocalized: !!$th.data("tourHeaderLocalized"),
          blockId: $th.closest("[id]").attr("id") || null,
        });

        if ($th.data("tourHeaderLocalized")) {
          console.log("[tour-localize] skip: already localized", current);
          return;
        }

        if (translations[current]) {
          console.log("[tour-localize] translating", current, "->", translations[current]);
          $th.text(translations[current]);
        } else {
          console.log("[tour-localize] no translation mapping for", current);
        }
        $th.data("tourHeaderLocalized", true);
      },
    );
  }

  // To understand behaviors, see https://www.drupal.org/node/2269515
  Drupal.behaviors.basic = {
    attach: function (context, settings) {
      localizeTourTableHeaders(context);

      // Execute code once the DOM is ready. $(handler) not required
      // within Drupal.behaviors.
      $(window).on("load", function () {
        // Execute code once the window is fully loaded.
      });

      $(window).on("resize", function () {
        // Execute code when the window is resized.
      });

      $(window).on("scroll", function () {
        // Execute code when the window scrolls.
      });
    },
  };
})(Drupal, jQuery);
