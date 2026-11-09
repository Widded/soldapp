# SOLD

Fiyatları ömrüne çeviren mikro uygulama. Maaşını ve çalışma düzenini gir; her
fiyat etiketinin kaç saatlik emeğine mal olduğunu gör.

**SOLD**, “harcadığın para, sattığın zamandır” fikrinden gelir. Bir fiyat
etiketini saat/dakika cinsinden emeğe çevirir; karar listesi, bekleme süresi ve
“kurtardığın saat” takibiyle birlikte.

## Yapı

```
soldapp/
  web/      → tanıtım sayfası + giriş + kullanıcı paneli (Vite + React + Supabase)
  mobile/   → Expo uygulaması (iOS + Android + web)
  web/supabase/schema.sql → tablolar ve RLS politikaları
```

## Web

```bash
cd web
npm install
cp .env.example .env   # Supabase anahtarlarını gir (opsiyonel)
npm run dev
```

Tarayıcıda `http://localhost:5173`.

Supabase anahtarları yoksa uygulama **demo modunda** çalışır; veriler
`localStorage` içinde tutulur.

### Supabase kurulumu

1. [supabase.com](https://supabase.com) üzerinde ücretsiz proje aç.
2. SQL Editor'de `web/supabase/schema.sql` dosyasını çalıştır.
3. Authentication > Providers > Email açık olsun.
4. Project Settings > API'den URL ve anon key'i al.
5. `web/.env` ve `mobile/.env` dosyalarına aynı değerleri yaz.
6. Yeniden başlat.

## Vercel

Bu repo bir monorepo. Vercel'de iki kurulumdan biri kullanılabilir:

1. **Root Directory = `web`** (önerilen): Framework **Vite**, Install Command
   `npm install --include=dev`, Build Command `npm run build`, Output
   Directory `dist`.
2. **Root Directory = repo kökü**: kök `vercel.json` otomatik olarak `web/`
   içine girip kurar ve build eder, çıktıyı `web/dist` olarak yayınlar.

Vercel panelinde **Root Directory** yanlışlıkla `mobile` seçiliyse build
`Missing script: build` hatası verir; `web` veya boş (repo kökü) olmalı.

SPA yönlendirmesi (`/giris`, `/panel` vb.) için `vercel.json` dosyalarında
`/index.html` rewrite'ı hazır.

Vercel > Project Settings > Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Bu değerler yoksa uygulama demo modunda çalışır; build yine de başarılı olur.

## Mobil

```bash
cd mobile
npm install
cp .env.example .env   # Supabase anahtarlarını gir (opsiyonel)
npx expo start
```

- `a` → Android
- `i` → iOS
- `w` → web

## Sayfalar / ekranlar

Web:

- `/` — one-page tanıtım
- `/giris` — giriş
- `/kayit` — kayıt
- `/panel` — korumalı kullanıcı paneli

Mobil (yüzen alt menü):

- `login` — giriş / kayıt
- `Ana Sayfa` — fiyat → emek çevirici
- `Kararlar` — bekleme süresi, al / vazgeç
- `İstatistik` — toplam kurtarılan saat, karar dağılımı
- `Keşfet` — yakında gelecek özellikler
- `Profil` — kazanç, saat, yol, premium, çıkış

## Tasarım

Siyah zemin (`#050505`), beyaz tipografi (`#f4f4f0`), yeşil yalnızca küçük
detaylarda (`#c6ff3d`): numaralar, çizgiler, sonuç değerleri, damga.

## Notlar

- Panel ve mobil, Supabase yapılandırıldıysa buluta; değilse cihaza yazar.
- Tüm tablolarda satır düzeyi güvenlik (RLS) açık.
- Ödeme entegrasyonu henüz yok; Premium bölümü teaser.
