import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { ICartItem } from "../../types/types"
import { useFormatterPrice } from "../../utlis/helpers"
import { Link } from 'react-router-dom'

interface ICartProduvtPreviewProps {
    item: ICartItem,
    remove: (id: number | undefined) => void,
    setCount: (id: number, count: number) => void
}
const CartProductPreview: React.FC<ICartProduvtPreviewProps> = ({ item, remove, setCount }) => {
    const [selectedValue, setSelectedValue] = useState(item.count)

    const selectHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        
        setSelectedValue(() => {
            return +event.target.value
        })

        if(item.id) {
            setCount(item.id, +event.target.value)
        }

    }

    return (
        <div className=" flex space-x-4 py-10">
            <div className=" w-20 h-auto shrink-0">
                <img className="w-full h-full object-contain" src={item.image} alt={item.title} />
            </div>
            <div className=" grow space-y-1">
                <div>
                    <Link to={`/${item.id}`}>{item.title}</Link>
                </div>
                <div>{useFormatterPrice(item.price)}</div>
            </div>
            <div className="w-20">
                <select id="counts" value={selectedValue} onChange={selectHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {
                        [... new Array(10)].map((_, index) => {
                            return <option key={index} value={index + 1}>{index + 1}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <button onClick={() => remove(item.id)} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6b7280" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CartProductPreview