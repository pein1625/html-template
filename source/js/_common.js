const getUniqId = () => {
  const ts = `${new Date().getTime()}`.substring(3, 13);
  const map = [
    ["0", "a", "b"],
    ["1", "c", "d"],
    ["2", "e", "f"],
    ["3", "g", "h"],
    ["4", "i", "j"],
    ["5", "k", "l"],
    ["6", "m", "n"],
    ["7", "o", "p"],
    ["8", "q", "r"],
    ["9", "s", "t"],
  ];
  let id = "";
  for (let i = 0; i < ts.length; i++) {
    const n = Number(ts.charAt(i));
    const arr = map[n];
    id += arr[Math.floor(Math.random() * arr.length)];
  }
  return id;
};

(function ($) {
  $.fn.isOnScreen = function (percent = 1) {
    const $el = $(this);
    const bbox = $el.get(0).getBoundingClientRect();

    let screenHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return (
      bbox.top < 54 && bbox.bottom > (screenHeight / 2) ||
      bbox.top >= 54 && bbox.top < screenHeight / 2
    );
  };
})(jQuery);

// search button toggle
$(function () {
  $(".search-btn").on("click", function (e) {
    e.stopPropagation();

    $(".search").slideToggle("fast");
    $(".search").find("input").focus();
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() >= 1200) {
      $(".search").slideUp("fast");
    }
  });

  $(".js-password-field").on("click", ".input-group-text", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const $group = $btn.closest(".js-password-field");
    const $input = $group.find(".form-control");

    $group.toggleClass("show-password");

    if ($group.hasClass("show-password")) {
      $input.attr("type", "text");
      $btn.empty().append(`<i class="fal fa-fw fa-eye-slash" />`);
    } else {
      $input.attr("type", "password");
      $btn.empty().append(`<i class="fal fa-fw fa-eye" />`);
    }
  });

  createPostMenu();

  $(".js-daterangepicker").daterangepicker({
    timePicker: true,
    locale: {
      format: "DD/MM/YYYY",
    },
  });
});

function createPostMenu() {
  const $content = $(".post__content");
  const $menu = $(".post__menu");

  if (!$content.length || !$menu.length) return;

  const menu = [];
  let subMenu = null;
  let counter = 0;

  $content.find("h2, h3, h4").each(function () {
    counter++;

    const headingClass = "content-heading-" + counter;

    $(this).addClass(headingClass);

    const item = {
      text: $(this).text(),
      el: this,
      class: headingClass,
      children: [],
    };

    switch (this.tagName.toLowerCase()) {
      case "h2":
        subMenu = item.children;
        menu.push(item);
        break;
      case "h3":
        if (subMenu) {
          subMenu.push(item);
        } else {
          menu.push(item);
        }
        break;
      case "h4":
        if (subMenu) {
          subMenu.push(item);
        } else {
          menu.push(item);
        }
        break;
      default:
    }
  });

  $menu.removeClass("d-none");
  const $menuBody = $menu.find(".post__menu-content");

  menu.forEach((item, index) => {
    $menuBody.append(`
<div class="post__menu-item" data-target="${item.class}">${index + 1}, ${
      item.text
    }</div>
    `);

    item.children.forEach((subItem, subItemIndex) => {
      $menuBody.append(`
<div class="post__menu-sub-item" data-target="${subItem.class}">${index + 1}.${
        subItemIndex + 1
      }, ${subItem.text}</div>
      `);
    });
  });

  $menuBody.on("click", ".post__menu-item, .post__menu-sub-item", function () {
    const target = $(this).data("target");

    const $target = $("." + target);

    if ($target.length) {
      $("html,body").animate(
        {
          scrollTop: $target.offset().top - 64,
        },
        "fast"
      );
    }
  });
}

$(function () {
  const $route = $(".route");

  if (!$route.length) return;

  const $select = $route.find(".route__select");
  const $dropdown = $route.find(".route__dropdown");

  $select.on("click", function (e) {
    e.stopPropagation();
    $dropdown.fadeToggle("fast");
  });

  $dropdown.on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    $dropdown.fadeOut("fast");
  });
});

$(function () {
  $(".js-experience").on("click", function () {
    $(this).closest(".banner__wrapper").remove();
  });
});

$(function () {
  const $window = $(window);
  const $pageNav = $(".page-nav");

  const pageNavIds = [];

  $(".page-nav__nav .s-btn").each(function () {
    const href = $(this).attr("href");
    pageNavIds.push(href);
  });

  $window.on("scroll", function () {
    const scrollTop = $window.scrollTop();

    if (scrollTop > 54) {
      $pageNav.addClass("is-fixed");
    } else {
      $pageNav.removeClass("is-fixed");
    }

    let target = null;

    $(".js-section").each(function () {
      const $el = $(this);
      let id = $el.attr("id");

      if (!target && id && pageNavIds.includes("#" + id) && $el.isOnScreen()) {
        target = "#" + id;
      }
    });

    if (target) {
      $(".page-nav__nav .s-btn").removeClass("active");
      $(`.page-nav__nav .s-btn[href="${target}"]`).addClass("active");
    }
  });
});
