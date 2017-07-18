(function ($) {
  $.fn.jgall = function (options) {
    $.each(this, function (i, elem) {

      var imageGallery = $(elem); // image gallery block
      var wrapper;  // images wrapper (ul)
      var slides;   // slides (li)
      var sliderActive = false; // slider activation fla

      var maxSliderWidth = 640; // maxWidth of the slider
      var currentSlideIndex = 0; // active slide index

      var paginationBlock;  // pagination
      var links; // pagination buttons

      var arrowsBlock;  // arrows block
      var leftArrow, rightArrow; // slider arrows
      checkSlider();

      $(window).resize(function () {
        checkSlider();
      });

      function checkSlider() {
        if (!sliderActive && window.innerWidth < maxSliderWidth) {
          initSlider();

        } else if (sliderActive && window.innerWidth >= maxSliderWidth) {
          destroySlider();
        }

        if (sliderActive) {
          changeSlidesWidth();
        }
      }

      function changeSlidesWidth() {
        resetSlider();
        wrapper.css('width', $(window).innerWidth() * slides.length + 'px');
        $.each(slides, function (index, slide) {
          $(slide).css('maxWidth', $(window).innerWidth() + 'px');
        });
      }

      function initSlider() {
        sliderActive = true;
        imageGallery.addClass('jgall');

        options.imagesWrapper ?
          wrapper = $(imageGallery).find(options.imagesWrapper) :
          wrapper = $(imageGallery).find('.images-wrapper');

        slides = $(wrapper).find('li');

        if (options.showArrows) createArrows();
        if (options.showPagination) createPagination();
      }

      function destroySlider() {
        sliderActive = false;
        imageGallery.removeClass('jgall');
        wrapper.css('left', 0);
        wrapper.css('width', 'auto');

        if (options.showArrows) $(arrowsBlock).remove();
        if (options.showPagination) $(paginationBlock).remove();
      }

      function resetSlider() {
        currentSlideIndex = 0;
        setCurrentSlide(0);
        wrapper.css('left', 0);
      }

      //pagination
      function createPagination() {
        paginationBlock = document.createElement('div');
        $(paginationBlock).addClass('pagination');

        $.each(slides, function (i) {
          var link = document.createElement('span');
          var $link = $(link);
          $link.addClass('link');
          $link.attr('data-slide', i);
          paginationBlock.append(link);
          paginationClick($link);
        });
        imageGallery.append(paginationBlock);
        links = $(paginationBlock).find('.link');
      }

      function paginationClick(link) {
        link.click(function (e) {
          e.preventDefault();
          currentSlideIndex = parseInt($(e.target).attr('data-slide'));
          setCurrentSlide(currentSlideIndex);
          moveToSlide();
        })
      }

      //arrows
      function createArrows() {
        arrowsBlock = document.createElement('div');
        var $arrowsBlock = $(arrowsBlock);
        $arrowsBlock.addClass('arrows');

        function createArrow(className, text, clickEvent) {
          var arrow = document.createElement('span');
          var $arrow = $(arrow);
          $arrow.addClass(className).html(text);
          options.arrowColor ? $arrow.css('color', options.arrowColor) : null;
          $arrow.click(function () {
            clickEvent();
          });
          return arrow;
        }

        leftArrow = createArrow('arrow-left', '&#8249;', slidePrev);
        rightArrow = createArrow('arrow-right', '&#8250;', slideNext);
        $arrowsBlock.append(leftArrow);
        $arrowsBlock.append(rightArrow);
        $(imageGallery).append(arrowsBlock);
      }

      function slideNext() {
        if (currentSlideIndex < slides.length - 1) {
          currentSlideIndex += 1;
          setCurrentSlide(currentSlideIndex);
          moveToSlide();
        }
      }

      function slidePrev() {
        if (currentSlideIndex > 0) {
          currentSlideIndex -= 1;
          setCurrentSlide(currentSlideIndex);
          moveToSlide();
        }
      }

      function setCurrentSlide(slideIndex) {
        if (options.showPagination) {
          $.each(links, function (i, link) {
            var $link = $(link);
            if (+slideIndex === i) {
              $link.addClass('active');
              options.paginActiveColor ? $link.css('background-color', options.paginActiveColor) :
                $link.css('background-color', '#000');
            } else {
              options.paginColor ? $link.css('background-color', options.paginColor) :
                $link.css('background-color', '#fff');
            }
          })
        }

        if (options.showArrows) {
          var $leftArrow = $(leftArrow);
          var $rightArrow = $(rightArrow);
          slideIndex === 0 ?
            $leftArrow.addClass('inactive') :
            $leftArrow.removeClass('inactive');
          slideIndex === slides.length - 1 ?
            $rightArrow.addClass('inactive') :
            $rightArrow.removeClass('inactive');
        }
      }

      function moveToSlide() {
        var currentPage = wrapper.find('li:nth-child(' + (currentSlideIndex + 1) + ')');
        var offset = currentPage.offset().left;
        wrapper.css('left', '-=' + offset);
      }

    })
  }
}(jQuery));