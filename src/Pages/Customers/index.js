import { Button, Form, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomerAsync,
  deleteCustomerAsync,
  getAllCustomersAsync,
  selectCustomers,
  updateCustomerAsync,
} from "../../Slice/customerSlice";

const Customers = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCustomersAsync(pages));
  }, []);
  const customersList = useSelector(selectCustomers);
  console.log(customersList);
  const onFinish = async (values) => {
    if (values.id) {
      await dispatch(updateCustomerAsync(values));
    } else {
      await dispatch(createCustomerAsync(values));
    }
    dispatch(getAllCustomersAsync());
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteCustomer = async (id) => {
    await dispatch(deleteCustomerAsync(id));
    dispatch(getAllCustomersAsync());
  };
  const updateCustomer = (list) => {
    form.resetFields();
    setIsModalOpen(true);
    form.setFieldsValue({
      ...list,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chi tiết khách hàng",
      dataIndex: "decription",
      key: "decription",
    },
    {
      title: "Hoạt động",
      key: "activity",
      render: (_, record) => (
        <Space size="middle">
          <button style={{border: "none", background: "white"}} onClick={() => updateCustomer(record)}><i class="fa-solid fa-pen-to-square" style={{color: "green"}}></i></button>
          <button style={{border: "none", background: "white"}} onClick={() => deleteCustomer(record.id)}><i class="fa-solid fa-trash" style={{color: "red"}}></i></button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="searchCustomer">
        <Input placeholder="Nhập số điện thoại khách hàng" />
        <Input placeholder="Nhập tên khách khách hàng" />
      </div>
      <Button type="primary">Clear</Button>
      <Button type="primary">Tìm kiếm</Button>
      <Button type="primary" onClick={showModal}>
        Tạo mới khách hàng
      </Button>

      <Modal
        title="Tạo mới KHÁCH HÀNG"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button key="ok" htmlType="submit" type="primary" form="form">
            Submit
          </Button>,
        ]}
      >
        <Form
          name="form"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="STT"
            name="id"
          
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Tên Khách hàng:"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại:"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input Phone Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ:"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Thông tin chi tiết:" name="decription">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={customersList?.listCustomer?.result?.items}
        loading={customersList.isLoading}
        columns={columns}
      />
    </>
  );
};
export default Customers;
