$(function() {
  
  

  //init yammer activities
  getYammerFeed()
  
  
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
  
  $('#register-modal-cancel-button').click(function() {
    closeRegisterModal()
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

function getTimeStamp() {
  return + new Date();
}





function openMemberCard(name,title,face) {
  $('.blur-wrap').toggleClass('blur');
  $('.member-modal #member-face')
    .removeClass()
    .addClass("face")
    .addClass(face);
  $('.member-modal .name').html(name);
  $('.member-modal .title').html(title);
  $('.member-modal-shade').fadeIn('fast',function() {
    $('.member-modal').show().animateCss('fadeInUpSmall');
  })
}
function closeMemberCard() {
  $('.blur-wrap').toggleClass('blur');
  $('.member-modal-shade').fadeOut('fast');
  $('.member-modal').fadeOut('fast')
}



function openRegisterModal() {
  $('.blur-wrap').toggleClass('blur');
  $('.register-modal-shade').fadeIn('fast',function() {
    $('.register-modal').show().animateCss('fadeInUpSmall');
  })
}
function closeRegisterModal() {
  $('.blur-wrap').toggleClass('blur');
  $('.register-modal-shade').fadeOut('fast');
  $('.register-modal').fadeOut('fast')
}


//yammer functions
function getYammerFeed() {
  $.getJSON( "../data/yammer.json",function(data){
    var output = []
    $.each(data.references,function(key,val) {
      var obj = {}
      var id = val.id;
      var name = val.full_name;
      var pic = val.mugshot_url;
      obj['id'] = id
      obj['name'] = name
      obj['pic'] = pic
      output.push(obj)
    })
    $.each(data.messages,function(key,val) {
      var longDate = val.created_at;
      var split = longDate.split(" ");
      var date = split[0];
      var hoursAgo = moment(date, "YYYY/MM/DD").fromNow();
      var name = "";
      var pic = "";
      $.each(output,function(key2,val2) {
        if (val2.id == val.sender_id) {
          name = val2.name;
          pic = val2.pic;
        }
      })
      makeYammerCard(name, hoursAgo, val.content_excerpt, pic)
    });
    $('.owl-carousel').owlCarousel({
      loop:true,
      items:1,
      margin:10,
      autoHeight:true,
      nav: true,
      dots: false,
    });
  });
  
}
function makeYammerCard(name,date,body,pic) {
  $("<li>").append(
    $("<div>", {class: "col-row"}).append(
      $("<div>", {class: "col pic-col"}).append(
        $("<div>", {
          class: "mugshot inline",
          style: "background-image: url(https://mug0.assets-yammer.com/mugshot/images/48x48/FrjLGMWsG1Nk7rk-ZKVKRxl8P4KZxRs1)"
        })
      ),
      $("<div>", {class: "col text-col"}).append(
        $("<div>", {class: "inner"}).append(
          $("<div>", {class: "user inline", text:name}),
          $("<div>", {class: "date inline", text:"- "+date}),
          $("<div>", {class: "body", text:body}),
          $("<div>", {class: "buttons"}).append(
            $("<div>", {class: "button-wrap inline"}).append(
              $("<svg class='inline' viewBox='0 0 24 24'><path fill='#000000' d='M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10.08L23,10M1,21H5V9H1V21Z' /></svg>"),
              $("<div>", {class: "inline", text:"LIKE"})
            ),
            $("<div>", {class: "button-wrap inline"}).append(
              $("<svg class='inline' viewBox='0 0 24 24'><path fill='#000000' d='M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z' /></svg>"),
              $("<div>", {class: "inline", text:"REPLY"})
            ),
            $("<div>", {class: "button-wrap inline", text:"VIEW IN CONVERSATION"})
          )
        )
      )
    )
  ).appendTo(".yammer")
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




