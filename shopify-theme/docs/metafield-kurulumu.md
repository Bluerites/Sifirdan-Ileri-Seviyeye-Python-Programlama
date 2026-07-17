# Minimum m² Sipariş Kuralı — Metafield Kurulumu

## Zaten kurulmuş olan kısım

`fis8i9-fd.myshopify.com` (My Store) mağazasında aşağıdaki iki metafield tanımı API ile oluşturuldu — tekrar oluşturmaya gerek yok, doğrudan ürün düzenleme ekranında görünüyor olmalı:

- **Minimum Sipariş (m²)** — `custom.min_order_m2` (Decimal)
- **Birim Başına m²** — `custom.m2_per_unit` (Decimal)

Ayrıca ürüne `mozaik` veya `fayans` etiketi eklendiğinde otomatik dahil olan **"Mozaik ve Fayans"** akıllı koleksiyonu da kuruldu (handle: `mozaik-ve-fayans`).

## 1. Metafield tanımlarını görüntüleme/düzenleme (gerekirse)

**Admin → Settings → Custom data → Products**

| Ad | Namespace & key | Tip | Açıklama |
|---|---|---|---|
| Minimum Sipariş (m²) | `custom.min_order_m2` | Decimal (number_decimal) | Ürünün satılabileceği minimum metrekare (örn. mozaikte `15`) |
| Birim Başına m² | `custom.m2_per_unit` | Decimal (number_decimal) | Bir kutu/paketin kaç m² olduğu (adet → m² dönüşümü için, örn. `1.08`) |

Yalnızca m² kısıtı olan kategorilerde (mozaik, bazı fayans serileri) bu metafieldleri doldurun; boş bırakılan ürünlerde `snippets/min-m2-notice.liquid` otomatik olarak hiçbir şey göstermez ve kısıt uygulanmaz.

## 2. Ürünlere değer girme

Her ürünün düzenleme sayfasında, altta **Metafields** bölümünden:

- `min_order_m2`: örn. `15`
- `m2_per_unit`: kutunun teknik özelliklerinden alınan m² değeri, örn. `1.08`

Toplu ürünlerde bu işlemi Admin'in **Bulk editor**'ünden (Products → seçili ürünler → Edit columns → metafieldleri ekle) hızlıca yapabilirsiniz.

## 3. Tema entegrasyonu
`../README.md` içindeki "Tema dosyalarını entegre etme" adımlarını uygulayın. Özetle:
- `snippets/min-m2-notice.liquid` ürün sayfasına eklenir, metafield değerlerini okuyup uyarı gösterir.
- `assets/min-m2-validation.js` adet alanını minimuma kilitler, altında sipariş verilmesini engeller (istemci tarafında).

## 4. Gerçek zorlama (checkout dahil) — Plus olmayan planlarda

Mağazanız Shopify Plus değilse, checkout'u native olarak (Shopify Functions ile) özelleştiremezsiniz. Tema/JS katmanı kullanıcı arayüzünde etkilidir ama teknik olarak atlatılabilir (örn. API ile doğrudan sepete ekleme). Tam garanti için:

1. Shopify App Store'da **"Minimum & Maximum Quantity"**, **"Order Limit Quantity"** gibi anahtar kelimelerle arama yapın (örn. Bold, Zoorix, Klatch gibi sağlayıcıların "min/max quantity" uygulamaları). Bu uygulamalar günümüzde Cart & Checkout Validation Functions API'sini kullanır ve Plus olmayan planlarda da çalışacak şekilde sunulur — kurulum öncesi uygulamanın "Works with: your plan" bilgisini kontrol edin.
2. Uygulama kuralını, bu dokümandaki `custom.min_order_m2` / `custom.m2_per_unit` metafieldlerine referans verecek şekilde (çoğu app kendi kural tablosunu tutar, metafield senkronizasyonu destekleyip desteklemediğini kontrol edin) veya doğrudan ürün/koleksiyon bazında manuel kural girerek eşleştirin.
3. Alternatif: Satış birimini doğrudan "kutu" değil "m²" olacak şekilde varyantlaştırıp, varyant başına minimum adet kısıtını Shopify'ın yerleşik **"Minimum requirement"** (sipariş bazlı) özelliğiyle kısmen destekleyebilirsiniz, ancak bu ürün bazında değil sepet toplamı bazında çalışır — mozaik özelinde ürün bazlı kural için yukarıdaki app yaklaşımı gereklidir.
