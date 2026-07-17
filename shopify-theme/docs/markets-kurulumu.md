# Çok Kur (Türkiye → Avrupa) Kurulumu — Shopify Markets

Shopify Markets, Plus dahil tüm planlarda kullanılabilir ve çok kur/çok ülke satışının standart yoludur. Kod gerektirmez, aşağıdaki adımlar Shopify Admin üzerinden yapılır.

## 1. Mevcut durum (Türkiye)
Mağaza muhtemelen zaten varsayılan bir market ile geliyor. Bunu "Türkiye" marketi olarak düzenleyin:

1. **Admin → Settings → Markets**
2. Varsayılan market'i açın, ülke olarak yalnızca **Türkiye** kalacak şekilde düzenleyin.
3. Para birimi: **TRY** (Türk Lirası).
4. Fiyatlandırma: Ürün fiyatlarınızı zaten TRY üzerinden girdiğiniz için ek bir işlem gerekmez.

## 2. Avrupa marketi ekleme (ileride aktifleştirmek üzere şimdiden hazırlayın)

1. **Settings → Markets → Add market**.
2. Hedef ülkeleri seçin (örn. Almanya, Fransa, Hollanda — hangi ülkelere satış yapılacaksa).
3. Para birimi: **EUR**. "Yerel para biriminde göster" (Local currency) seçeneğini açın.
4. Fiyatlandırma stratejisi:
   - **Otomatik kur dönüşümü**: Shopify, TRY fiyatlarınızı güncel kur ile EUR'a otomatik çevirir (basit, kur dalgalanmalarına açık).
   - **Manuel fiyat listesi (önerilen)**: Avrupa marketi için ürün başına sabit EUR fiyatı girin (kâr marjınızı, gümrük/lojistik farkını EUR fiyatına yansıtabilirsiniz). Market ayarlarında "Price list" oluşturup ürünleri buradan fiyatlandırın.
5. Ödeme yöntemleri: Avrupa marketine uygun ödeme sağlayıcısını (örn. Shopify Payments'ın desteklediği bölge, ya da yerel bir sağlayıcı) bu market için etkinleştirin.
6. Kargo: Avrupa'ya kargo profili/bölgesi tanımlamadan market'i **aktif etmeyin** — aksi halde müşteri sipariş verip kargo seçeneği bulamaz.
7. İlk etapta bu marketi **taslak (draft)** bırakın; Avrupa'ya satışa hazır olduğunuzda "Activate" ile yayına alın. Bu, "önce sadece Türkiye" isteğinizi karşılar ve ileride yeniden yapılanma gerektirmez — altyapı zaten kurulu olur.

## 3. Domain/dil (opsiyonel ama önerilir)
Avrupa marketine `.eu` alt yolu veya subdomain (örn. `eu.magazaniz.com`) ve İngilizce/Almanca içerik ataması yapabilirsiniz (Markets → ilgili market → Domains and languages). Zorunlu değildir, TR marketi ile aynı domain üzerinden de çalışabilir.

## API ile otomatikleştirme (opsiyonel)
Shopify Admin GraphQL API'de `marketCreate`, `marketCurrencySettingsUpdate`, `marketRegionsCreate` gibi mutation'lar mevcuttur. Bu depoda Shopify mağazasına canlı bağlantı onayı verilmediği için bu adımlar burada otomatik uygulanamadı; onay verildiğinde aynı MCP araçlarıyla (graphql_mutation) tekrar denenebilir.
