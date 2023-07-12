import { Button, Col, Modal, Row, Space } from 'antd';

const ModalExcel = (props) => {
	const { isModalOpenExcel, handleCancelExcel, moveToExcel } = props;
	return (
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
	);
};
export default ModalExcel;
