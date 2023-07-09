import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillOfLadingsAsync,
  selectBillOfLading,
} from "../../Slice/AccountantSlice";
import { FORMATS_DATE } from "../../Utils/constants";
import dayjs from "dayjs";

const Accountant = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [isModalOpenCode, setIsModalOpenCode] = useState(false);
  const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const { RangePicker } = DatePicker;
  useEffect(() => {
    document.title = "Kế toán - ANZEN";
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillOfLadingsAsync(pages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);
  const listAccountant = useSelector(selectBillOfLading);
  console.log(listAccountant);
  const detailAccounting = listAccountant?.listAccount?.result;

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_, record, index) => (pages.PageIndex - 1) * 10 + index + 1,
    },
    {
      title: "Số mã",
      dataIndex: "code",
      key: "code",
      render: (code, record) => showCode(code, record),
    },
    {
      title: "Ngày tạo",
      dataIndex: "ladingDate",
      key: "ladingDate",
      render: (text, record) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "SĐT đối tác",
      dataIndex: "partnerPhone",
      key: "partnerPhone",
    },
    {
      title: "Tài xế",
      dataIndex: "driver",
      key: "driver",
    },
    {
      title: "SĐT tài xế",
      dataIndex: "driverPhone",
      key: "driverPhone",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalCOD",
      key: "totalCOD",
    },
    {
      title: "Thao tác",
      dataIndex: "isDone",
      key: "isDone",
      render: (text, record) => showIsDone(text),
      align: "center",
    },
  ];
  const columnsAccounting = [
    {
      title: "STT",
      dataIndex: "id",
      key: "index",
      render: (record, item, index) => (pages.PageIndex - 1) * 10 + index,
    },
    {
      title: "MVĐ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên hàng",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nơi giao",
      dataIndex: "mass",
      key: "mass",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hình thức thu tiền",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Số tiền lái xe thu",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Số tiền",
      dataIndex: "note",
      key: "note",
    },
  ];
  const showIsDone = (isDone) => {
    return isDone === true ? "" : <Button>Hoàn thành</Button>;
  };
  const handleCheckbox = (e) => {
    setShowAdvancedSearch(e.target.checked);
  };
  const clearForm = (values) => {
    formSearch.resetFields();
    setPages(values);
  };
  const showCode = (code, record) => {
    return code === false ? (
      <Tag color="#E61134" />
    ) : (
      <Tag
        onClick={() => getDetailCode(record.id)}
        className="tag_code"
        color="#E61134"
      >
        {code}
      </Tag>
    );
  };
  const handleCancelCode = () => {
    setIsModalOpenCode(false);
  };
  const getDetailCode = async (id) => {
    // await dispatch(getDetailAccounting(id));
    setIsModalOpenCode(true);
  };
  const onFinishSearch = (values) => {
    console.log(values?.dateSearch);
    const params = {
      ...values,
      LadingDateFrom:
        values?.dateSearch &&
        dayjs(values?.dateSearch?.[0]?.startOf("day")).format(
          FORMATS_DATE.YYYY_MM_DD
        ),
      LadingDateTo:
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
            <Form.Item label="Mã bảng kê" name="code" className="form__item">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item
              label="SĐT tài xế"
              name="driverPhone"
              className="form__item"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Biển số xe" name="name" className="form__item">
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
        {showAdvancedSearch && (
          <Row>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item label="Tài xế" name="driver" className="form__item">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="Tên đối tác"
                name="partner"
                className="form__item"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="SĐT đối tác"
                name="partnerPhone"
                className="form__item"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="Tổng số tiền từ"
                name="moneyfrom"
                className="form__item"
                values="number"
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        )}
        {showAdvancedSearch && (
          <Row>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="Tổng số tiền đến"
                name="moneyto"
                className="form__item"
                values="number"
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        )}

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
                htmlType="submit"
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Tìm kiếm
              </Button>
              <Checkbox onChange={handleCheckbox}>Tìm kiếm nâng cao</Checkbox>
            </Space>
          </Col>
        </Row>
      </Form>
      <Modal
        getContainer={false}
        title="BẢNG KÊ GIAO NHẬN VẬN CHUYỂN"
        open={isModalOpenCode}
        onCancel={handleCancelCode}
        destroyOnClose={false}
        width={"80%"}
        // loading={detailAccounting?.isLoading}
        footer={[
          <Button key="cancel" onClick={handleCancelCode}>
            Đóng
          </Button>,
          <Button className="btn-yellow" key="download">
            Tải xuống
          </Button>,
        ]}
      >
        <Row>
          <Col span={12}>
            <Space>
              <strong>MVĐ:</strong>
              <span>{detailAccounting?.code}</span>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <Space>
                <strong>Nhân viên kinh doanh:</strong>
                <span>{detailAccounting?.saleStaff}</span>
              </Space>
              <Space>
                <strong>SĐT:</strong>
                <span>{detailAccounting?.shipperPhone}</span>
              </Space>
            </Space>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={12}>
            <Space>
              <strong>Nguời gửi:</strong>
              <span>{detailAccounting?.shipper}</span>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Người nhận:</strong>
              <span>{detailAccounting?.consignee}</span>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Space>
              <strong>Địa chỉ gửi:</strong>
              <span>{detailAccounting?.fromAddress}</span>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Địa chỉ nhận:</strong>
              <span>{detailAccounting?.toAddress}</span>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Space>
              <strong>Số điện thoại gửi:</strong>
              <span>{detailAccounting?.shipperPhone}</span>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Số điện thoại nhận:</strong>
              <span>{detailAccounting?.consigneePhone}</span>
            </Space>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <span>Hai bên thống nhất lượng vận chuyển như sau</span>
          </Col>
        </Row>
        <br />
        <Table
          rowKey={(record) => record.id}
          columns={columnsAccounting}
          dataSource={detailAccounting?.deliveryOrderDetails}
          pagination={false}
        ></Table>
        <br />
        <Row>
          <Col span={12}>
            <Space>
              <strong>Tổng cộng:</strong>
              <span>{detailAccounting?.totalAmount}</span>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Đã tạm ứng:</strong>
              <span>{detailAccounting?.paymentType}</span>
            </Space>
          </Col>
        </Row>

        <br />
        {/* <table style={{ border: '1px solid black', width: '100%' }}>
							<tbody>
								<tr
									style={{
										borderBottom: '1px solid black',
										textAlign: 'center',
									}}
								>
									<th>Giá bán</th>
									<th>Thành tiền</th>
								</tr>
								<tr>
									<td style={{ paddingLeft: '10px' }}>Bán ra</td>
									<td>{detailAccounting?.totalAmount}</td>
								</tr>
								<tr>
									<td style={{ paddingLeft: '10px' }}>Phát sinh khác</td>
									<td>{detailAccounting?.additionalAmount}</td>
								</tr>
								<tr>
									<td style={{ paddingLeft: '10px' }}>Tổng giá bán</td>
									<td>
										{detailAccounting?.totalAmount +
											detailAccounting?.additionalAmount}
									</td>
								</tr>
							</tbody>
						</table> */}
      </Modal>
      <Table
        dataSource={listAccountant?.listA?.result?.items}
        loading={listAccountant?.isLoading}
        columns={columns}
        pagination={{
          size: "small",
          total: listAccountant?.listA?.result?.total,
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
export default Accountant;
