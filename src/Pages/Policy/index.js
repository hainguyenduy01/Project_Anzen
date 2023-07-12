import {
	Button,
	Form,
	Space,
	Table,
	Modal,
	Input,
	Row,
	Col,
	Checkbox,
	Tag,
	DatePicker,
	Spin,
	Tabs,
	InputNumber,
	Popconfirm,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AndroidOutlined,
	AppleOutlined,
	FundOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import {
	downloadCodeBillAsync,
	downloadImageAsync,
	exportGridAsync,
	getAllPolicyAsync,
	getDetailCodeBillAsync,
	getInfoImageAsync,
	getProductToGoAsync,
	postProductAsync,
	selectPolicy,
	uploadImageAsync,
} from '../../Slice/policySlice';
import { FORMATS_DATE } from '../../Utils/constants';
import './index.css';
import ModalDetail from './components/modalDetail';
import { v4 as uuidv4 } from 'uuid';

const { TabPane } = Tabs;
const Policy = () => {
	const { RangePicker } = DatePicker;
	const navigate = useNavigate();
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
	const dispatch = useDispatch();
	const policy = useSelector(selectPolicy);
	const { detailCode, isLoading, listPolicy, listInfoImage, productToGo } =
		policy;
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
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
	const [activeTab, setActiveTab] = useState('1');
	const [images, setImages] = useState([]);
	const imagesLoaded = listInfoImage?.result;
	const [isModalOpenCode, setIsModalOpenCode] = useState(false);
	const [isModalOpenImage, setIsModalOpenImage] = useState(false);
	const [isModalOpenProductToGo, setIsModalOpenProductToGo] = useState(false);
	const [isModalOpenEditProductToGo, setIsModalOpenEditProductToGo] =
		useState(false);
	const [dataEditProductToGo, setDataEditProductToGo] = useState({});
	const [dataProduct, setDataProduct] = useState([]);
	const [formSearch] = Form.useForm();
	const [formAdd] = Form.useForm();
	const [formEditProductToGo] = Form.useForm();
	const moveCreatePage = () => {
		setActiveTab('2');
	};
	const uploadImage = async (record) => {
		setImages([]);
		await dispatch(getDetailCodeBillAsync(record.id));
		await dispatch(getInfoImageAsync({ id: record.id }));
		setIsModalOpenImage(true);
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

		await dispatch(getInfoImageAsync({ id: data.id, type: 'BillOfLading' }));
		if (images.length === 0) {
			toast.error('Upload ảnh thất bại!', notification);
		} else {
			toast.success('Upload ảnh thành công!', notification);
		}
	};
	const downloadImage = (id) => {
		setIsModalOpenImage(false);
		dispatch(downloadImageAsync({ id, type: 'BillOfLading' }));
	};
	const handleFileChange = (e) => {
		const fileList = e.target.files;
		const imageList = Array.from(fileList);
		setImages((prevImages) => [...prevImages, ...imageList]);
	};
	const handleDeleteImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};
	const handleCancelImage = () => {
		setIsModalOpenImage(false);
	};
	const handleCancelProduct = () => {
		setIsModalOpenProductToGo(false);
	};
	const handleCancelEditProductToGo = () => {
		setIsModalOpenEditProductToGo(false);
	};
	const handleTabChange = (key) => {
		setActiveTab(key);
	};

	const handleCancelExcel = () => {
		setIsModalOpenExcel(false);
	};
	const handleOpenModalExcel = () => {
		setIsModalOpenExcel(true);
	};
	const moveToExcel = async () => {
		setIsModalOpenExcel(false);
		await dispatch(exportGridAsync(pages));
		navigate('/export-report');
		toast.success('File cần tải mới nhất đã chuẩn bị xong!', notification);
	};
	const getDetailCode = async (id) => {
		setIsModalOpenCode(true);
		await dispatch(getDetailCodeBillAsync(id));
	};
	const downloadCodeBill = async (id) => {
		setIsModalOpenCode(false);
		await dispatch(
			downloadCodeBillAsync({ id: id, type: 'inventorydelivery' }),
		);
	};
	const handleCancelCode = () => {
		setIsModalOpenCode(false);
	};
	useEffect(() => {
		dispatch(getAllPolicyAsync(pages));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);

	const handleCheckbox = (e) => {
		setShowAdvancedSearch(e.target.checked);
	};
	const deleteTableProduct = async (record) => {
		const newList = dataProduct.filter((item) => item.id !== record.id);
		await setDataProduct(newList);
	};
	const onFinishSearch = async (values) => {
		if (values.dateSearch) {
			const LadingDateFrom = values.dateSearch[0]
				.format(FORMATS_DATE.YYYY_MM_DD)
				.toString();
			const LadingDateTo = values.dateSearch[1]
				.format(FORMATS_DATE.YYYY_MM_DD)
				.toString();
			const { dateSearch, ...otherValues } = values;
			await dispatch(
				getAllPolicyAsync({
					...otherValues,
					LadingDateTo: LadingDateTo,
					LadingDateFrom: LadingDateFrom,
					PageIndex: 1,
					PageSize: 10,
				}),
			);
		} else {
			await dispatch(
				getAllPolicyAsync({ ...values, PageIndex: 1, PageSize: 10 }),
			);
		}
	};
	const onFinishEditProductToGo = async (values) => {
		const params = {
			...values,
			...dataEditProductToGo,
			id: dataEditProductToGo.id,
			isTranshipment: true,
			isGone: true,
			deliveryOrderId: dataEditProductToGo.id,
		};
		setDataProduct((prev) => [...prev, params]);
		await setIsModalOpenEditProductToGo(false);
		setIsModalOpenProductToGo(false);
	};
	const onFinishCreateEditProduct = async (values) => {
		if (dataProduct.length === 0) {
			toast.error('Vui lòng thêm đơn hàng cần vận chuyển!', notification);
		} else {
			if (values.id) {
				const data = {
					...values,
					ladingDate: values.ladingDate
						.format(FORMATS_DATE.YYYY_MM_DD)
						.toString(),
					deliveryOrderBillOfLadings: dataProduct,
				};
				await dispatch(postProductAsync(data));
				toast.success('Cập nhật đơn hàng thành công!', notification);
				setActiveTab('1');
				setDataProduct([]);
				dispatch(getAllPolicyAsync(pages));
			} else {
				const data = {
					...values,
					ladingDate: values.ladingDate
						.format(FORMATS_DATE.YYYY_MM_DD)
						.toString(),
					id: uuidv4(),
					deliveryOrderBillOfLadings: dataProduct,
				};
				await dispatch(postProductAsync(data));
				toast.success('Tạo đơn hàng thành công!', notification);
				setActiveTab('1');
				setDataProduct([]);
				dispatch(getAllPolicyAsync(pages));
			}
		}
	};
	const editProduct = async (record) => {
		setDataProduct([]);
		await dispatch(getDetailCodeBillAsync(record.id));
		const date = dayjs(detailCode?.result?.ladingDate);
		await setDataProduct(detailCode?.result?.deliveryOrderBillOfLadings);
		setActiveTab('2');
		if (detailCode?.result) {
			formAdd.setFieldsValue({
				...detailCode?.result,
				ladingDate: date,
				deliveryOrderBillOfLadings: dataProduct,
			});
		}
	};
	const clearForm = () => {
		formSearch.resetFields();
		dispatch(getAllPolicyAsync(pages));
	};
	const clearFormAdd = () => {
		formAdd.resetFields();
	};
	const loadListProductToGo = async () => {
		await dispatch(getProductToGoAsync(pages));
		setIsModalOpenProductToGo(true);
	};
	const editProductToGo = (record) => {
		setDataEditProductToGo(record);
		setIsModalOpenEditProductToGo(true);
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
	const columns = [
		{
			title: 'STT',
			dataIndex: 'id',
			render: (_, record, index) => (pages.PageIndex - 1) * 10 + index + 1,
		},
		{
			title: 'Số mã',
			dataIndex: 'code',
			key: 'code',
			render: (code, record) => showCode(code, record),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (text, record) => dayjs(text).format('DD/MM/YYYY'),
		},
		{
			title: 'Số điện thoại đối tác',
			dataIndex: 'partnerPhone',
			key: 'partnerPhone',
		},
		{
			title: 'Tài xế ',
			dataIndex: 'driver',
			key: 'driver',
		},
		{
			title: 'SDT tài xế',
			dataIndex: 'driverPhone',
			key: 'driverPhone',
		},
		{
			title: 'Tổng số tiền',
			dataIndex: 'totalFreight',
			key: 'totalFreight',
		},

		{
			title: 'Thao tác',
			key: 'activity',
			align: 'center',
			render: (_, record) => (
				<Space size="middle">
					<Button onClick={() => editProduct(record)}>Sửa</Button>
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

	const columnsProduct = [
		{
			title: 'STT',
			render: (_, record, index) => (pages.PageIndex - 1) * 10 + index + 1,
		},
		{
			title: 'MVĐ',
			dataIndex: 'code',
			key: 'code',
			render: (code, record) => <Tag color="#E61134">{code}</Tag>,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'consignee',
			key: 'consignee',
		},
		{
			title: 'Tên hàng',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Nơi giao',
			dataIndex: 'toAddress',
			key: 'toAddress',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'consigneePhone',
			key: 'consigneePhone',
		},
		{
			title: 'Hình thức thu tiền',
			dataIndex: 'paymentType',
			key: 'paymentType',
		},
		{
			title: 'Số tiền lái xe thu',
			dataIndex: 'cod',
			key: 'cod',
		},
		{
			title: 'Số tiền',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
			align: 'center',
			render: (text, record) => {
				if (!text) {
					return 0;
				} else {
					return text;
				}
			},
		},
		{
			title: 'Thao tác',
			render: (_, record) => (
				<Popconfirm
					title="Bạn có đồng ý xóa?"
					onConfirm={() => deleteTableProduct(record)}
					okText="OK"
					cancelText="Cancel"
				>
					<Button className="btn-normal">Xoá</Button>
				</Popconfirm>
			),
		},
	];
	const columnsProductToGo = [
		{
			title: 'Mã vận đơn',
			dataIndex: 'code',
			key: 'code',
			render: (code, record) => <Tag color="#E61134">{code}</Tag>,
		},
		{
			title: 'Tên hàng',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Thao tác',
			render: (_, record) => (
				<Button onClick={() => editProductToGo(record)} className="btn-normal">
					Thêm
				</Button>
			),
		},
	];

	return (
		<Spin tip="Loading..." spinning={isLoading}>
			<Tabs activeKey={activeTab} onChange={handleTabChange}>
				<TabPane
					tab={
						<span>
							<AppleOutlined />
							Danh sách bảng kê đã tạo
						</span>
					}
					key="1"
				>
					<div>
						<Form
							form={formSearch}
							name="formSearch"
							layout="vertical"
							onFinish={onFinishSearch}
						>
							<Row>
								<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
									<Form.Item
										label="Mã Bảng Kê"
										name="code"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
									<Form.Item
										label="Biển Số Xe"
										name="licensePlate"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
									<Form.Item
										label="SDT Tài Xế"
										name="driverPhone"
										className="form__item"
									>
										<Input />
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
							</Row>
							{showAdvancedSearch && (
								<Row>
									<Col xs={24} sm={12} md={6} className="pe-3">
										<Form.Item
											label="Tài xế"
											name="driver"
											className="form__item"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
										<Form.Item
											label="Tên Đối Tác"
											name="partnerName"
											className="form__item"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
										<Form.Item
											label="SDT Đối tác"
											name="partnerPhone"
											className="form__item"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
										<Form.Item
											label="Tổng số tiền từ"
											name="totalFrom"
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
											label="Tổng số tiền đến"
											name="totalTo"
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
										<Button onClick={clearForm} className="btn-yellow">
											Clear
										</Button>
										<Button
											onClick={handleOpenModalExcel}
											className="btn-yellow"
										>
											Export Excel
										</Button>
										<Button
											htmlType="submit"
											className="btn-yellow"
											form="formSearch"
										>
											Tìm kiếm
										</Button>
										<Button onClick={moveCreatePage} className="btn-yellow">
											Tạo mới bảng kê
										</Button>
										<Checkbox onChange={handleCheckbox}>
											Tìm kiếm nâng cao
										</Checkbox>
									</Space>
								</Col>
							</Row>
						</Form>
						<Table
							dataSource={listPolicy?.result?.items}
							loading={isLoading}
							columns={columns}
							rowKey={(record) => record.id}
							scroll={{ x: 'max-content' }}
							pagination={{
								size: 'small',
								total: listPolicy?.result?.total,
								pageSizeOptions: ['10', '20', '30'],
								showSizeChanger: true,
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
						<Modal open={isModalOpenExcel} footer={null}>
							<p style={{ fontSize: 16 }}>Thông báo</p>
							<hr />
							<p>
								Bạn có muốn chuyển hướng qua màn hình Export Report để tải file
								không?
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
						<ModalDetail
							detailCode={detailCode}
							isModalOpenCode={isModalOpenCode}
							handleCancelCode={handleCancelCode}
							downloadCodeBill={downloadCodeBill}
							isLoading={isLoading}
							pages={pages}
							setPages={setPages}
						/>
						{/* Modal Image */}
						<Modal
							title="THÔNG TIN HÌNH ẢNH"
							open={isModalOpenImage}
							onCancel={handleCancelImage}
							footer={[
								<Button key="back" onClick={handleCancelImage}>
									Đóng
								</Button>,
								<Button
									className="btn-yellow"
									key="downloadImage"
									onClick={() => downloadImage(detailCode?.result?.id)}
								>
									Tải ảnh xuống
								</Button>,
								<Button
									className="btn-yellow"
									key="uploadImage"
									onClick={() => uploadImageToWeb(detailCode?.result)}
								>
									Gửi hình ảnh
								</Button>,
							]}
						>
							<Row gutter={24}>
								<Col xs={12}>
									<strong>Tên tài xế: </strong>
									<span> {detailCode?.result?.driver}</span>
								</Col>
								<Col xs={12}>
									<strong>SĐT: </strong>{' '}
									<span> {detailCode?.result?.driverPhone}</span>
								</Col>
								<Col xs={12}>
									<strong>SDT Đối tác: </strong>
									<span> {detailCode?.result?.partnerPhone}</span>
								</Col>
								<Col xs={12}>
									<strong>Tổng số tiền: </strong>
									<span> {detailCode?.result?.totalCOD}</span>
								</Col>
							</Row>
							<div>
								<div className="upload_Wrapper">
									<button className="btn-upload">Tải hình ảnh</button>
									<input
										type="file"
										name="myfile"
										multiple
										onChange={handleFileChange}
										accept="image/png, image/gif,image/jpeg,image/jpg"
									/>
								</div>
								<br />
								<Row gutter={24}>
									{images?.map((image, index) => (
										<Col xs={24} sm={24} md={12} key={index}>
											<div className="container_image">
												<img
													width={'100%'}
													height={200}
													src={URL.createObjectURL(image)}
													alt={`Hình ${index}`}
												/>

												<div className="middle-delete">
													<div
														className="text-delete"
														onClick={() => handleDeleteImage(index)}
													>
														Xoá ảnh
													</div>
												</div>
											</div>
										</Col>
									))}
								</Row>
								<Row gutter={24}>
									{imagesLoaded?.map((image, index) => (
										<Col xs={24} sm={24} md={12} key={index}>
											<div className="container_image">
												<img
													width={'100%'}
													height={200}
													src={image}
													alt={`Hình ${index}`}
												/>
											</div>
										</Col>
									))}
								</Row>
							</div>
						</Modal>
					</div>
				</TabPane>
				<TabPane
					tab={
						<span>
							<AndroidOutlined />
							Tạo mới bảng kê
						</span>
					}
					key="2"
				>
					<div>
						<h4 className="heading-top mb-3" align="center">
							BẢNG KÊ GIAO NHẬN VẬN CHUYỂN
						</h4>
						<Form
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							onFinish={onFinishCreateEditProduct}
							autoComplete="off"
							layout="vertical"
							form={formAdd}
							name="formAdd"
							className="mb-3"
						>
							<Row>
								<Col xs={24} sm={24} md={12} hidden>
									<Form.Item label="ID" name="id" hidden>
										<Input hidden style={{ color: '#ffbd2f' }} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Mã bảng kê"
										name="code"
										className="form__item"
									>
										<Input disabled style={{ color: '#ffbd2f' }} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Ngày tháng"
										name="ladingDate"
										className="form__item"
										initialValue={dayjs()}
									>
										<DatePicker
											style={{ width: '100%' }}
											format={FORMATS_DATE.DD_MM_YYYY}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Hợp đồng số"
										name="referenceContract"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Row>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Tên công ty"
										name="partner"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Số điện thoại"
										name="partnerPhone"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="MST"
										name="partnerTax"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Row>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Người lái xe"
										name="driver"
										className="form__item"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập tên người lái xe!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Biển số xe"
										name="licensePlate"
										className="form__item"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập biển số xe!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Địa chỉ"
										name="driverAddress"
										className="form__item"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="CMND"
										name="driverIdentity"
										className="form__item"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập CMND!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Đã tạm ứng"
										name="advanceAmount"
										className="form__item"
									>
										<InputNumber />
									</Form.Item>
								</Col>
							</Row>

							<Row>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Giấy phép lái xe"
										name="drivingLicense"
										className="form__item"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập giấy phép lái xe!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Điện thoại lái xe"
										name="driverPhone"
										className="form__item"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập điện thoại lái xe!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={8} className="pe-3 mb-3">
									<Form.Item
										label="Tổng cước cho xe"
										name="totalFreight"
										className="form__item"
									>
										<InputNumber />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col className="text-end" xs={24} sm={24} md={24}>
									<Space>
										<Button
											onClick={loadListProductToGo}
											className="btn-yellow"
										>
											Danh sách hàng cần đi
										</Button>
										<Button onClick={clearFormAdd} className="btn-yellow">
											Xoá dữ liệu để tạo mới
										</Button>
										<Button
											htmlType="submit"
											form="formAdd"
											className="btn-yellow"
										>
											GỬI
										</Button>
									</Space>
								</Col>
							</Row>
						</Form>
						<Modal
							title="DANH SÁCH ĐƠN HÀNG CẦN ĐI"
							onCancel={handleCancelProduct}
							onOk={handleCancelProduct}
							width={'65%'}
							open={isModalOpenProductToGo}
						>
							<Table
								columns={columnsProductToGo}
								dataSource={productToGo?.result?.items}
								rowKey={(record) => record.id}
								loading={isLoading}
								pagination={{
									size: 'small',
									total: productToGo?.result?.total,

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
							<Modal
								title="Chỉnh sửa đơn hàng đi"
								width={'60%'}
								open={isModalOpenEditProductToGo}
								onCancel={handleCancelEditProductToGo}
								footer={[
									<Space>
										<Button
											onClick={handleCancelEditProductToGo}
											className="btn-normal"
										>
											Đóng
										</Button>
										<Button
											htmlType="submit"
											className="btn-yellow"
											form="formEditProductToGo"
										>
											Gửi
										</Button>
									</Space>,
								]}
							>
								<Form
									labelCol={{ span: 24 }}
									wrapperCol={{ span: 24 }}
									onFinish={onFinishEditProductToGo}
									autoComplete="off"
									layout="vertical"
									form={formEditProductToGo}
									name="formEditProductToGo"
									className="mb-3"
								>
									{/* <Row>
										<Col span={12}>
											<Form.Item name="isDone">
												<Checkbox>Đã hoàn thành</Checkbox>
											</Form.Item>
										</Col>
									</Row> */}
									<Row gutter={24}>
										<Col span={12}>
											<Form.Item
												label="Số lượng"
												name="quantity"
												rules={[
													{
														required: true,
														message: 'Vui lòng nhập số lượng!',
													},
												]}
												initialValue={dataEditProductToGo?.quantity}
											>
												<Input />
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item label="Số phụ thu" name="cod">
												<InputNumber />
											</Form.Item>
										</Col>
									</Row>
								</Form>
							</Modal>
						</Modal>
						<Table
							dataSource={dataProduct}
							loading={isLoading}
							columns={columnsProduct}
							rowKey={(record) => record.id}
							pagination={{
								size: 'small',
								total: dataProduct?.length,
								pageSizeOptions: ['10', '20', '30'],
								showSizeChanger: true,
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
					</div>
				</TabPane>
			</Tabs>
		</Spin>
	);
};
export default Policy;
