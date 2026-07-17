# Minimum m² Sipariş Kuralı — Nihai Yaklaşım: Paket Bazlı Satış

## Karar (uygulamada test edildikten sonra)

Horizon temasında (Shopify'ın Basic planında checkout/sepet seviyesinde teknik zorlama yapan bir Custom Liquid script'i) denendi, ancak Shopify bu script'i "Custom Liquid" ayarından render sırasında temizlediği için (view-source'ta script bulunamadı) çalışmadı. Bunun yerine çok daha basit ve sağlam bir çözüme karar verildi:

**Ürünü zaten minimum alanı karşılayan bir "paket" (kutu/koli) olarak satın.** Örneğin mozaikte minimum 15 m² isteniyorsa, ürünü "1 paket = 15 m²" şeklinde tanımlayın; müşteri "1 adet" aldığında zaten minimumu karşılamış olur. Sepette 1 adet = minimum, hiçbir doğrulama koduna gerek kalmaz — Shopify'ın standart adet mekanizması (varsayılan min. 1) yeterli olur.

- Ürün açıklamasında veya kısa bir satırda "Bu paket X m² içerir" bilgisini yazın (bilgilendirme amaçlı, metafield veya düz metin — enforcement gerekmiyor).
- `custom.m2_per_unit` metafieldi (aşağıda) bu bilgiyi yapılandırılmış şekilde tutmak isterseniz hâlâ kullanılabilir; `custom.min_order_m2` artık gerekli değil çünkü minimum, ürünün birim tanımına gömülü.

## Daha önce kurulmuş olan (artık opsiyonel) metafield tanımları

`fis8i9-fd.myshopify.com` (My Store) mağazasında aşağıdaki iki metafield tanımı API ile oluşturuldu:

- **Minimum Sipariş (m²)** — `custom.min_order_m2` (Decimal) — yeni yaklaşımda kullanılmıyor, silinmesine gerek yok ama boş bırakılabilir.
- **Birim Başına m²** — `custom.m2_per_unit` (Decimal) — paketin kaç m² olduğunu bilgilendirme amaçlı tutmak için kullanılabilir.

Ayrıca ürüne `mozaik` veya `fayans` etiketi eklendiğinde otomatik dahil olan **"Mozaik ve Fayans"** akıllı koleksiyonu kuruldu (handle: `mozaik-ve-fayans`) — bu hâlâ geçerli ve kullanılmalı.

Horizon temasına eklenen ve çalışmayan "Minimum m² uyarısı" custom-liquid bloğu temizlendi (`templates/product.json` eski haline döndürüldü).

## 1. Ürünü paket bazlı kurma

Her mozaik/fayans ürününü, satış birimi zaten minimum alanı karşılayacak şekilde kurun:

- Varyant/fiyat: 1 paketin fiyatı (örn. 15 m²'lik paket = X ₺).
- Ürün başlığı veya açıklamasında paket içeriğini açıkça belirtin: "1 paket = 15 m² (14 kutu)".
- İsterseniz `custom.m2_per_unit` metafieldine paketin toplam m²'sini yazıp ürün sayfasında görüntüleyebilirsiniz (bilgilendirme amaçlı, opsiyonel).

Bu şekilde Shopify'ın varsayılan adet mekanizması (min. 1) zaten iş kuralını karşılar; ek doğrulama koduna veya app'e gerek kalmaz.
