# Mozaik & Tile Shopify Mağazası — Tema Eklentileri

Bu klasör, mozaik/fayans satan bir Shopify mağazası için istenen dört özelliği kapsar:

1. Çok kur (Türkiye → Avrupa) altyapısı — `docs/markets-kurulumu.md`
2. Ürün bazında minimum m² sipariş kuralı — `docs/metafield-kurulumu.md` + `assets/min-m2-validation.js`
3. Katalogda üzerine gelince ikinci fotoğrafı gösterip büyütme — `assets/product-card-hover.js` + `assets/product-card-hover.css`
4. Mimar/B2B başvuru ve onaya bağlı indirim — `docs/mimar-b2b-indirim-kurulumu.md`

## Neden dosya teslimatı?

Bu ortamda Shopify mağazasına canlı bağlantı (Markets, metafield, indirim kurulumu için gereken MCP araç çağrıları) onay gerektirdiği için buradan doğrudan uygulanamadı. Bu yüzden 2 ve 3 numaralı maddeler doğrudan kullanılabilir tema kodu olarak, 1 ve 4 numaralı maddeler ise mağaza sahibinin Shopify Admin üzerinden (veya onay verildikten sonra MCP ile) uygulayacağı adım adım talimat olarak hazırlandı.

## Kurulum sırası (önerilen)

1. `docs/markets-kurulumu.md` — Markets ile TR/EUR kurulumu (kod gerektirmez, Admin ayarı).
2. `docs/metafield-kurulumu.md` — Ürünlere `min_order_m2` / `m2_per_unit` metafieldlerini ekle.
3. Tema dosyalarını entegre et (aşağıya bakın).
4. `docs/mimar-b2b-indirim-kurulumu.md` — Başvuru formu, etiketleme ve otomatik indirim.

## Tema dosyalarını entegre etme

Shopify Admin → Online Store → Temalar → **Kodu Düzenle** (veya Shopify CLI ile tema deposu üzerinden):

- `assets/product-card-hover.css` ve `assets/product-card-hover.js` dosyalarını `assets/` klasörüne yükleyin.
- `assets/min-m2-validation.js` dosyasını `assets/` klasörüne yükleyin.
- `snippets/product-card-media.liquid` içeriğini mevcut ürün kartı snippet'inize (Dawn temasında `snippets/card-product.liquid`) referans alarak uyarlayın — kendi temanızın mevcut görsel/markup yapısını bozmadan `data-hover-image` ve ikinci görsel `<img>` etiketini ekleyin.
- `snippets/min-m2-notice.liquid` dosyasını ürün şablonunuzda (`sections/main-product.liquid`) sepete ekle formunun hemen üstüne `{% render 'min-m2-notice' %}` ile dahil edin.
- `theme.liquid` içinde `{{ 'product-card-hover.css' | asset_url | stylesheet_tag }}` ve `{{ 'product-card-hover.js' | asset_url | script_tag: defer: true }}` ile `{{ 'min-m2-validation.js' | asset_url | script_tag: defer: true }}` satırlarını `</head>` öncesine ekleyin (temanızda zaten bir asset-loader varsa oraya ekleyin, tekrar tanımlamayın).

## Not

`min-m2-validation.js` yalnızca **tarayıcı tarafında** (yumuşak) doğrulama yapar: kullanıcı arayüzde uyarır, adet alanını düzeltir, "Sepete Ekle" butonunu devre dışı bırakır. Checkout seviyesinde tam teknik zorlama (kullanıcı geliştirici konsolundan bu kontrolü atlayamasın diye) Shopify Plus olmayan planlarda bir üçüncü parti app gerektirir — bkz. `docs/metafield-kurulumu.md` sonundaki "Gerçek zorlama" bölümü.
