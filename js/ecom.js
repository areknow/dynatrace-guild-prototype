$(function() {

  
  
  $('.parallax').parallax({
    speed: 0.4,
    bleed:20,
    naturalWidth: 2000,
    naturalHeight: 1425,
    iosFix: true,
    androidFix: true,
    imageSrc: '../res/parallax/ecom.jpg'
  });
  
  
  $('.scrollbar-inner').scrollbar( {
//    disableBodyScroll: true
//    stepScrolling: true
  });
  
//  $('.news').height($('.members').height())
  

  
  
  
  if ($(window).width() < 700) {
    var calheight = 400;
  } else { var calheight = 600; }
  $('#calendar').fullCalendar({
    height: calheight,
    defaultDate: getDate(),
    editable: false,
    eventLimit: true,
    googleCalendarApiKey: 'AIzaSyCXbvOjms8LWLyzOvzHQbngyE3qjQY5e-4',
    eventSources: [{
        googleCalendarId: 'roqvb8ko1iptdg6bmu64tibclg@group.calendar.google.com',
        className: 'events-guild'
      }, {
        googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
        className: 'events-holidays'
      }
    ]
  });
  
  $('.modal-shade').click(function(){
    closeMemberCard();
  })
  
  $('.members li').click(function() {
    var name = $('.name',this).html();
    var title = $('.title',this).html();
    var face = $('.face',this).attr("class");
    console.log(face)
    openMemberCard(name)
  })

}); //end doc ready


Pace.on('done', function() {
  window.setTimeout(function(){
    $("body").addClass("loading-done");
//    dropTiles();
  }, 3000);
  
});



function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10) {dd='0'+dd} 
  if(mm<10) {mm='0'+mm} 
  today = yyyy+'-'+mm+'-'+dd;
  return today;
}







function openMemberCard(name,title,face) {
//  console.log(name,title,face)
  $('.modal-shade').fadeIn(function() {
    $('.member-modal').fadeIn();
  })
}

function closeMemberCard() {
  $('.member-modal').fadeOut(function() {
    $('.modal-shade').fadeOut();
  })
}










//var scrollShadow = (function() {
//  var elem, width, height, offset,
//    shadowTop, shadowBottom,
//    timeout;
//
//  function initShadows() {
//    shadowTop = $("<div>")
//      .addClass("shadow-top")
//      .insertAfter(elem);
//    shadowBottom = $("<div>")
//      .addClass("shadow-bottom")
//      .insertAfter(elem);
//  }
//
//  function calcPosition() {
//    width = elem.outerWidth();
//    height = elem.outerHeight();
//    offset = elem.position();
//
//    // update 
//    shadowTop.css({
//      width: width + "px",
//      top: offset.top + "px",
//      left: offset.left + "px"
//    });
//    shadowBottom.css({
//      width: width + "px",
//      top: (offset.top + height - 20) + "px",
//      left: offset.left + "px"
//    });
//  }
//
//  function addScrollListener() {
//    elem.off("scroll.shadow");
//    elem.on("scroll.shadow", function() {
//      if (elem.scrollTop() > 0) {
//        shadowTop.fadeIn(125);
//      } else {
//        shadowTop.fadeOut(125);
//      }
//      if (elem.scrollTop() + height >= elem[0].scrollHeight) {
//        shadowBottom.fadeOut(125);
//      } else {
//        shadowBottom.fadeIn(125);
//      }
//    });
//  }
//
//  function addResizeListener() {
//    $(window).on("resize", function() {
//      clearTimeout(timeout);
//      timeout = setTimeout(function() {
//        calcPosition();
//        elem.trigger("scroll.shadow");
//      }, 10);
//    });
//  }
//
//  return {
//    init: function(par) {
//      elem = $(par);
//      initShadows();
//      calcPosition();
//      addScrollListener();
//      addResizeListener();
//      elem.trigger("scroll.shadow");
//    },
//    update: calcPosition
//  };
//
//}());
//
//// start
//scrollShadow.init(".news");