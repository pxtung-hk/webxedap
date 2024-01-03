// import React, { useState, useEffect } from 'react';
// import "./profile.css";
// import {
//     Col, Row, Typography, Spin, Button, PageHeader, Card, Badge, Divider, Input, Space,
//     Form, Pagination, Modal, Popconfirm, notification, BackTop, Tag, Breadcrumb, Select
// } from 'antd';
// import { SafetyOutlined, UserOutlined, HomeOutlined, PhoneOutlined, FormOutlined } from '@ant-design/icons';
// import QRCode from 'qrcode.react';
// import userApi from "../../apis/userApi";
// import { useHistory } from 'react-router-dom';
// import { DateTime } from "../../utils/dateTime";
// import ReactWeather, { useOpenWeather } from 'react-open-weather';

// const { confirm } = Modal;
// const { Option } = Select;
// const { Title } = Typography;
// const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

// const Profile = () => {
//     const [event, setEvent] = useState([]);
//     const [eventTemp, setEventTemp] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [visible, setVisible] = useState(false);
//     const [form] = Form.useForm();
//     const [userData, setUserData] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editedUserData, setEditedUserData] = useState({});

//     const history = useHistory();

//     // const { data, isLoading, errorMessage } = useOpenWeather({
//     //     key: '03b81b9c18944e6495d890b189357388',
//     //     lat: '21.028511',
//     //     lon: '105.804817',
//     //     lang: 'vi',
//     //     unit: 'metric', // values are (metric, standard, imperial)
//     // });

//     const handleEditProfile = () => {
//         setEditedUserData(userData);
//         setIsModalVisible(true);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const handleSave = async () => {
//         console.log(editedUserData);
//         const local = localStorage.getItem("user");
//         const user = JSON.parse(local);
//         editedUserData._id = user?._id;
//         try {
//             const response = await userApi.updateProfile(editedUserData);
//             notification.success({ message: 'Cập nhật thông tin thành công' });
//             setIsModalVisible(false);
//         } catch (error) {
//             console.log('Failed to update profile:', error);
//             notification.error({ message: 'Có lỗi xảy ra khi cập nhật thông tin' });
//         }
//     };

//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await userApi.getProfile();
//                 localStorage.setItem("user", JSON.stringify(response.user));
//                 setUserData(response.user);
//                 setLoading(false);
//             } catch (error) {
//                 console.log('Failed to fetch profile user:' + error);
//             }
//         })();
//         window.scrollTo(0, 0);
//     }, []);

//     return (
//         <div>
//             <Spin spinning={loading}>
//                 <div style={{ marginBottom: 25, marginTop: 25 }}>
//                     <div className='container'>
//                         <Row justify="center">
//                             <Col span="9" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
//                                 <Card hoverable={true} className="profile-card" style={{ padding: 0, margin: 0 }}>
//                                     <Row justify="center" style={{ padding: 20 }}>
//                                         <img src={userData.image} style={{ width: 150, height: 150 }}></img>
//                                     </Row>
//                                     <Row justify="center">
//                                         <Col span="24">
//                                             <Row justify="center">
//                                                 <strong style={{ fontSize: 18 }}>{userData.username}</strong>
//                                             </Row>
//                                             <Row justify="center">
//                                                 <p style={{ padding: 0, margin: 0, marginBottom: 5 }}>{userData.email}</p>
//                                             </Row>
//                                             <Row justify="center">
//                                                 <p>{userData.birthday}</p>
//                                             </Row>
//                                             <Divider style={{ padding: 0, margin: 0 }} ></Divider>
//                                             <Row justify="center" style={{ marginTop: 10 }}>
//                                                 <Col span="4">
//                                                     <Row justify="center">
//                                                         <p>{<UserOutlined />}</p>
//                                                         <p style={{ marginLeft: 5 }}>{userData.gender}</p>
//                                                     </Row>
//                                                 </Col>
//                                                 <Col span="8">
//                                                     <Row justify="center">
//                                                         <p>{<SafetyOutlined />}</p>
//                                                         <p style={{ marginLeft: 5 }}>{userData.type}</p>
//                                                     </Row>
//                                                 </Col>
//                                                 <Col span="8">
//                                                     <Row justify="center">
//                                                         <p>{<PhoneOutlined />}</p>
//                                                         <p style={{ marginLeft: 5 }}>{userData.phone}</p>
//                                                     </Row>
//                                                 </Col>
//                                             </Row>
//                                             <Row justify="center" style={{ marginTop: 20 }}>
//                                                 <Button type="primary" onClick={handleEditProfile}>
//                                                     Chỉnh sửa profile
//                                                 </Button>
//                                             </Row>
//                                         </Col>
//                                     </Row>
//                                 </Card>
//                             </Col>

//                             <Col span="6" style={{ marginTop: 20 }}>
//                                 {/* <ReactWeather
//                                     isLoading={isLoading}
//                                     errorMessage={errorMessage}
//                                     data={data}
//                                     lang="en"
//                                     locationLabel="Hà Nội"
//                                     unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
//                                     showForecast
//                                 /> */}
//                             </Col>
//                         </Row>
//                     </div>
//                 </div>
//             </Spin>

//             <Modal
//                 title="Chỉnh sửa profile"
//                 visible={isModalVisible}
//                 onCancel={handleCancel}
//                 onOk={handleSave}
//                 destroyOnClose
//             >
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     initialValues={editedUserData}
//                     onValuesChange={(changedValues, allValues) => {
//                         setEditedUserData(allValues);
//                     }}
//                 >
//                     <Form.Item
//                         label="Username"
//                         name="username"
//                         rules={[{ required: true, message: 'Please enter your username' }]}
//                     >
//                         <Input />
//                     </Form.Item>

//                     <Form.Item
//                         label="Email"
//                         name="email"
//                         rules={[{ required: true, message: 'Please enter your email' }]}

//                     >
//                         <Input disabled />
//                     </Form.Item>

//                     <Form.Item
//                         label="Số điện thoại"
//                         name="phone"
//                         rules={[{ required: true, message: 'Please enter your birthday' }]}
//                     >
//                         <Input />
//                     </Form.Item>

//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import "./profile.css";
import {
    Col, Row, Typography, Spin, Button, PageHeader, Card, Badge, Divider, Input, Space,
    Form, Pagination, Modal, Popconfirm, notification, BackTop, Tag, Breadcrumb, Select
} from 'antd';
import { SafetyOutlined, UserOutlined, HomeOutlined, PhoneOutlined, FormOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import userApi from "../../apis/userApi";
import axiosClient from "../../apis/axiosClient";
import { useHistory } from 'react-router-dom';
import { DateTime } from "../../utils/dateTime";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const { confirm } = Modal;
const { Option } = Select;
const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

const Profile = (userId) => {
    const [updateUserAvatar, setUpdateUserAvarta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [userData, setUserData] = useState({});
    const [editedUserData, setEditedUserData] = useState({
        newUsername: '',
        newPhone: '',
    });
    const [form2] = Form.useForm();
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [updatedUserData, setUpdatedUserData] = useState({});

    const history = useHistory();


    const handleFileAvarta = (event) => {
        setUpdateUserAvarta(event.target.files[0]);
    };


    const handleEditProfile = () => {
        setUpdatedUserData(userData);
        setIsEditProfileModalVisible(true);
    };

    const handleCancel = () => {
        setIsEditProfileModalVisible(false);
    };

    const handleSaveProfile = async () => {
        const { username, phone } = updatedUserData;
        const local = localStorage.getItem("user");
        const user = JSON.parse(local);
        try {
            const response = await userApi.updateProfile(user._id, { username, phone });
            console.log(response);
            notification.success({ message: 'Cập nhật thông tin thành công' });
            setIsEditProfileModalVisible(false);
        } catch (error) {
            console.log('Failed to update profile:', error);
            notification.error({ message: 'Có lỗi xảy ra khi cập nhật thông tin' });
        } finally {
            setLoading(false);
        }
    };
    //xử lý đổi mật khẩu
    const handleEditPassword = () => {
        setPasswordData(userData);
        setIsChangePasswordModalVisible(true);
    };
    const handleCancelEditPassword = () => {
        setIsChangePasswordModalVisible(false);
    };

    const handlePasswordInputChange = (e) => {
        setPasswordData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSavePassword = async () => {
        const { currentPassword, newPassword } = passwordData;
        const local = localStorage.getItem("user");
        const user = JSON.parse(local);
        try {
            const response = await userApi.updatePassword(user._id, { currentPassword, newPassword });
            console.log(response);
            notification.success({ message: 'Đổi mật khẩu thành công' });
            setIsChangePasswordModalVisible(false);
        } catch (error) {
            console.log('Failed to update password:', error);
            notification.error({ message: 'Có lỗi xảy ra khi đổi mật khẩu' });
        }
    };
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            const response = await axiosClient.post('/uploadFile', formData);
            console.log('Upload success:', response.data);
        } catch (error) {
            console.log('Upload failed:', error);
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                localStorage.setItem("user", JSON.stringify(response.user));
                setUserData(response.user);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch profile user:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginBottom: 25, marginTop: 25 }}>
                    <div className='container'>
                        <Row justify="center">

                            <Col span={9} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                <Card hoverable={true} className="profile-card" style={{ padding: 0, margin: 0 }}>
                                    <Row justify="center" style={{ padding: 20 }}>
                                        <img src={userData.image} style={{ width: 150, height: 150 }}></img>
                                    </Row>
                                    <Row justify="center">
                                        <Col span={24}>
                                            <Row justify="center">
                                                <Col span={24}>
                                                    <Row justify="center">
                                                        <strong style={{ fontSize: 18 }}>{updatedUserData.username}</strong>
                                                    </Row>
                                                    <Row justify="center">
                                                        <p style={{ padding: 0, margin: 0, marginBottom: 5 }}>{userData.email}</p>
                                                    </Row>
                                                    <Divider style={{ padding: 0, margin: 0 }}></Divider>
                                                    <Row justify="center" style={{ marginTop: 10 }}>
                                                        <Col span={8}>
                                                            <Row justify="center">
                                                                <p>{<UserOutlined />}</p>
                                                                <p style={{ marginLeft: 5 }}>{updatedUserData.username}</p>
                                                            </Row>
                                                        </Col>

                                                        <Col span={8}>
                                                            <Row justify="center">
                                                                <p>{<PhoneOutlined />}</p>
                                                                <p style={{ marginLeft: 5 }}>{updatedUserData.phone}</p>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row justify="center" style={{ marginTop: 20 }}>
                                                <Space>
                                                    <Button type="primary" onClick={handleEditProfile}>
                                                        Chỉnh sửa profile
                                                    </Button>
                                                    <Button type="primary" onClick={handleEditPassword}>
                                                        Đổi mật khẩu
                                                    </Button>
                                                    {/* <Button type="primary" onClick={handleFileChange}>
                                        đổi ảnh
                                        </Button> */}
                                                    {/* <div>
                                        <h2>Thay đổi hình đại diện</h2>
                                        <input type="file" onChange={handleFileChange} />
                                        <button onClick={handleUpload}>Tải lên</button>
                                        </div> */}
                                                </Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span="6" style={{ marginTop: 20 }}>
                                {/* <ReactWeather
                                    isLoading={isLoading}
                                    errorMessage={errorMessage}
                                    data={data}
                                    lang="en"
                                    locationLabel="Hà Nội"
                                    unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                                    showForecast
                                /> */}
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>

            <Modal
                title="Đổi mật khẩu"

                visible={isChangePasswordModalVisible}
                onCancel={handleCancelEditPassword}
                onOk={handleSavePassword}
                destroyOnClose>
                <Form

                    form={form2}
                    layout="vertical"
                    initialValues={passwordData}
                    onValuesChange={(changedValues, allValues) => {
                        setPasswordData(allValues);
                    }}
                >
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmNewPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Mật khẩu xác nhận không khớp với mật khẩu mới')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Chỉnh sửa profile"
                visible={isEditProfileModalVisible}
                onCancel={handleCancel}
                onOk={handleSaveProfile}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={updatedUserData}
                    onValuesChange={(changedValues, allValues) => {
                        setUpdatedUserData(allValues);
                    }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên ' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;