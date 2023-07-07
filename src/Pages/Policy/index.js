import { Button, Form, Space, Table, Modal, Input, Row, Col, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FundOutlined } from '@ant-design/icons';
import { DateRangePicker } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { createPolicyAsync, deletePolicyAsync, exportGridAsync, getAllPolicyAsync, selectPolicy, updatePolicyAsync } from "../../Slice/policySlice";
import {
	FORMATS_DATE,
} from '../../Utils/constants';
const Policy = () => {

	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [formSearch] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [titleForm, setTitleForm] = useState('create');
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
	const policy = useSelector(selectPolicy)
	const dispatch = useDispatch();
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

	const handleCancelExcel = () => {
		setIsModalOpenExcel(false);
	};
	const handleOpenModalExcel=()=>{
		setIsModalOpenExcel(true)
	}
	const moveToExcel = async () => {
		setIsModalOpenExcel(false);
		await dispatch(exportGridAsync(pages));
		navigate('/export-report');
		toast.success('File cần tải mới nhất đã chuẩn bị xong!', {
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
	useEffect(() => {
		dispatch(getAllPolicyAsync(pages));
		setIsColumnsAfter(columns)
	}, [pages]);

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
		await dispatch(deletePolicyAsync(id));
		dispatch(getAllPolicyAsync());
	};
	const onFinish = async (values) => {
		if (values.id) {
			await dispatch(updatePolicyAsync(values));
		} else {
			await dispatch(createPolicyAsync(values));
		}
		dispatch(getAllPolicyAsync());
		setIsModalOpen(false);
	};
	const handleCheckbox = (e) => {
		setShowAdvancedSearch(e.target.checked);
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
				getAllPolicyAsync({
					...otherValues,
					CodeDateTo: codeDateTo,
					codeDateFrom: codeDateFrom,
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
	const clearForm = async () => {
		formSearch.resetFields();
		await dispatch(getAllPolicyAsync());
	};
	const [policyListData, setPolicyListData] = useState([]);
	const createPolicy = () => {
		form.resetFields();
		setTitleForm('create');
		setIsModalOpen(true);
		setPolicyListData(policy?.result?.items);
	};
	const updatePolicy = (record) => {
		setTitleForm('update');
		form.resetFields();
		setIsModalOpen(true);
		form.setFieldsValue({
			...record,
		});
	};
	const handleTableChange = (page) => {
		const params = {
			pageIndex: page.current,
			pageSize: page.pageSize,
		};

		const values = {
			pageIndex: params.pageIndex,
			pageSize: params.pageSize,
		};

		dispatch(getAllPolicyAsync(values));
	};

	// const onFinishSearch = async (values) => {
	// 	await dispatch(
	// 		getAllPolicyAsync({
	// 			...values,
	// 			PageIndex: 1,
	// 			PageSize: 10,
	// 		}),
	// 	);
	const columns = [
		{
			title: "STT",
			dataIndex: "id",
			render:(_,record,index)=>	(pages.PageIndex - 1) * pages.PageSize + index + 1,
			
		},
		{
			title: "Số mã",
			dataIndex: "code",
			key: "code"
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdDate",
			key: "createdDate",
			render: (text, record) => dayjs(text).format('DD/MM/YYYY')
		},
		{
			title: "Số điện thoại đối tác",
			dataIndex: "partnerPhone",
			key: "partnerPhone"
		},
		{
			title: "Tài xế ",
			dataIndex: "identity",
			key: "identity"
		},
		{
			title: "SDT tài xế",
			dataIndex: "driverPhone",
			key: "driverPhone",
		},
		{
			title: "Tổng số tiền",
			dataIndex: "totalFreight",
			key: "totalFreight",
		},

		{
			title: "Thao tác",
			key: "activity",
			render: (_, record) => (
				<Space size="middle">
					<button style={{ border: "none", background: "white" }} onClick={() => updatePolicy(record)} ><i className="ant-btn ant-btn-default" style={{ color: "green" }}></i><span>Sửa</span></button>
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
	const [columnsAfter,setIsColumnsAfter]=useState(columns);

	return (
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
						<Form.Item label="Biển Số Xe"
							name="licensePlate"
							className="form__item">
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item label="SDT Tài Xế"
							name="driverPhone"
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
							<DateRangePicker
							style={{ width: '100%' }}
							format={FORMATS_DATE.DD_MM_YYYY} 
							initialValue={[dayjs('2022-01-01'), dayjs()]}
							block />
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
							<Button
								onClick={clearForm}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Clear
							</Button>
							<Button 
							onClick={handleOpenModalExcel}
							style={{ backgroundColor: '#ffbd2f', color: '#fff' }}>
								Export Excel
							</Button>
							<Button
								htmlType="submit"
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Tìm kiếm
							</Button>
							<Button
								onClick={createPolicy}
								style={{ backgroundColor: '#ffbd2f', color: '#fff' }}
							>
								Tạo mới bảng kê
							</Button>
							<Checkbox onChange={handleCheckbox}>Tìm kiếm nâng cao</Checkbox>
						</Space>
					</Col>
				</Row>
			</Form>
			<Table
				dataSource={policy?.listPolicy?.result?.items}
				loading={policy.isLoading}
				columns={columnsAfter}
				pagination={{
					size: 'small',
					total: policy?.listPolicy?.result?.total,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
				}}
				onChange={(page) => handleTableChange(page)}
			></Table>
			<Modal open={isModalOpenExcel} footer={null}>
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
		</div>

	);
};
export default Policy;
