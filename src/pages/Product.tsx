import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { IProduct } from '../types/types'
import SpinnerPage from '../components/UI/spinner/spinnerPage'
import SingleProduct from '../components/Product/SingleProduct'


const ProductPage = () => {
    const params = useParams()

    const [product, setProduct] = useState<IProduct | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetchProduct(params.productId)
    }, [])

    async function fetchProduct(id: string | undefined) {
        // https://fakestoreapi.com/products/
        try {
            setIsLoaded(false)
            const resp = await axios.get<IProduct>(`https://fakestoreapi.com/products/${id}`)
            setProduct(() => {
                return resp.data
            })

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoaded(true)
        }
    }

    return (
        <div className="container">
            {isLoaded && product
                ? <SingleProduct item={product} />
                : <SpinnerPage />}

        </div>
    )
}

export default ProductPage