// GSAP Animation
//

// On Start
$(document).ready(function () {

  // Loader
  var loader = document.getElementById("loader");
  var loaderLogo = document.getElementById("loader-img");
  var logo = document.getElementById("logo");
  var position = $('#logo').offset();


  var loaderTL = new TimelineMax();
  loaderTL
    .set(logo, {
      opacity: 0
    })
    .from(loaderLogo, 2, {
      delay: 1,
      opacity: 0,
      ease: Back.easeOut.config(1.7)
    })
    .to(loader, 1, {
      backgroundColor: "transparent"
    }, "fadein")
    .to(loaderLogo, 1, {
      left: (position.left),
      top: (position.top),
      ease: Power1.easeOut
    }, "fadein")
    .set(logo, {
      opacity: 100
    })
    .add(function () {
      $(loader).addClass("invis");
    })
    .staggerFrom(".nav-item", .5, {
      y: "-2000"
    }, 0.07, "fadein")
    .from($('#slider-text'), 1, {
      x: "-600%",
      ease: Back.easeOut.config(1.7)
    }, "fadein");


  // Slider
  var sliderText = document.getElementById("slider-text");
  TweenMax

}); // End On Start