import React, { useState, useEffect } from "react";
import "./contact.css";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";

const { Search } = Input;

const Contact = () => {
    const [delivery, setDelivery] = useState([]);
    let history = useHistory();

    return (
        <div className="wrap-categories">
            <div className="container mb-4">
                <div className="product-contact">
                    <div className="text-center mb-3">
                        <div style={{ marginTop:"20px",color: "#000", fontSize:"18px" }} className="title-content">
                            <img src={`${process.env.PUBLIC_URL}/client/img/dot-title-left.png`} alt="" /> Thông tin liên hệ <img src={`${process.env.PUBLIC_URL}/client/img/dot-title-right.png`} alt="" />
                            <hr style={{ borderColor: "black" }}  />
                            <p align="justify" style={{ fontSize: "16px", color: "#000" }}>DA STORE là một trong những doanh nghiệp hàng đầu hoạt động trong lĩnh vực kinh doanh các sản phẩm xe đạp. Thành lập từ năm 2020 đến nay, Công ty đã tạo được chỗ đứng vững chắc trên thị trường bán buôn, bán lẻ, trở thành thương hiệu quen thuộc và là đối tác tin cậy của nhiều bạn hàng trong nước và Quốc tế. Luôn lấy yếu tố hài hòa về lợi ích làm nền tảng, lãnh đạo Công ty hiểu rằng, niềm tin của khách hàng về giá thành, chất lượng và dịch vụ là sự sống còn của Công ty. Do vậy, mọi hoạt động kinh doanh của Công ty luôn hướng tới mục tiêu tôn trọng và bảo đảm quyền lợi cho khách hàng, chinh phục khách hàng bằng chất lượng sản phẩm và dịch vụ tối ưu. Để được phục vụ tốt nhất, Quý khách vui lòng liên hệ với chúng tôi theo các thông tin sau:</p>
                            <hr style={{ borderColor: "black" }}  />
                        </div>
                    </div>
                    <div className="pro-contact-content">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <p style={{ fontSize: "20px",textAlign:"center" }} className="title-content">DA STORE</p>
                                <p>Địa chỉ: <span><a href="https://goo.gl/maps/XXXD2vTa9Yfwjok36">235 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam</a></span></p>
                                <p>Hotline: <span><a href="tel: 086 935 8764">086 935 8764 -</a><a href="tel: 0916 190 744"> 0916 190 744</a></span></p>
                                <p>Email: <span><a href="mailto: pvlinh.20it9@vku.udn.vn">tienbodoi2002@gmail.com</a></span></p>
                                <p>Fanpage: <span><a href="https://www.facebook.com/laptoplt/">Công ty DA STORE</a></span></p>
                                <p>Website: <span><a href="#">DA STORE</a></span></p>
                            </div>
                            <div className="col-sm-12 col-md-6 text-center">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.8845962337627!2d108.25107529333566!3d15.97470262095603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e1!3m2!1svi!2s!4v1634551700603!5m2!1svi!2s" 
                                width="100%" height="300" style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
