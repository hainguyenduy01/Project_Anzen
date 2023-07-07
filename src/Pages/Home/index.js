import { Route, Routes } from 'react-router-dom';
import OrderArea from '../OrderArea';
import Policy from '../Policy';
import Drivers from '../Drivers';
import ErrorPage from '../ErrorPage';
import Register from '../Register';
import Customers from '../Customers';
import Accountant from '../Accountant';
import ExportExcel from '../ExportExcel';
import Reports from '../Reports';
const Home = () => {
	return (
		<Routes>
			<Route path="/" element={<OrderArea />} />
			<Route path="/home" element={<OrderArea />} />
			<Route path="/policy" element={<Policy />} />
			<Route path="/customers" element={<Customers />} />
			<Route path="/accountant" element={<Accountant />} />
			<Route path="/reports" element={<Reports />} />
			<Route path="/export-report" element={<ExportExcel />} />
			<Route path="/drivers" element={<Drivers />} />
			<Route path="/register" element={<Register />} />
			<Route path="/*" element={<ErrorPage />} />
		</Routes>
	);
};
export default Home;
