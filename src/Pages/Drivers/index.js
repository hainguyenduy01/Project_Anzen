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
	InputNumber,
	DatePicker,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createDriverAsync,
	deleteDriverAsync,
	exportGridDAsync,
	getAllDriverAsync,
	selectDrivers,
} from '../../Slice/driverSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { FORMATS_DATE } from '../../Utils/constants';

const Drivers = () => {
	const [form] = Form.useForm();
	const [formSearch] = Form.useForm();
	const [titleForm, setTitleForm] = useState('create');
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
	const [isModalExcelOpen, setIsModalExcelOpen] = useState(false);
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const dispatch = useDispatch();
	const { RangePicker } = DatePicker;

	useEffect(() => {
		dispatch(getAllDriverAsync(pages));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getAllDriverAsync, pages]);
	const driver = useSelector(selectDrivers);

	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const deleteDriver = async (id) => {
		await dispatch(deleteDriverAsync(id));
		dispatch(getAllDriverAsync());
	};
	const onFinish = async (values) => {
		await dispatch(createDriverAsync(values));
		dispatch(getAllDriverAsync());
		setIsModalOpen(false);
	};
	const [driverListData, setDriverListData] = useState([]);
	const createDriver = () => {
		form.resetFields();
		setTitleForm('create');
		setIsModalOpen(true);
		setDriverListData(driverListData?.driver?.result?.items);
	};
	const updateDriver = (list) => {
		form.resetFields();
		setTitleForm('update');
		setIsModalOpen(true);
		form.setFieldsValue({
			...list,
		});
	};
	const clearForm = () => {
		formSearch.resetFields();
		dispatch(getAllDriverAsync());
	};

	const showExcelModel = () => {
		setIsModalExcelOpen(true);
	};

	const onCancelExcel = () => {
		setIsModalExcelOpen(false);
	};

	const moveToExcel = async () => {
		setIsModalExcelOpen(false);
		await dispatch(exportGridDAsync(pages));
		navigate('/export-report');
	};

	const handleCheckBox = (e) => {
		setShowAdvancedSearch(e.taget.checked);
	};

	const columns = [
		{
			title: 'STT',
			dataIndex: 'id',
			key: 'id',
			render: (_, record, index) =>
				(pages.PageIndex - 1) * pages.PageSize + index + 1,
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Số chứng minh',
			dataIndex: 'identity',
			key: 'identity',
		},
		{
			title: 'Bằng lái',
			dataIndex: 'drivingLicense',
			key: 'drivingLicense',
		},
		{
			title: 'Biển số xe',
			dataIndex: 'licensePlate',
			key: 'licensePlate',
		},
		{
			title: 'Công ty',
			dataIndex: 'company',
			key: 'company',
		},
		{
			title: 'Số điện thoại công ty',
			dataIndex: 'companyPhone',
			key: 'companyPhone',
		},
		{
			title: 'Số thuế công ty',
			dataIndex: 'companyTax',
			key: 'companyTax',
		},
		{
			title: 'Chi tiết tài xế',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Hoạt động',
			key: 'activity',
			render: (_, record) => (
				<Space size="middle">
					<button
						style={{ border: 'none', background: 'white' }}
						onClick={() => updateDriver(record)}
					>
						<i
							className="fa-solid fa-pen-to-square"
							style={{ color: 'green' }}
						></i>
					</button>
					<button
						style={{ border: 'none', background: 'white' }}
						onClick={() => deleteDriver(record.id)}
					>
						<i className="fa-solid fa-trash" style={{ color: 'red' }}></i>
					</button>
				</Space>
			),
		},
	];

	const onFinishSearch = async (values) => {
		const params = {
			...values,
			LandingDateFrom: dayjs(values.createDate[0]).format('YYYY-MM-DD'),
			LandingDateTo: dayjs(values.createDate[1]).format('YYYY-MM-DD'),
		};
		delete params.createDate;
		await dispatch(getAllDriverAsync(params));
		console.log(params);
	};

	return (
		<>
			<Form form={formSearch} name="formSearch" onFinish={onFinishSearch}>
				<Row>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item label="SDT Tài xế" name="phone" className="form__item">
							<InputNumber />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item label="Tên tài xế" name="name" className="form__item">
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Biển số xe"
							name="drivingLicense"
							className="form__item"
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Từ ngày - Đến ngày"
							name="createDate"
							className="form__item"
							initialValue={[dayjs('2022-10-01'), dayjs()]}
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
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Số chứng minh"
								name="identity"
								className="form__item"
								values="number"
							>
								<InputNumber />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item label="Công ty" name="company" className="form__item">
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="SĐT công ty"
								name="companyPhone"
								className="form__item"
								values="number"
							>
								<InputNumber />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Số thuế công ty"
								name="companyTax"
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
								onClick={showExcelModel}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Export Excel
							</Button>
							<Button
								htmlType="submit"
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Tìm kiếm
							</Button>
							<Button
								type="primary"
								onClick={createDriver}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Thêm tài xế
							</Button>
							<Checkbox
								onChange={() =>
									setShowAdvancedSearch((handleCheckBox) => !handleCheckBox)
								}
								values={handleCheckBox}
							>
								Tìm kiếm nâng cao
							</Checkbox>
						</Space>
					</Col>
				</Row>
			</Form>

			<Modal open={isModalExcelOpen} footer={null}>
				<p style={{ fontSize: 16 }}>Thông báo</p>
				<hr />
				<p>
					Bạn có muốn chuyển hướng qua màn hình Export Report để tải file không?
				</p>
				<hr />
				<Row justify="end">
					<Col>
						<Space>
							<Button
								className="btn-normal"
								key="close"
								onClick={onCancelExcel}
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

			<Modal
				title={
					titleForm === 'create' ? 'Tạo mới KHÁCH HÀNG' : 'Cập nhật KHÁCH HÀNG'
				}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Đóng
					</Button>,
					<Button
						key="ok"
						htmlType="submit"
						type="primary"
						form="form"
						style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
					>
						Gửi
					</Button>,
				]}
			>
				<Form
					name="form"
					form={form}
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 800,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item label="STT" name="id" hidden={true}>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Tên tài xế"
						name="name"
						rules={[
							{
								required: true,
								message: 'Please input your name!',
							},
						]}
					>
						<Input placeholder="Nhập tên" />
					</Form.Item>

					<Form.Item
						label="Địa chỉ"
						name="address"
						rules={[
							{
								required: true,
								message: 'Please input your address!',
							},
						]}
					>
						<Input placeholder="Nhập địa chỉ" />
					</Form.Item>

					<Form.Item
						label="Số điện thoại"
						name="phone"
						rules={[
							{
								required: true,
								message: 'Please input your phone!',
							},
						]}
					>
						<Input placeholder="Nhập số điện thoại" />
					</Form.Item>

					<Form.Item
						label="Số chứng minh"
						name="identity"
						rules={[
							{
								required: true,
								message: 'Please input your identity!',
							},
						]}
					>
						<Input placeholder="Nhập số chứng minh" />
					</Form.Item>

					<Form.Item
						label="Bằng lái"
						name="drivingLicense"
						rules={[
							{
								required: true,
								message: 'Please input your driving license!',
							},
						]}
					>
						<Input placeholder="Nhập bằng lái" />
					</Form.Item>

					<Form.Item
						label="Biển số xe"
						name="licensePlate"
						rules={[
							{
								required: true,
								message: 'Please input your license plate!',
							},
						]}
					>
						<Input placeholder="Nhập biển số xe" />
					</Form.Item>

					<Form.Item label="Công ty" name="company">
						<Input placeholder="Nhập công ty" />
					</Form.Item>

					<Form.Item label="Số điện thoại công ty" name="companyPhone">
						<Input placeholder="Nhập số điện thoại công ty" />
					</Form.Item>

					<Form.Item label="Số thuế công ty" name="companyTax">
						<Input placeholder="Nhập số thuế công ty" />
					</Form.Item>

					<Form.Item label="Chi tiết tài xế" name="description">
						<Input placeholder=" Nhập chi tiết tài xế" />
					</Form.Item>
				</Form>
			</Modal>
			<Table
				dataSource={driver?.listDriver?.result?.items}
				loading={driver.isLoading}
				columns={columns}
				pagination={{
					size: 'small',
					total: driver?.listDriver?.result?.total,
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
export default Drivers;
