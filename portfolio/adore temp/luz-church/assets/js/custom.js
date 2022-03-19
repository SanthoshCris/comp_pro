  $(document).ready(function(){
    $(".mwb-select-style-menu").click(function(){
      $(".mwb-select-style-sub-menu").slideToggle("slow");
    });
  });
  $(document).ready(function(){
    $(".mwb-select-style-sub-menu li a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
        });
      } 
    });
  });
  $(".mwb-scroll-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  $(window).scroll(function(){
    if ($(this).scrollTop() > 200) {
      $('.mwb-scroll-top').addClass('mwb-scroll-top-visible');
      // alert("djdjd");
    }
    else {
      $('.mwb-scroll-top').removeClass('mwb-scroll-top-visible');
    }
  });
