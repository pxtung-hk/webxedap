import React, { useState, useEffect } from "react";
import styles from "./cart.css";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import eventApi from "../../../apis/eventApi";
import productApi from "../../../apis/productApi";
import { useHistory } from 'react-router-dom';
import { Col, Row, Tag, Spin, Card } from "antd";
import { DateTime } from "../../../utils/dateTime";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Typography, Button, Badge, Breadcrumb, Popconfirm, InputNumber, notification, Form, Input, Select, Rate } from 'antd';
import {
    Layout,
    Table,
    Divider,
    Statistic,
} from 'antd';
import { HistoryOutlined, AuditOutlined, AppstoreAddOutlined, CloseOutlined, UserOutlined, DeleteOutlined, CreditCardOutlined, HomeOutlined, CheckOutlined } from '@ant-design/icons';

import Slider from "react-slick";
import { min } from "moment";

const { Meta } = Card;
const { Option } = Select;
const { Content } = Layout;
const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const { TextArea } = Input;

const Cart = () => {

    const [productDetail, setProductDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [suggest, setSuggest] = useState([]);
    const [visible, setVisible] = useState(false);
    const [dataForm, setDataForm] = useState([]);
    const [lengthForm, setLengthForm] = useState();
    const [cartLength, setCartLength] = useState();
    const [cartTotal, setCartTotal] = useState();

    const [form] = Form.useForm();
    let { id } = useParams();
    const history = useHistory();


    const handlePay = () => {

        history.push("/pay")
    }

    const deleteCart = () => {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartLength");
        window.location.reload(true)
    }



    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity === null || isNaN(newQuantity) || newQuantity < 1 || newQuantity > 10) {
            // Giữ nguyên giá trị là 1 nếu giá trị số lượng không hợp lệ
            newQuantity = 1;
        }

        console.log(newQuantity);
        // Tìm kiếm sản phẩm trong giỏ hàng
        const updatedCart = productDetail.map((item) => {
            if (item._id === productId) {
                // Cập nhật số lượng và tính toán tổng tiền
                item.quantity = newQuantity;
                item.total = item.price * newQuantity;
            }
            return item;
        });

        const total = updatedCart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setCartTotal(total);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProductDetail(updatedCart);
    };


    const handleDelete = async (productId) => {
        const updatedCart = JSON.parse(localStorage.getItem('cart'));
        const filteredCart = updatedCart.filter((product) => product._id !== productId);
        localStorage.setItem('cart', JSON.stringify(filteredCart));
        const cartLength = filteredCart.length;
        setCartLength(cartLength);
        localStorage.setItem('cartLength', cartLength.toString());
        setProductDetail(filteredCart);
        window.location.reload();

    };

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} style={{ height: 80 }} />,
            width: '10%'
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <div>
                    <div className='groupButton'>
                        {(record.price - record.promotion).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </div>
                </div >
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <InputNumber
                    required
                    type="number"
                    min={1}
                    max={10}
                    value={text}
                    onChange={(value) => {
                        if (value === null || isNaN(value) || value < 1 || value > 10) {
                            // Giữ nguyên giá trị là 1 nếu giá trị số lượng không hợp lệ
                            updateQuantity(record._id, 1);
                        } else {
                            updateQuantity(record._id, value);
                        }
                    }}
                />


            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => (
                <div>
                    <div className='groupButton'>
                        {((record.price - record.promotion) * record.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </div>
                </div >
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Button type="danger" onClick={() => handleDelete(record._id)}>
                    Xóa
                </Button>
            ),
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                // await productApi.getDetailProduct(id).then((item) => {
                //     setProductDetail(item);
                // });
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setProductDetail(cart);
                console.log(cart);
                const cartLength = localStorage.getItem('cartLength');
                setCartLength(cartLength);
                const total = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
                setCartTotal(total);
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <div class="py-5">
                <Spin spinning={false}>
                    <Card className="container">
                        <div className="box_cart">
                            <Layout className="box_cart">
                                <Content className='site-layout-background'>
                                    <Breadcrumb>Giỏ hàng</Breadcrumb>
                                    <br></br>
                                    <Row justify='end'>
                                        <Col>
                                            <Button type='default' danger>
                                                <DeleteOutlined />
                                                &nbsp;
                                                <span onClick={() => deleteCart()}>Xóa giỏ hàng</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <h2>
                                        Tổng sản phẩm <strong>({cartLength})</strong>
                                    </h2>
                                    <br></br>
                                    <Table columns={columns} dataSource={productDetail} pagination={false} />
                                    <Divider orientation='right'>
                                        <p>Thanh toán</p>
                                    </Divider>
                                    <Row justify='start'>
                                        <Col md={12}>
                                            <Divider orientation='left'>Chính sách</Divider>
                                            <ol>
                                                <li>Quy định về sản phẩm: Chúng tôi cam kết cung cấp những sản phẩm chất lượng, đúng với mô tả, hình ảnh và thông tin được cung cấp trên website.</li>
                                                <li>Quy định về vận chuyển: Chúng tôi cam kết vận chuyển hàng hóa đúng thời gian và địa điểm được yêu cầu bởi khách hàng. Nếu có bất kỳ sự cố nào xảy ra trong quá trình vận chuyển, chúng tôi sẽ liên hệ ngay với khách hàng để thông báo và đưa ra giải pháp kịp thời.</li>
                                            </ol>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row justify='end'>
                                        <Col>
                                            <Statistic
                                                title='Tổng tiền.'
                                                value={`${Math.round(
                                                    cartTotal
                                                ).toFixed(0)}`}
                                                precision={0}
                                            />
                                            <Button style={{ marginTop: 16 }} type='primary' onClick={() => handlePay()}>
                                                Thanh toán ngay <CreditCardOutlined />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Content>
                            </Layout>
                        </div>
                    </Card>
                </Spin>
            </div>
        </div >
    );
};

export default Cart;
