import {
  Button,
  Col,
  DatePicker,
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
  exportGridAsync,
  getAllCustomersAsync,
  selectCustomers,
} from "../../Slice/customerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FORMATS_DATE } from "../../Utils/constants";
import dayjs from "dayjs";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Customers = () => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const navigate = useNavigate();
  const [titleForm, setTitleForm] = useState("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
  const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
  const dispatch = useDispatch();
  const toast1 = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };
  useEffect(() => {
    document.title = "Khách hàng - ANZEN";
  }, []);
  useEffect(() => {
    dispatch(getAllCustomersAsync(pages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllCustomersAsync, pages]);

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
  const handleCancelExcel = () => {
    setIsModalOpenExcel(false);
  };
  const exportExcel = () => {
    setIsModalOpenExcel(true);
  };
  const clearForm = (values) => {
    formSearch.resetFields();
    setPages(values);
  };

  const [customerListData, setCustomerListData] = useState([]);
  const createCustomer = () => {
    form.resetFields();
    setTitleForm("create");
    setIsModalOpen(true);
    setCustomerListData(customerListData?.customersList?.result?.items);
  };
  const deleteCustomer = async (id) => {
    await dispatch(deleteCustomerAsync(id));
    dispatch(getAllCustomersAsync());
    toast.success("Xoá thành công!", toast1);
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
      key: "index",
      render: (_, record, index) => (pages.PageIndex - 1) * 10 + index + 1,
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
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hoạt động",
      key: "activity",
      render: (record) => (
				<Space size={20}>
					<EditOutlined
						onClick={() => updateCustomer(record)}
						style={{ fontSize: '24px', cursor: 'pointer', color: 'green' }}
					/>
					<Popconfirm
						title="Bạn có đồng ý xóa?"
						onConfirm={() => deleteCustomer(record.id)}
						okText="OK"
						cancelText="Cancel"
					>
						<DeleteOutlined
							style={{ fontSize: '24px', cursor: 'pointer', color: 'red' }}
						/>
					</Popconfirm>
				</Space>
      )
    },
  ];

  const onFinishSearch = (values) => {
    // console.log(values?.dateSearch);
    const params = {
      ...values,
      createdDateFrom:
        values?.dateSearch &&
        dayjs(values?.dateSearch?.[0]?.startOf("day")).format(
          FORMATS_DATE.YYYY_MM_DD
        ),
      createdDateTo:
        values?.dateSearch &&
        dayjs(values?.dateSearch?.[1]?.endOf("day")).format(
          FORMATS_DATE.YYYY_MM_DD
        ),
      pageIndex: 1,
      pageSize: 10,
      dateSearch: undefined,
    };
    setPages(params);
  };
  const moveToExcel = async () => {
    setIsModalOpenExcel(false);
    await dispatch(exportGridAsync(pages));
    navigate("/export-report");
    toast.success("File cần tải mới nhất đã chuẩn bị xong!", toast1);
  };
  return (
    <>
      <Form
        form={formSearch}
        name="formSearch"
        layout="vertical"
        autoComplete="false"
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
              name="dateSearch"
              className="form__item"
              initialValue={[dayjs("2022-10-01"), dayjs()]}
            >
              <RangePicker
                style={{ width: "100%" }}
                format={FORMATS_DATE.DD_MM_YYYY}
              />
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
              <Button
                onClick={exportExcel}
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Export Excel
              </Button>
              <Button
                htmlType="submit"
                form="formSearch"
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
      <Modal open={isModalOpenExcel} footer={null}>
        <p style={{ fontSize: 16 }}>Thông báo</p>
        <hr />
        <p>
          Bạn có muốn chuyển hướng qua màn hình Export Report để tải file không?
        </p>
        <hr />
        <Row justify="end">
          <Col>
            <Space>
              <Button
                className="btn-normal"
                key="close"
                onClick={handleCancelExcel}
              >
                Cancel
              </Button>

              <Button
                className="btn-yellow"
                key="movetoexcel"
                onClick={moveToExcel}
              >
                OK
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
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
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="ID" name="id" hidden={true}>
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

          <Form.Item label="Thông tin chi tiết:" name="description">
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
          onChange: (PageIndex, PageSize) => {
            setPages({
              ...pages,
              PageIndex: PageIndex,
              PageSize: PageSize,
            });
          },
        }}
      />
    </>
  );
};
export default Customers;
