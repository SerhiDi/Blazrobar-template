(function () {

  var hamburger = document.querySelector('.hamburger');
  var mainMenu = document.querySelector('.main-menu');

  hamburger.addEventListener('click', function () {
    mainMenu.classList.toggle('active');
  });

  window.addEventListener("resize", function() {
    if(window.innerWidth >= 980) {
      mainMenu.classList.remove("active");
    }
  });

}());