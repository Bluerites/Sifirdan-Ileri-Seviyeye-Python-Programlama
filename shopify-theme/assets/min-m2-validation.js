/**
 * Ürün bazında minimum m² sipariş kuralını sepete-ekle formunda tarayıcı tarafında zorlar.
 * snippets/min-m2-notice.liquid tarafından render edilen data attribute'larını okur.
 *
 * NOT: Bu yalnızca istemci tarafı (yumuşak) bir doğrulamadır. Checkout seviyesinde tam
 * teknik zorlama için bkz. docs/metafield-kurulumu.md → "Gerçek zorlama" bölümü.
 */
(function () {
  function initMinM2Notice(noticeEl) {
    var minUnits = parseInt(noticeEl.getAttribute('data-min-units'), 10);
    if (!minUnits || minUnits < 1) return;

    var form = noticeEl.closest('form[action*="/cart/add"]');
    if (!form) return;

    var quantityInput = form.querySelector('input[name="quantity"], input[name="id"] ~ input[name="quantity"]');
    if (!quantityInput) return;

    var submitButton = form.querySelector('[type="submit"], [name="add"]');
    var warningEl = noticeEl.querySelector('[data-min-m2-warning]');

    function validate() {
      var value = parseInt(quantityInput.value, 10) || 0;
      var isValid = value >= minUnits;

      if (warningEl) {
        warningEl.hidden = isValid;
      }
      if (submitButton) {
        submitButton.disabled = !isValid;
        submitButton.setAttribute('aria-disabled', String(!isValid));
      }
      return isValid;
    }

    // Sayfa yüklendiğinde adet alanını minimuma ayarla (mevcut değer minimumun altındaysa)
    if ((parseInt(quantityInput.value, 10) || 0) < minUnits) {
      quantityInput.value = minUnits;
    }
    if (quantityInput.hasAttribute('min')) {
      var existingMin = parseInt(quantityInput.getAttribute('min'), 10) || 0;
      quantityInput.setAttribute('min', Math.max(existingMin, minUnits));
    } else {
      quantityInput.setAttribute('min', minUnits);
    }

    quantityInput.addEventListener('input', validate);
    quantityInput.addEventListener('change', validate);
    form.addEventListener('submit', function (event) {
      if (!validate()) {
        event.preventDefault();
      }
    });

    validate();
  }

  function init() {
    document.querySelectorAll('[data-min-m2-notice]').forEach(initMinM2Notice);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
