import React from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IPcategory } from '../../types/categories';
import { Link } from 'react-router-dom'

interface DataType {
    key: string | number;
    id: number;
}
interface IProps {
    categories: IPcategory[],
    onRemove: (id: number) => void
}

const CategoryPage = (props: IProps) => {
    const removeCategory = (id: number) => {
        props.onRemove(id)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
       
        {
            title: 'Action',
            key: 'action',
            render: (record) => (

                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeCategory(record.id)}>Remove</Button>
                    <Button type="primary" ><Link to={`/admin/categories/${record.id}/update`}>Update</Link></Button>
                    
                </Space>
            ),
        },
    ];

    const data: DataType[] = props.categories.map((item: IPcategory) => {
        return {
            key: item.id,
            ...item
        }
    })

    return (
        <div>
            <h1>ProductManagement Page</h1>
            <Button type='primary'><Link to={'/admin/categories/add'}>Add Category</Link></Button>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    )
}

export default CategoryPage