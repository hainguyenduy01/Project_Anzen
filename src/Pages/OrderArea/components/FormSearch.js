import {
	Button,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Input,
	Radio,
	Row,
	Select,
	Space,
} from 'antd';
import {
	FORMATS_DATE,
	OPTION_STATUS,
	ORDER_ISDONE,
	PAYMENT_TYPE,
} from '../../../Utils/constants';
import dayjs from 'dayjs';

const FormSearch = (props) => {
	const { RangePicker } = DatePicker;
	const {
		formSearch,
		onFinishSearch,
		showAdvancedSearch,
		order,
		clearForm,
		exportExcel,
		createOrder,
		handleCheckbox,
		onChangeRadio,
		valueRadio,
	} = props;
	return (
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
						<Button onClick={clearForm} className="btn-yellow">
							Clear
						</Button>
						<Button htmlType="submit" className="btn-yellow">
							Tìm kiếm
						</Button>
						<Button onClick={exportExcel} className="btn-yellow">
							Export Excel
						</Button>
						<Button onClick={createOrder} className="btn-yellow">
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
	);
};
export default FormSearch;
