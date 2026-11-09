# kaç saat? — mobil

Expo (SDK 58) + Expo Router ile yapılmış iOS / Android / web uygulaması.

## Çalıştırma

```bash
npm install
cp .env.example .env   # Supabase anahtarlarını gir (opsiyonel)
npx expo start
```

- `a` → Android
- `i` → iOS (macOS veya Expo Go)
- `w` → web

Supabase anahtarı yoksa uygulama **demo modunda** çalışır; veriler cihazda
(`AsyncStorage`) tutulur.

## Ekranlar

- `src/app/login.tsx` — giriş / kayıt (Supabase veya demo)
- `src/app/(tabs)/index.tsx` — hesaplayıcı
- `src/app/(tabs)/decisions.tsx` — kararlar
- `src/app/(tabs)/settings.tsx` — ayarlar, premium, çıkış

## Yapı

- `src/lib/calc.ts` — gerçek saatlik değer hesabı
- `src/lib/format.ts` — TL ve süre biçimlendirme
- `src/lib/storage.ts` — AsyncStorage
- `src/lib/auth.tsx` — Supabase auth + demo fallback
- `src/lib/decisions.ts` / `profile.ts` — bulut veya yerel veri
- `src/components/ui.tsx` — ortak arayüz bileşenleri
- `src/lib/theme.ts` — siyah / beyaz / yeşil tasarım token'ları

## Tip kontrolü

```bash
npx tsc --noEmit
```
