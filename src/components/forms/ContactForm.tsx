"use client";

import { useState } from "react";
import { Button, Input, Form, message } from "antd";

const { TextArea } = Input;

function RL({ children }: { children: React.ReactNode }) {
  return (
    <span>
      {children}
      <span style={{ color: "#ff4d4f", marginLeft: 2 }}>*</span>
    </span>
  );
}

export default function ContactForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        message.success("Message sent!");
        form.resetFields();
      } else {
        message.error("Failed to send.");
      }
    } catch {
      message.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      className="contact-form"
    >
      <Form.Item
        name="name"
        label={<RL>Name</RL>}
        rules={[{ required: true, message: "Required" }]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="contact"
        label={<RL>Email ID / Contact number</RL>}
        rules={[{ required: true, message: "Required" }]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item name="message" label="Message">
        <TextArea rows={10} size="large" />
      </Form.Item>
      <p className="text-xs text-gray-400 mb-4">
        By clicking submit you agree to the terms of use.
      </p>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          className="bg-[#32373C]! px-10"
        >
          Submit
        </Button>
      </Form.Item>

      <style jsx global>{`
        .contact-form .ant-form-item-label > label {
          color: #1e6fad !important;
          font-size: 1rem !important;
        }
      `}</style>
    </Form>
  );
}