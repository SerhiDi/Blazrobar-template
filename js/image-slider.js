(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var sliderActive = false;
    var slider;
    checkSlider();

    window.addEventListener('resize', function () {
      checkSlider();
    });

    function checkSlider() {
      if (!sliderActive && window.innerWidth <= 640) {
        slider = new Slider('.image-gallery');
        sliderActive = true;
      } else if (sliderActive && window.innerWidth > 640) {
        slider.destroy();
        sliderActive = false;
      }

      if (sliderActive) {
        slider.changeSlidesWidth();
      }

    }

  });

  function Slider(element) {
    this.el = document.querySelector(element);
    this.init();
  }

  Slider.prototype = {
    //init
    init: function () {
      this.gallery = this.el.querySelector('.images');
      this.wrapper = this.el.querySelector('.images-wrapper');

      this.el.classList.add('image-slider');
      this.slides = this.gallery.querySelectorAll('.image');

      this.createArrows();
      this.createPagination();
      this.resetSlider();
    },

    //destroy
    destroy: function () {
      this.gallery.style.left = 0;
      this.el.classList.remove('image-slider');
      this.paginationBlock.parentNode.removeChild(this.paginationBlock);
      this.arrowsBlock.parentNode.removeChild(this.arrowsBlock);
    },

    resetSlider : function () {
      this.currentSlideIndex = 0;
      this.gallery.style.left = 0;
      this.setCurrentSlide(0);
    },

    //pagination
    createPagination: function () {
      this.paginationBlock = document.createElement('div');
      this.paginationBlock.classList.add('pagination');
      for (var i = 0; i < this.slides.length; i++) {
        var link = document.createElement('span');
        link.className = 'link';
        link.setAttribute('data-slide', i);
        this.paginationBlock.appendChild(link);
        this.paginationClick(link);
      }
      this.el.appendChild(this.paginationBlock);
      this.links = this.paginationBlock.querySelectorAll('.link');
    },

    //arrows
    createArrows: function () {
      this.arrowsBlock = document.createElement('div');
      this.arrowsBlock.classList.add('arrows');
      var slider = this;

      function createArrow(className, text, clickEvent) {
        var arrow = document.createElement('span');
        arrow.classList.add(className);
        arrow.innerHTML = text;
        arrow.addEventListener('click', function () {
          clickEvent(slider);
        });
        return arrow;
      }

      this.leftArrow = createArrow('arrow-left', '&#8249;', this.slidePrev);
      this.rightArrow = createArrow('arrow-right', '&#8250;', this.slideNext);
      this.arrowsBlock.appendChild(this.leftArrow);
      this.arrowsBlock.appendChild(this.rightArrow);

      this.wrapper.appendChild(this.arrowsBlock);
    },

    slidePrev: function (slider) {
      if (slider.currentSlideIndex > 0) {
        slider.currentSlideIndex -= 1;
        slider.setCurrentSlide(slider.currentSlideIndex);
        slider.moveToSlide();
      }
    },

    slideNext: function (slider) {
      if (slider.currentSlideIndex < slider.slides.length - 1) {
        slider.currentSlideIndex += 1;
        slider.setCurrentSlide(slider.currentSlideIndex);
        slider.moveToSlide();
      }
    },

    setCurrentSlide: function (slideIndex) {
      Array.prototype.forEach.call(this.links, function (link, i) {
        if (+slideIndex === i) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      slideIndex === 0 ?
        this.leftArrow.classList.add('inactive') :
        this.leftArrow.classList.remove('inactive');
      slideIndex === this.slides.length - 1 ?
        this.rightArrow.classList.add('inactive') :
        this.rightArrow.classList.remove('inactive');
    },

    paginationClick: function (element) {
      var self = this;
      element.addEventListener('click', function (e) {
        e.preventDefault();
        var page = this;
        self.currentSlideIndex = parseInt(page.getAttribute('data-slide'));
        self.setCurrentSlide(self.currentSlideIndex);
        self.moveToSlide();
      }, false);
    },

    moveToSlide: function () {
      var currentPage = this.el.querySelector('.image:nth-child(' + (this.currentSlideIndex + 1) + ')');
      this.gallery.style.left = '-' + currentPage.offsetLeft + 'px';
    },

    changeSlidesWidth: function () {
      this.gallery.style.width = window.innerWidth * this.slides.length + 'px';
      this.resetSlider();
      Array.prototype.forEach.call(this.slides, function (slide) {
        slide.style.maxWidth = window.innerWidth + 'px';
      })
    }

  };

})();




