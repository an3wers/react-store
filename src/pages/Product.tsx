import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { IProduct } from '../types/types'
import SpinnerPage from '../components/UI/spinner/spinnerPage'


const ProductPage = () => {
    const params = useParams()

    const [product, setProduct] = useState<IProduct | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log('params', params.productId)

    useEffect(() => {

        fetchProduct(params.productId)

    }, [])

    async function fetchProduct(id: string | undefined) {
        // https://fakestoreapi.com/products/
        try {
            setIsLoaded(false)
            const resp = await axios.get(`https://fakestoreapi.com/products/${id}`)
            console.log(resp)
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
            {isLoaded ? <div>
                Товар:
            </div>
                : <SpinnerPage />}

        </div>
    )
}

export default ProductPage