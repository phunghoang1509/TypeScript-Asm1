import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import { getAllCategory, addCategory, deleteCategory, updateCategory } from './api/category'
import AddProductPage from './pages/Admin/AddProduct'

import ProductManagementPage from './pages/Admin/Product'
import UpdateProductPage from './pages/Admin/UpdateProduct'
import HomePage from './pages/HomePage'
import AdminLayout from './pages/layouts/AdminLayout'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/Detail'
import { IProduct } from './types/products'
import React from 'react'
import CategoryPage from './pages/Categories/Category'
import AddCategoryPage from './pages/Categories/AddCategory'
import UpdateCategoryPage from './pages/Categories/UpdateCategory'
import { IPcategory } from './types/categories'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<IPcategory[]>([])
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
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getAllCategory().then(({ data }) => setCategories(data))
  }, [])
  const onHandleRemove1 = (id: number) => {
    deleteCategory(id).then(() => setCategories(categories.filter((item: IPcategory) => item.id !== id)))
  }
  
  const onHandleAdd1 = (category: IPcategory) => {
    addCategory(category).then(() => getAllCategory().then(({ data }) => setCategories(data)))
  }
  const onHandleUpdate1 = (category: IPcategory) => {
    updateCategory(category).then(() => getAllCategory().then(({ data }) => setCategories(data)))
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
          
            <Route path='categories'>
            <Route index element={<CategoryPage categories={categories} onRemove={onHandleRemove1} />} />
            <Route path='add' element={<AddCategoryPage onAdd={onHandleAdd1} />} />
            <Route path=':id/update' element={<UpdateCategoryPage onUpdate={onHandleUpdate1} categories={categories} />} />
            </Route>
            
        
        </Route>
      </Routes>

    </div >
  )
}

export default App
