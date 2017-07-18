#Inctruction

<b>jgall</b> image gallery plugin

####Settings:

1. Add jQuery and <b>jgall</b> plugin

jQuery

`<script src="libs/jquery-3.2.1.js"></script>`

`<script src="js/jgall.js"></script>`

`<link rel="stylesheet" href="js/jgall.css">`


3. Setup plugin

HTML

    <div class="image-gallery">

      <ul class="images-wrapper">
        <li>
          <img src="assets/images/1.jpg" alt="image">
        </li>
        <li>
          <img src="assets/images/2.jpg" alt="image">
        </li>
        <li>
          <img src="assets/images/3.jpg" alt="image">
        </li>
      </ul>

    </div>

Javascript

```javascript
  $('.image-gallery').jgall({
    imagesWrapper: '.images-wrapper',
    showArrows: true,
    showPagination: true,
    arrowColor: '#169fb5',
    paginColor: '#aaa',
    paginActiveColor: '#169fb5'
  });
```

- $('.image-gallery') - image gallery block
- imagesWrapper - images list class
- showArrows - show arrows (default: true)
- arrowColor - arrow color(default: #000)
- showPagination - show pagination (default: true)
- paginColor - pagination color (defaultL #fff)
- paginActiveColor - pagination active color (default: #000)



