export function dbTimeForHuman(str) {
  const localDate = new Date(str);
  return localDate.toLocaleString('en-US', {
    weekday: 'short', // Day of the week (e.g., Mon)
    year: 'numeric',  // Full year (e.g., 2024)
    month: 'short',    // Short month name (e.g., Jan)
    day: 'numeric',    // Day of the month (e.g., 5)
    hour: '2-digit',   // Hour in 2-digit format (e.g., 10)
    minute: '2-digit', // Minute in 2-digit format (e.g., 53)
    hour12: true       // 12-hour clock format (e.g., PM)
  });
}