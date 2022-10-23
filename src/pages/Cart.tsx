import { useContext } from "react"
import CartEmptyState from "../components/Cart/EmptyState"
import CartProductPreview from "../components/Cart/ProductPreview"
import { CartContext } from "../context/CartContext"

const Cart: React.FC = () => {

    const { items, removeItem, setCount } = useContext(CartContext)

    const removeHandler = (id: number | undefined) => {
        if(id) {
            removeItem(id)
        }
    }

    const setCountHandler = (id: number, count: number) => {
        setCount(id, count)
    }

    return (
        <div className=" container">
            <div className=" grid grid-cols-12">
                <div className="col-start-1 col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                    <h1 className="text-center text-4xl font-bold my-8">Корзина</h1>
                    {
                        items.length 
                                ? 
                                <div className="flex flex-col divide-y">
                                    {items.map(el => <CartProductPreview key={el.id} item={el} setCount={setCountHandler} remove={removeHandler} />)}
                                </div>
                                : <CartEmptyState />
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart