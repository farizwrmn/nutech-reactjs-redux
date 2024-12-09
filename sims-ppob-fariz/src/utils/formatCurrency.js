export function FormatCurrency (number) {
  return Number(number).toLocaleString('in-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
