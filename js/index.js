(function () {
  var windowWidth = 980;
  var menuActive = false;
  var hamburger = document.querySelector('.hamburger');
  var mainMenu = document.querySelector('.main-menu');

  hamburger.addEventListener('click', function () {
    mainMenu.classList.toggle('active');
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= windowWidth && menuActive) {
      mainMenu.classList.remove('active');
      menuActive = false;
    } else if (!menuActive) {
      menuActive = true;
    }
  });

}());