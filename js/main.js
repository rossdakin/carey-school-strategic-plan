function moveBallTo(id) {
  var $ball = $('#ball');
  var classes = {
    i: {
      left: '37%',
      top: '57%'
    },
    ii: {
      left: '39%',
      top: '34%'
    },
    iii: {
      left: '56%',
      top: '57%'
    },
    iv: {
      left: '56%',
      top: '34%'
    }
  };

  $.each(classes, function(klass, css) {
    if (klass === id) {
      $ball.addClass(klass);
      $ball.css(css);
    } else {
      $ball.removeClass(klass);
    }
  });
}

function showPage(id, scrollInstantly, moveBallAnyway) {
  function go(scrollSpeed, moveBall) {
    $('article').hide().find('#' + id).show();
    $('article#' + id).show();
    $('.main-container').show();
    $.scrollTo('.main-container', scrollSpeed || 0);

    if (moveBall) {
      moveBallTo(id);
    }
  }

  function animate() {
    moveBallTo(id);
    window.setTimeout(function() { go(1000); }, 1000);
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
  var y = (window.pageYOffset !== undefined) ? window.pageYOffset :
    (document.documentElement ||
     document.body.parentNode ||
     document.body).scrollTop;

  if (scrollInstantly) {
    go(0, moveBallAnyway);
/* Ignore this for now, since the top of the page is currently the only
 * place from which an animated page change may be triggered (so we never
 * need to scroll to the top, as we can assume the user can already see it).
  } else if (y) {
    $.scrollTo(0, 500, { onAfter: animate });
*/
  } else {
    animate();
  }
}

imagesLoaded('body', function() {
  $('body').fadeIn('slow');
});

$(function() {
  $('nav.graphical').click(function(e) {
    var $target = $(this)[0];

    // polyfill for FireFox, ugh.
    e.offsetX = e.offsetX || (e.pageX - $(e.target).offset().left);
    e.offsetY = e.offsetY || (e.pageY - $(e.target).offset().top);

    var offsetPercentX = 1.0 * e.offsetX / $target.offsetWidth;
    var offsetPercentY = 1.0 * e.offsetY / $target.offsetHeight;
    var midpointPercents = {
      x: 0.50,
      y: 0.58
    };

    if (offsetPercentX < midpointPercents.x) {
      showPage(offsetPercentY < midpointPercents.y ? 'ii' : 'i');
    } else {
      showPage(offsetPercentY < midpointPercents.y ? 'iv' : 'iii');
    }
  });

  $('header nav.textual a').click(function(e) {
    showPage($(this).attr('href').substr(1), true);
  });

  $('.main article nav a').click(function(e) {
    showPage($(this).attr('href').substr(1), true, true);
  });
});
