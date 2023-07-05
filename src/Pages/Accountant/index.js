import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import {
  getBillOfLadingsAsync,
  selectBillOfLading,
} from "../../Slice/AccountantSlice";

const Accountant = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillOfLadingsAsync(pages));
  }, [pages]);
  const listAccountant = useSelector(selectBillOfLading);
  console.log(listAccountant);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Số mã",
      dataIndex: "code",
      key: "code",
      render: (code, record) => showCode(code, record),
    },
    {
      title: "Ngày tạo",
      dataIndex: "ladingDate",
      key: "ladingDate",
      // render: (text, record) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: "SĐT đối tác",
      dataIndex: "partnerPhone",
      key: "partnerPhone",
    },
    {
      title: "Tài xế",
      dataIndex: "driver",
      key: "driver",
    },
    {
      title: "SĐT tài xế",
      dataIndex: "driverPhone",
      key: "driverPhone",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalCOD",
      key: "totalCOD",
    },
    {
      title: "Thao tác",
      dataIndex: "isDone",
      key: "isDone",
      // render: (text, record) => showIsDone(text),
      align: "center",
    },
  ];
  const handleCheckbox = (e) => {
    setShowAdvancedSearch(e.target.checked);
  };
  const handleTableChange = (page) => {
    const params = {
      pageIndex: page.current,
      pageSize: page.pageSize,
    };

    const values = {
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
    };

    dispatch(getBillOfLadingsAsync(values));
  };
  const clearForm = async () => {
    // formSearch.resetFields();
    await dispatch(getBillOfLadingsAsync());
  };
  const showCode = (code, record) => {
		return code === false ? (
			<Tag color="#E61134" />
		) : (
			<Tag
				className="tag_code"
				color="#E61134"
			>
				{code}
			</Tag>
		);
	};
  return (
    <>
      <Form
        // form={formSearch}
        name="formSearch"
        layout="vertical"
        // onFinish={onFinishSearch}
      >
        <Row>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Mã bảng kê" name="code" className="form__item">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item
              label="SĐT tài xế"
              name="driverPhone"
              className="form__item"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item label="Biển số xe" name="name" className="form__item">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
            <Form.Item
              label="Từ ngày - Đến ngày"
              name="createdDate"
              className="form__item"
            >
              <DateRangePicker block />
            </Form.Item>
          </Col>
        </Row>
        {showAdvancedSearch && (
          <Row>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item label="Tài xế" name="driver" className="form__item">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="Tên đối tác"
                name="partner"
                className="form__item"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="SĐT đối tác"
                name="partnerPhone"
                className="form__item"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="Tổng số tiền từ"
                name="money1"
                className="form__item"
                values="number"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}
        {showAdvancedSearch && (
          <Row>
            <Col xs={24} sm={12} md={6} className="pe-3 mb-3">
              <Form.Item
                label="Tổng số tiền đến"
                name="money2"
                className="form__item"
                values="number"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row className="pb-3">
          <Col xs={24} sm={18} md={18}>
            <Space>
              <Button
                onClick={clearForm}
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Clear
              </Button>

              <Button
                htmlType="submit"
                style={{ backgroundColor: "#ffbd2f", color: "#fff" }}
              >
                Tìm kiếm
              </Button>
              <Checkbox onChange={handleCheckbox}>Tìm kiếm nâng cao</Checkbox>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={listAccountant?.listA?.result?.items}
        loading={listAccountant.isLoading}
        columns={columns}
        pagination={{
          size: "small",
          total: listAccountant?.listA?.result?.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={(page) => handleTableChange(page)}
      />
    </>
  );
};
export default Accountant;
