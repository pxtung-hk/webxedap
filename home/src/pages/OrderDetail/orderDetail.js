import React, { useState, useEffect } from 'react';
import "./orderDetail.css";
import { Typography, Spin, Form, Modal, BackTop, Breadcrumb, Select, } from 'antd';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import orderApi from "../../apis/orderApi";
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
const { Option } = Select;
const { confirm } = Modal;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const { Title } = Typography;

const OrderDetail = () => {

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [total, setTotalList] = useState();
    const history = useHistory();

    const handleGoBack = () => {
        history.push("/cart-history");
    };

    useEffect(() => {

        (async () => {
            try {
                await orderApi.getDetailOrder(id).then((res) => {
                    console.log(res);
                    setTotalList(res.totalDocs)
                    setOrder(res);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div className='container-oder'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="" onClick={handleGoBack}>
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                                <ShoppingCartOutlined />
                                <span>Chi tiết đơn hàng</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <br></br>

                    <div class="order-details">
                        <h2>Chi tiết đơn hàng</h2>
                        <div class="order-info">
                            <table>
                                <tr>
                                    <td><strong> ID:</strong></td>
                                    <td>{order._id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tên khách hàng:</strong></td>
                                    <td>{order.user}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sản phẩm:</strong></td>
                                    <td>
                                        <ul>
                                            {order?.products?.map((product, index) => (
                                                <li key={index}>{product}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Tổng tiền:</strong></td>
                                    <td>{order?.orderTotal?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                                <tr>
                                    <td><strong>Địa Chỉ:</strong></td>
                                    <td>{order.address}</td>
                                </tr>
                                <tr>
                                    <td><strong>Hình thức thanh toán:</strong></td>
                                    <td>{order.billing}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mô tả:</strong></td>
                                    <td>{order.description}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ngày đặt:</strong></td>
                                    <td>{moment(order.createdAt).format('HH:mm:ss DD/MM/YYYY ')}</td>
                                </tr>
                                <tr>
                                    <td><strong>Thời gian cập nhật:</strong></td>
                                    <td>{moment(order.updatedAt).format('HH:mm:ss DD/MM/YYYY ')}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
                {/* <Pagination style={{ textAlign: "center", marginBottom: 20 }} current={currentPage} defaultCurrent={1} total={total} onChange={handlePage}></Pagination> */}
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default OrderDetail;