import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteOrderAsync,
	downloadAccountingAsync,
	downloadLadingBillAsync,
	exportGridAsync,
	getAllDeliveryOrder,
	getDetailAccounting,
	getDetailOrderAsync,
	getSaleStaffAsync,
	postOrderAsync,
	selectOrder,
} from '../../Slice/orderSlice';
import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	Modal,
	Popconfirm,
	Radio,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Tag,
	Tooltip,
	DatePicker,
	InputNumber,
	Card,
} from 'antd';
import './index.css';
import { DeleteOutlined, EditOutlined, FundOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import {
	OPTION_STATUS,
	ORDER_ISDONE,
	PAYMENT_TYPE,
	FORMATS_DATE,
	PROVINCE,
	DATE_FORMAT,
	PAYMENT_TYPE_MULTI,
	DELIVERY_TYPE,
	ORDER_STATUS,
} from '../../Utils/constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const OrderArea = () => {
	const { RangePicker } = DatePicker;
	const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	const { isloading } = order;

	const detailAccounting = order?.listAccounting?.result;

	const clearForm = () => {
		formSearch.resetFields();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setDataTableProduct([]);
	};
	const onFinishSearch = async (values) => {
		if (values.dateSearch) {
			const codeDateFrom = values.dateSearch[0]
				.format(FORMATS_DATE.YYYY_MM_DD)
				.toString();
			const codeDateTo = values.dateSearch[1]
				.format(FORMATS_DATE.YYYY_MM_DD)
				.toString();
			const { dateSearch, ...otherValues } = values;
			await dispatch(
				getAllDeliveryOrder({
					...otherValues,
					CodeDateTo: codeDateTo,
					codeDateFrom: codeDateFrom,
					PageIndex: 1,
					PageSize: 10,
				}),
			);
		} else {
			await dispatch(
				getAllDeliveryOrder({ ...values, PageIndex: 1, PageSize: 10 }),
			);
		}
	};
	const [pages, setPages] = useState({
		PageIndex: 1,
		PageSize: 10,
	});
	const [isModalOpenCode, setIsModalOpenCode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
	const handleCancelExcel = () => {
		setIsModalOpenExcel(false);
	};
	const [valueRadio, setValueRadio] = useState('short');
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
	const [titleForm, setTitleForm] = useState('create');
	const [dataTableProduct, setDataTableProduct] = useState([]);
	const [isShowMultiPaymentType, setIsShowMultiPaymentType] = useState(false);
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
			render: (text, record) => dayjs(text).format('DD/MM/YYYY'),
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
			title: 'SDT người gửi',
			dataIndex: 'shipperPhone',
			key: 'shipperPhone',
			hidden: true,
		},
		{
			title: 'Điểm giao hàng',
			dataIndex: 'toAddress',
			key: 'toAddress',
		},
		{
			title: 'SDT người nhận',
			dataIndex: 'consigneePhone',
			key: 'consigneePhone',
			hidden: true,
		},
		{
			title: 'Giá cước',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
			hidden: true,
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
						onClick={() => editDeliveryOrder(record)}
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
	const navigate = useNavigate();
	const comlumnsfilter = columns.filter((item) => !item.hidden);
	const [filterColumn, setFilterColumn] = useState(comlumnsfilter);
	const [formSearch] = Form.useForm();
	const [formAdd] = Form.useForm();
	const [formProduct] = Form.useForm();
	useEffect(() => {
		dispatch(getSaleStaffAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		dispatch(getAllDeliveryOrder(pages));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);

	useEffect(() => {
		setTimeout(() => {
			order?.detailDeliveryOrder.result?.deliveryOrderDetails &&
				setDataTableProduct(
					order?.detailDeliveryOrder.result?.deliveryOrderDetails,
				);
		}, 1000);
	}, [order?.detailDeliveryOrder]);

	const handleCheckbox = (e) => {
		setShowAdvancedSearch(e.target.checked);
	};
	const onChangeRadio = (e) => {
		setValueRadio(e.target.value);
		e.target.value === 'all'
			? setFilterColumn(columns)
			: setFilterColumn(columns.filter((item) => !item.hidden));
	};
	const handleCancelCode = () => {
		setIsModalOpenCode(false);
	};
	const getDetailCode = async (id) => {
		await dispatch(getDetailAccounting(id));
		setIsModalOpenCode(true);
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
		setIsModalOpenCode(false);
		await dispatch(downloadAccountingAsync(id));
	};
	const downloadLadingBill = async (id) => {
		setIsModalOpenCode(false);
		await dispatch(downloadLadingBillAsync(id));
	};
	const createOrder = async () => {
		setTitleForm('create');
		await setIsModalOpen(true);
		formAdd.resetFields();
		setDataTableProduct([]);
	};
	const exportExcel = () => {
		setIsModalOpenExcel(true);
	};
	const moveToExcel = async () => {
		await dispatch(exportGridAsync(pages));
		setIsModalOpenExcel(false);
		navigate('/export-report');
	};
	const editProduct = (record) => {
		formProduct.setFieldsValue({ ...record });
	};
	const deleteProduct = async (record) => {
		const newListDataProduct = dataTableProduct.filter(
			(item) => item.id !== record.id,
		);
		await setDataTableProduct(newListDataProduct);
	};
	const onChangeTaleProduct = (values) => {
		if (values.id) {
			const listProductAfterEdit = dataTableProduct.map((item) =>
				item.id === values.id ? { ...item, ...values } : item,
			);

			setDataTableProduct(listProductAfterEdit);
			alert('Sửa thành công');
			console.log(listProductAfterEdit);
			formProduct.resetFields();
		} else {
			const newProduct = { ...values, id: uuidv4() };
			// console.log(newProduct);
			setDataTableProduct([...dataTableProduct, newProduct]);
			formProduct.resetFields();
		}
	};

	const handleChangeSelectPaymentType = (value) => {
		value === 'Other'
			? setIsShowMultiPaymentType(true)
			: setIsShowMultiPaymentType(false);
	};

	const onFinishCreateEdit = async (values) => {
		if (dataTableProduct.length === 0) {
			toast.error('Thất bại ! Vui lòng thêm ít nhất 1 sản phẩm!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'light',
			});
		} else {
			const data = {
				...values,
				code: values.isGenCode,
				orderDate: values.orderDate.format(DATE_FORMAT),
				deliveryOrderDetails: dataTableProduct,
			};
			await dispatch(postOrderAsync(data));
			dispatch(getAllDeliveryOrder(pages));
			if (values.isGenCode === true) {
				dispatch(downloadLadingBillAsync(values.id));
			}
			setIsModalOpen(false);
			// dispatch(getAllDeliveryOrder(pages));
			if (values.id) {
				toast.success('Sửa thành công!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
			} else {
				toast.success('Thêm thành công!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
			}
		}
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
	const columnTableProduct = [
		{
			title: 'Tên hàng',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'DVT',
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
		{
			title: 'Thao tác',
			dataIndex: 'nvkd',
			key: 'nvkd',
			width: 150,
			render: (_, record) => (
				<Space size="middle">
					<EditOutlined
						type="text"
						onClick={() => editProduct(record)}
						className="editIcon"
					/>
					<Popconfirm
						title="Bạn có đồng ý xóa?"
						onConfirm={() => deleteProduct(record)}
						okText="OK"
						cancelText="Cancel"
					>
						<DeleteOutlined className="deleteIcon" />
					</Popconfirm>
				</Space>
			),
		},
	];
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

	const editDeliveryOrder = async (record) => {
		setIsModalOpen(true);
		setTitleForm('Sửa đơn');
		formAdd.setFieldsValue({
			...record,
		});
		await dispatch(getDetailOrderAsync(record.id));
	};
	return (
		<Spin spinning={isloading} tip="Loading..." size="large">
			<Form
				form={formSearch}
				name="formSearch"
				layout="vertical"
				onFinish={onFinishSearch}
			>
				<Row>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item label="Mã code" name="code" className="form__item">
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Trạng thái đơn hàng"
							name="status"
							className="form__item"
						>
							<Select
								placeholder="Chọn trạng thái đơn hàng"
								options={OPTION_STATUS}
							></Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Hình thức thanh toán"
							name="paymentType"
							className="form__item"
						>
							<Select
								placeholder="Chọn hình thức thanh toán"
								options={PAYMENT_TYPE}
							></Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Đơn hàng hoàn tất"
							name="isDone"
							className="form__item"
						>
							<Select
								placeholder="Chọn đơn hàng đã hoàn tất hay chưa"
								options={ORDER_ISDONE}
							></Select>
						</Form.Item>
					</Col>
				</Row>
				{showAdvancedSearch && (
					<Row>
						<Col xs={24} sm={12} md={6} className="pe-3">
							<Form.Item
								label="Nhân viên kinh doanh"
								name="saleStaff"
								className="form__item"
							>
								<Select placeholder="Chọn nhân viên kinh doanh">
									{order.saleStaff.map((item, index) => (
										<Select.Option key={index} value={item.userName}>
											{item.fullName}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Từ ngày - Đến ngày"
								name="dateSearch"
								className="form__item"
								initialValue={[dayjs('2022-01-01'), dayjs()]}
							>
								<RangePicker
									style={{ width: '100%' }}
									format={FORMATS_DATE.DD_MM_YYYY}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Địa điểm nhận hàng"
								name="fromAddress"
								className="form__item"
							>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Địa điểm Giao Hàng"
								name="toAddress"
								className="form__item"
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
				)}
				{showAdvancedSearch && (
					<Row>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Tên khách hàng"
								name="shipper"
								className="form__item"
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
				)}
				<Row className="pb-3">
					<Col xs={24} sm={18} md={18}>
						<Space>
							<Button
								onClick={clearForm}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Clear
							</Button>
							<Button
								htmlType="submit"
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Tìm kiếm
							</Button>
							<Button
								onClick={exportExcel}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Export Excel
							</Button>
							<Button
								onClick={createOrder}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Tạo mới đơn
							</Button>
							<Checkbox onChange={handleCheckbox}>Tìm kiếm nâng cao</Checkbox>
						</Space>
					</Col>
					<Col md={6} className="d-flex align-items-center">
						<div className="text-right">
							<Radio.Group
								onChange={onChangeRadio}
								value={valueRadio}
								defaultValue="short"
							>
								<Radio value="short">Rút gọn</Radio>
								<Radio value="all">Toàn bộ cột</Radio>
							</Radio.Group>
						</div>
					</Col>
				</Row>
			</Form>
			<div>
				<Modal
					getContainer={false}
					title="BIÊN NHẬN VẬN CHUYỂN"
					open={isModalOpenCode}
					onCancel={handleCancelCode}
					destroyOnClose={false}
					width={'80%'}
					// loading={detailAccounting?.isLoading}
					footer={[
						<Button key="cancel" onClick={handleCancelCode}>
							Đóng
						</Button>,
						<Button
							key="downloadAccountant"
							onClick={() => downloadAccountant(detailAccounting.id)}
						>
							Tải xuống kế toán
						</Button>,
						<Button
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
										detailAccounting?.ladingInfos &&
										detailAccounting?.receivingFees
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
										detailAccounting?.ladingInfos &&
										detailAccounting?.freightFees
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
					</Spin>
				</Modal>
				<Row>
					<Col md={24}>
						<div className="table_container">
							<Table
								columns={filterColumn}
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
								loading={isloading}
								rowKey={(record) => record.id}
								scroll={{ x: 'max-content' }}
							/>
						</div>
					</Col>
				</Row>
			</div>
			<Modal
				getContainer={false}
				title={titleForm === 'create' ? 'Tạo đơn mới' : 'Sửa đơn'}
				open={isModalOpen}
				onCancel={handleCancel}
				destroyOnClose={false}
				maskClosable={false}
				width={'50%'}
				footer={
					<Space>
						<Button htmlType="submit" form="formAdd">
							Gửi
						</Button>
						<Button onClick={handleCancel}>Close</Button>
					</Space>
				}
			>
				<Spin tip="Loading..." spinning={isloading} size="large">
					<Form
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						onFinish={onFinishCreateEdit}
						autoComplete="off"
						layout="vertical"
						form={formAdd}
						name="formAdd"
					>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Tạo mã vận đơn"
									name="isGenCode"
									rules={[{ required: true, message: 'Vui lòng lựa chọn!' }]}
								>
									<Radio.Group>
										<Radio value={true}> Tạo </Radio>
										<Radio value={false}> Không tạo </Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Nhân viên kinh doanh"
									name="saleStaff"
									rules={[{ required: true, message: 'Vui lòng nhập!' }]}
								>
									<Select placeholder="Chọn Nhân viên kinh doanh">
										{order.saleStaff.map((item, index) => (
											<Select.Option key={index} value={item.userName}>
												{item.fullName}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item label="Số mã" name="id">
									<Input disabled style={{ color: '#ffbd2f' }} />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								{formAdd.setFieldsValue({ orderDate: dayjs(new Date()) })}
								<Form.Item
									label="Ngày tạo"
									name="orderDate"
									rules={[
										{ required: true, message: 'Vui lòng nhập ngày tạo!' },
									]}
								>
									<DatePicker style={{ width: '100%' }} format={DATE_FORMAT} />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Người gửi"
									name="shipper"
									rules={[
										{ required: true, message: 'Vui lòng nhập Người gửi!' },
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Người nhận"
									name="consignee"
									rules={[{ required: true, message: 'Vui lòng nhập!' }]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Địa chỉ gửi"
									name="fromAddress"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập Địa chỉ gửi!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={6}>
								<Form.Item
									label="Địa chỉ nhận"
									name="toAddress"
									rules={[{ required: true, message: 'Vui lòng nhập!' }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={6}>
								<Form.Item
									label="Tỉnh"
									name="provinceCode"
									rules={[{ required: true, message: 'Vui lòng nhập Tỉnh!' }]}
								>
									<Select
										placeholder="Chọn Tỉnh"
										options={PROVINCE.map((item, index) => ({
											value: item.code,
											label: item.name,
											key: index,
										}))}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Số điện thoại người gửi"
									name="shipperPhone"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập Số điện thoại người gửi!',
										},
									]}
								>
									<Input placeholder="Nhập số điện thoại người gửi" />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Số điện thoại người nhận"
									name="consigneePhone"
									rules={[{ required: true, message: 'Vui lòng nhập!' }]}
								>
									<Input placeholder="Nhập số điện thoại người nhận" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Hình thức nhận hàng"
									name="receiveType"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập Hình thức nhận hàng!',
										},
									]}
								>
									<Select
										placeholder="Chọn Trạng thái đơn hàng"
										options={ORDER_STATUS}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Hình thức giao hàng"
									name="sendType"
									rules={[{ required: true, message: 'Vui lòng nhập!' }]}
								>
									<Select
										placeholder="Chọn Hình thức giao hàng"
										options={DELIVERY_TYPE}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Hình thức thanh toán"
									name="paymentType"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập Hình thức thanh toán!',
										},
									]}
								>
									<Select
										onChange={handleChangeSelectPaymentType}
										placeholder="Chọn Hình thức thanh toán"
										options={PAYMENT_TYPE}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Cước vận chuyển"
									name="totalAmount"
									rules={[{ required: true, message: 'Vui lòng nhập!' }]}
								>
									<InputNumber />
								</Form.Item>
							</Col>
						</Row>
						{isShowMultiPaymentType && (
							<Row gutter={24}>
								<Col xs={24} sm={24} md={6}>
									<Form.Item
										label="Tên HTTT1"
										name="paymentType1"
										className="multi-payment-type-left"
									>
										<Select
											placeholder="Chọn Hình thức thanh toán"
											options={PAYMENT_TYPE_MULTI}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6}>
									<Form.Item
										label="Số tiền"
										name="paymentTypeValue1"
										className="multi-payment-type-right"
									>
										<InputNumber />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6}>
									<Form.Item
										label="Tên HTTT2"
										name="paymentType2"
										className="multi-payment-type-left"
									>
										<Select
											placeholder="Chọn Hình thức thanh toán"
											options={PAYMENT_TYPE_MULTI}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6}>
									<Form.Item
										label="Số tiền"
										name="paymentTypeValue2"
										className="multi-payment-type-right"
									>
										<InputNumber />
									</Form.Item>
								</Col>
							</Row>
						)}
						<Row gutter={24}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item label="Phát sinh khác" name="additionalAmount">
									<Input />
								</Form.Item>
							</Col>
						</Row>
					</Form>
					<Form
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						autoComplete="off"
						layout="vertical"
						onFinish={onChangeTaleProduct}
						form={formProduct}
						name="formProduct"
					>
						<Card title="Tao/ Sua don hang" style={{ backgroundColor: '#ccc' }}>
							<Form.Item name="id" hidden={true}>
								<Input />
							</Form.Item>
							<div style={{ padding: 20 }}>
								<Row gutter={24}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Tên hàng"
											name="name"
											rules={[
												{ required: true, message: 'Vui lòng nhập tên hàng!' },
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Số lượng"
											name="quantity"
											rules={[
												{ required: true, message: 'Vui lòng nhập Số lượng!' },
											]}
										>
											<InputNumber min={1} max={1000} />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={24}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Khối lượng"
											name="mass"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập Khối lượng!',
												},
											]}
										>
											<InputNumber min={1} max={1000} />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Trọng lượng"
											name="weight"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập Trọng lượng!',
												},
											]}
										>
											<InputNumber min={1} max={100} />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={24}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Đơn vị tính"
											name="unit"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập Đơn vị tính!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Ghi chú"
											name="note"
											rules={[
												{ required: true, message: 'Vui lòng nhập Ghi chú!' },
											]}
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button
									style={{
										backgroundColor: '#ffbd2f',
										color: '#fff',
									}}
									htmlType="submit"
									form="formProduct"
									name="formProduct"
								>
									Thêm
								</Button>
							</div>
						</Card>
					</Form>
					<div className="pt-3">
						{dataTableProduct.length > 0 && (
							<Table
								dataSource={dataTableProduct}
								columns={columnTableProduct}
							/>
						)}
					</div>
				</Spin>
			</Modal>
			<Spin tip="Loading..." loading={isloading}>
				<Modal
					title="Thông báo"
					open={isModalOpenExcel}
					footer={[
						<Button key="close" onClick={handleCancelExcel}>
							Cancel
						</Button>,
						<Button key="movetoexcel" onClick={moveToExcel}>
							OK
						</Button>,
					]}
				>
					<hr />
					<p>
						Bạn có muốn chuyển hướng qua màn hình Export Report để tải file
						không?
					</p>
					<hr />
				</Modal>
			</Spin>
		</Spin>
	);
};
export default OrderArea;
