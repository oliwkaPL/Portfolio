/* Optimiser le développement avec parcel */
reloadPage();

function reloadPage() {
  if (module.hot) {
    module.hot.accept(function() {
      window.location.reload();
    });
  }
}

/* Animate bg */
(function() {
    var ie = (function() {
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
    })();
  
    var keys = [32, 37, 38, 39, 40],
      wheelIter = 0;
  
    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault) e.preventDefault();
      e.returnValue = false;
    }
  
    function keydown(e) {
      for (var i = keys.length; i--; ) {
        if (e.keyCode === keys[i]) {
          preventDefault(e);
          return;
        }
      }
    }
  
    function touchmove(e) {
      preventDefault(e);
    }
  
    function wheel(e) {
      // for IE
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
      trigger = document.querySelectorAll(".about");
  
    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }
  
    function scrollPage() {
      scrollVal = scrollY();
  
      if (noscroll && !ie) {
        if (scrollVal < 0) return false;
        // keep it that way
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
      }
  
      // simulating the end of the transition:
      setTimeout(function() {
        isRevealed = !isRevealed;
        isAnimating = false;
        if (reveal) {
          noscroll = false;
          enable_scroll();
        }
      }, 1200);
    }
  
    // refreshing the page...
    var pageScroll = scrollY();
    noscroll = pageScroll === 0;
  
    disable_scroll();
  
    if (pageScroll) {
      isRevealed = true;
      container.classList.add("notrans");
      container.classList.add("modify");
    }
  
    window.addEventListener("scroll", scrollPage);

    for(let j = 0; j<trigger.length; j++){
      trigger[j].addEventListener("click", function() {
        toggle("reveal");
      });
    }

  })();

  // Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: .025,
    reverse: true
  }
});


/*
object to hold href values of links inside our nav with
the class '.anchor-nav'

scene_object = {
  '[scene-name]' : {
    '[target-scene-id]' : '[anchor-href-value]'
  }
}
*/
var scenes = {
  'intro': {
    'about': 'about-anchor'
  },
  'scene2': {
    'soft': 'soft-anchor'
  },
  'scene3': {
    'real': 'real-anchor'
  },
  'scene4': {
    'contact': 'contact-anchor'
  }
}



// Change behaviour of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 0.5, {
    scrollTo : {
      y : target,
      autoKill : true // Allow scroll position to change outside itself
    },
    ease : Cubic.easeInOut
  });

});


//  Bind scroll to anchor links using Vanilla JavaScript
var anchor_nav = document.querySelectorAll('.anchor-nav');

for(let k =0; k<anchor_nav.length; k++){
  anchor_nav[k].addEventListener('click', function(e) {
    var target = e.target,
        id     = target.getAttribute('href');
  
    if(id !== null) {
      if(id.length > 0) {
        e.preventDefault();
        controller.scrollTo(id);
  
        if(window.history && window.history.pushState) {
          history.pushState("", document.title, id);
        }
      }
    }
  }); 
}



  $(document).ready(function() {

    // Check if element is scrolled into view
    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
  
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();
  
      return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }
  
    $('.has-animation').each(function(index) {
      if($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).outerHeight() ){ 
        $(this).delay($(this).data('delay')).queue(function(){
            $(this).addClass('animate-in');
        });    
      }   
    });  
  
    // If element is scrolled into view, fade it in
    $(window).scroll(function() {
      $(".scroll-animations .animated").each(function() {
        if (isScrolledIntoView(this) === true) {
          $(this).addClass("fadeInLeft");
        }
      });
      
      $('.has-animation').each(function(index) {
        if($(window).scrollTop() + $(window).height() > $(this).offset().top ){ 
          $(this).delay($(this).data('delay')).queue(function(){
              $(this).addClass('animate-in');
          });    
        }   
      });   
    });

  });



