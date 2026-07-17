# Mimar/B2B Başvuru ve Onaya Bağlı İndirim Kurulumu

Seçilen yaklaşım: **özel başvuru formu + manuel onay** (native Shopify B2B company-account özelliği Plus'a özeldir, bu yüzden tag tabanlı bir süreç kullanılıyor).

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

## 3. Müşteri segmenti oluşturma

**Admin → Customers → Segments → Create segment**, filtre: `customer_tags CONTAINS 'architect'`. Bu segment, sonraki adımdaki otomatik indirimin hedef kitlesi olacak.

## 4. Otomatik indirim kurulumu

**Admin → Discounts → Create discount → Automatic discount**:

1. İndirim tipi: **Percentage** (örn. %15, mimarlar için belirlenen oran).
2. Uygulama kapsamı: Mozaik/tile koleksiyonu (veya tüm ürünler — mağaza politikasına göre).
3. **Eligibility → Specific customer segments** seçilip yukarıda oluşturulan `architect` segmenti seçilir.
4. İndirim, `architect` tag'li ve giriş yapmış müşterilerde hem koleksiyon/ürün sayfasında hem sepette/checkout'ta otomatik yansır — ekstra kod gerekmez, Shopify bunu native destekler.

## 5. API ile otomatikleştirme (onay verildiğinde)

Bu adımlar Shopify Admin GraphQL API üzerinden de kurulabilir:
- `customerSegmentCreate` — tag bazlı segment tanımı
- `discountAutomaticBasicCreate` — segment hedefli otomatik yüzde indirimi
- `customerUpdate` (tags alanı) — onaylanan müşteriye `architect` tag'i eklemek için

Bu depodan Shopify mağazasına canlı bağlantı şu an onaylı olmadığından bu mutation'lar burada çalıştırılamadı; onay verildiğinde aynı MCP araçlarıyla (graphql_schema → graphql_mutation) uygulanabilir.
