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

function showPage(id) {
  function go() {
    moveBallTo(id);
    window.setTimeout(function() {
      $('article').hide().find('#' + id).show();
      $('article#' + id).show();
      $('.main-container').show();
      $.scrollTo('.main-container', 1000);
    }, 1000);
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
  var y = (window.pageYOffset !== undefined) ? window.pageYOffset :
    (document.documentElement ||
     document.body.parentNode ||
     document.body).scrollTop;

  if (y) {
    $.scrollTo(0, 500, { onAfter: go });
  } else {
    go();
  }
}

imagesLoaded('body', function() {
  $('body').fadeIn('slow');
});

$(function() {
  $('.click-target', 'nav.graphical').click(function(e) {
    showPage($(this).data('id'));
  });

  $('.main article nav a').click(function(e) {
    showPage($(this).attr('href').substr(1));
  });
});
