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
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillOfLadingsAsync,
  getDetailBillOfLadings,
  selectBillOfLading,
} from "../../Slice/AccountantSlice";
import { FORMATS_DATE } from "../../Utils/constants";
import dayjs from "dayjs";
import { getDetailAccounting, selectOrder } from "../../Slice/orderSlice";
import { downloadCodeBillAsync } from "../../Slice/policySlice";

const Accountant = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [isModalOpenCode, setIsModalOpenCode] = useState(false);
  const [isModalOpenCode2, setIsModalOpenCode2] = useState(false);
  const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
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
  const { isLoading } = listAccountant;
  const detailBillOfLadings = listAccountant?.listAccount?.result;
  console.log(detailBillOfLadings);

  const order = useSelector(selectOrder);
  console.log(order);

  const detailAccounting = order?.listAccounting?.result;
  // console.log(detailAccounting)

  const downloadCodeBill = async (id) => {
    setIsModalOpenCode(false);
    await dispatch(downloadCodeBillAsync({ id: id, type: "accounting" }));
  };
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
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "MVĐ",
      dataIndex: "code",
      key: "code",
      render: (code, record) => showCode2(code, record),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "consignee",
      key: "consignee",
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nơi giao",
      dataIndex: "toAddress",
      key: "toAddress",
    },
    {
      title: "Số điện thoại",
      dataIndex: "consigneePhone",
      key: "consigneePhone",
    },
    {
      title: "Hình thức thu tiền",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Số tiền lái xe thu",
      dataIndex: "cod",
      key: "cod",
    },
    {
      title: "Số tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
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
  const showCode2 = (code, record) => {
    return code === false ? (
      <Tag color="#E61134" />
    ) : (
      <Tag
        onClick={() => getDetailCode2(record.id)}
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
  const handleCancelCode2 = () => {
    setIsModalOpenCode2(false);
  };
  const getDetailCode = async (id) => {
    await dispatch(getDetailBillOfLadings(id));
    await dispatch(getDetailAccounting(id));
    setIsModalOpenCode(true);
  };
  const getDetailCode2 = async (id) => {
    setIsModalOpenCode2(true);
  };
  const onFinishSearch = async (values) => {
    if (
      values?.dateSearch ||
      values?.totalCod >= values?.totalCodFrom ||
      values?.totalCod <= values?.totalCodTo
    ) {
      const ladingDateFrom = values?.dateSearch?.[0]
        .format(FORMATS_DATE.YYYY_MM_DD)
        .toString();
      const ladingDateTo = values?.dateSearch?.[1]
        .format(FORMATS_DATE.YYYY_MM_DD)
        .toString();
      const { dateSearch, ...otherValues } = values;
      await dispatch(
        getBillOfLadingsAsync({
          ...otherValues,
          ladingDateTo: ladingDateTo,
          ladingDateFrom: ladingDateFrom,
          PageIndex: 1,
          PageSize: 10,
        })
      );
    } else {
      await dispatch(
        getBillOfLadingsAsync({ ...values, PageIndex: 1, PageSize: 10 })
      );
    }
  };
  return (
    <Spin spinning={isLoading} tip="Loading...">
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
                name="totalCodFrom"
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
                name="totalCodTo"
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
        title={`BẢNG KÊ GIAO NHẬN VẬN CHUYỂN ---- ${detailBillOfLadings?.code}`}
        open={isModalOpenCode}
        onCancel={handleCancelCode}
        destroyOnClose={false}
        width={"80%"}
        footer={[
          <Button key="cancel" onClick={handleCancelCode}>
            Đóng
          </Button>,
          <Button
            className="btn-yellow"
            key="download"
            onClick={() => downloadCodeBill(detailBillOfLadings?.id)}
          >
            Tải xuống
          </Button>,
        ]}
      >
        <Row>
          <Col span={8}>
            <Space>
              <strong>Tên công ty:</strong>
              <span>{detailBillOfLadings?.a}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Số điện thoại:</strong>
              <span>{detailBillOfLadings?.b}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Mã số thuế:</strong>
              <span>{detailBillOfLadings?.c}</span>
            </Space>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={8}>
            <Space>
              <strong>Số hợp đồng:</strong>
              <span>{detailBillOfLadings?.d}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Người lái xe:</strong>
              <span>{detailBillOfLadings?.driver}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Biển số xe:</strong>
              <span>{detailBillOfLadings?.licensePlate}</span>
            </Space>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={8}>
            <Space>
              <strong>CMND:</strong>
              <span>{detailBillOfLadings?.driverIdentity}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Địa chỉ:</strong>
              <span>{detailBillOfLadings?.driverAddress}</span>
            </Space>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={8}>
            <Space>
              <strong>GPLX:</strong>
              <span>{detailBillOfLadings?.drivingLicense}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Điện thoại lái xe:</strong>
              <span>{detailBillOfLadings?.driverPhone}</span>
            </Space>
          </Col>
          <Col span={8}>
            <Space>
              <strong>Tổng cước cho xe:</strong>
              <span>{detailBillOfLadings?.totalCOD}</span>
            </Space>
          </Col>
        </Row>
        <br />
        <Table
          rowKey={(record) => record.id}
          columns={columnsAccounting}
          dataSource={detailBillOfLadings?.deliveryOrderBillOfLadings}
          pagination={{
            size: "small",
            total: detailBillOfLadings?.deliveryOrderBillOfLadings?.total,
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
        ></Table>
        <br />
        <div>
          <Row>
            <Col span={18}></Col>
            <Col span={6}>
              <Space>
                <strong>Tổng cộng:</strong>
                <span>{detailBillOfLadings?.totalCOD}</span>
              </Space>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col span={18}></Col>
            <Col span={6}>
              <Space>
                <strong>Đã tạm ứng:</strong>
                <span>{detailBillOfLadings?.advanceAmount}</span>
              </Space>
            </Col>
          </Row>
        </div>

        <br />
      </Modal>
      <Modal
        getContainer={false}
        title="BIÊN NHẬN VẬN CHUYỂN"
        open={isModalOpenCode2}
        onCancel={handleCancelCode2}
        destroyOnClose={true}
        width={"80%"}
        footer={[
          <Button key="cancel" onClick={handleCancelCode2}>
            Đóng
          </Button>,
          <Button key="send" className="btn-yellow">
            Gửi
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
                <span>
                  {
                    detailBillOfLadings?.deliveryOrderBillOfLadings[0]
                      ?.saleStaff
                  }
                </span>
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
              <span>
                {detailBillOfLadings?.deliveryOrderBillOfLadings[0]?.shipper}
              </span>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Người nhận:</strong>
              <span>
                {detailBillOfLadings?.deliveryOrderBillOfLadings[0]?.consignee}
              </span>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Space>
              <strong>Địa chỉ gửi:</strong>
              {/* <span>{detailAccounting?.fromAddress}</span> */}
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Địa chỉ nhận:</strong>
              {/* <span>{detailAccounting?.toAddress}</span> */}
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Space>
              <strong>Số điện thoại gửi:</strong>
              {/* <span>{detailAccounting?.shipperPhone}</span> */}
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <strong>Số điện thoại nhận:</strong>
              <span>
                {
                  detailBillOfLadings?.deliveryOrderBillOfLadings[0]
                    ?.consigneePhone
                }
              </span>
            </Space>
          </Col>
        </Row>
        <br />
        <Table
          rowKey={(record) => record.id}
          // columns={columnsQuantityAccounting}
          // dataSource={detailAccounting?.deliveryOrderDetails}
          pagination={false}
        ></Table>
        <br />
        <Row>
          <Col span={24}>
            <strong>Giá bán</strong>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Bán ra" name="totalAmount" className="form__item">
              <Input placeholder="" values="totalAmount" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Phát sinh khác" name="" className="form__item">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Tổng cộng" name="totalCod" className="form__item">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Thêm phí</strong>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Tên công ty" name="" className="form__item">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Phí" name="" className="form__item">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Loại phí" name="totalCod" className="form__item">
              <Select
                showSearch
                placeholder="Chọn loại phí"
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "",
                    label: "Phí nhận hàng",
                  },
                  {
                    value: "",
                    label: "Phí bo giao hàng",
                  },
                  {
                    value: "",
                    label: "Phí khác",
                  },
                ]}
              />
            </Form.Item>
            <Button key="add" className="btn-yellow">
              Thêm
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Giá mua</strong>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Trung chuyển</strong>
            <Table
              rowKey={(record) => record.id}
              // columns={columnsTransborder}
              // dataSource={
              // 	detailAccounting?.ladingInfos &&
              // 	detailAccounting?.transborderFees
              // }
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Phí nhận hàng</strong>
            <Table
              rowKey={(record) => record.id}
              // columns={columnsReceiving}
              // dataSource={
              // 	detailAccounting?.ladingInfos &&
              // 	detailAccounting?.receivingFees
              // }
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Phí bo giao hàng</strong>
            <Table
              rowKey={(record) => record.id}
              // columns={columnsFreight}
              // dataSource={
              // 	detailAccounting?.ladingInfos &&
              // 	detailAccounting?.freightFees
              // }
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Khác</strong>
            <Table
              rowKey={(record) => record.id}
              // columns={columnsOther}
              // dataSource={
              // detailAccounting?.ladingInfos && detailAccounting?.otherFees
              // }
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Danh sách xe và tài xế đi hàng</strong>
            <Table
              rowKey={(record) => record.id}
              // columns={columnsDrivers}
              dataSource={null}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <strong>Hoàn thành</strong>
          </Col>
          <Col span={24}>
            <Checkbox></Checkbox>
          </Col>
        </Row>
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
    </Spin>
  );
};
export default Accountant;
