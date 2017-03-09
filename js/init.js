$(function() {

  
  filterList($(".iconlist"));
  
  
  $('.parallax').parallax({
    speed: 0.4,
    bleed:20,
    naturalWidth: 2000,
    naturalHeight: 1331,
    iosFix: true,
    androidFix: true,
    imageSrc: 'res/parallax/home.jpg'
  });
  
  
  $('.js-tilt').tilt({
    glare: true,
    maxGlare: .5,
    scale: 1.05,
    perspective: 3000,
  })
  
  
  
  $('.down-arrow').click(function() {
    if ($(this).hasClass('rotated')) {
      awayfromFold()
    } else {
      scrollToFold()
    }
  })
  
  
  
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-50
        }, 400);
        return false;
      }
    } 
  })
  
  
  //header search functionality
  $('#header-search-input').change(function() {
    $('.filterinput').val($(this).val())
  }).keyup( function () {
    $(this).change();
  });
  $('#header-search-input').bind("header-search-enter",function(e){
    $('.header-search-button').click();
  });
  $('#header-search-input').keyup(function(e){
    if(e.keyCode == 13) {
      $(this).trigger("header-search-enter");
    }
  });
  
  
  $('.filterform .close').click(function() {
    $('.filterinput').val('')
    $(this).fadeOut();
    $('#tech-list li').show();
  })
  
})




Pace.on('done', function() {
  window.setTimeout(function(){
    $("body").addClass("loading-done");
    dropTiles();
  }, 3000);
  
});


//sticky header functions
var $win = $(window),
$filter = $('header'),
$filterSpacer = $('<div />', {
  "class": "filter-drop-spacer",
  "height": $filter.outerHeight()
});
$win.scroll(function(){
  if(!$filter.hasClass('is-sticky') && $win.scrollTop() > $filter.offset().top){
    $filter.before($filterSpacer);
    $filter.addClass("is-sticky");
    $('.down-arrow').toggleClass('rotated');
  } else if ($filter.hasClass('is-sticky')  && $win.scrollTop() < $filterSpacer.offset().top){
    $filter.removeClass("is-sticky");
    $filterSpacer.remove();
    $('.down-arrow').toggleClass('rotated');
  }
});



//nav bar scrolling functions
function scrollToFold() {
  $('html,body').animate({
    scrollTop: $('#fold').offset().top-50
  }, 700);
}
function awayfromFold() {
  $('html,body').animate({
    scrollTop: $('body').offset().top
  }, 700);
}


function dropTiles() {
  $('.tile-1').delay(1300).show(0).animateCss('fadeInUpSmall');
  $('.tile-2').delay(1400).show(0).animateCss('fadeInUpSmall');
  $('.tile-3').delay(1500).show(0).animateCss('fadeInUpSmall');
//  $('.tile-1').delay(1400).animate({
//    top: 30,
//    opacity: 1,
//  }, 200, function() {});
//  $('.tile-2').delay(1500).animate({
//    top: 30,
//    opacity: 1,
//  }, 200, function() {});
//  $('.tile-3').delay(1600).animate({
//    top: 30,
//    opacity: 1,
//  }, 200, function() {});
  
}


//filtering functions
function filterList(list) {
  $('.filterinput')
  .change( function () {
    var filter = $(this).val();
    $('#header-search-input').val(filter)
    if(filter) {
      $matches = $(list).find('a:Contains(' + filter + ')').parent();
      $('li', list).not($matches).hide();
      $matches.show();
      $('.filterform .close').fadeIn();
    } else {
      $(list).find("li").show();
      $('.filterform .close').fadeOut();
    }
    return false;
  })
  .keyup( function () {
    $(this).change();
  });
}
jQuery.expr[':'].Contains = function(a,i,m){
  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};


function getTimeStamp() {
  return + new Date();
}

//extende jquery for animate.css
$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});