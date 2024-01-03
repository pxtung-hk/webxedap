import React, { useState, useEffect } from "react";

import "./news.css";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, List, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import productApi from "../../apis/productApi";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import moment from 'moment';
const { Search } = Input;

const News = () => {
    const [news, setNews] = useState([]);
    let history = useHistory();

    const onFinish = async (values) => {
        // ...
    }
    const formatNewsTime = (createdAt) => {
        const formattedTime = moment(createdAt).format('DD/MM/YYYY HH:mm'); // Định dạng thời gian theo mẫu 'DD/MM/YYYY HH:mm'
        return formattedTime;
    };
    useEffect(() => {
        (async () => {
            try {
                await productApi.getNews().then((item) => {
                    const reversedNews = item.data.docs.reverse(); // Sắp xếp ngược lại mảng tin tức
                    setNews(item.data.docs);
                });
            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, []);

    const handleMouseEnter = (e) => {
        e.currentTarget.classList.add("zoomed");
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.classList.remove("zoomed");
    };
    const parseHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    return (
        <div className="pt-5 container" style={{ marginBottom: '100px' }}>
            <div className="news-list">
                {news.map((item, index) => (
                    <Link to={`/news/${item._id}`} key={index}>
                        <Card className="news-card">
                            <div
                                className="news-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="news-item-content">
                                    <div className="news-item-title">{item.name}</div>
                                    <div className="news-item-time">{formatNewsTime(item.createdAt)}</div>
                                    <div className="news-item-description">
                                        {parseHTML(item.description).substring(0, 50)} <p style={{ fontWeight: 'bold' }}>xem thêm ...</p>
                                    </div>
                                    <div className="news-item-image-container">
                                        <img src={item.image} alt="News Image" className="news-item-image" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default News;
