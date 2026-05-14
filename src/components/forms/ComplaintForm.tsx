"use client";

import { useState } from "react";
import { Button, Input, Form, message } from "antd";

const { TextArea } = Input;

export default function ComplaintForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        message.success("Complaint submitted successfully!");
        form.resetFields();
      } else message.error("Failed to submit. Please try again.");
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
      className="max-w-4xl w-full complaint-form"
    >
      <Form.Item
        name="clientName"
        label="Client Name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item name="clientId" label="Client ID">
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Registered Email"
        rules={[
          { required: true, type: "email", message: "Valid email required" },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Registered Phone Number"
        rules={[{ required: true, message: "Please enter the phone number" }]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="issue"
        label="Kindly describe the issue faced by you"
        rules={[{ required: true, message: "Please describe the issue" }]}
      >
        <TextArea rows={5} size="large" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="bg-[#32373C]! w-full text-xl!" htmlType="submit" size="large" loading={loading}>
          Submit
        </Button>
      </Form.Item>

      <style jsx global>{`
        .complaint-form .ant-form-item-label > label {
          color: #1e6fad !important;
          font-size: 1.25rem !important;
          line-height: 1.75rem !important;
        }
      `}</style>
    </Form>
  );
}
