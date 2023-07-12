import { Button, Col, Modal, Row, Space, Spin, Table } from 'antd';

const ModalCode = (props) => {
	const {
		isModalOpenCode,
		handleCancelCode,
		downloadAccountant,
		detailAccounting,
		downloadLadingBill,
		isloading,
		columnsQuantityAccounting,
		totalMoney,
		columnsFreight,
		columnsTransborder,
		columnsReceiving,
		columnsOther,
		columnsDrivers,
	} = props;
	return (
		<Modal
			getContainer={false}
			title="BIÊN NHẬN VẬN CHUYỂN"
			open={isModalOpenCode}
			onCancel={handleCancelCode}
			destroyOnClose={false}
			width={'80%'}
			footer={[
				<Button key="cancel" onClick={handleCancelCode}>
					Đóng
				</Button>,
				<Button
					className="btn-yellow"
					key="downloadAccountant"
					onClick={() => downloadAccountant(detailAccounting.id)}
				>
					Tải xuống kế toán
				</Button>,
				<Button
					className="btn-yellow"
					key=""
					onClick={() => downloadLadingBill(detailAccounting.id)}
				>
					Tải xuống Vận đơn
				</Button>,
			]}
		>
			<Spin spinning={isloading} tip="Loading..." size="large">
				<hr />
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
					columns={columnsQuantityAccounting}
					dataSource={detailAccounting?.deliveryOrderDetails}
					pagination={false}
				/>
				<br />
				<Row>
					<Col span={12}>
						<Space>
							<strong>Cước vận chuyển:</strong>
							<span>{detailAccounting?.totalAmount.toLocaleString('en')}</span>
						</Space>
					</Col>
					<Col span={12}>
						<Space>
							<strong>Hình thức thanh toán:</strong>
							<span>{detailAccounting?.paymentType}</span>
						</Space>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Space>
							<strong>Hình thức nhận hàng:</strong>
							<span>{detailAccounting?.receiveType}</span>
						</Space>
					</Col>
					<Col span={12}>
						<Space>
							<strong>Hình thức giao hàng:</strong>
							<span>{detailAccounting?.sendType}</span>
						</Space>
					</Col>
				</Row>
				<br />
				<Row>
					<Col span={24}>
						<strong>Giá bán</strong>
					</Col>
				</Row>
				<br />
				<table style={{ border: '1px solid black', width: '100%' }}>
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
							<td>{detailAccounting?.totalAmount.toLocaleString('en')}</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: '10px' }}>Phát sinh khác</td>
							<td>{detailAccounting?.additionalAmount.toLocaleString('en')}</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: '10px' }}>Tổng giá bán</td>
							<td>{totalMoney.toLocaleString('en')}</td>
						</tr>
					</tbody>
				</table>
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
							columns={columnsTransborder}
							dataSource={
								detailAccounting?.ladingInfos &&
								detailAccounting?.transborderFees
							}
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
								detailAccounting?.ladingInfos && detailAccounting?.receivingFees
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
							columns={columnsFreight}
							dataSource={
								detailAccounting?.ladingInfos && detailAccounting?.freightFees
							}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col span={24}>
						<strong>Phí khác</strong>
						<Table
							rowKey={(record) => record.id}
							columns={columnsOther}
							dataSource={
								detailAccounting?.ladingInfos && detailAccounting?.otherFees
							}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col span={24}>
						<strong>Thông tin tài xế</strong>
						<Table
							rowKey={(record) => record.id}
							columns={columnsDrivers}
							dataSource={null}
						/>
					</Col>
				</Row>
			</Spin>
		</Modal>
	);
};
export default ModalCode;
