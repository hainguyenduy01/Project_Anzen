import React, { useEffect } from 'react';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	HomeOutlined,
	DollarOutlined,
	MedicineBoxOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
	SwapOutlined,
	OrderedListOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import { useState } from 'react';
import logo from '../../assets/img/logo.png';
import './defaultLayout.css';
import Home from '../../Pages/Home';
import { toast } from 'react-toastify';
import { getUserProfile } from '../../Services/LoginServices';
import { useTranslation } from 'react-i18next';
const { Header, Sider, Content } = Layout;
const DefaultLayout = () => {
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	const translate = (lang) => {
		i18n.changeLanguage(lang);
	};
	useEffect(() => {
		getUserProfile1();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const getUserProfile1 = async () => {
		const res = await getUserProfile();
		if (res.status !== 200) {
			navigate('/user/login');
		}
	};
	let location = useLocation();
	const [current, setCurrent] = useState(
		location.pathname === '/' || location.pathname === ''
			? '/home'
			: location.pathname,
	);
	useEffect(() => {
		if (location) {
			if (current !== location.pathname) {
				setCurrent(location.pathname);
			}
		}
	}, [location, current]);
	const logout = () => {
		localStorage.clear();
		toast.success('Đăng xuất thành công!', {
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
	const [collapsed, setCollapsed] = useState(false);
	const listNavMenu = [
		{
			key: '/home',
			icon: <HomeOutlined />,
			label: t('Khu vực đơn hàng'),
		},
		{
			key: '/policy',
			icon: <DollarOutlined />,
			label: t('Bảng kê'),
		},
		{
			key: '/accountant',
			icon: <SwapOutlined />,
			label: t('Kế toán'),
		},
		{
			key: '/customers',
			icon: <UserOutlined />,
			label: t('Khách hàng'),
		},
		{
			key: '/drivers',
			icon: <MedicineBoxOutlined />,
			label: t('Tài xế'),
		},
		{
			key: '/reports',
			icon: <SwapOutlined />,
			label: t('Báo cáo'),
		},
		{
			key: '/export-report',
			icon: <OrderedListOutlined />,
			label: t('Lịch sử tải xuống'),
		},
		{
			key: '/register',
			icon: <UserAddOutlined />,
			label: t('Tạo tài khoản'),
		},
	];

	const items = [
		{
			key: '1',
			label: (
				<Link
					to="/user/login"
					onClick={logout}
					className="text-decoration-none"
				>
					<Space>
						<LogoutOutlined />
						<span>{t('Logout')}</span>
					</Space>
				</Link>
			),
		},
	];
	return (
		<div className="ant-basicLayout">
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					onCollapse={() => setCollapsed(!collapsed)}
					theme="light"
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
						top: 0,
						bottom: 0,
					}}
				>
					<Link to="/home" className="logo_sidebar text-decoration-none">
						<img src={logo} width={33} height={33} alt="logo" />
						<h3
							style={{ display: collapsed ? 'none' : 'inline-block' }}
							className="logo_sidebar-text"
						>
							ANZEN
						</h3>
					</Link>
					<div style={{ flex: '1 1 0%', overflow: 'hidden auto' }}>
						<Menu
							mode="inline"
							selectedKeys={[current]}
							onClick={({ key }) => navigate(key)}
							items={listNavMenu}
						/>
					</div>
				</Sider>
				<Layout
					style={{
						marginLeft: collapsed ? '48px' : '200px',
						transition: 'all 0.2s',
					}}
				>
					<Header
						style={{
							padding: 0,
							background: '#f42323',
						}}
					>
						<div className="header_login-top">
							{React.createElement(
								collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
								{
									className: 'trigger',
									onClick: () => {
										setCollapsed(!collapsed);
									},
								},
							)}
							<div>
								<span className="text-white fw-bold px-3">Ngôn ngữ :</span>
								<Space>
									<Button onClick={() => translate('en')}>EN</Button>
									<Button onClick={() => translate('vi')}>VI</Button>
								</Space>
							</div>
							<Dropdown menu={{ items }} className="dropdown_user">
								<Space>
									<UserOutlined />
									{localStorage.getItem('user')}
								</Space>
							</Dropdown>
						</div>
					</Header>
					<Content
						style={{
							margin: '24px',
							overflow: 'initial',
						}}
					>
						<Home />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};
export default DefaultLayout;
