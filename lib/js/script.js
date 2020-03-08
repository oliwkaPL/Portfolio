"use strict";

/* Optimiser le développement avec parcel */
reloadPage();

function reloadPage() {
  if (module.hot) {
    module.hot.accept(function () {
      window.location.reload();
    });
  }
}
/* Animate bg */


(function () {
  var ie = function () {
    var undef,
        rv = -1; // Return value assumes failure.

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var trident = ua.indexOf("Trident/");

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf("rv:");
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf(".", rvNum)), 10);
    }

    return rv > -1 ? rv : undef;
  }();

  var keys = [32, 37, 38, 39, 40],
      wheelIter = 0;

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    preventDefault(e);
  }

  function wheel(e) {// for IE
    //if( ie ) {
    //preventDefault(e);
    //}
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
  }

  function hasClass(elem, c) {
    return elem.classList.contains(c);
  }

  var docElem = window.document.documentElement,
      scrollVal,
      isRevealed,
      noscroll,
      isAnimating,
      container = document.getElementById("container"),
      trigger = document.querySelector(".trigger");
  trigger2 = document.querySelector(".trigger-2");

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    scrollVal = scrollY();

    if (noscroll && !ie) {
      if (scrollVal < 0) return false; // keep it that way

      window.scrollTo(0, 0);
    }

    if (hasClass(container, "notrans")) {
      container.classList.remove("notrans");
      return false;
    }

    if (isAnimating) {
      return false;
    }

    if (scrollVal <= 0 && isRevealed) {
      toggle(0);
    } else if (scrollVal > 0 && !isRevealed) {
      toggle(1);
    }
  }

  function toggle(reveal) {
    isAnimating = true;

    if (reveal) {
      container.classList.add("modify");
    } else {
      noscroll = true;
      disable_scroll();
      container.classList.remove("modify");
    } // simulating the end of the transition:


    setTimeout(function () {
      isRevealed = !isRevealed;
      isAnimating = false;

      if (reveal) {
        noscroll = false;
        enable_scroll();
      }
    }, 1200);
  } // refreshing the page...


  var pageScroll = scrollY();
  noscroll = pageScroll === 0;
  disable_scroll();

  if (pageScroll) {
    isRevealed = true;
    container.classList.add("notrans");
    container.classList.add("modify");
  }

  window.addEventListener("scroll", scrollPage);
  trigger.addEventListener("click", function () {
    toggle("reveal");
  });
  trigger2.addEventListener("click", function () {
    toggle("reveal");
  });
})();

(function () {
  var listBlock = document.querySelectorAll(".bg-homepage .block");
  var listAvatar = document.querySelectorAll(".bg-homepage .avatar");
  var position = 0;
  var limit = listBlock.length - 1;
  setInterval(function () {
    if (position == limit) {
      position = 0;
      listBlock[position].classList.add("active");
      listBlock[limit].classList.remove("active");
      listAvatar[position].classList.add("active");
      listAvatar[limit].classList.remove("active");
    } else {
      var next = position + 1;
      listBlock[position].classList.remove("active");
      listBlock[next].classList.add("active");
      listAvatar[position].classList.remove("active");
      listAvatar[next].classList.add("active");
      position++;
    }
  }, 2000);
})();