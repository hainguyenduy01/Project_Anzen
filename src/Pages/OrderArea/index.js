import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteOrderAsync,
	downloadAccountingAsync,
	downloadLadingBillAsync,
	getAllDeliveryOrder,
	getDetailAccounting,
	selectOrder,
} from '../../Slice/orderSlice';
import {
	Button,
	Col,
	Modal,
	Popconfirm,
	Row,
	Space,
	Table,
	Tag,
	Tooltip,
} from 'antd';
import './index.css';
import moment from 'moment/moment';
import { DeleteOutlined, EditOutlined, FundOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const OrderArea = () => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	const detailAccounting = order?.listAccounting?.result;

	const [pages, setPages] = useState({
		PageIndex: 1,
		PageSize: 10,
	});
	const [isModalOpenCode, setIsModalOpenCode] = useState(false);
	const handleCancelCode = () => {
		setIsModalOpenCode(false);
	};
	const getDetailCode = async (id) => {
		await dispatch(getDetailAccounting(id));
		setIsModalOpenCode(true);
	};
	const showCode = (code, record) => {
		return code === null ? (
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
	const showIsDone = (text) => {
		return text === true ? (
			<Tooltip title="Đã hoàn tất">
				<Tag className="tag_status" color="#017003" />
			</Tooltip>
		) : (
			<Tooltip title="Chưa hoàn tất">
				<Tag className="tag_status" color="#E61134" />
			</Tooltip>
		);
	};
	const showStatus = (text) => {
		return text === 'New' ? (
			<Tooltip title="Đơn mới">
				<Tag className="tag_status" color="#071ccf" />
			</Tooltip>
		) : text === 'Gone' ? (
			<Tooltip title="Đơn hàng đã đi">
				<Tag className="tag_status" color="#017003" />
			</Tooltip>
		) : (
			<Tooltip title="Đơn hàng tồn kho">
				<Tag className="tag_status" color="#ff4d4f" />
			</Tooltip>
		);
	};
	const downloadAccountant = async (id) => {
		await dispatch(downloadAccountingAsync(id));
	};
	const downloadLadingBill = async (id) => {
		await dispatch(downloadLadingBillAsync(id));
	};
	const deleteDeliveryOrder = async (id) => {
		await dispatch(deleteOrderAsync(id));
		dispatch(getAllDeliveryOrder(pages));
		toast.success('Xoá thành công!', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: 'light',
		});
	};
	const columnsDrivers = [
		{
			title: 'Mã bảng kê',
		},
		{
			title: 'Tên lái xe',
		},
		{
			title: 'Bằng lái xe',
		},
		{
			title: 'Số điện thoại tài xế',
		},
		{
			title: 'Biển số xe	',
		},
		{
			title: 'Đối tác',
		},
		{
			title: 'SĐT Đối tác',
		},
	];
	const columnsTransborder = [
		{
			title: 'Tên công ty',
			dataIndex: 'ladingInfos',
			key: 'ladingInfos',
		},
		{
			title: 'Phí',
			dataIndex: 'transborderFees',
			key: 'transborderFees',
		},
	];
	const columnsFreight = [
		{
			title: 'Tên công ty',
			dataIndex: 'ladingInfos',
			key: 'ladingInfos',
		},
		{
			title: 'Phí',
			dataIndex: 'freightFees',
			key: 'freightFees',
		},
	];
	const columnsReceiving = [
		{
			title: 'Tên công ty',
			dataIndex: 'ladingInfos',
			key: 'ladingInfos',
		},
		{
			title: 'Phí',
			dataIndex: 'receivingFees',
			key: 'receivingFees',
		},
	];
	const columnsOther = [
		{
			title: 'Tên công ty',
			dataIndex: 'ladingInfos',
			key: 'ladingInfos',
		},
		{
			title: 'Phí',
			dataIndex: 'otherFees',
			key: 'otherFees',
		},
	];
	const columnsQuantityAccounting = [
		{
			title: 'Tên Hàng',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'ĐVT',
			dataIndex: 'unit',
			key: 'unit',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Khối lượng',
			dataIndex: 'mass',
			key: 'mass',
		},
		{
			title: 'Trọng lượng',
			dataIndex: 'weight',
			key: 'weight',
		},
		{
			title: 'Ghi chú',
			dataIndex: 'note',
			key: 'note',
		},
	];
	const columns = [
		{
			title: 'STT',
			dataIndex: 'id',
			render: (_, record, index) => <p>{index + 1}</p>,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'orderDate',
			key: 'orderDate',
			render: (text, record) => moment(text).format('DD/MM/YYYY'),
		},
		{
			title: 'Số mã',
			dataIndex: 'code',
			key: 'code',
			render: (code, record) => showCode(code, record),
		},
		{
			title: 'NVKD',
			dataIndex: 'createdBy',
			key: 'createdBy',
		},
		{
			title: 'Tên hàng',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Điểm nhận hàng',
			dataIndex: 'fromAddress',
			key: 'fromAddress',
		},
		{
			title: 'Điểm giao hàng',
			dataIndex: 'toAddress',
			key: 'toAddress',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (text, record) => showStatus(text),
			align: 'center',
		},
		{
			title: 'HTTT',
			dataIndex: 'paymentType',
			key: 'paymentType',
		},
		{
			title: 'Hoàn tất',
			dataIndex: 'isDone',
			key: 'isDone',
			render: (text, record) => showIsDone(text),
			align: 'center',
		},
		{
			title: 'Thao tác',
			render: (text, record) => (
				<Space size={20}>
					<EditOutlined
						style={{ fontSize: '24px', cursor: 'pointer', color: 'green' }}
					/>
					<Popconfirm
						title="Bạn có đồng ý xóa?"
						onConfirm={() => deleteDeliveryOrder(record.id)}
						okText="OK"
						cancelText="Cancel"
					>
						<DeleteOutlined
							style={{ fontSize: '24px', cursor: 'pointer', color: 'red' }}
						/>
					</Popconfirm>
					<FundOutlined
						style={{
							fontSize: '24px',
							cursor: 'pointer',
							color: 'rgb(255, 189, 47)',
						}}
					/>
				</Space>
			),
		},
	];
	useEffect(() => {
		dispatch(getAllDeliveryOrder(pages));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);
	return (
		<div>
			<Modal
				title="BIÊN NHẬN VẬN CHUYỂN"
				open={isModalOpenCode}
				onCancel={handleCancelCode}
				width={'80%'}
				// loading={detailAccounting?.isLoading}
				footer={[
					<Button key="cancel" onClick={handleCancelCode}>
						Đóng
					</Button>,
					<Button
						key="downloadAccountant"
						onClick={() => downloadAccountant(detailAccounting?.id)}
					>
						Tải xuống kế toán
					</Button>,
					<Button
						key=""
						onClick={() => downloadLadingBill(detailAccounting?.id)}
					>
						Tải xuống Vận đơn
					</Button>,
				]}
			>
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
				></Table>
				<br />
				<Row>
					<Col span={12}>
						<Space>
							<strong>Cước vận chuyển:</strong>
							<span>{detailAccounting?.totalAmount}</span>
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
							style={{ borderBottom: '1px solid black', textAlign: 'center' }}
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
						<Table columns={columnsDrivers} dataSource={null} />
					</Col>
				</Row>
			</Modal>
			<Table
				columns={columns}
				dataSource={order.listDeliveryOrder?.items}
				pagination={{
					...pages,
					total: order.listDeliveryOrder.total,
					showSizeChanger: true,
					pageSizeOptions: ['10', '20', '30'],
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
				loading={order.isloading}
				rowKey={(record) => record.id}
			/>
		</div>
	);
};
export default OrderArea;
