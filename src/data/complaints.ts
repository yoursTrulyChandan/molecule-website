export interface ComplaintRow {
  month: string;
  pending: number;
  received: number;
  disposed: number;
  unresolved: number;
}

function generate(startMonth: number, startYear: number, endMonth: number, endYear: number): ComplaintRow[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const rows: ComplaintRow[] = [];
  let y = startYear, m = startMonth;
  while (y < endYear || (y === endYear && m <= endMonth)) {
    rows.push({ month: `${months[m]}'${String(y).slice(2)}`, pending: 0, received: 0, disposed: 0, unresolved: 0 });
    m++;
    if (m >= 12) { m = 0; y++; }
  }
  return rows;
}

export const WEBSITE_COMPLAINTS = generate(6, 2021, 0, 2026); // Jul'21 to Jan'26
export const SCORES_COMPLAINTS = generate(8, 2023, 0, 2026);  // Sep'23 to Jan'26
