function groupThousands(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatTL(value: number): string {
  return `₺${groupThousands(value)}`;
}

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(1).replace('.', ',');
}

export function formatDuration(hours: number, dailyHours: number): string {
  if (!Number.isFinite(hours) || hours <= 0) return '0 saat';

  if (hours < 1) {
    return `${Math.max(1, Math.round(hours * 60))} dakika`;
  }

  const safeDaily = dailyHours > 0 ? dailyHours : 8;

  if (hours < safeDaily) {
    return `${formatNumber(hours)} saat`;
  }

  const days = hours / safeDaily;

  if (days < 30) {
    const wholeDays = Math.floor(days);
    const restHours = Math.round((days - wholeDays) * safeDaily);
    if (wholeDays === 0) return `${formatNumber(hours)} saat`;
    return restHours > 0
      ? `${wholeDays} gün ${restHours} saat`
      : `${wholeDays} gün`;
  }

  const months = days / 30.44;
  return `${formatNumber(months)} ay`;
}
