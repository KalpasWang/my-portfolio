var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.menu');
var menuNav = document.querySelector('.menu-nav');
var menuItems = document.querySelectorAll('.menu-item');

var showMenu = false;

menuBtn.addEventListener('click', function () {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuItems.forEach((item) => item.classList.add('show'));
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuItems.forEach((item) => item.classList.remove('show'));
    showMenu = false;
  }
});
