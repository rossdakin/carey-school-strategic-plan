function moveBallTo(id) {
  var $ball = $('#ball');
  var classes = {
    i: {
      left: '37%',
      top: '58%'
    },
    ii: {
      left: '39%',
      top: '34%'
    },
    iii: {
      left: '56%',
      top: '59%'
    },
    iv: {
      left: '56%',
      top: '34%'
    }
  };

  $.each(classes, function(klass, css) {
    console.debug(klass, css);
    if (klass === id) {
      $ball.addClass(klass);
      $ball.css(css);
    } else {
      $ball.removeClass(klass);
    }
  });
}

function showPage(id) {
  var scrollSpeed = 1000;

  $.scrollTo(0, $('.main-container:visible').length ? 200 : 0, {
    onAfter: function() {
      $('.main-container').hide();
      $('article').hide();

      moveBallTo(id);

      window.setTimeout(function() {
        $('article#' + id).show();
        $('.main-container').show();
        $.scrollTo('.main-container', 1000);
      }, 1000);
    }
  });
}

imagesLoaded('body', function() {
  $('body').fadeIn('slow');
});

$(function() {
  $('.click-target', 'nav.graphical').hover(function(e) {
    $(this).addClass('hover');
  }, function(e) {
    $(this).removeClass('hover');
  }).click(function(e) {
    showPage($(this).data('id'));
  });
});
