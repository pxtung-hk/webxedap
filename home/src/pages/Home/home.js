import React, { useState, useEffect, useRef } from "react";
import "../Home/home.css";
import Texty from 'rc-texty';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import eventApi from "../../apis/eventApi";
import productApi from "../../apis/productApi";
import { OverPack } from 'rc-scroll-anim';
import { DateTime } from "../../utils/dateTime";
import handshake from "../../assets/icon/handshake.svg";
import promotion1 from "../../assets/home/banner-1.png";
import banner from "../../assets/image/banner/banner.png";
import banner2 from "../../assets/image/banner/banner2.png";
import service6 from "../../assets/image/service/service6.png";
import service7 from "../../assets/image/service/service7.png";
import service8 from "../../assets/image/service/service8.png";
import service9 from "../../assets/image/service/service9.png";
import service10 from "../../assets/image/service/service10.png";
import banner3 from "../../assets/image/banner-3.png";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import triangleTopRight from "../../assets/icon/Triangle-Top-Right.svg"

import { useHistory } from 'react-router-dom';
import { RightOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Col, Row, Button, Pagination, Spin, Carousel, Card, List, BackTop, Affix, Avatar, Badge, Rate } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { numberWithCommas } from "../../utils/common";

const DATE_TIME_FORMAT = "DD - MM - YYYY";
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

const Home = () => {

    const [event, setEvent] = useState([]);
    const [productList, setProductList] = useState([]);
    const [eventListHome, setEventListHome] = useState([]);
    const [totalEvent, setTotalEvent] = useState(Number);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [productsPhone, setProductsPhone] = useState([]);
    const [productsPC, setProductsPC] = useState([]);
    const [productsTablet, setProductsTablet] = useState([]);
    const [visible, setVisible] = useState(true);
    const tawkMessengerRef = useRef();

    const history = useHistory();

    const handlePage = async (page, size) => {
        try {
            const response = await eventApi.getListEvents(page, 8);
            setEventListHome(response.data)
            setTotalEvent(response.total_count);
            setCurrentPage(page);

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleReadMore = (id) => {
        console.log(id);
        history.push("product-detail/" + id)
    }

    const handleCategoryDetails = (id) => {
        console.log(id);
        history.push("product-list/" + id)
    }

    const onLoad = () => {
        setVisible(false);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await productApi.getListProducts({ page: 1, limit: 10 })
                setProductList(response.data.docs)
                setTotalEvent(response);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }

            try {
                const response = await productApi.getListEvents(1, 6)
                setEventListHome(response.data)
                setTotalEvent(response.total_count);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
            try {
                const response = await productApi.getCategory({ limit: 10, page: 1 });
                console.log(response);
                setCategories(response.data.docs);
            } catch (error) {
                console.log(error);
            }
            try {
                const data = { limit: 10, page: 1 };
                const response = await productApi.getProductsByCategory(data, "64a6a17dacf5748715605d66");
                console.log(response);
                setProductsPhone(response.data.docs);
                const response2 = await productApi.getProductsByCategory(data, "64a6a17dacf5748715605d66");
                console.log(response2);
                setProductsPC(response2.data.docs);
                const response3 = await productApi.getProductsByCategory(data, "64a6a17dacf5748715605d66");
                console.log(response3);
                setProductsTablet(response3.data.docs);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    return (
        <Spin spinning={false}>

            <div style={{ background: "#FFFFFF", overflowX: "hidden", overflowY: "hidden", paddingTop: 15, }} className="home">
                <div style={{ background: "#FFFFFF" }} className="container-home container banner-promotion">
                    <Row justify="center" align="top" key="1" >
                        <Col span={4} >
                            <ul className="menu-tree">
                                {categories.map((category) => (
                                    <li key={category.id} onClick={() => handleCategoryDetails(category._id)}>
                                        <div className="menu-category">
                                            {category.name}
                                            <RightOutlined />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col span={15}>
                            <Carousel autoplay className="carousel-image">
                                <div className="img">
                                    <img style={{ width: '100%', height: 300 }} src="https://cdn.tgdd.vn/2023/06/banner/800x200-800x200-4.png" alt="" />

                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300 }} src="https://cdn.tgdd.vn/2023/05/banner/800x200-800x200-60.png" />

                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300 }} src="https://cdn.tgdd.vn/2023/03/banner/800-200-800x200-17.png" alt="" />

                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300 }} src="https://cdn.tgdd.vn/2023/05/banner/800x200-800x200-59.png" alt="" />
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={5} >
                            <div class="right-banner image-promotion">
                                <a href="#" class="right-banner__item">
                                    <img src="https://cdn.tgdd.vn/2023/05/banner/Patin-390x97.png" alt="FOLD4 |FLIP4<br>Giá rẻ bất ngờ" loading="lazy" class="right-banner__img" />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://cdn.tgdd.vn/2023/05/banner/Xe-scooter-390x97.png" a lt="IPAD CHÍNH HÃNG<br>Lên đời từ 6.89 triệu" loading="lazy" class="right-banner__img" />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://cdn.tgdd.vn/2023/03/banner/800-200-800x200-17.png" alt="LENOVO IDEAPAD<br> THIẾT KẾ CỨNG CÁP" loading="lazy" class="right-banner__img" />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="	https://cdn.tgdd.vn/2023/06/banner/800x200-800x200-4.png" alt="LENOVO IDEAPAD<br> THIẾT KẾ CỨNG CÁP" loading="lazy" class="right-banner__img" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div >


                <div className="image-one" >
                    <div className="texty-demo">
                        {/* <Texty>Giờ Vàng</Texty> */}
                    </div>
                    <div className="texty-title">
                        <p>Sản Phẩm <strong style={{ color: "#3b1d82" }}>Giảm Sốc</strong></p>
                    </div>


                    <div className="list-products container" key="1">
                        <Row>
                            <Col>
                                <div className="title-category">
                                    <a href="" class="title">
                                        <h3>SẢN PHẨM NỔI BẬT NHẤT</h3>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}
                            className="row-product"
                        >
                            {productsPhone.map((item) => (
                                <Col
                                    xl={{ span: 6 }}
                                    lg={{ span: 8 }}
                                    md={{ span: 12 }}
                                    sm={{ span: 12 }}
                                    xs={{ span: 24 }}
                                    className='col-product'
                                    onClick={() => handleReadMore(item._id)}
                                    key={item._id}
                                >
                                    <div className="show-product">
                                        {item.image ? (
                                            <img
                                                className='image-product'
                                                src={item.image}
                                                alt='Product Image'
                                            />
                                        ) : (
                                            <img
                                                className='image-product'
                                                src={require('../../assets/image/NoImageAvailable.jpg')}
                                            />
                                        )}
                                        <div className='wrapper-products'>
                                            <Paragraph
                                                className='title-product'
                                                ellipsis={{ rows: 2 }}
                                            >
                                                {item.name}
                                            </Paragraph>
                                            <div className="price-amount">
                                                <Paragraph className='price-product'>
                                                    {numberWithCommas(item.price - item.promotion)} đ
                                                </Paragraph>
                                                {item.promotion !== 0 &&
                                                    <Paragraph className='price-cross'>
                                                        {numberWithCommas(item.price)} đ
                                                    </Paragraph>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    {item.promotion !== 0 &&
                                        <Paragraph className='badge' style={{ position: 'absolute', top: 10, left: 9 }}>
                                            <span>Giảm giá</span>
                                            <img src={triangleTopRight} />
                                        </Paragraph>
                                    }
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
                <div>

                </div>


                <div className="image-one" >

                </div>



                <div class="container">
                    <div class="ec-offer-inner ofr-img">
                        <div class="col-sm-6 ec-offer-content">
                            <div class="ec-offer-content-inner">

                            </div>
                        </div>
                    </div>
                </div>


            </div>


            <BackTop style={{ textAlign: 'right' }} />
        </Spin >
    );
};

export default Home;
