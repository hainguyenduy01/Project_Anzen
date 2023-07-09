export const PROVINCE = [
	{ code: '076', name: 'An Giang' },
	{ code: '064', name: 'Bà Rịa - Vũng Tàu' },
	{ code: '781', name: 'Bạc Liêu' },
	{ code: '281', name: 'Bắc Kạn' },
	{ code: '240', name: 'Bắc Giang' },
	{ code: '241', name: 'Bắc Ninh' },
	{ code: '075', name: 'Bến Tre' },
	{ code: '650', name: 'Bình Dương' },
	{ code: '056', name: 'Bình Định' },
	{ code: '651', name: 'Bình Phước' },
	{ code: '062', name: 'Bình Thuận' },
	{ code: '780', name: 'Cà Mau' },
	{ code: '712', name: 'Cần Thơ (TP)' },
	{ code: '026', name: 'Cao Bằng' },
	{ code: '511', name: 'Đà Nẵng' },
	{ code: '050', name: 'Đắk Lắk' },
	{ code: '502', name: 'Đắk Nông' },
	{ code: '090', name: 'Điện Biên' },
	{ code: '061', name: 'Đồng Nai' },
	{ code: '067', name: 'Đồng Tháp' },
	{ code: '059', name: 'Gia Lai' },
	{ code: '019', name: 'Hà Giang' },
	{ code: '351', name: 'Hà Nam' },
	{ code: '004', name: 'Hà Nội' },
	{ code: '039', name: 'Hà Tĩnh' },
	{ code: '320', name: 'Hải Dương' },
	{ code: '031', name: 'Hải Phòng' },
	{ code: '711', name: 'Hậu Giang' },
	{ code: '018', name: 'Hòa Bình' },
	{ code: '008', name: 'Hồ Chí Minh' },
	{ code: '321', name: 'Hưng Yên' },
	{ code: '058', name: 'Khánh Hòa' },
	{ code: '077', name: 'Kiên Giang' },
	{ code: '060', name: 'Kon Tum' },
	{ code: '023', name: 'Lai Châu' },
	{ code: '063', name: 'Lâm Đồng' },
	{ code: '025', name: 'Lạng Sơn' },
	{ code: '020', name: 'Lào Cai' },
	{ code: '072', name: 'Long An' },
	{ code: '350', name: 'Nam Định' },
	{ code: '038', name: 'Nghệ An' },
	{ code: '030', name: 'Ninh Bình' },
	{ code: '068', name: 'Ninh Thuận' },
	{ code: '210', name: 'Phú Thọ' },
	{ code: '057', name: 'Phú Yên' },
	{ code: '052', name: 'Quảng Bình' },
	{ code: '510', name: 'Quảng Nam' },
	{ code: '055', name: 'Quảng Ngãi' },
	{ code: '033', name: 'Quảng Ninh' },
	{ code: '053', name: 'Quảng Trị' },
	{ code: '079', name: 'Sóc Trăng' },
	{ code: '022', name: 'Sơn  La' },
	{ code: '066', name: 'Tây Ninh' },
	{ code: '036', name: 'Thái Bình' },
	{ code: '280', name: 'Thái Nguyên' },
	{ code: '037', name: 'Thanh Hóa' },
	{ code: '054', name: 'Thừa Thiên Huế' },
	{ code: '073', name: 'Tiền Giang' },
	{ code: '074', name: 'Trà Vinh' },
	{ code: '027', name: 'Tuyên Quang' },
	{ code: '070', name: 'Vĩnh Long' },
	{ code: '211', name: '	Vĩnh Phúc' },
	{ code: '029', name: 'Yên Bái' },
];
export const OPTION_STATUS = [
	{ value: 'New', label: 'Đơn mới' },
	{ value: 'Gone', label: 'Đơn hàng đã đi' },
	{ value: 'Inventory', label: 'Đơn hàng tồn kho' },
	{ value: 'Incurred', label: 'Đơn hàng có phát sinh' },
];
export const PAYMENT_TYPE = [
	{ value: 'TTS', label: 'TTS' },
	{ value: 'TDN', label: 'TĐN' },
	{ value: 'DTT', label: 'ĐTT' },
	{ value: 'Other', label: 'Khác' },
];
export const ORDER_ISDONE = [
	{ value: true, label: 'Đơn hàng đã hoàn tất' },
	{ value: false, label: 'Đơn hàng chưa hoàn tất' },
];
export const FORMATS_DATE = {
	DD_MM_YYYY: 'DD/MM/YYYY',
	YYYY_MM_DD: 'YYYY-MM-DD',
	YY_MM_DD: 'YY-MM-DD',
	YYYY_MM_DD_Z: 'YYYY-MM-DDTHH:mm:ss',
	DD_MM_YYYY_HH_MM_SS: 'DD/MM/YYYY HH:mm:ss',
};
export const DATE_FORMAT = 'YYYY-MM-DD';
export const ORDER_STATUS = [
	{ value: 'TN', label: 'Tận nơi' },
	{ value: 'TK', label: 'Tận kho' },
];
export const PAYMENT_TYPE_MULTI = [
	{ value: 'TTS', label: 'TTS' },
	{ value: 'TDN', label: 'TĐN' },
	{ value: 'DTT', label: 'ĐTT' },
];
export const DELIVERY_TYPE = [
	{ value: 'TN', label: 'Tận nơi' },
	{ value: 'TK', label: 'Tận Kho' },
	{ value: 'QL', label: 'Quốc lộ' },
];
export const TYPE_REPORT = [
	{
		value: 'D',
		label: 'Ngày',
	},
	{
		value: 'M',
		label: 'Tháng',
	},
	{
		value: 'Q',
		label: 'Quý',
	},
	{
		value: 'Y',
		label: 'Năm',
	},
];
export const MONTH_REPORT = [
	{
		value: '01',
		label: 'Tháng 1',
	},
	{
		value: '02',
		label: 'Tháng 2',
	},
	{
		value: '03',
		label: 'Tháng 3',
	},
	{
		value: '04',
		label: 'Tháng 4',
	},
	{
		value: '05',
		label: 'Tháng 5',
	},
	{
		value: '06',
		label: 'Tháng 6',
	},
	{
		value: '07',
		label: 'Tháng 7',
	},
	{
		value: '08',
		label: 'Tháng 8',
	},
	{
		value: '09',
		label: 'Tháng 9',
	},
	{
		value: '10',
		label: 'Tháng 10',
	},
	{
		value: '11',
		label: 'Tháng 11',
	},
	{
		value: '12',
		label: 'Tháng 12',
	},
];
export const YEAR_REPORT = [
	{
		value: '2022',
		label: '2022',
	},
	{
		value: '2023',
		label: '2023',
	},
	{
		value: '2024',
		label: '2024',
	},
	{
		value: '2025',
		label: '2025',
	},
	{
		value: '2026',
		label: '2026',
	},
];
