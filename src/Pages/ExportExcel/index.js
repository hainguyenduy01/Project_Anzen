import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteExcelAsync,
	downloadExcelAsync,
	getDownloadAsync,
	selectOrder,
} from '../../Slice/orderSlice';
import { Button, Popconfirm, Space, Spin, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const ExportExcel = () => {
	useEffect(() => {
		document.title = 'Lịch sử tải xuống - ANZEN';
	}, []);
	const [pages, setPages] = useState({
		PageIndex: 1,
		PageSize: 10,
	});
	const excel = useSelector(selectOrder);
	const excelExport = excel.listDownload;
	const dispatch = useDispatch();
	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(getDownloadAsync(pages));
		}, 10000);
		return () => {
			clearInterval(interval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);
	useEffect(() => {
		dispatch(getDownloadAsync(pages));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);
	useEffect(() => {
		if (excel.linkDownload.result?.url) {
			window.open(excel.linkDownload.result?.url);
			toast.success('Đang tiến hành tải xuống!', {
				position: 'top-left',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'light',
			});
			dispatch(getDownloadAsync(pages));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [excel.linkDownload.result?.url]);
	const deleteExcel = async (record) => {
		await dispatch(deleteExcelAsync(record.id));
		toast.success('Xoá thành công!', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: 'light',
		});
		dispatch(getDownloadAsync(pages));
	};
	const downloadExcel = async (id) => {
		await dispatch(downloadExcelAsync(id));
		window.location.reload();
	};
	const columns = [
		{
			title: 'STT',
			render: (text, record, index) => (pages.PageIndex - 1) * 10 + index + 1,
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Màn hình',
			render: (_, record) => {
				switch (record.type) {
					case 'DeliveryOrder':
						return 'Khu vực đơn hàng';
					case 'BillOfLading':
						return 'Bảng kê';
					case 'Customer':
						return 'Khách hàng';
					case 'Driver':
						return 'Tài xế';
					default:
						return 'Không có';
				}
			},
		},
		{
			title: 'Tình trạng',
			render: (_, record) => {
				return record.status === 'Processed'
					? 'Sẵn sàng'
					: record.status === 'Downloaded'
					? 'Đã tải'
					: 'Đang xử lý';
			},
		},
		{
			title: 'Hoạt động',
			align: 'center',
			render: (_, record) => (
				<Space>
					<Popconfirm
						title="Bạn có đồng ý xóa?"
						onConfirm={() => deleteExcel(record)}
						okText="OK"
						cancelText="Cancel"
					>
						<DeleteOutlined
							style={{ color: 'rgb(255, 77, 79)', fontSize: 24 }}
						/>
					</Popconfirm>
					<Button onClick={() => downloadExcel(record.id)}>Tải xuống</Button>
				</Space>
			),
		},
	];
	return (
		<Spin tip="Loading..." spinning={excel.isloading}>
			<Table
				columns={columns}
				dataSource={excelExport.items}
				pagination={{
					...pages,
					total: excelExport.total,
					showSizeChanger: true,
					pageSizeOptions: ['10', '20', '30'],
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
				rowKey={(record) => record.id}
				scroll={{ x: 'max-content' }}
			></Table>
		</Spin>
	);
};
export default ExportExcel;
