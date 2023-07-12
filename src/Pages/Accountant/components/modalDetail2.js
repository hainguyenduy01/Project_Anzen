import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { Option } from "antd/es/mentions";

const ModalDetail2 = (props) => {
  const {
    detailAccounting,
    isModalOpenCode,
    handleCancelCode,
    isloading,
    columnsQuantityAccounting,
    columnsTransborder,
    columnsReceiving,
    columnsFreight,
    columnsOther,
    columnsDrivers,
  } = props;
  let totalMoney =
    detailAccounting?.result?.totalAmount +
    detailAccounting?.result?.additionalAmount;
  const [formAdd] = Form.useForm();
  const onFinishAdd = () => {};
  const onFinish = () => {};
  const onChange = (value) => {
    console.log("changed", value);
    totalMoney += 1;
    console.log("totalMoney", totalMoney);
    return totalMoney;
  };
  return (
    <>
      <Modal
        getContainer={false}
        title="BIÊN NHẬN VẬN CHUYỂN"
        open={isModalOpenCode}
        onCancel={handleCancelCode}
        destroyOnClose={false}
        width={"80%"}
        loading={detailAccounting?.isLoading}
        footer={[
          <Button key="cancel" onClick={handleCancelCode}>
            Đóng
          </Button>,
          <Button className="btn-yellow" onClick={onFinish}>
            Gửi
          </Button>,
        ]}
      >
        <Spin spinning={isloading} tip="Loading..." size="large">
          <Row>
            <Col span={12}>
              <Space>
                <strong>MVĐ:</strong>
                <span>{detailAccounting?.result?.code}</span>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <Space>
                  <strong>Nhân viên kinh doanh:</strong>
                  <span>{detailAccounting?.result?.saleStaff}</span>
                </Space>
                <Space>
                  <strong>SĐT:</strong>
                  <span>{detailAccounting?.result?.shipperPhone}</span>
                </Space>
              </Space>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Space>
                <strong>Nguời gửi:</strong>
                <span>{detailAccounting?.result?.shipper}</span>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <strong>Người nhận:</strong>
                <span>{detailAccounting?.result?.consignee}</span>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Space>
                <strong>Địa chỉ gửi:</strong>
                <span>{detailAccounting?.result?.fromAddress}</span>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <strong>Địa chỉ nhận:</strong>
                <span>{detailAccounting?.result?.toAddress}</span>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Space>
                <strong>Số điện thoại gửi:</strong>
                <span>{detailAccounting?.result?.shipperPhone}</span>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <strong>Số điện thoại nhận:</strong>
                <span>{detailAccounting?.result?.consigneePhone}</span>
              </Space>
            </Col>
          </Row>
          <br />

          <Table
            rowKey={(record) => record.id}
            columns={columnsQuantityAccounting}
            dataSource={detailAccounting?.result?.deliveryOrderDetails}
            pagination={false}
          />
          <br />
          <Row>
            <Col span={12}>
              <Space>
                <strong>Cước vận chuyển:</strong>
                <span>
                  {detailAccounting?.result?.totalAmount?.toLocaleString("en")}
                </span>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <strong>Hình thức thanh toán:</strong>
                <span>{detailAccounting?.result?.paymentType}</span>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Space>
                <strong>Hình thức nhận hàng:</strong>
                <span>{detailAccounting?.result?.receiveType}</span>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <strong>Hình thức giao hàng:</strong>
                <span>{detailAccounting?.result?.sendType}</span>
              </Space>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong style={{ fontSize: 24, color: "red" }}>GIÁ BÁN</strong>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} sm={12} md={8} className="pe-3 mb-3">
              <Form.Item
                label="Bán ra"
                name="totalAmount"
                className="form__item"
              >
                <InputNumber
                  values="totalAmount"
                  disabled
                  defaultValue={detailAccounting?.result?.totalAmount}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} className="pe-3 mb-3">
              <Form.Item
                label="Phát sinh khác"
                name="additionalAmount"
                className="form__item"
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  defaultValue={detailAccounting?.result?.additionalAmount}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} className="pe-3 mb-3">
              <Form.Item
                label="Tổng cộng"
                values="totalMoney"
                className="form__item"
              >
                <InputNumber
                  disabled
                  defaultValue={totalMoney}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong style={{ fontSize: 24, color: "red" }}>THÊM PHÍ</strong>
            </Col>
          </Row>
          <br />
          <Form
            form={formAdd}
            name="formAdd"
            layout="vertical"
            onFinish={onFinishAdd}
          >
            <Row>
              <Col xs={24} sm={12} md={8} className="pe-3 mb-3">
                <Form.Item
                  label="Tên công ty"
                  name="ladingInfos"
                  className="form__item"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} className="pe-3 mb-3">
                <Form.Item label="Phí" name="" className="form__item">
                  <InputNumber
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} className="pe-3 mb-3">
                <Form.Item label="Loại phí" name="" className="form__item">
                  <Select
                    placeholder="Chọn loại phí"
                    // onChange={onChange}
                    // onSearch={onSearch}
                  >
                    <Option value="receivingFees">Phí nhận hàng</Option>
                    <Option value="freightFees">Phí bo giao hàng</Option>
                    <Option value="otherFees">Phí khác</Option>
                  </Select>
                </Form.Item>
                <Button
                  htmlType="submit"
                  style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
                >
                  Thêm
                </Button>
              </Col>
            </Row>
          </Form>
          <br />
          <Row>
            <Col span={24}>
              <strong style={{ fontSize: 24, color: "red" }}>GIÁ MUA</strong>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong>Trung chuyển</strong>
              <Table
                rowKey={(record) => record.id}
                columns={columnsFreight}
                dataSource={detailAccounting?.result?.freightFees}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong>Phí nhận hàng</strong>
              <Table
                rowKey={(record) => record.id}
                columns={columnsReceiving}
                dataSource={
                  detailAccounting?.result?.ladingInfos &&
                  detailAccounting?.result?.receivingFees
                }
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong>Phí bo giao hàng</strong>
              <Table
                rowKey={(record) => record.id}
                columns={columnsTransborder}
                dataSource={
                  detailAccounting?.result?.ladingInfos &&
                  detailAccounting?.result?.transborderFees
                }
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong>Khác</strong>
              <Table
                rowKey={(record) => record.id}
                columns={columnsOther}
                dataSource={
                  detailAccounting?.result?.ladingInfos &&
                  detailAccounting?.result?.otherFees
                }
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <strong>Danh sách xe và tài xế đi hàng</strong>
              <Table
                rowKey={(record) => record.id}
                columns={columnsDrivers}
                dataSource={detailAccounting?.result?.ladingInfos}
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
        </Spin>
      </Modal>
    </>
  );
};
export default ModalDetail2;
