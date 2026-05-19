import type { ComplaintRow } from "@/lib/complaints-storage";

const HEADERS = [
  "Month",
  "No. of Investor complaints pending at the beginning of the month",
  "No. of Investor complaints received during the month",
  "No. of Investor complaints disposed off during the month",
  "No. of Investor complaints unresolved at the end of the month",
];

export default function ComplaintTable({ title, data }: { title: string; data: ComplaintRow[] }) {
  return (
    <div>
      <h2 className="text-[28px] sm:text-4xl font-normal text-brand mb-10 sm:mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-brand">
          <thead>
            <tr className="bg-gray-100">
              {HEADERS.map((h, i) => (
                <th
                  key={h}
                  className={`text-base px-3 py-3 font-bold text-brand leading-snug ${
                    i === 0 ? "text-left w-24" : "text-center"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={`text-base ${i % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                <td className="px-3 py-4.5">{row.month}</td>
                <td className="px-3 py-4.5 text-center">{row.pending}</td>
                <td className="px-3 py-4.5 text-center">{row.received}</td>
                <td className="px-3 py-4.5 text-center">{row.disposed}</td>
                <td className="px-3 py-4.5 text-center">{row.unresolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}