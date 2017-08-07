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
    destroy: function (options, settings) {
      options.sliderActive = false;
      options.imageGallery.removeClass('jgall');
      options.wrapper.css('left', 0);
      options.wrapper.css('width', 'auto');

      if (settings.showArrows) $(options.arrowsBlock).remove();
      if (settings.showPagination) $(options.paginationBlock).remove();
    }
  };

  $.fn.jgall = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.pluginName');
    }
  };

  // additional methods
  function initializeSlider(settings, elem) {
    var imageGallery;
    var wrapper;
    var slides;
    var sliderActive;
    var arrowsBlock;
    var leftArrow, rightArrow;
    var paginationBlock;
    var currentSlideIndex;
    var links;

    function checkSlider() {
      console.log('check slider');
      console.log('sliderActive', sliderActive);
      console.log('window.innerWidth < settings.maxSliderWidth', window.innerWidth < settings.maxSliderWidth);

      if (!sliderActive && window.innerWidth < settings.maxSliderWidth) {
        initSlider();
      } else if (sliderActive && window.innerWidth >= settings.maxSliderWidth) {
        var options = {
          sliderActive: sliderActive,
          imageGallery: imageGallery,
          wrapper: wrapper,
          arrowsBlock: arrowsBlock,
          paginationBlock: paginationBlock
        };
        methods.destroy(options, settings);
      }

      if (sliderActive) {
        changeSlidesWidth();
      }
    }

    checkSlider();

    $(window).resize(function () {
      checkSlider();
    });


    function initSlider() {
      sliderActive = true;
      imageGallery = $(elem);
      imageGallery.addClass('jgall');
      wrapper = $(imageGallery).find(settings.imagesWrapper);
      slides = $(imageGallery).find('li');
      if (settings.showArrows) createArrows();
      if (settings.showPagination) createPagination();
    }

    function changeSlidesWidth() {
      resetSlider();
      wrapper.css('width', $(window).innerWidth() * slides.length + 'px');
      $.each(slides, function (index, slide) {
        $(slide).css('maxWidth', $(window).innerWidth() + 'px');
      });
    }

    function resetSlider() {
      currentSlideIndex = 0;
      setCurrentSlide(0);
      wrapper.css('left', 0);
    }

    //pagination
    function createPagination(sliderOptions) {
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
        $arrow.css('color', settings.arrowColor);
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
      if (settings.showPagination) {
        $.each(links, function (i, link) {
          var $link = $(link);
          if (+slideIndex === i) {
            $link.addClass('active');
            settings.paginActiveColor ? $link.css('background-color', settings.paginActiveColor) :
              $link.css('background-color', '#000');
          } else {
            settings.paginColor ? $link.css('background-color', settings.paginColor) :
              $link.css('background-color', '#fff');
          }
        })
      }

      if (settings.showArrows) {
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

  }


  // function checkSlider(sliderOptions, settings) {
  //   var opt = sliderOptions;
  //   if (!opt.sliderActive && window.innerWidth < settings.maxSliderWidth) {
  //     initSlider(opt, settings);
  //   } else if (opt.sliderActive && window.innerWidth >= settings.maxSliderWidth) {
  //     this.destroy();
  //   }
  //   if (opt.sliderActive) {
  //     changeSlidesWidth();
  //   }
  // }

  // function initSlider(sliderOptions, settings) {
  //   sliderOptions.sliderActive = true;
  //   sliderOptions.imageGallery.addClass('jgall');
  //
  //   sliderOptions.slides = $(imageGallery).find('li');
  //
  //   if (settings.showArrows) createArrows(sliderOptions, settings);
  //   if (settings.showPagination) createPagination(sliderOptions, settings);
  // }

  // function changeSlidesWidth() {
  //   resetSlider();
  //   wrapper.css('width', $(window).innerWidth() * slides.length + 'px');
  //   $.each(slides, function (index, slide) {
  //     $(slide).css('maxWidth', $(window).innerWidth() + 'px');
  //   });
  // }

  // function resetSlider() {
  //   currentSlideIndex = 0;
  //   setCurrentSlide(0);
  //   wrapper.css('left', 0);
  // }

  // //pagination
  // function createPagination(sliderOptions) {
  //   sliderOptions.paginationBlock = document.createElement('div');
  //   $(paginationBlock).addClass('pagination');
  //
  //   $.each(slides, function (i) {
  //     var link = document.createElement('span');
  //     var $link = $(link);
  //     $link.addClass('link');
  //     $link.attr('data-slide', i);
  //     paginationBlock.append(link);
  //     paginationClick($link);
  //   });
  //   sliderOptions.imageGallery.append(paginationBlock);
  //   links = $(paginationBlock).find('.link');
  // }
  //
  // function paginationClick(link) {
  //   link.click(function (e) {
  //     e.preventDefault();
  //     currentSlideIndex = parseInt($(e.target).attr('data-slide'));
  //     setCurrentSlide(currentSlideIndex);
  //     moveToSlide();
  //   })
  // }


  //
  // $.fn.jgall = function (options) {
  //   console.log(this);
  //
  //   var defaults = {
  //     imagesWrapper: '.images-wrapper',
  //     showArrows: true,
  //     showPagination: true,
  //     arrowColor: '#169fb5',
  //     paginColor: '#aaa',
  //     paginActiveColor: '#169fb5'
  //   };
  //
  //   var methods = {
  //     init: function (options) {
  //       var settings = $.extend(defaults, options || {});
  //
  //       console.log(settings);
  //     },
  //     destroy: ''
  //   };
  //
  //   var maxSliderWidth = 640;
  //
  //   return this.each(function (i, elem) {
  //     var imageGallery = $(elem); // image gallery block
  //     var wrapper = $(imageGallery).find(settings.imagesWrapper);  // images wrapper (ul)
  //     var slides;   // slides (li)
  //     var sliderActive = false; // slider activation fla
  //
  //     // var maxSliderWidth = 640; // maxWidth of the slider
  //     var currentSlideIndex = 0; // active slide index
  //
  //     var paginationBlock;  // pagination
  //     var links; // pagination buttons
  //
  //     var arrowsBlock;  // arrows block
  //     var leftArrow, rightArrow; // slider arrows
  //     checkSlider();
  //
  //     $(window).resize(function () {
  //       checkSlider();
  //     });
  //
  //     function checkSlider() {
  //       if (!sliderActive && window.innerWidth < maxSliderWidth) {
  //         initSlider();
  //
  //       } else if (sliderActive && window.innerWidth >= maxSliderWidth) {
  //         destroySlider();
  //       }
  //
  //       if (sliderActive) {
  //         changeSlidesWidth();
  //       }
  //     }
  //
  //     function changeSlidesWidth() {
  //       resetSlider();
  //       wrapper.css('width', $(window).innerWidth() * slides.length + 'px');
  //       $.each(slides, function (index, slide) {
  //         $(slide).css('maxWidth', $(window).innerWidth() + 'px');
  //       });
  //     }
  //
  //     function initSlider() {
  //       sliderActive = true;
  //       imageGallery.addClass('jgall');
  //
  //       slides = $(imageGallery).find('li');
  //
  //       if (settings.showArrows) createArrows();
  //       if (settings.showPagination) createPagination();
  //     }
  //
  //     function destroySlider() {
  //       sliderActive = false;
  //       imageGallery.removeClass('jgall');
  //       wrapper.css('left', 0);
  //       wrapper.css('width', 'auto');
  //
  //       if (settings.showArrows) $(arrowsBlock).remove();
  //       if (settings.showPagination) $(paginationBlock).remove();
  //     }
  //
  //     function resetSlider() {
  //       currentSlideIndex = 0;
  //       setCurrentSlide(0);
  //       wrapper.css('left', 0);
  //     }
  //
  //     //pagination
  //     function createPagination() {
  //       paginationBlock = document.createElement('div');
  //       $(paginationBlock).addClass('pagination');
  //
  //       $.each(slides, function (i) {
  //         var link = document.createElement('span');
  //         var $link = $(link);
  //         $link.addClass('link');
  //         $link.attr('data-slide', i);
  //         paginationBlock.append(link);
  //         paginationClick($link);
  //       });
  //       imageGallery.append(paginationBlock);
  //       links = $(paginationBlock).find('.link');
  //     }
  //
  //     function paginationClick(link) {
  //       link.click(function (e) {
  //         e.preventDefault();
  //         currentSlideIndex = parseInt($(e.target).attr('data-slide'));
  //         setCurrentSlide(currentSlideIndex);
  //         moveToSlide();
  //       })
  //     }
  //
  //     //arrows
  //     function createArrows() {
  //       arrowsBlock = document.createElement('div');
  //       var $arrowsBlock = $(arrowsBlock);
  //       $arrowsBlock.addClass('arrows');
  //
  //       function createArrow(className, text, clickEvent) {
  //         var arrow = document.createElement('span');
  //         var $arrow = $(arrow);
  //         $arrow.addClass(className).html(text);
  //         $arrow.css('color', settings.arrowColor);
  //         $arrow.click(function () {
  //           clickEvent();
  //         });
  //         return arrow;
  //       }
  //
  //       leftArrow = createArrow('arrow-left', '&#8249;', slidePrev);
  //       rightArrow = createArrow('arrow-right', '&#8250;', slideNext);
  //       $arrowsBlock.append(leftArrow);
  //       $arrowsBlock.append(rightArrow);
  //       $(imageGallery).append(arrowsBlock);
  //     }
  //
  //     function slideNext() {
  //       if (currentSlideIndex < slides.length - 1) {
  //         currentSlideIndex += 1;
  //         setCurrentSlide(currentSlideIndex);
  //         moveToSlide();
  //       }
  //     }
  //
  //     function slidePrev() {
  //       if (currentSlideIndex > 0) {
  //         currentSlideIndex -= 1;
  //         setCurrentSlide(currentSlideIndex);
  //         moveToSlide();
  //       }
  //     }
  //
  //     function setCurrentSlide(slideIndex) {
  //       if (settings.showPagination) {
  //         $.each(links, function (i, link) {
  //           var $link = $(link);
  //           if (+slideIndex === i) {
  //             $link.addClass('active');
  //             settings.paginActiveColor ? $link.css('background-color', settings.paginActiveColor) :
  //               $link.css('background-color', '#000');
  //           } else {
  //             settings.paginColor ? $link.css('background-color', settings.paginColor) :
  //               $link.css('background-color', '#fff');
  //           }
  //         })
  //       }
  //
  //       if (settings.showArrows) {
  //         var $leftArrow = $(leftArrow);
  //         var $rightArrow = $(rightArrow);
  //         slideIndex === 0 ?
  //           $leftArrow.addClass('inactive') :
  //           $leftArrow.removeClass('inactive');
  //         slideIndex === slides.length - 1 ?
  //           $rightArrow.addClass('inactive') :
  //           $rightArrow.removeClass('inactive');
  //       }
  //     }
  //
  //     function moveToSlide() {
  //       var currentPage = wrapper.find('li:nth-child(' + (currentSlideIndex + 1) + ')');
  //       var offset = currentPage.offset().left;
  //       wrapper.css('left', '-=' + offset);
  //     }
  //
  //   });
  //
  // }
}(jQuery));