export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hours = h > 0 ? String(h).padStart(2, '0') + ':' : '';
  const minutes = String(m).padStart(2, '0');
  const secs = String(s).padStart(2, '0');

  return hours + minutes + (h > 0 || s > 0 ? ':' + secs : '');
}
