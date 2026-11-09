# kaç saat?

Fiyatları ömrüne çeviren mikro uygulama. Maaşını ve çalışma düzenini gir; her
fiyat etiketinin kaç saatlik emeğine mal olduğunu gör. Karar listesi, bekleme
süresi ve "kurtardığın saat" takibi ile birlikte.

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## Build

```bash
npm run build
npm run preview
```

## Yapı

- `src/components/Onboarding.tsx` — ilk kurulum (kazanç, saat, yol, gün)
- `src/components/Calculator.tsx` — fiyat → emek çevirici + karar ekleme
- `src/components/Decisions.tsx` — karar listesi, bekleme süresi, kurtarılan saat
- `src/components/SettingsView.tsx` — ayarlar + premium teaser
- `src/lib/calc.ts` — gerçek saatlik değer hesabı
- `src/lib/storage.ts` — localStorage kalıcılığı
- `src/lib/format.ts` — TL ve süre biçimlendirme

## Notlar

- Backend yok; tüm veriler tarayıcıda `localStorage` içinde tutulur.
- PWA manifest hazır; mobilde "Ana ekrana ekle" ile uygulama gibi açılır.
- Ödeme entegrasyonu henüz yok (premium bölümü teaser).
