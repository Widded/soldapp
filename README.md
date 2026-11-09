# kaç saat?

Fiyatları ömrüne çeviren mikro uygulama. Maaşını ve çalışma düzenini gir; her
fiyat etiketinin kaç saatlik emeğine mal olduğunu gör.

## Yapı

```
soldapp/
  web/      → tanıtım sayfası + giriş + kullanıcı paneli (Vite + React + Supabase)
  mobile/   → Expo uygulaması (iOS + Android)
  web/supabase/schema.sql → tablolar ve RLS politikaları
```

## Web

```bash
cd web
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173`.

Supabase anahtarları yoksa uygulama **demo modunda** çalışır; veriler
`localStorage` içinde tutulur. Gerçek hesap ve bulut senkronizasyonu için:

```bash
cp .env.example .env
# .env içine Supabase URL ve anon key gir
```

### Supabase kurulumu

1. [supabase.com](https://supabase.com) üzerinde ücretsiz proje aç.
2. SQL Editor'de `web/supabase/schema.sql` dosyasını çalıştır.
3. Authentication > Providers > Email açık olsun.
4. Project Settings > API'den URL ve anon key'i al, `web/.env` dosyasına yaz.
5. Yeniden başlat: `npm run dev`.

## Mobil

```bash
cd mobile
npm install
npx expo start
```

## Sayfalar

- `/` — one-page tanıtım (hero, nasıl çalışır, canlı hesaplayıcı, özellikler, fiyat, SSS)
- `/giris` — giriş
- `/kayit` — kayıt
- `/panel` — korumalı kullanıcı paneli (hesaplayıcı, kararlar, ayarlar, istatistikler)

## Notlar

- Panel, Supabase yapılandırıldıysa buluta; değilse cihaza yazar.
- Tüm tablolarda satır düzeyi güvenlik (RLS) açık.
- Ödeme entegrasyonu henüz yok; Premium bölümü teaser.
