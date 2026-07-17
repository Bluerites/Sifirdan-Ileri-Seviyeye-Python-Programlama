/**
 * Katalog kartlarında mouse üzerine gelince ikinci fotoğrafı gösterir.
 * Ürün sayfasında ana görsel üzerinde basit bir zoom-lens (büyüteç) sağlar.
 * Harici kütüphane bağımlılığı yoktur.
 */
(function () {
  function initCardHover() {
    document.querySelectorAll('.product-card-media').forEach(function (card) {
      var hoverImg = card.querySelector('.product-card-media__image--hover');
      if (!hoverImg) return; // ikinci görseli olmayan ürünlerde hover-swap uygulanmaz

      card.addEventListener('mouseenter', function () {
        card.classList.add('is-hovering');
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-hovering');
      });
    });
  }

  function initProductZoom() {
    document.querySelectorAll('.product-zoom').forEach(function (zoomEl) {
      var zoomImageUrl = zoomEl.getAttribute('data-zoom-image');
      if (!zoomImageUrl) return;

      var lens = zoomEl.querySelector('.product-zoom__lens');
      if (!lens) {
        lens = document.createElement('div');
        lens.className = 'product-zoom__lens';
        zoomEl.appendChild(lens);
      }
      lens.style.backgroundImage = 'url(' + zoomImageUrl + ')';

      var zoomFactor = 2.2;

      zoomEl.addEventListener('mouseenter', function () {
        zoomEl.classList.add('is-zooming');
      });
      zoomEl.addEventListener('mouseleave', function () {
        zoomEl.classList.remove('is-zooming');
      });
      zoomEl.addEventListener('mousemove', function (event) {
        var rect = zoomEl.getBoundingClientRect();
        var offsetX = event.clientX - rect.left;
        var offsetY = event.clientY - rect.top;
        var percentX = (offsetX / rect.width) * 100;
        var percentY = (offsetY / rect.height) * 100;

        lens.style.backgroundSize = zoomFactor * 100 + '%';
        lens.style.backgroundPosition = percentX + '% ' + percentY + '%';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCardHover();
      initProductZoom();
    });
  } else {
    initCardHover();
    initProductZoom();
  }
})();
