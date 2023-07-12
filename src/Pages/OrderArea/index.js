import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteOrderAsync,
	downloadAccountingAsync,
	downloadImageAsync,
	downloadLadingBillAsync,
	exportGridAsync,
	filterPhoneCusomerAsync,
	getAllDeliveryOrder,
	getDetailAccounting,
	getDetailCustomerAsync,
	getDetailOrderAsync,
	getDetailShipperAsync,
	getInfoImageAsync,
	getSaleStaffAsync,
	postOrderAsync,
	selectOrder,
	uploadImageAsync,
} from '../../Slice/orderSlice';
import {
	Button,
	Col,
	Form,
	Popconfirm,
	Row,
	Space,
	Spin,
	Table,
	Tag,
	Tooltip,
} from 'antd';
import './index.css';
import { DeleteOutlined, EditOutlined, FundOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { FORMATS_DATE, DATE_FORMAT } from '../../Utils/constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import ModalImage from './components/ModalImage';
import ModalExcel from './components/ModalExcel';
import ModalUpdateCreate from './components/ModalUpdateCreate';
import ModalCode from './components/ModalCode';
import FormSearch from './components/FormSearch';

const notification = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
	progress: undefined,
	theme: 'light',
};
const OrderArea = () => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	const { isloading } = order;
	const detailOrder = order?.detailDeliveryOrder?.result;
	const detailAccounting = order?.listAccounting?.result;
	const [images, setImages] = useState([]);
	const imagesLoaded = order?.listInfoImage?.result;
	const handleFileChange = (e) => {
		const fileList = e.target.files;
		const imageList = Array.from(fileList);
		setImages((prevImages) => [...prevImages, ...imageList]);
	};
	const handleDeleteImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};
	const downloadImage = async (id) => {
		setIsModalOpenImage(false);
		await dispatch(downloadImageAsync({ id, type: 'Product' }));
	};
	const uploadImageToWeb = async (data) => {
		setIsModalOpenImage(false);
		const formData = new FormData();
		formData.append('id', data.id);
		formData.append('type', 'Product');
		images.forEach((images) => {
			formData.append('files', images);
		});
		await dispatch(uploadImageAsync(formData));

		await dispatch(getInfoImageAsync({ id: data.id, type: 'Product' }));
		if (images.length === 0) {
			toast.error('Upload ảnh thất bại!', notification);
		} else {
			toast.success('Upload ảnh thành công!', notification);
		}
	};
	const clearForm = () => {
		formSearch.resetFields();
		dispatch(getAllDeliveryOrder(pages));
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setDataTableProduct([]);
	};
	const showPaymentType = (text) => {
		switch (text) {
			case 'TTS':
				return 'TTS';
			case 'TDN':
				return 'TĐN';
			case 'DTT':
				return 'ĐTT';
			default:
				return 'Khác';
		}
	};
	const totalMoney =
		detailAccounting?.totalAmount + detailAccounting?.additionalAmount;
	const shipperDetail = order.shipper?.result;
	const customerDetail = order.shiperDetail?.result;
	useEffect(() => {
		if (shipperDetail) {
			formAdd.setFieldsValue({
				fromAddress: shipperDetail?.address,
				shipper: shipperDetail?.name,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipperDetail]);
	useEffect(() => {
		if (customerDetail) {
			formAdd.setFieldsValue({
				toAddress: customerDetail?.address,
				consignee: customerDetail?.name,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerDetail]);
	const onChangePhone = (value, option) => {
		dispatch(getDetailCustomerAsync(option.id));
	};
	const onChangePhone1 = (value, option) => {
		dispatch(getDetailShipperAsync(option.id));
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

	useEffect(() => {
		dispatch(getAllDeliveryOrder(pages));
		setFilterColumn(comlumnsfilter);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);
	const [isModalOpenCode, setIsModalOpenCode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
	const [isModalOpenImage, setIsModalOpenImage] = useState(false);
	const handleCancelImage = () => {
		setIsModalOpenImage(false);
	};
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
			key: 'id',
			render: (_, record, index) =>
				(pages.PageIndex - 1) * pages.PageSize + index + 1,
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
			render: (text, record) => showPaymentType(text),
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
						onClick={() => uploadImage(record)}
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
		document.title = 'Khu vực đơn hàng - ANZEN';
	}, []);
	useEffect(() => {
		dispatch(getSaleStaffAsync());
		dispatch(filterPhoneCusomerAsync(pages));
		document.title = 'Khu vực đơn hàng - ANZEN';
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		order?.detailDeliveryOrder.result?.deliveryOrderDetails &&
			setDataTableProduct(
				order?.detailDeliveryOrder.result?.deliveryOrderDetails,
			);
	}, [order?.detailDeliveryOrder]);

	const handleCheckbox = (e) => {
		setShowAdvancedSearch(e.target.checked);
	};
	const onChangeRadio = (e) => {
		setValueRadio(e.target.value);
		e.target.value === 'all'
			? setFilterColumn(columns)
			: setFilterColumn(comlumnsfilter);
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
				<Tag className="tag_status" color="rgb(10, 124, 255)" />
			</Tooltip>
		) : text === 'Gone' ? (
			<Tooltip title="Đơn hàng đã đi">
				<Tag className="tag_status" color="#017003" />
			</Tooltip>
		) : text === 'Transhipment' ? (
			<Tooltip title="Chuyển tải">
				<Tag className="tag_status" color="#ffbd2f" />
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
	const uploadImage = async (record) => {
		setImages([]);
		await dispatch(getDetailOrderAsync(record.id));
		await dispatch(getInfoImageAsync({ id: record.id, type: 'Product' }));
		setIsModalOpenImage(true);
	};
	const moveToExcel = async () => {
		setIsModalOpenExcel(false);
		await dispatch(exportGridAsync(pages));
		navigate('/export-report');
		toast.success('File cần tải mới nhất đã chuẩn bị xong!', notification);
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
			formProduct.resetFields();
		} else {
			const newProduct = { ...values, id: uuidv4() };
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
			toast.error('Thất bại ! Vui lòng thêm ít nhất 1 sản phẩm!', notification);
		} else {
			if (values.id) {
				const data = {
					...values,
					code: values.isGenCode,
					orderDate: values.orderDate.format(DATE_FORMAT),
					deliveryOrderDetails: dataTableProduct,
				};
				await dispatch(postOrderAsync(data));
				if (values.isGenCode === true) {
					dispatch(downloadLadingBillAsync(values.id));
				}
			} else {
				const data = {
					...values,
					id: uuidv4(),
					code: values.isGenCode,
					orderDate: values.orderDate.format(DATE_FORMAT),
					deliveryOrderDetails: dataTableProduct,
				};
				await dispatch(postOrderAsync(data));
				if (values.isGenCode === true) {
					dispatch(downloadLadingBillAsync(data.id));
				}
			}
			setIsModalOpen(false);
			dispatch(getAllDeliveryOrder(pages));
			// dispatch(getAllDeliveryOrder(pages));
			if (values.id) {
				toast.success('Sửa thành công!', notification);
			} else {
				toast.success('Thêm thành công!', notification);
			}
		}
	};
	const deleteDeliveryOrder = async (id) => {
		await dispatch(deleteOrderAsync(id));
		dispatch(getAllDeliveryOrder(pages));
		toast.success('Xoá thành công!', notification);
	};
	const optionPhone = order?.filterPhoneShipper?.result?.items;

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
			align: 'center',
			render: (_, record) => (
				<Space size="middle">
					<Button onClick={() => editProduct(record)}>Sửa</Button>
					<Popconfirm
						title="Bạn có đồng ý xóa?"
						onConfirm={() => deleteProduct(record)}
						okText="OK"
						cancelText="Cancel"
					>
						<Button danger>Xoá</Button>
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
			<FormSearch
				formSearch={formSearch}
				onFinishSearch={onFinishSearch}
				showAdvancedSearch={showAdvancedSearch}
				order={order}
				clearForm={clearForm}
				exportExcel={exportExcel}
				createOrder={createOrder}
				handleCheckbox={handleCheckbox}
				onChangeRadio={onChangeRadio}
				valueRadio={valueRadio}
			/>
			<div>
				<ModalCode
					isModalOpenCode={isModalOpenCode}
					handleCancelCode={handleCancelCode}
					downloadAccountant={downloadAccountant}
					detailAccounting={detailAccounting}
					downloadLadingBill={downloadLadingBill}
					isloading={isloading}
					columnsQuantityAccounting={columnsQuantityAccounting}
					totalMoney={totalMoney}
					columnsFreight={columnsFreight}
					columnsTransborder={columnsTransborder}
					columnsReceiving={columnsReceiving}
					columnsOther={columnsOther}
					columnsDrivers={columnsDrivers}
				/>
				<Row>
					<Col md={24}>
						<div className="table_container">
							<Table
								columns={filterColumn}
								dataSource={order.listDeliveryOrder?.items}
								pagination={{
									...pages,
									size: 'small',
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
			<ModalExcel
				isModalOpenExcel={isModalOpenExcel}
				handleCancelExcel={handleCancelExcel}
				moveToExcel={moveToExcel}
			/>
			<ModalUpdateCreate
				titleForm={titleForm}
				isModalOpen={isModalOpen}
				handleCancel={handleCancel}
				onFinishCreateEdit={onFinishCreateEdit}
				formAdd={formAdd}
				order={order}
				optionPhone={optionPhone}
				onChangePhone1={onChangePhone1}
				formProduct={formProduct}
				onChangePhone={onChangePhone}
				handleChangeSelectPaymentType={handleChangeSelectPaymentType}
				isShowMultiPaymentType={isShowMultiPaymentType}
				onChangeTaleProduct={onChangeTaleProduct}
				dataTableProduct={dataTableProduct}
				columnTableProduct={columnTableProduct}
			/>
			<ModalImage
				handleCancelImage={handleCancelImage}
				isModalOpenImage={isModalOpenImage}
				detailOrder={detailOrder}
				downloadImage={downloadImage}
				handleFileChange={handleFileChange}
				uploadImageToWeb={uploadImageToWeb}
				images={images}
				handleDeleteImage={handleDeleteImage}
				imagesLoaded={imagesLoaded}
			/>
		</Spin>
	);
};
export default OrderArea;
