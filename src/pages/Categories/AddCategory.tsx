import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form' //import useForm hook
import { IPcategory } from '../../types/categories';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
interface IProps {
    onAdd: (category: IPcategory) => void
}

const AddCategoryPage = (props: IProps) => {
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        const newCategory = {
            id: values.id,
            name: values.name,
        }
        props.onAdd(newCategory);
        navigate('/admin/categories')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
             
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCategoryPage