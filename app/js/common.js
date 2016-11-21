$("#preloader").fadeOut();
$("#nav").fadeIn();
//Форма отправки 2.0
$(function() {
  $("[name=send]").click(function () {
    $(":input.error").removeClass('error');
    $(".allert").remove();

    var error;
    var btn = $(this);
    var ref = btn.closest('form').find('[required]');
    var msg = btn.closest('form').find('input, textarea, select');
    var send_btn = btn.closest('form').find('[name=send]');
    var send_options = btn.closest('form').find('[name=campaign_token]');
    var menu_form = btn.closest('form').find('[name=menu_form]').val();



    $(ref).each(function() {
      if ($(this).val() == '') {
        var errorfield = $(this);
        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg></div>');
        error = 1;
        $(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).attr("type") == 'email') {
          if(!pattern.test($(this).val())) {
            $("[name=email]").val('');
            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg></div>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
        var patterntel = /^()[- +()0-9]{9,18}/i;
        if ( $(this).attr("type") == 'tel') {
          if(!patterntel.test($(this).val())) {
            $("[name=phone]").val('');
            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите номер телефона в формате +3809999999</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg></div>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
      }
    });
    if(!(error==1)) {
      $(send_btn).each(function() {
        $(this).attr('disabled', true);
      });
      $(send_options).each(function() {
        var form = $(this).closest('form'), name = form.find('.name').val();
        if ($(this).val() == '') {
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success: function() {
              $('form').trigger("reset");
              setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                    // Настройки модального окна после удачной отправки
                      if (menu_form == "yes") {
                        $('#modal_send').addClass('open');
                        $('form').trigger("reset");
                     } else{
                        $('div.md-show').removeClass('md-show');
                        $('form').trigger("reset");
                        $("#call_ok")[0].click();
                     }
                  },
                  error: function(xhr, str) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                  }
                });
          } else {
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success:
            $.ajax({
              type: 'POST',
              url: 'https://app.getresponse.com/add_subscriber.html',
              data: msg,
              statusCode: {0:function() {
                $( "#modal_callback_ok h4" ).remove();
                $( "#modal_callback_ok" ).prepend("<h4>"+name+",</h4>");
                $('form').trigger("reset");
                setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                // Настройки модального окна после удачной отправки
                yaCounter40419295.reachGoal(goal);
                $('div.md-show').removeClass('md-show');
                $('form').trigger("reset");
                $("#call_ok")[0].click();
              }}
            }),
            error:  function(xhr, str) {
              alert('Возникла ошибка: ' + xhr.responseCode);
            }
          });
        }
      });
    }
    return false;
  })
});





 // Smooth scroll to anchor

 $('.scroll').click(function(){
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 1000);
  return false;
});


//  CURSOR ON SLIDER HOVER FUNCTION

$(document).ready(function() {
jQuery(".slider_goods").mousedown(function() {
    jQuery(this).removeClass("touch_mode_grab")
        .addClass("touch_mode_grabbing");
    }).mouseup(function() {
    jQuery(this).removeClass("touch_mode_grabbing")
        .addClass("touch_mode_grab");
    })
});


//  UP BUTTON

$( document ).ready(function() {
  $('#scrollup img').mouseover( function(){
    $( this ).animate({opacity: 0.65},100);
  }).mouseout( function(){
    $( this ).animate({opacity: 1},100);
  });

  $(window).scroll(function(){
    if ( $(document).scrollTop() > 0 ) {
      $('#scrollup').fadeIn('slow');
    } else {
      $('#scrollup').fadeOut('slow');
    }
  });

  $('#scrollup').click(function() {
    $('body,html').animate({scrollTop:0},1000);
  });
});


//  INPUT TEL MASK

jQuery(function($){
 $("input[type='tel']").mask("+9 (999) 999-9999");
});



// Scroll BAR

$(window).scroll(function() {
    // calculate the percentage the user has scrolled down the page
    var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

    $('.bar-long').css('width', scrollPercent +"%"  );

  });

// Sldier initialization

$(document).ready(function() {
    $('.slider_goods').slick({
        slidesToShow: 3,
        dots: true,
        arrows: true,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [{
                breakpoint: 700,
                settings: {
                    slidesToShow: 2
                }
            },
            {
              breakpoint: 400,
              settings: {
                  slidesToShow: 1,
                  adaptiveHeight: true
              }
          }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function() {
    $('.slider-sprays_mobile').slick({
        slidesToShow: 1,
        dots: false,
        arrows: true,
        slidesToScroll: 1,
        autoplay: false,
        adaptiveHeight: true
    });
});

$(document).ready(function(){
 $('.slider-big').slick({
  slidesToShow: 1,
  dots: false,
  arrows: false,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  fade: true,
  asNavFor: '.slider-small'
});
 });

$(document).ready(function(){
$('.slider-small').slick({
  slidesToShow: 3,
  dots: false,
  arrows: false,
  centerMode: true,
  centerPadding: '0px',
  slidesToScroll: 1,
  asNavFor: '.slider-big',
  focusOnSelect: true,

});
});

// PREVENT SCROLLING

$('*').click(function() {
  let modal= $(".md-modal");
  if($('#fullpage').hasClass('fullpage-wrapper')){
    if( modal.hasClass('md-show')){
      $.fn.fullpage.setAllowScrolling(false);
      $.fn.fullpage.setKeyboardScrolling(false);
    } else {
      $.fn.fullpage.setAllowScrolling(true);
      $.fn.fullpage.setKeyboardScrolling(true);
    }
  }
});


// Fullpage.js initialization based on screen width

$(document).ready(function() {
  if(screen.width < 1200) { 
  return;
  } else {
    $('#fullpage').fullpage({
       anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage', 'eightPage', 'ninthPage'],
        responsiveWidth: 1200,
        menu: '#nav'
    });
  };
  $( window ).resize(function() {
    if(screen.width < 1200) { 
    return;
    } else {
      if($('#fullpage').hasClass('fullpage-wrapper')){
      } else {
        $('#fullpage').fullpage({
           anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage', 'eightPage', 'ninthPage'],
            responsiveWidth: 1200,
            menu: '#nav'
        });
      }
    }
  })
})

// Menu

$(document).ready(function() {
    (function() {
      var i, resize;

      i = setInterval(function() {
        return $("#nav .wrapper").toggleClass("cross");
    }, 1500);

      $("#nav .wrapper").click(function() {
        clearInterval(i);
        if($('#nav').hasClass('open')){
            return $("#nav .wrapper").addClass("cross");
        } else {
            return $("#nav .wrapper").removeClass("cross");
        }
    });
      $('.callback').click(function(){
        clearInterval(i);
        $("#nav .wrapper").addClass("cross");
      });
  }).call(this);

    $('#menu').click(function(){
      $('#modal_send').removeClass('open');
        $('#nav').toggleClass('open');
        if($('#modal_nav').hasClass('open')){
          $('#modal_nav').removeClass('open');
        }
    });

    $('#nav li a').click(function(){
      $('#nav').removeClass('open');
      $("#nav .wrapper").removeClass("cross");
    })

    $('.callback').click(function(){
        if($('#nav').hasClass('open')){
            $('#modal_nav').addClass('open');
        } else {
            $('#nav').addClass('open');
            $('#modal_nav').addClass('open');
        };
    })
});


// CUSTOM MODALS

jQuery(document).ready(function($) {
  $('[class*="modal_good_trigger"]').click(function() {
    setTimeout(function(){
      $('.card').addClass('visible');
    }, 400);
    if($('#nav').hasClass('open')){
      $('#nav').removeClass('open');
      $("#nav .wrapper").removeClass("cross");
    }
  });
  $('.btn_close_modal_goods').click(function() {
    $("[class*='good_card']").removeClass('open');
    $('.card').removeClass('visible');
  });

  $('.modal_good_trigger-1').click(function(){
    $('.good_card-1').addClass('open');
  })
  $('.modal_good_trigger-2').click(function(){
    $('.good_card-2').addClass('open');
  })
  $('.modal_good_trigger-3').click(function(){
    $('.good_card-3').addClass('open');
  })
  $('.modal_good_trigger-4').click(function(){
    $('.good_card-4').addClass('open');
  })
  $('.modal_good_trigger-5').click(function(){
    $('.good_card-5').addClass('open');
  })
  $('.modal_good_trigger-6').click(function(){
    $('.good_card-6').addClass('open');
  })
  $('.modal_good_trigger-7').click(function(){
    $('.good_card-7').addClass('open');
  })
  $('.modal_good_trigger-8').click(function(){
    $('.good_card-8').addClass('open');
  })
});


//  Sizes changes


$('#modal_sizes tr').click(function() {
  $('select > option').removeAttr('selected');
  $('select > option:nth-child('+$(this).index()+')').attr('selected', ' ');
});

$('#modal_sizes td').click(function() {
  $('#modal_sizes td').removeClass('selected');
  $(this).addClass('selected');
});