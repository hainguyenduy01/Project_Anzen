import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './components/DefaultLayout';
import Login from './Pages/Login';
//test
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<DefaultLayout />} />
					<Route path="/user/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
