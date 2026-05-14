export interface PerformanceDataPoint {
  label: string;
  portfolio: number;
  benchmark: number;
}

// Cumulative Performance (line chart) — Portfolio vs BSE500TRI
export const CUMULATIVE_DATA: PerformanceDataPoint[] = [
  { label: "Sep-21", portfolio: 10, benchmark: 10 },
  { label: "Dec-21", portfolio: 14, benchmark: 14 },
  { label: "Mar-22", portfolio: 9, benchmark: 9 },
  { label: "Jun-22", portfolio: 10, benchmark: 1 },
  { label: "Sep-22", portfolio: 39, benchmark: 10 },
  { label: "Dec-22", portfolio: 54, benchmark: 14 },
  { label: "Mar-23", portfolio: 41, benchmark: 9 },
  { label: "Jun-23", portfolio: 67, benchmark: 10 },
  { label: "Sep-23", portfolio: 91, benchmark: 39 },
  { label: "Dec-23", portfolio: 130, benchmark: 54 },
  { label: "Mar-24", portfolio: 132, benchmark: 41 },
  { label: "Jun-24", portfolio: 167, benchmark: 67 },
  { label: "Sep-24", portfolio: 181, benchmark: 72 },
  { label: "Dec-24", portfolio: 186, benchmark: 85 },
  { label: "Mar-25", portfolio: 168, benchmark: 71 },
  { label: "Jun-25", portfolio: 183, benchmark: 63 },
  { label: "Sep-25", portfolio: 199, benchmark: 81 },
  { label: "Dec-25", portfolio: 161, benchmark: 75 },
  { label: "Mar-26", portfolio: 161, benchmark: 84 },
];

// Quarterly Performance (bar chart)
export const QUARTERLY_DATA: PerformanceDataPoint[] = [
  { label: "Sep-21", portfolio: 10, benchmark: 11 },
  { label: "Dec-21", portfolio: 4, benchmark: 4 },
  { label: "Mar-22", portfolio: 0, benchmark: -4 },
  { label: "Jun-22", portfolio: 0, benchmark: 1 },
  { label: "Sep-22", portfolio: 27, benchmark: -10 },
  { label: "Dec-22", portfolio: 11, benchmark: 11 },
  { label: "Mar-23", portfolio: -9, benchmark: 4 },
  { label: "Jun-23", portfolio: 13, benchmark: -6 },
  { label: "Sep-23", portfolio: 19, benchmark: 14 },
  { label: "Dec-23", portfolio: 21, benchmark: 5 },
  { label: "Mar-24", portfolio: 1, benchmark: 12 },
  { label: "Jun-24", portfolio: 21, benchmark: 4 },
  { label: "Sep-24", portfolio: 5, benchmark: 15 },
  { label: "Dec-24", portfolio: 6, benchmark: 12 },
  { label: "Mar-25", portfolio: -23, benchmark: -8 },
  { label: "Jun-25", portfolio: 21, benchmark: 2 },
  { label: "Sep-25", portfolio: 6, benchmark: 11 },
  { label: "Dec-25", portfolio: -3, benchmark: 6 },
  { label: "Mar-26", portfolio: -13, benchmark: -3 },
];
