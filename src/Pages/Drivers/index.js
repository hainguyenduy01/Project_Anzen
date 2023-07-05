import { Button, Form, Space, Table, Modal, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import { createDriverAsync, deleteDriverAsync, getAllDriverAsync, selectDrivers, updateDriverAsync } from "../../Slice/driverSlice";

const Drivers = () => {

	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllDriverAsync(pages));
	}, []);
	const driver = useSelector(selectDrivers)
	const showModal = () => {
		setIsModalOpen(true);
	};
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
		if (values.id) {
			await dispatch(updateDriverAsync(values));
		} else {
			await dispatch(createDriverAsync(values));
		}
		dispatch(getAllDriverAsync());
		setIsModalOpen(false);
	};
	const updateDriver = (list) => {
		form.resetFields();
		setIsModalOpen(true);
		form.setFieldsValue({
			...list,
		});
	};

	const columns = [
		{
			title: "STT",
			dataIndex: "id",
			key: "id",
			render: (_, record, index) => <p>{index + 1}</p>,
		},
		{
			title: "Tên",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Số chứng minh",
			dataIndex: "identity",
			key: "identity"
		},
		{
			title: "Bằng lái",
			dataIndex: "drivingLicense",
			key: "drivingLicense",
		},
		{
			title: "Biển số xe",
			dataIndex: "licensePlate",
			key: "licensePlate",
		},
		{
			title: "Công ty",
			dataIndex: "company",
			key: "company",
		},
		{
			title: "Số điện thoại công ty",
			dataIndex: "companyPhone",
			key: "companyPhone",
		},
		{
			title: "Số thuế công ty",
			dataIndex: "companyTax",
			key: "companyTax",
		},
		{
			title: "Chi tiết tài xế",
			dataIndex: "decription",
			key: "decription",
		},
		{
			title: "Hoạt động",
			key: "activity",
			render: (_, record) => (
				<Space size="middle">
					<button style={{ border: "none", background: "white" }} onClick={() => updateDriver(record)} ><i className="fa-solid fa-pen-to-square" style={{ color: "green" }}></i></button>
					<button style={{ border: "none", background: "white" }} onClick={() => deleteDriver(record.id)}><i className="fa-solid fa-trash" style={{ color: "red" }}></i></button>
				</Space>
			),
		},
	];
	const handleTableChange = (page) => {
		const params = {
			pageIndex: page.current,
			pageSize: page.pageSize,
		};

		const values = {
			pageIndex: params.pageIndex,
			pageSize: params.pageSize,
		};

		dispatch(getAllDriverAsync(values));
	};

	return (
		<>
			<Form>
				<Row>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="SDT Tài xế"
							name="phone"
							className="form__item">
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Biển số xe"
							name="drivingLicense"
							className="form__item">
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Từ ngày - Đến ngày"
							name="createdDate"
							className="form__item"
						>
							<DateRangePicker block />
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Row className="pd-3">
				<Col xs={24} sm={18} md={18}>
					<Button type="primary" onClick={showModal} style={{ backgroundColor: "#ffbd2f", color: "#fff" }}>
						Thêm tài xế
					</Button>
				</Col>
			</Row>

			<Modal title="Thêm tài xế" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}

					autoComplete="off"
				>
					<Form.Item
						label="STT"
						name="id"

					>
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
						<Input />
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
						<Input />
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
						<Input />
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
						<Input />
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
						<Input />
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
						<Input />
					</Form.Item>

					<Form.Item
						label="Công ty"
						name="company"
						rules={[
							{
								required: true,
								message: 'Please input your company license!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Số điện thoại công ty"
						name="companyPhone"
						rules={[
							{
								required: true,
								message: 'Please input your company phone!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Số thuế công ty"
						name="companyTax"
						rules={[
							{
								required: true,
								message: 'Please input your company tax!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Chi tiết tài xế"
						name="description"
						rules={[
							{
								required: true,
								message: 'Please input your description!',
							},
						]}
					>
						<Input />
					</Form.Item>


					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Table dataSource={driver?.listDriver?.result?.items}
				loading={driver.isLoading}
				columns={columns}
				pagination={{
					size: "small",
					total: driver?.listDriver?.result?.total,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
				}}
				onChange={(page) => handleTableChange(page)} />
		</>
	);
};
export default Drivers;
