import React, { useState, useEffect } from "react";
// import styles from "./cartHistory.css";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import eventApi from "../../../apis/eventApi";
import productApi from "../../../apis/productApi";
import { useHistory } from 'react-router-dom';
import { Col, Row, Tag, Spin, Card } from "antd";
import { DateTime } from "../../../utils/dateTime";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Typography, Button, Badge, Breadcrumb, Popconfirm, notification, Form, Input, Select, Rate, Table } from 'antd';
import { HistoryOutlined, AuditOutlined, AppstoreAddOutlined, CloseOutlined, UserOutlined, MehOutlined, TeamOutlined, HomeOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';

import Slider from "react-slick";
import orderApi from "../../../apis/orderApi";
import {
    Empty, Space,
    Pagination, Modal, BackTop,
} from 'antd';

const { Meta } = Card;
const { Option } = Select;

const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";


const CartHistory = () => {

    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState();
    const [total, setTotalList] = useState();
    const [order, setOrder] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [id, setId] = useState();
    const [form2] = Form.useForm();
    const history = useHistory();

    const handleCategoryList = async () => {
        try {
            await orderApi.getListOrder({ page: 1, limit: 10000 }).then((res) => {
                setTotalList(res.totalDocs)
                setOrder(res.data.docs);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }
    //xử lí trạng thái đơn hàng
    const handleUpdateOrder = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            const categoryList = {
                "description": values.description,
                "status": values.status
            }
            await axiosClient.put("/order/" + id, categoryList).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'hủy đơn hàng thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'hủy đơn hàng thành công',
                    });
                    setOpenModalUpdate(false);
                    window.location.reload();
                    handleCategoryList();

                }

            })
            setLoading(false);

        } catch (error) {
            throw error;
        }
    }

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(true);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
    };

    const handleEditOrder = (id) => {
        setOpenModalUpdate(true);
        (async () => {
            try {
                const response = await orderApi.getDetailOrder(id);
                console.log(response);
                setId(id);
                form2.setFieldsValue({
                    status: response.status,
                    address: response.address,
                    description: response.description,
                    orderTotal: response.orderTotal,
                    products: response.products,
                    user: response.user,
                    billing: response.billing,
                });

                console.log(form2);
                setLoading(false);

            } catch (error) {
                console.log('Lỗi hệ thống' + error)
            }
        })();
    }
    const handleViewOrder = (orderId) => {
        ;
        history.push(`/order-details/${orderId}`);
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            key: '_id',
            render: (text, record) => <a>{text._id}</a>
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (text) => <a>{text?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</a>,
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'billing',
            key: 'billing',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (slugs) => (
                <span >
                    {slugs === "rejected" ? <Tag style={{ width: 95, textAlign: "center" }} color="red">Đã hủy</Tag> : slugs === "approved" ? <Tag style={{ width: 95, textAlign: "center" }} color="geekblue" key={slugs}>
                        Vận chuyển
                    </Tag> : slugs === "final" ? <Tag color="green" style={{ width: 95, textAlign: "center" }}>Đã giao</Tag> : <Tag color="blue" style={{ width: 95, textAlign: "center" }}>Đợi xác nhận</Tag>}
                </span>
            ),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                            <Button
                                size="small"
                                style={{ width: 150, borderRadius: 15, height: 30 }}
                                onClick={() => handleViewOrder(record._id)}
                            >
                                Xem
                            </Button>
                            <Popconfirm
                                title="Bạn có chắc chắn hủy đơn hàng này?"
                                onConfirm={() => handleEditOrder(record._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                >
                                    Hủy
                                </Button>
                            </Popconfirm>

                        </div>
                    </Row>
                </div >
            ),
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                await productApi.getOrderByUser().then((item) => {
                    console.log(item);

                    setOrderList(item);
                });
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="container" style={{ marginBottom: 30 }}>
            <Spin spinning={false}>
                <div className="container" style={{ marginBottom: 30 }}>
                    <h1 style={{ fontSize: 25, marginTop: 25, paddingBottom: 30 }}>Quản lý đơn hàng</h1>
                    <Card >
                        <Table columns={columns} dataSource={orderList.data} rowKey='_id' pagination={{ position: ['bottomCenter'] }} />
                    </Card>
                </div>

                <div>
                    <Modal
                        title="Cập nhật đơn hàng"
                        visible={openModalUpdate}
                        style={{ top: 100 }}
                        onOk={() => {
                            form2
                                .validateFields()
                                .then((values) => {
                                    form2.resetFields();

                                    handleUpdateOrder(values);
                                    form2.handleCancelOder();
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                        onCancel={handleCancel}
                        okText="Hoàn thành"
                        cancelText="Hủy"
                        width={600}
                    >
                        <Form
                            form={form2}
                            name="eventCreate"
                            layout="vertical"
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="status"
                                label="Yêu cầu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your sender name!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select >
                                    <Option value="rejected">Hủy đơn hàng</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Lý do hủy đơn hàng"
                                style={{ marginBottom: 10 }}
                            >
                                <Input.TextArea rows={4} placeholder="Mô tả lý do " />
                            </Form.Item>
                            <p style={{ color: 'red', fontWeight: 'bold' }}>* Khách hàng lưu ý </p>
                            <p style={{ color: 'red', fontStyle: 'italic' }}>- khi đơn hàng đang chuẩn bị hoặc đang trên đường giao thì khách hàng không được tự ý hủy đơn hàng vì như vậy sẽ làm ảnh hưởng đến cửa hàng của chúng tôi xin các khách hàng lưu ý</p>
                            <p style={{ color: 'red', fontStyle: 'italic' }}>- Chúng tôi sẽ có biện pháp xử lý đối với những khách hàng không theo quy định của của hàng.</p>
                        </Form>
                    </Modal>
                </div>
            </Spin>
        </div >
    );
};

export default CartHistory;
