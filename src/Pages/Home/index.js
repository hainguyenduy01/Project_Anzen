import { Route, Routes } from 'react-router-dom';
import OrderArea from '../OrderArea';
import Policy from '../Policy';
import Drivers from '../Drivers';
import ErrorPage from '../ErrorPage';
import Register from '../Register';
import Customers from '../Customers';
const Home = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<OrderArea />} />
				<Route path="/home" element={<OrderArea />} />
				<Route path="/policy" element={<Policy />} />
				<Route path="/customers" element={<Customers />} />
				<Route path="/drivers" element={<Drivers />} />
				<Route path="/register" element={<Register />} />
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</div>
	);
};
export default Home;
