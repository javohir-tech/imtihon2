import React, { useEffect, useState } from 'react'
import { Button, Modal, Input, Select, Form } from 'antd';
import './Home.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


export default function Home() {

    // modal js
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //get
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/models')
            .then((res) => res.json())
            .then((item) => setData(item.data))
    }, []);

    //brends get
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
            .then((res) => res.json())
            .then((item) => setBrands(item.data))
    }, []);
    console.log(brands);

    return (
        <div className='container'>
            <table id='customers'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>
                            <Button type="primary" onClick={showModal}>
                                Open Modal
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.brand_title}</td>
                            <td>
                                <Button type="primary" onClick={showModal}>
                                    <EditOutlined />
                                </Button>
                                <Button type="primary" danger onClick={showModal}>
                                    <DeleteOutlined />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="Basic usage" />
                <Form.Item label="Select">
                    <Select>
                        {brands.map((item, index) => (
                            <Select.Option value={item.id} key={index}>{item.title}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Button type="primary">Qo'shish</Button>
            </Modal>
        </div>
    )
}
