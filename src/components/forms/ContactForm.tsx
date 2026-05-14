"use client";

import { useState } from "react";
import { Button, Input, Form, message } from "antd";

const { TextArea } = Input;

export default function ContactForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (res.ok) { message.success("Message sent!"); form.resetFields(); }
      else message.error("Failed to send.");
    } catch { message.error("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Required" }]}>
        <Input size="large" />
      </Form.Item>
      <Form.Item name="contact" label="Email ID / Contact number" rules={[{ required: true, message: "Required" }]}>
        <Input size="large" />
      </Form.Item>
      <Form.Item name="message" label="Message">
        <TextArea rows={5} />
      </Form.Item>
      <p className="text-xs text-gray-400 mb-4">By clicking submit you agree to the terms of use.</p>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" loading={loading}>Submit</Button>
      </Form.Item>
    </Form>
  );
}
