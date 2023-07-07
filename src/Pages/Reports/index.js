import { Button, Col, Form, Row, Select, Space, Spin } from 'antd';
import { MONTH_REPORT, TYPE_REPORT, YEAR_REPORT } from '../../Utils/constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportAsync, selectOrder } from '../../Slice/orderSlice';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
const Reports = () => {
	const order = useSelector(selectOrder);
	const dispatch = useDispatch();
	const { isloading, listReport } = order;
	const [chartData, setChartData] = useState(null);
	useEffect(() => {
		const data = {
			type: 'D',
			time: dayjs().format('MM'),
			period: dayjs().format('YYYY'),
		};
		dispatch(
			getReportAsync({
				...data,
				Period: data.period + data.time,
				PageIndex: 1,
				pageSize: 100,
				Asc: false,
			}),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend,
	);

	useEffect(() => {
		if (listReport) {
			const labels = listReport?.result?.items?.map((item) => item.period);
			const data = listReport?.result?.items?.map((item) => item.revenue);
			setChartData({
				labels,
				datasets: [
					{
						label: 'Doanh thu',
						data,
						backgroundColor: 'rgba(75, 192, 192, 0.4)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			});
		}
	}, [listReport]);
	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Báo cáo doanh thu',
			},
		},
	};
	const [formSearch] = Form.useForm();
	const onFinishSearch = async (values) => {
		let stringPeriod = '';
		if (values.time) {
			stringPeriod = values.Period?.toString() + values?.time?.toString();
		} else {
			stringPeriod = values.Period?.toString();
		}
		await dispatch(
			getReportAsync({
				...values,
				Period: stringPeriod,
				pageIndex: 1,
				pageSize: 100,
				Asc: false,
				SortField: 'Period',
			}),
		);
	};
	const handleHideMonth = (values) => {
		console.log(values);
		const { type } = values;
		if (type !== 'D') {
			setHideMonth(false);
		} else {
			setHideMonth(true);
		}
	};
	const [hideMonth, setHideMonth] = useState(true);
	const clearForm = () => {
		formSearch.resetFields();
	};
	return (
		<Spin tip="Loading..." spinning={isloading}>
			<h4 className="mb-3 text-danger">Báo cáo</h4>
			<Form
				form={formSearch}
				name="formSearch"
				layout="vertical"
				onFinish={onFinishSearch}
				onValuesChange={handleHideMonth}
			>
				<Row>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Loại báo cáo"
							name="type"
							className="form__item"
							initialValue={TYPE_REPORT[0].value}
						>
							<Select options={TYPE_REPORT}></Select>
						</Form.Item>
					</Col>
					{hideMonth && (
						<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
							<Form.Item
								label="Tháng"
								name="time"
								className="form__item"
								initialValue={dayjs().format('MM')}
							>
								<Select options={MONTH_REPORT}></Select>
							</Form.Item>
						</Col>
					)}
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3">
						<Form.Item
							label="Năm"
							name="Period"
							className="form__item"
							initialValue={YEAR_REPORT[1].value}
						>
							<Select options={YEAR_REPORT}></Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6} className="pe-3 mb-3 mt-4">
						<Space>
							<Button onClick={clearForm} className="btn-yellow">
								Clear
							</Button>
							<Button htmlType="submit" className="btn-yellow">
								Tìm kiếm
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
			{chartData && <Bar data={chartData} options={options} />}
		</Spin>
	);
};
export default Reports;
