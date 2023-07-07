import { Button, Form, Space, Table, Modal, Input, Row, Col, Switch, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAsync, createUserAsync, deleteUserAsync, selectUsers } from "../../Slice/registerSlice";
const Register = () => {

	const { Option } = Select;
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllUserAsync(pages));
	}, [pages]);
	const user = useSelector(selectUsers)
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const deleteUser = async (id) => {
		await dispatch(deleteUserAsync(id));
		dispatch(getAllUserAsync());
	};
	const onFinish = async (values) => {
		await dispatch(createUserAsync(values));
		dispatch(getAllUserAsync());
		setIsModalOpen(false);
	};

	const columns = [
		{
			title: "STT",
			dataIndex: "id",
			key: "id",
			render: (_, record, index) => <p>{index + 1}</p>,
		},
		{
			title: "Tên đầy đủ",
			dataIndex: "fullName",
			key: "fullName"
		},
		{
			title: "Tên tài khoản",
			dataIndex: "userName",
			key: "userName"
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "phoneNumber"
		},
		{
			title: "Quyền",
			dataIndex: "roleName",
			key: "roleName"
		},
		{
			title: "Hoạt động",
			key: "activity",
			render: (_, record) => (
				<Space size="middle">
					<Switch />
					<Button className="ant-btn ant-btn-default ant-btn-dangerous">Sửa quyền</Button>
				</Space>
			),
		},
	];

	const handleTableChange = (page) => {
		const values = {
			pageIndex: page.current,
			pageSize: page.pageSize,
		};
		setPages(values);
	};

	return (
		<>
			<Row className="pd-3">
				<Col xs={24} sm={18} md={18}>
					<Button type="primary" onClick={showModal} style={{ backgroundColor: "#ffbd2f", color: "#fff" }}>
						Tạo mới tài khoản
					</Button>
				</Col>
			</Row>
			<Modal title="BIÊN NHẬN VẬN CHUYỂN" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
						label="Tên người dùng"
						name="fullName"
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
						label="Tên tài khoản"
						name="userName"
						rules={[
							{
								required: true,
								message: 'Please input your user name!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Mật khẩu"
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
							{
								pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})'),
								message: "Mật khẩu phải có ít nhất 9 kí tư, Chữ hoa, Chữ thường, và không có kí tự đặc biệt"
							}
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="Xác nhận mật khẩu"
						name="confirm"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password !',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
								  if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								  }
								  return Promise.reject(new Error('The new password that you entered do not match!'));
								},
							  }),
						]}
					>
						<Input.Password />
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
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Số điện thoại"
						name="phoneNumber"
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
						label="Quyền"
						name="roleName"
						rules={[
							{
								required: true,
								message: 'Please input your role!',
							},
						]}
					>

						<Select placeholder="Select role">
							<Option value="Admin">Admin</Option>
							<Option value="keToan">Kế toán tổng hợp</Option>
							<Option value="Accounting">Accounting</Option>
							<Option value="Manager">Manager</Option>
							<Option value="Sale">Sale</Option>
							<Option value="InventoryReceiving">InventoryReceiving</Option>
							<Option value="InventoryDelivery">InventoryDelivery</Option>
						</Select>
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
			<Table dataSource={user?.listUser?.result?.items}
				loading={user.isLoading}
				columns={columns}
				pagination={{
					size: "small",
					total: user?.listUser?.result?.total,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
				}}
				onChange={(page) => handleTableChange(page)} />
		</>
	);
};
export default Register;
