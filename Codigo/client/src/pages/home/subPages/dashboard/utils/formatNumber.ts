export function formatNumber(value: number): string {
    if (value < 1000) {
        return value.toString();
    }
  
    const roundedValue = Math.round(value / 100) / 10;
    return `${roundedValue}k`;
}
  
