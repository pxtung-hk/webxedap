import React, { useState, useEffect } from "react";
import "./newsDetai.css";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, List, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import productApi from "../../apis/productApi";
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

const { Search } = Input;

const NewsDetai = () => {

    const [news, setNews] = useState([]);
    let history = useHistory();
    const { id } = useParams();


    useEffect(() => {
        (async () => {
            try {
                await productApi.getNewDetail(id).then((item) => {
                    console.log(item.data);
                    setNews(item.data);
                });

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])
    return (
        <div class="pt-5 container">
            <div className="container">
                <div className="news-details" dangerouslySetInnerHTML={{ __html: news.description }}></div>
            </div>

        </div>
    )
}

export default NewsDetai;
