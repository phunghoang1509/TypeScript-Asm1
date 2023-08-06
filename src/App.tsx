import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import AddProductPage from './pages/Admin/AddProduct'
import ProductManagementPage from './pages/Admin/Product'
import UpdateProductPage from './pages/Admin/UpdateProduct'
import HomePage from './pages/HomePage'
import AdminLayout from './pages/layouts/AdminLayout'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/Detail'
import { IProduct } from './types/products'
import React from 'react'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])
  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() => setProducts(products.filter((item: IProduct) => item.id !== id)))
  }
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() => getAllProduct().then(({ data }) => setProducts(data)))
  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() => getAllProduct().then(({ data }) => setProducts(data)))
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='products' element={<ProductPage products={products} onRemove={onHandleRemove} />} />
          <Route path='products/:id' element={<ProductDetailPage products={products} />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='products'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
          </Route>
        </Route>
      </Routes>

    </div >
  )
}

export default App
