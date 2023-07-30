import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import {
  HomePage,
  DetailPage,
  ProductPage,
  AddProductPage,
  UpdateProduct,
} from "./pages";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  const removeProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    }).then(() => setProducts(products.filter((item) => item.id != id)));
  };
  const addProduct = (product) => {
    fetch(`http://localhost:3000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };
  const onUpdate = (product) => {
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/detail/:id"
          element={<DetailPage products={products} />}
        />
        <Route
          path="/admin/product"
          element={
            <ProductPage products={products} removeProduct={removeProduct} />
          }
        />
        <Route
          path="/admin/product/add"
          element={<AddProductPage addProduct={addProduct} />}
        />
        <Route
          path="/admin/product/update/:id"
          element={<UpdateProduct onUpdate={onUpdate} products={products} />}
        />
      </Routes>
    </>
  );
}

export default App;
