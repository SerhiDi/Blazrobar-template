(function () {

  var hamburger = document.querySelector('.hamburger');
  var mainMenu = document.querySelector('.main-menu');

  hamburger.addEventListener('click', function () {
    mainMenu.classList.toggle('active');
  })

}());