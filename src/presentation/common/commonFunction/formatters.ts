export const formatAmount = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) return '0';

  return new Intl.NumberFormat('de-DE').format(numericValue);
};