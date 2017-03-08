$(function() {

  
  //parallax
  $('.parallax').parallax({
    speed: 0.4,
    bleed:20,
    naturalWidth: 2000,
    naturalHeight: 1425,
    iosFix: true,
    androidFix: true,
    imageSrc: '../res/parallax/ecom.jpg'
  });
  
  
  //scrolling functions for news section
  $('.scrollbar-inner').scrollbar({
    ignoreMobile: true,
  });
  $('.news').on('scroll', function() {
    if ($(this).scrollTop() > 0) {
      $('.shadow-top').fadeIn('fast');
    } else {
      $('.shadow-top').fadeOut('fast');
    }
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
      $('.shadow-bottom').fadeOut('fast');
    } else {
      $('.shadow-bottom').fadeIn('fast');
    }
  })
  
  //ful call init
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
  
  
  //click modal shade to close
  $('.member-modal-shade').click(function(){
    closeMemberCard();
  })
  //click modal shade to close
  $('.register-modal-shade').click(function(){
    closeRegisterModal();
  })
  
  
  //members modal buttons
  $('.members li .wrapper').click(function() {
    var name = $('.name',this).html();
    var title = $('.title',this).html();
    var face = $('.face',this).attr("face-class");
    openMemberCard(name,title,face)
  })
  
  $('.register-banner').click(function() {
    openRegisterModal()
  })

});//end doc ready


Pace.on('done', function() {
  window.setTimeout(function(){
    $("body").addClass("loading-done");
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
  $('.member-modal #member-face')
    .removeClass()
    .addClass("face")
    .addClass(face);
  $('.member-modal .name').html(name);
  $('.member-modal .title').html(title);
  $('.member-modal-shade').fadeIn('fast')
  $('.member-modal').show().animateCss('fadeInUpSmall');
}
function closeMemberCard() {
  $('.member-modal-shade').fadeOut('fast');
  $('.member-modal').fadeOut('fast')
}



function openRegisterModal() {
  $('.register-modal-shade').fadeIn('fast')
  $('.register-modal').show().animateCss('fadeInUpSmall');
}
function closeRegisterModal() {
  $('.register-modal-shade').fadeOut('fast');
  $('.register-modal').fadeOut('fast')
  
}





$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});