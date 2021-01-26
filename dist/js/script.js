var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.menu');
var menuNav = document.querySelector('.menu-nav');
var menuBranding = document.querySelector('.menu-branding');
var menuItems = document.querySelectorAll('.menu-item');

var showMenu = false;

menuBtn.addEventListener('click', function () {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    menuItems.forEach((item) => item.classList.add('show'));
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    menuItems.forEach((item) => item.classList.remove('show'));
    showMenu = false;
  }
});

var $bar = $('.progress-bar');
var $barOffset = $bar.offset().top;
var $window = $(window);

$window.on('scroll', function () {
  var scrollPoint = $window.height() - $bar.height() + $window.scrollTop();
  //console.log(scrollPoint + " " + $barOffset);
  if (scrollPoint > $barOffset && !$bar.hasClass('animation')) {
    $bar.addClass('animation');
    $('.progress').animate(
      {
        width: '100%',
      },
      1000
    );
  }
});
