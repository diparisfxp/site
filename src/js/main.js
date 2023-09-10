
$('.faq-pergunta').click(function() {
    var status = $(this).attr('data-status');
  
    if (status=='fechado') {
        $(this).attr('data-status', 'aberto');
        $(this).addClass('faq-pergunta-aberto');
        $(this).removeClass('faq-pergunta-fechado');
        $(this).find('.faq-resposta').toggle();
        $(this).find('.icon-toggle-plus').toggle();
        $(this).find('.icon-toggle-minus').toggle();
    } else if (status=='aberto') {
        $(this).attr('data-status', 'fechado');
        $(this).addClass('faq-pergunta-fechado');
        $(this).removeClass('faq-pergunta-aberto');
        $(this).find('.faq-resposta').toggle();
        $(this).find('.icon-toggle-plus').toggle();
        $(this).find('.icon-toggle-minus').toggle();
    }
  });
  
  $(document).ready(function() {
    $('#exemplomodal').modal('show');
  })
  
  $('.add-to-cart').on('click', function (e) {
  
      e.preventDefault();
  
      $.ajax({
          url: '/home/cart/add',
          method: 'POST',
          data: { 'id':$(this).attr('id') },
          complete: function () {
  
              openCart();
  
          }
      });
  
      return false;
  
  });
  
  $('.cart-minus').on('click', function (e) {
  
      e.preventDefault();
  
      $.ajax({
          url: '/home/cart/minus',
          method: 'POST',
          data: { 'id':$(this).attr('id') },
          complete: function () {
  
              attCart();
  
          }
      });
  
      return false;
  
  });
  
  $('.cart-delete').on('click', function (e) {
  
      e.preventDefault();
  
      $.ajax({
          url: '/home/cart/remove',
          method: 'POST',
          data: { 'id':$(this).attr('id') },
          complete: function () {
  
              attCart();
  
          }
      });
  
      return false;
  
  });
  
  function openCart()
  {
      $('header').css('margin-right', '500px');
      $('main').css('margin-right', '500px');
      $('footer').css('margin-right', '500px');
      $('body').css('overflow-y', 'none');
      $('body').css('overflow-x', 'none');
      $('.cart').show("slide", { direction: "right" }, 100);
  
      attCart();
  }
  function closeCart() {
      $('header').css('margin-right', '0');
      $('main').css('margin-right', '0');
      $('footer').css('margin-right', '0');
      $('body').css('overflow-y', 'none');
      $('body').css('overflow-x', 'none');
      $('.cart').hide("slide", { direction: "right" }, 100);
  }
  
  
  function attCart() {
  
      let div = $('.cart_content');
      let div_price = $('#cart_subtotal');
  
      div.html("<div class=\"h1 text-center mt-5\" style=\"font-size: 72px;\"><i class=\"fas fa-spinner fa-spin\"></i></div><p class=\"text-muted h4 text-center\">Atualizando carrinho...</p>");
      div_price.html("<i class=\"fas fa-spinner fa-spin\"></i>");
  
      $.get( "/home/cart/price", function( data ) {
          div_price.html(data);
      });
      $.get( "/home/cart", function( data ) {
          div.html(data);
      });
  }
  
  $('#checkout').on('submit', function(e) {
  
      e.preventDefault();
  
      let btn = $('#checkout .btn');
  
      btn.prop('disabled', true);
      btn.html('Gerando fatura...');
  
      $.ajax({
          url: '/checkout',
          method: 'POST',
          data: $(this).serialize(),
          dataType: 'JSON',
          complete: function (data) {
  
              console.log(data.responseText);
  
              let res = JSON.parse(data.responseText);
  
              if(res.status)
              {
                  location.href = res.link;
              }else{
                  alert(res.message);
  
                  btn.prop('disabled', false);
                  btn.html('Finalizar pagamento');
              }
  
          }
      });
  
      return false;
  
  });
  
  "use strict";
  
  // Add Slider functionality to the top of home page in #top-content section.
  var mainSlider = $("#main-slider","#top-content");
  mainSlider.slick({
      dots: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
  });
  // Adding animation to the #main-slider
  mainSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.slide > div:nth-child(1)','#main-slider').removeClass("animated");
      $('.slide > div:nth-child(2)','#main-slider').removeClass("animated animation-delay1");
   
      $('.slick-active > div:nth-child(1)','#main-slider').addClass("animated");
      $('.slick-active > div:nth-child(2)','#main-slider').addClass("animated animation-delay1");
  });
  // Add Slider functionality to the #testimonials section in the home page.
  var testimonialsSlider = $("#testimonials-slider","#testimonials");
  testimonialsSlider.slick({
      dots: false,
      arrows: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1
  });
  // Add Slider functionality to the testimonials in the "Sign in" and "Sign out" pages.
  var miniTestimonialsSlider = $(".mini-testimonials-slider","#form-section");
  miniTestimonialsSlider.slick({
      dots: true,
      arrows: false,
      infinite: false,
      autoplay: true,
      speed: 200
  });
  // Add Slider functionality to the info-slider in the about page.
  var infoSlider = $(".info-slider","#page-head");
  infoSlider.slick({
      dots: true,
      arrows: false,
      infinite: false,
      autoplay: true,
      speed: 200
  });
  $(window).on("load", function() {
      // Adding animation to the #main-slider
      $('.slick-active > div:nth-child(1)','#main-slider').addClass("animated");
      $('.slick-active > div:nth-child(2)','#main-slider').addClass("animated animation-delay1");
      // Counter slider functions in "CUSTOM HOSTING PLAN" section on the homepage
      var cPlan = $('#c-plan');
      cPlan.slider({
          tooltip: 'always'
      });
      cPlan.on("slide", function(e) {
          $('.slider .tooltip-up','#custom-plan').text(e.value/20);
          $('.price','#custom-plan').text($(this).data("currency") + e.value/20);
          $('.feature1 span','#custom-plan').text(e.value);
          $('.feature2 span','#custom-plan').text(e.value*98);
      });
      cPlan.value = cPlan.data("slider-value");
      $('.slider .tooltip','#custom-plan').append('<div class="tooltip-up"></div>');
      $('.slider .tooltip-up','#custom-plan').text(cPlan.value/20);
      $('.slider .tooltip-inner','#custom-plan').attr("data-unit",cPlan.data("unit"));
      $('.slider .tooltip-up','#custom-plan').attr("data-currency",cPlan.data("currency"));
      
      $('.price','#custom-plan').text(cPlan.data("currency") + cPlan.value/20);
      $('.feature1 span','#custom-plan').text(cPlan.value);
      $('.feature2 span','#custom-plan').text(cPlan.value*98);
  
      // Features Section click function
      var featureIconHolder = $(".feature-icon-holder", "#features-links-holder");
      
      featureIconHolder.on("click",function(){
          featureIconHolder.removeClass("opened");
          $(this).addClass("opened");
          $(".show-details","#features-holder").removeClass("show-details");
          $(".feature-d"+$(this).data("id"), "#features-holder").addClass("show-details");
      });
      
      // Fix #features-holder height in features section
      var featuresHolder = $("#features-holder");
      var featuresLinksHolder = $("#features-links-holder");
      var featureBox = $(".show-details","#features-holder");
      
      featuresHolder.css("height",featureBox.height()+120);
      featuresLinksHolder.css("height",featureBox.height()+120);
  
      // Fix #features-holder height in features section
      $(window).on("resize",function() {
          featuresHolder.css("height",featureBox.height()+120);
          featuresLinksHolder.css("height",featureBox.height()+120);
          return false;
      });
      
      // Apps Section hover function
      var appHolder = $(".app-icon-holder", "#apps");
      
      appHolder.on("mouseover",function(){
          appHolder.removeClass("opened");
          $(this).addClass("opened");
          $(".show-details", "#apps").removeClass("show-details");
          $(".app-details"+$(this).data("id"), "#apps").addClass("show-details");
      });
      
      // More Info Section hover function
      var infoLink = $(".info-link", "#more-info");
      
      infoLink.on("mouseover",function(){
          infoLink.removeClass("opened");
          $(this).addClass("opened");
          $(".show-details", "#more-info").removeClass("show-details");
          $(".info-d"+$(this).data("id"), "#more-info").addClass("show-details");
      });
      
      // Servers Marker Location in our servers page
      var locationsList = [["California",97,48,"r"],["Costa Rika",212,31,"l"],["Vancouver",136,161,"r"],["Brazil",303,233,"r"],["Alexandria",149,349,"l"],["Dubai",174,469,"l"],["Delhi",204,605,"r"],["Munech",91,417,"r"],["Barcelona",112,279,"l"],["Moscow",41,554,"r"],["Hong Kong",151,663,"r"],["Melborne",356,688,"l"],["Pulau Ujong",265,578,"l"]];
      
      var serversLocationHolder = $('.servers-location-holder','#serversmap.st');
      for(var i=0;i<=locationsList.length-1;i++){
          var sMarkerDir = locationsList[i][3];
          var leftText = "";
          var rightText = "";
          if(sMarkerDir=="r"){
              leftText = "";
              rightText = locationsList[i][0];
          }else if(sMarkerDir=="l"){
              leftText = locationsList[i][0];
              rightText = "";
          }
          serversLocationHolder.append('<div class="server-marker" style="top:'+locationsList[i][1]+'px;left:'+locationsList[i][2]+'px;"><span class="left-text">'+leftText+'</span><span class="marker-icon"></span><span class="right-text">'+rightText+'</span></div>');
      }
      (function ($) {
          "use strict";
        
          // Preloader (if the #preloader div exists)
          $(window).on('load', function () {
            if ($('#preloader').length) {
              $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).remove();
              });
            }
          });
        
          // Back to top button
          $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
              $('.back-to-top').fadeIn('slow');
            } else {
              $('.back-to-top').fadeOut('slow');
            }
          });
          $('.back-to-top').click(function(){
            $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
            return false;
          });
        
          // Initiate the wowjs animation library
          new WOW().init();
        
          // Header scroll class
          $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
              $('#header').addClass('header-scrolled');
            } else {
              $('#header').removeClass('header-scrolled');
            }
          });
        
          if ($(window).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
          }
        
          // Smooth scroll for the navigation and links with .scrollto classes
          $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              if (target.length) {
                var top_space = 0;
        
                if ($('#header').length) {
                  top_space = $('#header').outerHeight();
        
                  if (! $('#header').hasClass('header-scrolled')) {
                    top_space = top_space - 20;
                  }
                }
        
                $('html, body').animate({
                  scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');
        
                if ($(this).parents('.main-nav, .mobile-nav').length) {
                  $('.main-nav .active, .mobile-nav .active').removeClass('active');
                  $(this).closest('li').addClass('active');
                }
        
                if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('.mobile-nav-overly').fadeOut();
                }
                return false;
              }
            }
          });
        
          // Navigation active state on scroll
          var nav_sections = $('section');
          var main_nav = $('.main-nav, .mobile-nav');
          var main_nav_height = $('#header').outerHeight();
        
          $(window).on('scroll', function () {
            var cur_pos = $(this).scrollTop();
          
            nav_sections.each(function() {
              var top = $(this).offset().top - main_nav_height,
                  bottom = top + $(this).outerHeight();
          
              if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find('li').removeClass('active');
                main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
              }
            });
          });
        
        })(jQuery);
        
        
  });