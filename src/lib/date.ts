// 백엔드는 날짜를 "yyyy-MM-dd"(ISO)로 내려준다. 화면 표시는 "yyyy.MM.dd" 점 표기를 쓴다.
export function toDotDate(iso: string): string {
  return iso.replaceAll('-', '.');
}

// 화면 입력(점 표기 또는 input[type=date])을 백엔드로 보낼 ISO 표기로 되돌린다.
export function toIsoDate(dotOrIso: string): string {
  return dotOrIso.replaceAll('.', '-');
}

// "2026-11-20T14:32:00" 같은 ISO datetime을 "2026.11.20 14:32"로 표시한다.
export function toDotDateTime(isoDateTime: string): string {
  const [date, time] = isoDateTime.split('T');
  return time ? `${toDotDate(date)} ${time.slice(0, 5)}` : toDotDate(date);
}
