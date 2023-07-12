import { Button, Col, Modal, Row } from 'antd';

const ModalImage = (props) => {
	const {
		isModalOpenImage,
		handleCancelImage,
		detailOrder,
		downloadImage,
		handleFileChange,
		uploadImageToWeb,
		images,
		handleDeleteImage,
		imagesLoaded,
	} = props;
	return (
		<Modal
			title="THÔNG TIN HÌNH ẢNH"
			open={isModalOpenImage}
			onCancel={handleCancelImage}
			footer={[
				<Button key="back" onClick={handleCancelImage}>
					Đóng
				</Button>,
				<Button
					className="btn-yellow"
					key="downloadImage"
					onClick={() => downloadImage(detailOrder?.id)}
				>
					Tải ảnh xuống
				</Button>,
				<Button
					className="btn-yellow"
					key="uploadImage"
					onClick={() => uploadImageToWeb(detailOrder)}
				>
					Gửi hình ảnh
				</Button>,
			]}
		>
			<Row gutter={24}>
				<Col xs={12}>
					<strong>Tên hàng: </strong> {detailOrder?.name}
				</Col>
				<Col xs={12}>
					<strong>NVKD: </strong> {detailOrder?.saleStaff}
				</Col>
				<Col xs={12}>
					<strong>Hình thức thu tiền: </strong>
					{detailOrder?.paymentType}
				</Col>
				<Col xs={12}>
					<strong>Số tiền: </strong>
					{detailOrder?.totalAmount}
				</Col>
			</Row>
			<div>
				<div className="upload_Wrapper">
					<button className="btn-upload">Tải hình ảnh</button>
					<input
						type="file"
						name="myfile"
						multiple
						onChange={handleFileChange}
						accept="image/png, image/gif,image/jpeg,image/jpg"
					/>
				</div>
				<br />
				<Row gutter={24}>
					{images?.map((image, index) => (
						<Col xs={24} sm={24} md={12} key={index}>
							<div className="container_image">
								<img
									width={'100%'}
									height={200}
									src={URL.createObjectURL(image)}
									alt={`Hình ${index}`}
								/>

								<div className="middle-delete">
									<div
										className="text-delete"
										onClick={() => handleDeleteImage(index)}
									>
										Xoá ảnh
									</div>
								</div>
							</div>
						</Col>
					))}
				</Row>
				<Row gutter={24}>
					{imagesLoaded?.map((image, index) => (
						<Col xs={24} sm={24} md={12} key={index}>
							<div className="container_image">
								<img
									width={'100%'}
									height={200}
									src={image}
									alt={`Hình ${index}`}
								/>
							</div>
						</Col>
					))}
				</Row>
			</div>
		</Modal>
	);
};
export default ModalImage;
