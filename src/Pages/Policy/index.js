import { Button, Form, Space, Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  FundOutlined } from '@ant-design/icons';
import { createPolicyAsync, deletePolicyAsync, getAllPolicyAsync, selectPolicy, updatePolicyAsync } from "../../Slice/policySlice";

const Policy = () => {

	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
	const policy=useSelector(selectPolicy)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllPolicyAsync(pages));
	}, []);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const deleteDriver = async (id)=>{
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
	const updatePolicy = (list) =>{
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
			key: "id"
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
					<button style={{ border: "none", background: "white" }} onClick={() => updatePolicy(record)} ><i className="fa-solid fa-pen-to-square" style={{ color: "green" }}></i></button>
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

	return (
		<div>
			<Table columns={columns} dataSource={policy?.listPolicy} ></Table>
		</div>
	
	);
};
export default Policy;
