(function ($) {

  var defaults = {
    imagesWrapper: '.images-wrapper',
    showArrows: true,
    showPagination: true,
    arrowColor: '#169fb5',
    paginColor: '#aaa',
    paginActiveColor: '#169fb5',
    maxSliderWidth: 640
  };

  var methods = {
    init: function (options) {
      return this.each(function (i, elem) {
        var settings = $.extend(defaults, options || {});
        initializeSlider(settings, elem);
      })
    },
    destroy: function (slider, settings) {
      if(slider) {
        slider.sliderActive = false;
        slider.imageGallery.removeClass('jgall');
        slider.wrapper.css('left', 0);
        slider.wrapper.css('width', 'auto');

        if (settings.showArrows) $(slider.arrowsBlock).remove();
        if (settings.showPagination) $(slider.paginationBlock).remove();
      }
    }
  };

  $.fn.jgall = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.jgall');
    }
  };

  // additional methods
  function initializeSlider(settings, elem) {

    var slider = {
      slider: null,
      wrapper: null,
      slides: null,
      sliderActive: null,
      arrowsBlock: null,
      leftArrow: null,
      rightArrow: null,
      paginationBlock: null,
      currentSlideIndex: null,
      links: null
    };

    function checkSlider() {
      if (!slider.sliderActive && window.innerWidth < settings.maxSliderWidth) {
        initSlider();
      } else if (slider.sliderActive && window.innerWidth >= settings.maxSliderWidth) {
        methods.destroy(slider, settings);
      }

      if (slider.sliderActive) {
        changeSlidesWidth();
      }
    }

    checkSlider();

    $(window).resize(function () {
      checkSlider();
    });


    function initSlider() {
      slider.sliderActive = true;
      slider.imageGallery = $(elem);
      slider.imageGallery.addClass('jgall');
      slider.wrapper = $(slider.imageGallery).find(settings.imagesWrapper);
      slider.slides = $(slider.imageGallery).find('li');
      if (settings.showArrows) createArrows();
      if (settings.showPagination) createPagination();
    }

    function changeSlidesWidth() {
      resetSlider();
      slider.wrapper.css('width', $(window).innerWidth() * slider.slides.length + 'px');
      $.each(slider.slides, function (index, slide) {
        $(slide).css('maxWidth', $(window).innerWidth() + 'px');
      });
    }

    function resetSlider() {
      slider.currentSlideIndex = 0;
      setCurrentSlide(0);
      slider.wrapper.css('left', 0);
    }

    //pagination
    function createPagination() {
      slider.paginationBlock = document.createElement('div');
      $(slider.paginationBlock).addClass('pagination');

      $.each(slider.slides, function (i) {
        var link = document.createElement('span');
        var $link = $(link);
        $link.addClass('link');
        $link.attr('data-slide', i);
        slider.paginationBlock.append(link);
        paginationClick($link);
      });
      slider.imageGallery.append(slider.paginationBlock);
      slider.links = $(slider.paginationBlock).find('.link');
    }

    function paginationClick(link) {
      link.click(function (e) {
        e.preventDefault();
        slider.currentSlideIndex = parseInt($(e.target).attr('data-slide'));
        setCurrentSlide(slider.currentSlideIndex);
        moveToSlide();
      })
    }

    //arrows
    function createArrows() {
      slider.arrowsBlock = document.createElement('div');
      var $arrowsBlock = $(slider.arrowsBlock);
      $arrowsBlock.addClass('arrows');

      function createArrow(className, text, clickEvent) {
        var arrow = document.createElement('span');
        var $arrow = $(arrow);
        $arrow.addClass(className).html(text);
        $arrow.css('color', settings.arrowColor);
        $arrow.click(function () {
          clickEvent();
        });
        return arrow;
      }

      slider.leftArrow = createArrow('arrow-left', '&#8249;', slidePrev);
      slider.rightArrow = createArrow('arrow-right', '&#8250;', slideNext);
      $arrowsBlock.append(slider.leftArrow);
      $arrowsBlock.append(slider.rightArrow);
      $(slider.imageGallery).append(slider.arrowsBlock);
    }

    function slideNext() {
      if (slider.currentSlideIndex < slider.slides.length - 1) {
        slider.currentSlideIndex += 1;
        setCurrentSlide(slider.currentSlideIndex);
        moveToSlide();
      }
    }

    function slidePrev() {
      if (slider.currentSlideIndex > 0) {
        slider.currentSlideIndex -= 1;
        setCurrentSlide(slider.currentSlideIndex);
        moveToSlide();
      }
    }

    function setCurrentSlide(slideIndex) {
      if (settings.showPagination) {
        $.each(slider.links, function (i, link) {
          var $link = $(link);
          if (+slideIndex === i) {
            $link.addClass('active');
            $link.css('background-color', settings.paginActiveColor);
          } else {
            $link.css('background-color', settings.paginColor);
          }
        })
      }

      if (settings.showArrows) {
        var $leftArrow = $(slider.leftArrow);
        var $rightArrow = $(slider.rightArrow);
        slideIndex === 0 ?
          $leftArrow.addClass('inactive') :
          $leftArrow.removeClass('inactive');
        slideIndex === slider.slides.length - 1 ?
          $rightArrow.addClass('inactive') :
          $rightArrow.removeClass('inactive');
      }
    }

    function moveToSlide() {
      var currentPage = slider.wrapper.find('li:nth-child(' + (slider.currentSlideIndex + 1) + ')');
      var offset = currentPage.offset().left;
      slider.wrapper.css('left', '-=' + offset);
    }

  }
}(jQuery));