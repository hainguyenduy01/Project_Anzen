import {
	Button,
	Form,
	Space,
	Table,
	Modal,
	Input,
	Row,
	Col,
	Switch,
	Select,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllUserAsync,
	createUserAsync,
	selectUsers,
	changeUserRoleAsync,
	activeUserAsync,
} from '../../Slice/registerSlice';
import './Register.css';
const Register = () => {
	const { Option } = Select;
	const [form] = Form.useForm();
	const [roleForm] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllUserAsync(pages));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getAllUserAsync, pages]);
	const user = useSelector(selectUsers);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = async (values) => {
		await dispatch(createUserAsync(values));
		dispatch(getAllUserAsync());
		setIsModalOpen(false);
		form.resetFields();
	};
	const showRoleModal = (record) => {
		roleForm.resetFields();
		setIsRoleModalOpen(true);
		roleForm.setFieldsValue({
			...record,
		});
	};

	const handleRoleCancel = () => {
		setIsRoleModalOpen(false);
	};

	const onFinishRole = async (values) => {
		await dispatch(changeUserRoleAsync(values));
		dispatch(getAllUserAsync());
		setIsRoleModalOpen(false);
	};

	const onChange = async (data) => {
		await dispatch(activeUserAsync(data));
		dispatch(getAllUserAsync());
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
			title: 'Tên đầy đủ',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'Tên tài khoản',
			dataIndex: 'userName',
			key: 'userName',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Quyền',
			dataIndex: 'roleName',
			key: 'roleName',
		},
		{
			title: 'Hoạt động',
			dataIndex: 'isActive',
			key: 'activity',
			render: (text, record) => (
				<Space size="middle">
					<Switch
						checked={text}
						onChange={() =>
							onChange({ id: record.id, isActive: !record.isActive })
						}
					/>
					<Button
						onClick={() => showRoleModal(record)}
						className="ant-btn ant-btn-default ant-btn-dangerous"
					>
						Sửa quyền
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<Row className="pe-3 mb-3">
				<Col xs={24} sm={18} md={18}>
					<Button
						type="primary"
						onClick={showModal}
						style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
					>
						Tạo mới tài khoản
					</Button>
				</Col>
			</Row>
			<Modal
				title="THAY ĐỔI QUYỀN"
				open={isRoleModalOpen}
				onCancel={handleRoleCancel}
			>
				<Form
					name="roleForm"
					form={roleForm}
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
					autoComplete="off"
					onFinish={onFinishRole}
				>
					<Form.Item name="id" />

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
						<Select>
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
			<Modal
				title="TẠO TÀI KHOẢN"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
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
						maxWidth: 600,
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
						label="Tên"
						name="name"
						rules={[
							{
								required: true,
								message: 'Please input your name!',
							},
						]}
					>
						<Input placeholder="Nhập Tên" />
					</Form.Item>
					<Form.Item
						label="Tên đầy đủ"
						name="fullName"
						rules={[
							{
								required: true,
								message: 'Please input your name!',
							},
						]}
					>
						<Input placeholder="Nhập Tên đầy đủ" />
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
						<Input placeholder="Tên đăng nhập" />
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
								pattern: new RegExp(
									'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})',
								),
								message:
									'Mật khẩu phải có ít nhất 9 kí tư, Chữ hoa, Chữ thường, và không có kí tự đặc biệt',
							},
						]}
					>
						<Input.Password placeholder="Nhập mật khẩu" />
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
									return Promise.reject(
										new Error(
											'The new password that you entered do not match!',
										),
									);
								},
							}),
						]}
					>
						<Input.Password placeholder="Nhập lại mật khẩu" />
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
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input placeholder="Nhập email" />
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
						<Input placeholder="Nhập số điện thoại" />
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
						<Select placeholder="Chọn quyền">
							<Option value="Admin">Admin</Option>
							<Option value="keToan">Kế toán tổng hợp</Option>
							<Option value="Accounting">Accounting</Option>
							<Option value="Manager">Manager</Option>
							<Option value="Sale">Sale</Option>
							<Option value="InventoryReceiving">InventoryReceiving</Option>
							<Option value="InventoryDelivery">InventoryDelivery</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
			<Table
				dataSource={user?.listUser?.result?.items}
				loading={user.isLoading}
				columns={columns}
				pagination={{
					size: 'small',
					total: user?.listUser?.result?.total,
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
export default Register;
