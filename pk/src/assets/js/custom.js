$(document).ready(function () {
  "use strict";

  //LEFT MOBILE MENU OPEN
  $(".ts-menu-5").on("click", function () {
    $(".mob-right-nav").css("right", "0px");
  });

  //LEFT MOBILE MENU OPEN
  $(".mob-right-nav-close").on("click", function () {
    $(".mob-right-nav").css("right", "-270px");
  });

  //LEFT MOBILE MENU CLOSE
  $(".mob-close").on("click", function () {
    $(".mob-close").hide("fast");
    $(".menu").css("left", "-92px");
    $(".mob-menu").show("slow");
  });

  //mega menu
  /* $(".t-bb").hover(function() {
        $(".cat-menu").fadeIn(50);
    }); 
	 $(".ts-menu").mouseleave(function() {
        $(".cat-menu").fadeOut(50);
    });
	*/

  //mega menu
  $(".sea-drop").on("click", function () {
    $(".sea-drop-1").fadeIn(100);
  });
  $(".sea-drop-1").mouseleave(function () {
    $(".sea-drop-1").fadeOut(50);
  });
  $(".dir-ho-t-sp").mouseleave(function () {
    $(".sea-drop-1").fadeOut(50);
  });

  //mega menu top menu
  $(".sea-drop-top").on("click", function () {
    $(".sea-drop-2").fadeIn(100);
  });
  $(".sea-drop-1").mouseleave(function () {
    $(".sea-drop-2").fadeOut(50);
  });
  $(".top-search").mouseleave(function () {
    $(".sea-drop-2").fadeOut(50);
  });

  //ADMIN LEFT MOBILE MENU OPEN
  $(".atab-menu").on("click", function () {
    $(".sb2-1").css("left", "0");
    $(".btn-close-menu").css("display", "inline-block");
  });

  //ADMIN LEFT MOBILE MENU CLOSE
  $(".btn-close-menu").on("click", function () {
    $(".sb2-1").css("left", "-350px");
    $(".btn-close-menu").css("display", "none");
  });

  //mega menu
  /* $(".t-bb").hover(function() {
        $(".cat-menu").fadeIn(50);
    });
    $(".ts-menu").mouseleave(function() {
        $(".cat-menu").fadeOut(50);
    });*/

  //review replay
  $(".edit-replay").on("click", function () {
    $(".hide-box").show();
  });

  //PRE LOADING
  /*  $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    }); */

  $(".dropdown-button").dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: 400, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: "left", // Displays dropdown with edge aligned to the left of button
    stopPropagation: false, // Stops event propagation
  });
  $(".dropdown-button2").dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: ($(".dropdown-content").width() * 3) / 2.5 + 5, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: "left", // Displays dropdown with edge aligned to the left of button
  });

  //Collapsible
  // $('.collapsible').collapsible();

  //material select
  //$('select').material_select();

  //AUTO COMPLETE CATEGORY SELECT
  $(
    "#select-category.autocomplete, #select-category1.autocomplete"
  ).autocomplete({
    data: {},
    limit: 8, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function (val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  //AUTO COMPLETE CITY SELECT
  $("#select-city.autocomplete, #top-select-city.autocomplete").autocomplete({
    data: {},
    limit: 8, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function (val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  //AUTO COMPLETE SEARCH SELECT
  $(
    "#select-search.autocomplete, #top-select-search.autocomplete"
  ).autocomplete({
    data: {},
    limit: 8, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function (val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  //HOME PAGE FIXED MENU
  $(window).scroll(function () {
    if ($(this).scrollTop() > 450) {
      $(".hom-top-menu").fadeIn();
      $(".cat-menu").hide();
    } else {
      $(".hom-top-menu").fadeOut();
    }
  });

  //HOME PAGE FIXED MENU
  $(window).scroll(function () {
    if ($(this).scrollTop() > 450) {
      $(".hom3-top-menu").addClass("top-menu-down");
    } else {
      $(".hom3-top-menu").removeClass("top-menu-down");
    }
  });

  /*jQuery('.hom-cre-acc-right .cont').click(function(){
        var st=jQuery(this).data('cstep');
        jQuery('.sbuss').css('display','none');
        jQuery('.sbuss[data-step="'+st+'"]').css('display','block');
    });*/

  jQuery(document).on("click", ".hom-cre-acc-right .cont", function (e) {
    e.preventDefault();

    var st = jQuery(this).data("cstep");
    jQuery(".sbuss").css("display", "none");
    jQuery('.sbuss[data-step="' + st + '"]').css("display", "block");
  });

  $(document).on("click", ".sharepopup", function () {
    //console.log('test');
    $(this).parent("li").toggleClass("active");
  });

  //$('.datepicker').datepicker();
  /*  $('.basic-cate').select2({
		tags: true
	}); 
	 */

  $(".rating_filter input").change(function () {
    $(".rating_filter input").prop("checked", false);
    $(this).prop("checked", true);
  });

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(document).on("click", ".showlink", function (e) {
    e.preventDefault();
    $(this).text($(this).text() == "Show More" ? "Show Less" : "Show More");
    $(".showmore").slideToggle("slow");
  });
});

$(window).on("load", function () {
  $(".datepicker").datepicker({
    format: "yyyy-mm-dd",
    defaultDate: null,
    autoclose: true,
  });
});

/* // copy paste disable.
window.onload = function() {
  const myInput = document.getElementById("buss_promo_descdesc");
  myInput.onpaste = function(e) {
    e.preventDefault();
  };

  const myInput2 = document.getElementById("buss_desc");
  myInput2.onpaste = function(e) {
    e.preventDefault();
  };
}; */

function scrollNav() {
  $(".v3-list-ql-inn a").click(function () {
    //Toggle Class
    $(".active-list").removeClass("active-list");
    $(this).closest("li").addClass("active-list");
    var theClass = $(this).attr("class");
    $("." + theClass)
      .parent("li")
      .addClass("active-list");
    //Animate
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($(this).attr("href")).offset().top - 130,
        },
        400
      );
    return false;
  });
  $(".scrollTop a").scrollTop();
}
scrollNav();

$(document).on("click", ".showcate", function () {
  var id = $(this).attr("id");
  var act = $(this).hasClass("active");
  if (act == false) {
    $(this).addClass("active");
    $(this).html("Show less");
    $(".showmores_" + id).addClass("showchildcate");
    $(".showmores_" + id).removeClass("hidechildcate");
  } else {
    $(this).html("Show more");
    $(this).removeClass("active");
    $(".showmores_" + id).removeClass("showchildcate");
    $(".showmores_" + id).addClass("hidechildcate");
  }
});


