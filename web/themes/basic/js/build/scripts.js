"use strict";
(function (Drupal, $) {
  function localizeTourTableHeaders(context) {
    var lang = $("html").attr("lang") || "";
    var path = window.location.pathname || "";
    var isSk = lang.indexOf("sk") === 0;
    var isTourPage = path.indexOf("/tour") !== -1 || path.indexOf("/koncerty") !== -1 || /\/node\/59(?:\/|$)/.test(path);
    var selector = "#block-views-block-tour-dates-block-1 table thead th, #block-views-block-tour-dates-block-2 table thead th";

    console.log("[tour-localize] attach start", {
      lang: lang,
      path: path,
      isSk: isSk,
      isTourPage: isTourPage
    });

    if (!isSk || !isTourPage) {
      console.log("[tour-localize] skip: language/path condition not met");
      return;
    }

    var translations = {
      "Tour date": "Datum",
      "City": "Mesto",
      "Club": "Klub",
      "Project": "Projekt",
      "Tickets": "Vstupenky"
    };

    var $headers = $(selector, context);
    console.log("[tour-localize] headers found in context", $headers.length, context);

    $headers.each(function () {
      var $th = $(this);
      var current = $.trim($th.text());

      console.log("[tour-localize] inspecting header", {
        current: current,
        alreadyLocalized: !!$th.data("tourHeaderLocalized"),
        blockId: $th.closest("[id]").attr("id") || null
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
    });
  }

  Drupal.behaviors.basic = {
    attach: function (context) {
      localizeTourTableHeaders(context);

      $(window).on("load", function () {});
      $(window).on("resize", function () {});
      $(window).on("scroll", function () {});
    }
  };
})(Drupal, jQuery);
