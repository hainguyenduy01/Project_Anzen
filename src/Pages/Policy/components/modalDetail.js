import { Button, Col, Modal, Row, Space, Table } from "antd";

const ModalDetail = (props) => {
  const {
    detailCode,
    isModalOpenCode,
    handleCancelCode,
    downloadCodeBill,
    isLoading,
    columnsCodeBill,
    pages,
    setPages,
  } = props;
  const footerTableCodeBill = () => {
    return (
        <div>
            <Row className="my-3">
                <Col xs={24} md={18} className="text-end">
                    <strong>Tổng cộng</strong>
                </Col>
                <Col xs={24} md={6} className="text-center">
                    <span>{detailCode?.result?.totalCOD}</span>
                </Col>
            </Row>
            <Row className="my-3">
                <Col xs={24} md={18} className="text-end">
                    <strong>Đã tạm ứng</strong>
                </Col>
                <Col xs={24} md={6} className="text-center">
                    <span>{detailCode?.result?.advanceAmount}</span>
                </Col>
            </Row>
        </div>
    );
};
  
  return (
    <Modal
      title={`BẢNG KÊ GIAO NHẬN VẬN CHUYỂN --- ${detailCode?.result?.code}`}
      width={"80%"}
      open={isModalOpenCode}
      onCancel={handleCancelCode}
      footer={
        <Space>
          <Button className="btn-normal" onClick={handleCancelCode}>
            Đóng
          </Button>
          <Button
            onClick={() => downloadCodeBill(detailCode?.result?.id)}
            className="btn-yellow"
          >
            Tải xuống
          </Button>
        </Space>
      }
    >
      <Row gutter={24} className="mb-4">
        <Col xs={24} md={8}>
          <strong>Tên công ty: </strong>

          <span>{detailCode?.result?.partner}</span>
        </Col>
        <Col xs={24} md={8}>
          <strong>Số điện thoại: </strong>

          <span>{detailCode?.result?.partnerPhone}</span>
        </Col>
        <Col xs={24} md={8}>
          <strong>Mã số thuế: </strong>
          <span>{detailCode?.result?.partnerTax}</span>
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col xs={24} md={8}>
          <strong>Số hợp đồng:</strong>
          <span>{detailCode?.result?.referenceContract}</span>
        </Col>
        <Col xs={24} md={8}>
          <strong>Người lái xe: </strong>
          <span>{detailCode?.result?.driver}</span>
        </Col>
        <Col xs={24} md={8}>
          <strong>Biển số xe: </strong>
          <span>{detailCode?.result?.licensePlate}</span>
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col xs={24} md={8}>
          <strong>CMND:</strong>
          <span>{detailCode?.result?.driverIdentity}</span>
        </Col>
        <Col xs={24} md={16}>
          <strong>Địa chỉ: </strong>
          <span>{detailCode?.result?.driverAddress}</span>
        </Col>
      </Row>
      <Row gutter={24} className="mb-3">
        <Col xs={24} md={8}>
          <strong>GPLX: </strong>
          <span>{detailCode?.result?.drivingLicense}</span>
        </Col>
        <Col xs={24} md={8}>
          <strong>Điện thoại lái xe: </strong>
          <span>{detailCode?.result?.driverPhone}</span>
        </Col>
        <Col xs={24} md={8}>
          <strong>Tổng cước cho xe: </strong>
          <span>{detailCode?.result?.totalFreight}</span>
        </Col>
      </Row>
      <Table
        columns={columnsCodeBill}
        dataSource={detailCode?.result?.deliveryOrderBillOfLadings}
        footer={footerTableCodeBill}
        loading={isLoading}
        rowKey={(record) => record.id}
        pagination={{
          ...pages,
          size: "small",
          total: detailCode?.result?.deliveryOrderBillOfLadings,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
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
    </Modal>
  );
};
export default ModalDetail;
