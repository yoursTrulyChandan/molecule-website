"use client";

import { Table } from "antd";
import type { ComplaintRow } from "@/lib/complaints-storage";

const columns = [
  { title: "Month", dataIndex: "month", key: "month", width: 100 },
  { title: "Pending at Start", dataIndex: "pending", key: "pending", align: "center" as const },
  { title: "Received", dataIndex: "received", key: "received", align: "center" as const },
  { title: "Disposed", dataIndex: "disposed", key: "disposed", align: "center" as const },
  { title: "Unresolved at End", dataIndex: "unresolved", key: "unresolved", align: "center" as const },
];

export default function ComplaintTable({ title, data }: { title: string; data: ComplaintRow[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <Table columns={columns} dataSource={data.map((r, i) => ({ ...r, key: i }))} pagination={{ pageSize: 12 }} size="small" bordered scroll={{ x: 600 }} />
    </div>
  );
}
