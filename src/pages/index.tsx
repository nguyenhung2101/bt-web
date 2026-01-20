import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';

const initialProducts = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
  { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
  { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
  { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

export default () => {
  const [products, setProducts] = useState(initialProducts);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: 'STT', render: (_, __, index) => index + 1 },
    { title: 'Tên sản phẩm', dataIndex: 'name' },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: p => p.toLocaleString('vi-VN') + ' ₫',
    },
    { title: 'Số lượng', dataIndex: 'quantity' },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => {
            setProducts(products.filter(p => p.id !== record.id));
            message.success('Xóa thành công');
          }}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý sản phẩm</h2>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm theo tên sản phẩm"
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setVisible(true)}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table rowKey="id" columns={columns} dataSource={filteredProducts} />

      <Modal
        title="Thêm sản phẩm"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={values => {
            setProducts([...products, { id: Date.now(), ...values }]);
            message.success('Thêm thành công');
            setVisible(false);
            form.resetFields();
          }}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true, type: 'number', min: 1 }]}>
            <InputNumber style={{ width: '100%' }} placeholder="Giá" />
          </Form.Item>
          <Form.Item name="quantity" rules={[{ required: true, type: 'number', min: 1 }]}>
            <InputNumber style={{ width: '100%' }} placeholder="Số lượng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
