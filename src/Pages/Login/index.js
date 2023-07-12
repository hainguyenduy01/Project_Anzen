import { Form, Input, Button, Spin, Space } from 'antd';
import { LoginService, getUserProfile } from '../../Services/LoginServices';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import './loginPage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const Login = () => {
	const { i18n, t } = useTranslation();
	const translate = (lang) => {
		i18n.changeLanguage(lang);
	};
	useEffect(() => {
		document.title = 'Login - ANZEN';
	}, []);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = async (values) => {
		setIsLoading(true);
		const response = await LoginService(values);
		if (response.status === 200) {
			localStorage.setItem('access_token', response.data.access_token);
			localStorage.setItem('refresh_token', response.data.refresh_token);
			localStorage.setItem('expires_in', response.data.expires_in);
			const responseProfile = await getUserProfile();
			if (responseProfile.status === 200) {
				navigate('/');
				localStorage.setItem('user', responseProfile.data.result.userName);
				toast.success('Đăng nhập thành công!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
			}
		} else {
			toast.error('Đăng nhập thất bại!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'light',
			});
		}
		setIsLoading(false);
	};
	return (
		<div className="background_login">
			<div className="container_login">
				<Spin tip="Loading..." spinning={isLoading}>
					<div className="header_login">
						<div className="header_login-image">
							<img src={logo} alt="logo" />
						</div>
						<div className="header_login-text">
							<p>
								Welcome to
								<NavLink
									style={{
										fontWeight: 'bold',
										color: '#f42323',
										textDecoration: 'none',
										paddingLeft: '5px',
									}}
								>
									ANZEN VẬN TẢI
								</NavLink>
							</p>
						</div>
					</div>
					<div className="form_login">
						<Form
							name="basic"
							wrapperCol={{
								span: 24,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							autoComplete="off"
						>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: 'Tài khoản không được để trống!',
									},
								]}
							>
								<Input className="inputLogin" placeholder={t('Username')} />
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: 'Mật khẩu không được để trống!',
									},
								]}
							>
								<Input.Password className="inputLogin" placeholder="Password" />
							</Form.Item>

							<Form.Item
								wrapperCol={{
									span: 12,
								}}
							>
								<div className="form_footer-button">
									<Button
										className="button_submit"
										type="danger"
										htmlType="submit"
									>
										Login
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
					<Space>
						<Button onClick={() => translate('en')}>EN</Button>
						<Button onClick={() => translate('vi')}>VI</Button>
					</Space>
					<div className="footer_login pt-2">
						<p>
							Website giới thiệu của
							<NavLink
								style={{
									color: '#f42323',
									textDecoration: 'none',
									paddingLeft: '10px',
								}}
								to="https://vantaianzen.vn/"
							>
								AZEN vận tải
							</NavLink>
						</p>
					</div>
				</Spin>
			</div>
		</div>
	);
};
export default Login;
