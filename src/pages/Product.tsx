import { useEffect, useState } from "react"
import { IProduct } from "../types/products"
import React from "react"
interface IProps {
    products: IProduct[],
    onRemove: (id: number) => void
}
const ProductPage = (props: IProps) => {
   
    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
        setData(props.products)
    }, [props])
    const removeProduct = (id: number) => {
        props.onRemove(id)
    }
    return (
        <div>
            <h1>Product Page</h1>
            {
                data.map(product => {
                    return (
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <button onClick={() => removeProduct(product.id)}>Remove</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductPage