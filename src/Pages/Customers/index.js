import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {
  createCustomerAsync,
  deleteCustomerAsync,
  getAllCustomersAsync,
  selectCustomers,
} from "../../Slice/customerSlice";
import { toast } from "react-toastify";
import { DateRangePicker } from "rsuite";

const Customers = () => {
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const [titleForm, setTitleForm] = useState("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCustomersAsync(pages));
  }, [pages]);
  const customersList = useSelector(selectCustomers);
  console.log(customersList);
  const onFinish = async (values) => {
    await dispatch(createCustomerAsync(values));
    dispatch(getAllCustomersAsync());
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const clearForm = async () => {
    formSearch.resetFields();
    await dispatch(getAllCustomersAsync());
  };
  const [customerListData, setCustomerListData] = useState([]);
  const createCustomer = () => {
    form.resetFields();
    setTitleForm("create");
    setIsModalOpen(true);
    setCustomerListData(customersList?.result?.items);
  };
  const deleteCustomer = async (id) => {
    await dispatch(deleteCustomerAsync(id));
    dispatch(getAllCustomersAsync());
    toast.success("Xoá thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  const updateCustomer = (record) => {
    // console.log(record)
    setTitleForm("update");
    form.resetFields();
    setIsModalOpen(true);
    form.setFieldsValue({
      ...record,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_, record, index) => <p>{index + 1}</p>,
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
          <button
            style={{ border: "none", background: "white" }}
            onClick={() => updateCustomer(record)}
          >
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "green" }}
            ></i>
          </button>
          <Popconfirm
            title="Bạn có đồng ý xóa không?"
            onConfirm={() => deleteCustomer(record.id)}
            okText="OK"
            cancelText="Cancel"
          >
            <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleTableChange = (page) => {
    const params = {
      pageIndex: page.current,
      pageSize: page.pageSize,
    };

    const values = {
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
    };

    dispatch(getAllCustomersAsync(values));
  };

  const onFinishSearch = async (values) => {
      await dispatch(
        getAllCustomersAsync({
          ...values,
          PageIndex: 1,
          PageSize: 10,
        })
      );
  };
  return (
    <>
      <Form
        form={formSearch}
        name="formSearch"
        layout="vertical"
        onFinish={onFinishSearch}
      >
        <Row>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item
              label="Số điện thoại"
              name="phone"
              className="form__item"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Tên" name="name" className="form__item">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item
              label="Từ ngày - Đến ngày"
              name="createdDate"
              className="form__item"
            >
              <DateRangePicker block />
            </Form.Item>
          </Col>
        </Row>
        
        <Row className="pb-3">
          <Col xs={24} sm={18} md={18}>
            <Space>
              <Button
                onClick={clearForm}
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Clear
              </Button>
              <Button style={{ backgroundColor: "#ffbd2f", color: "#fff" }}>
                Export Excel
              </Button>
              <Button
                htmlType="submit"
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Tìm kiếm
              </Button>
              <Button
                onClick={createCustomer}
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Tạo mới khách hàng
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Modal
        title={
          titleForm === "create" ? "Tạo mới KHÁCH HÀNG" : "Cập nhật KHÁCH HÀNG"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Đóng
          </Button>,

          <Button
            key="ok"
            htmlType="submit"
            type="primary"
            form="form"
            style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
          >
            Gửi
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
          <Form.Item label="ID" name="id">
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
        pagination={{
          size: "small",
          total: customersList?.listCustomer?.result?.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={(page) => handleTableChange(page)}
      />
    </>
  );
};
export default Customers;
