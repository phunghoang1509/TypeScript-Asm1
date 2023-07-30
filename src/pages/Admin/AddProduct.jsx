import React, { useState } from 'react'

const AddProductPage = ({ addProduct }) => {
    const [data, setData] = useState({})
    const onHandleChange = (event) => {
        const { name , value} = event.target;
        const newData = { ...data,[name]: value }
        setData(newData);
    } 
    const onHandleSubmit = (e) => {
        e.prevenDefault();
        addProduct(data);
    }
  return (
    <div>
        <form action="" onSubmit={onHandleSubmit}>
            <input type="text" placeholder='Enter Product Name' onChange={onHandleChange} name='name' />
            <input type="text" placeholder='Enter Product Price' onChange={onHandleChange} name='price' />
            <button>Add Product</button>
        </form>
    </div>
  )
}

export default AddProductPage