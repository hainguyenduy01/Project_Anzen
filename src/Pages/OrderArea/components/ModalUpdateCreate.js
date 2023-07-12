import {
	AutoComplete,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Radio,
	Row,
	Select,
	Space,
	Table,
} from 'antd';
import {
	DATE_FORMAT,
	DELIVERY_TYPE,
	ORDER_STATUS,
	PAYMENT_TYPE,
	PAYMENT_TYPE_MULTI,
	PROVINCE,
} from '../../../Utils/constants';
import dayjs from 'dayjs';

const ModalUpdateCreate = (props) => {
	const {
		titleForm,
		isModalOpen,
		handleCancel,
		onFinishCreateEdit,
		formAdd,
		order,
		optionPhone,
		onChangePhone1,
		formProduct,
		onChangePhone,
		handleChangeSelectPaymentType,
		isShowMultiPaymentType,
		onChangeTaleProduct,
		dataTableProduct,
		columnTableProduct,
	} = props;
	return (
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
					<Button className="btn-normal" onClick={handleCancel}>
						Đóng
					</Button>
					<Button htmlType="submit" form="formAdd" className="btn-yellow">
						Gửi
					</Button>
				</Space>
			}
		>
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
							initialValue={localStorage.getItem('user')}
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
							rules={[{ required: true, message: 'Vui lòng nhập ngày tạo!' }]}
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
							rules={[{ required: true, message: 'Vui lòng nhập Người gửi!' }]}
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
							<AutoComplete
								style={{
									width: '100%',
								}}
								options={
									optionPhone &&
									optionPhone.map((item, index) => ({
										label: item.phone,
										value: item.phone,
										key: index,
										id: item.id,
									}))
								}
								onChange={onChangePhone1}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item
							label="Số điện thoại người nhận"
							name="consigneePhone"
							rules={[{ required: true, message: 'Vui lòng nhập!' }]}
						>
							<AutoComplete
								style={{
									width: '100%',
								}}
								options={
									optionPhone &&
									optionPhone.map((item, index) => ({
										label: item.phone,
										value: item.phone,
										key: index,
										id: item.id,
									}))
								}
								onChange={onChangePhone}
							/>
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
							<InputNumber
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
							/>
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
								<InputNumber
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
								/>
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
								<InputNumber
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
								/>
							</Form.Item>
						</Col>
					</Row>
				)}
				<Row gutter={24}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item label="Phát sinh khác" name="additionalAmount">
							<InputNumber
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
							/>
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
									<InputNumber
										formatter={(value) =>
											`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}
										parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									/>
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
									<InputNumber
										formatter={(value) =>
											`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}
										parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									/>
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
									<InputNumber
										formatter={(value) =>
											`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}
										parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									/>
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
						rowKey={(record) => record.id}
					/>
				)}
			</div>
		</Modal>
	);
};
export default ModalUpdateCreate;
