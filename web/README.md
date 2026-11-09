# kaç saat? — web

One-page tanıtım + giriş/kayıt + kullanıcı paneli.

## Çalıştırma

```bash
npm install
cp .env.example .env   # Supabase anahtarlarını gir (opsiyonel)
npm run dev
```

`http://localhost:5173`.

Supabase anahtarı yoksa uygulama **demo modunda** çalışır; veriler
`localStorage` içinde tutulur.

## Sayfalar

- `/` — tanıtım: hero, fiş görseli, canlı hesaplayıcı, nasıl çalışır,
  özellikler, fiyat, SSS
- `/giris` — giriş
- `/kayit` — kayıt
- `/panel` — korumalı panel: hesaplayıcı, kararlar, ayarlar, istatistikler

## Supabase

1. SQL Editor'de `supabase/schema.sql` dosyasını çalıştır.
2. `profiles` ve `decisions` tabloları RLS ile korunur.
3. `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` değerlerini `.env`'e yaz.

## Yapı

- `src/pages/Landing.tsx` — tanıtım
- `src/pages/Login.tsx` / `Signup.tsx` — kimlik doğrulama
- `src/pages/Panel.tsx` — kullanıcı paneli
- `src/components/ReceiptMock.tsx` — fiş görseli
- `src/lib/auth.tsx` — Supabase auth + demo fallback
- `src/lib/decisions.ts` / `profile.ts` — bulut veya yerel veri
- `src/lib/calc.ts` / `format.ts` — hesaplama ve biçimlendirme
- `src/landing.css` — siyah / beyaz / yeşil tasarım sistemi
