import type { ComplaintRow } from "@/lib/complaints-storage";

export default function ComplaintTable({ title, data }: { title: string; data: ComplaintRow[] }) {
  const reversed = [...data].reverse();
  return (
    <div>
      <h2 className="text-[28px] sm:text-4xl font-normal text-brand mb-10 sm:mb-6">{title}</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <div className="overflow-y-auto max-h-144">
          <table className="w-full border-collapse text-sm text-brand">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-100">
                <th
                  rowSpan={2}
                  className="text-base px-4 py-3 font-bold text-brand text-left w-24 border-b border-r border-gray-200 align-middle"
                >
                  Month
                </th>
                <th
                  colSpan={4}
                  className="text-base px-4 py-3 font-bold text-brand text-center border-b border-gray-200"
                >
                  No. of Investor Complaints
                </th>
              </tr>
              <tr className="bg-gray-100">
                {[
                  "Pending at the beginning of the month",
                  "Received during the month",
                  "Disposed off during the month",
                  "Unresolved at the end of the month",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-sm px-3 py-2.5 font-semibold text-brand text-center leading-snug border-b border-gray-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reversed.map((row, i) => (
                <tr key={i} className={`text-base ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-4 py-4 border-r border-gray-100 font-medium">{row.month}</td>
                  <td className="px-3 py-4 text-center">{row.pending}</td>
                  <td className="px-3 py-4 text-center">{row.received}</td>
                  <td className="px-3 py-4 text-center">{row.disposed}</td>
                  <td className="px-3 py-4 text-center">{row.unresolved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
