$(function () {
  var $search = $(".search");

  $(".h-search-toggle").on("click", function (e) {
    e.stopPropagation();
    $search.fadeToggle();
  });

  $search.on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() < 1200) return;

    $search.fadeOut();
  });
});

$(function () {
  $(".js-frame-overlay").on("click", function (e) {
    e.preventDefault();

    $(this).hide();
  });
});

// Post
$(function () {
  let menu = "<ul>";
  let count = 0;
  let count2 = 0;
  let prevTag = "h2";

  $(".js-post-content")
    .find("h2, h3")
    .map(function (index) {
      const $el = $(this);
      const text = $el.text();

      console.log($el.text());

      if ($el.is("h2")) {
        if (prevTag === "h3") {
          count2 = 0;
          menu += "</li></ul>";
        }

        count++;
        prevTag = "h2";
      } else if ($el.is("h3")) {
        if (prevTag === "h2") {
          count2++;
          menu.replace(/<\/li>$/, "");
          menu += "<ul>";
        }

        prevTag = "h3";
      }

      // let countText = count2 ? count + "." + count2 : count + ".";
      let countText = "";

      menu += `<li><a href='.js-post-title-${index}'>${countText} ${text}</a></li>`;
      $el.addClass("js-post-title-" + index);
    });

  $(".s-post__menu").addClass("show");

  $(".s-post__menu-content").html(menu);

  let toggleText = "Ẩn";

  $(".s-post__menu-toggle").on("click", function () {
    $(".s-post__menu-content").slideToggle("fast");

    if (toggleText === "Ẩn") {
      toggleText = "Hiện";
    } else {
      toggleText = "Ẩn";
    }

    $(this).html(toggleText);
  });

  $(".s-post__menu-content").on("click", "a", function (e) {
    e.preventDefault();

    let target = $(this).attr("href");

    if (!$(target).length) {
      return;
    }

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      700
    );
  });

  $(".js-post-content")
    .find("table")
    .addClass("table table-bordered table-hover mb-0")
    .wrap('<div class="table-responsive"></div>');
});
