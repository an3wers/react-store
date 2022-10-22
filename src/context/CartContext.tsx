import React, { createContext, useMemo, useState } from "react";
import { ICartItem } from "../types/types";

interface ICartContext {
    items: ICartItem[],
    summ: number,
    addItem: (item: ICartItem) => void,
    removeItem: (id: number) => void,
    removeAll: () => void,
}

export const CartContext = createContext<ICartContext>({
    items: [],
    addItem: () => { },
    removeItem: () => { },
    removeAll: () => { },
    summ: 0
})

export const CartProvide = ({ children }: { children: React.ReactNode }) => {

    const testDate: ICartItem[] = [
        { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', price: 109.95, count: 10 },
    ]

    const [items, setItems] = useState<ICartItem[]>([...testDate])

    const summ = useMemo(() => {
        let resultSumm = 0
        let tmpArr = items.map(el => {
            return el.price * el.count
        })
        tmpArr.forEach((el) => {
            resultSumm += el
        })
        return resultSumm
    }, [items])

    const addItem = (item: ICartItem) => {  
        setItems((prev) => {
            return [...prev, item]
        })
    }
    const removeItem = () => {

    }
    const removeAll = () => {

    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, removeAll, summ }}>
            {children}
        </CartContext.Provider>
    )
}