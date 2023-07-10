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
	selectPolicy,
	uploadImageAsync,
} from '../../Slice/policySlice';
import { FORMATS_DATE } from '../../Utils/constants';
import './index.css';
import ModalDetail from './components/modalDetail';
const { TabPane } = Tabs;
const Policy = () => {
	const { RangePicker } = DatePicker;
	const navigate = useNavigate();
	const [formSearch] = Form.useForm();
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
	const dispatch = useDispatch();
	const policy = useSelector(selectPolicy);
	const { detailCode, isLoading, listPolicy, listInfoImage } = policy;
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
	const clearForm = () => {
		formSearch.resetFields();
		dispatch(getAllPolicyAsync(pages));
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
					<Button>Sửa</Button>
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
	const columnsCodeBill = [
		{
			title: 'STT',
			render: (_, record, index) => (pages.PageIndex - 1) * 10 + index + 1,
		},
		{
			title: 'MVĐ',
			dataIndex: 'code',
			key: 'code',
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
			align: 'center',
		},
		{
			title: 'Số tiền lái xe thu',
			dataIndex: 'cod',
			key: 'cod',
			align: 'center',
		},
		{
			title: 'Số tiền',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
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
										<Button htmlType="submit" className="btn-yellow">
											Tìm kiếm
										</Button>
										<Button className="btn-yellow">Tạo mới bảng kê</Button>
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
						 setPages={setPages}/>
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
					<div>2</div>
				</TabPane>
			</Tabs>
		</Spin>
	);
};
export default Policy;
