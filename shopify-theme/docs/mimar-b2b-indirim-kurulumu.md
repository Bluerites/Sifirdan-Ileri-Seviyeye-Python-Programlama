# Mimar/B2B Başvuru ve Onaya Bağlı İndirim Kurulumu

Seçilen yaklaşım: **özel başvuru formu + manuel onay** (native Shopify B2B company-account özelliği Plus'a özeldir, bu yüzden tag tabanlı bir süreç kullanılıyor).

## Mağazada zaten kurulmuş olan kısım

Aşağıdakiler `fis8i9-fd.myshopify.com` (My Store) mağazasında API ile canlı olarak oluşturuldu, tekrar yapılmasına gerek yok:

- **Müşteri segmenti**: "Mimarlar (Onaylı B2B)" (`customer_tags CONTAINS 'architect'`) — `architect` etiketi eklenen her müşteri otomatik bu segmente girer.
- **Otomatik indirim**: "Mimar B2B İndirimi - Mozaik ve Fayans" — %15, kod girmeye gerek yok, yalnızca "Mimarlar (Onaylı B2B)" segmentindeki müşterilere ve yalnızca "Mozaik ve Fayans" koleksiyonundaki ürünlere uygulanıyor. Durum: **ACTIVE**.
- **Koleksiyon**: "Mozaik ve Fayans" (akıllı koleksiyon, handle: `mozaik-ve-fayans`) — ürüne `mozaik` veya `fayans` etiketi eklendiğinde otomatik bu koleksiyona dahil olur.

Geriye kalan tek manuel adım: bir mimar başvurusu onaylandığında o müşteriye Admin'den `architect` etiketini eklemek. Bunun ötesinde indirim otomatik devreye girer.

## 1. Başvuru formu

**Admin → Online Store → Pages → Add page** ile "Mimar / Profesyonel Üyelik Başvurusu" sayfası oluşturun. Formu şu yollardan biriyle ekleyin:

- **Basit yol**: Shopify'ın yerleşik `contact-form` snippet'ini bu sayfanın şablonuna özelleştirilmiş alanlarla (ad, firma unvanı, vergi no, telefon) uyarlayıp `contact_form.new` yerine özel bir form etiketiyle gönderim yapın; form gönderimi Admin'de **Customers** altında yeni bir müşteri kaydı veya Admin e-postasına bildirim olarak düşer.
- **Daha sağlam yol**: Bir form uygulaması (örn. Shopify App Store'daki form/başvuru uygulamalarından biri) kullanarak başvuruları ayrı bir listede toplayın ve onay iş akışını (onaylandı/reddedildi) buradan yönetin.

Form alanları önerisi: Ad Soyad, Firma/Ofis Adı, Vergi No, Telefon, Web sitesi/Portfolyo (opsiyonel doğrulama için).

## 2. Onay süreci (manuel)

1. Başvuru geldiğinde mağaza sahibi (veya yetkili) başvuranı değerlendirir (örn. gerçekten mimarlık ofisi mi).
2. Onaylanırsa, **Admin → Customers** üzerinden ilgili müşteriye `architect` tag'i eklenir (müşteri zaten bir hesap açmışsa; yoksa müşteriye hesap daveti gönderilip tag hesap oluşturulduğunda eklenir).
3. Reddedilirse herhangi bir işlem yapılmaz, müşteri standart fiyatlarla alışverişe devam eder.

Bu adım otomatik değildir — istenen yaklaşım bu şekildeydi (kayıt formu + manuel onay).

## 3. Müşteri segmenti ve otomatik indirim (kuruldu)

Yukarıda "Mağazada zaten kurulmuş olan kısım" bölümünde açıklandığı gibi segment ve otomatik indirim zaten aktif. Yeni bir kategori (örn. seramik) için de mimar indirimi istenirse, o kategori ürünlerine `mozaik` veya `fayans` etiketi eklemek yeterli — koleksiyon ve indirim otomatik kapsar. Farklı bir indirim oranı/kapsamı gerekirse **Admin → Discounts** üzerinden mevcut "Mimar B2B İndirimi - Mozaik ve Fayans" kuralı düzenlenebilir.

## 4. Yeni bir mimar onaylandığında yapılacak tek adım

**Admin → Customers** → ilgili müşteri → **Tags** alanına `architect` yazıp kaydedin. Müşteri bir sonraki girişinde Mozaik ve Fayans koleksiyonundaki ürünlerde otomatik %15 indirimli fiyat görür.
