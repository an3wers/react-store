import React, { createContext, useMemo, useState } from "react";
import { ICartItem } from "../types/types";

interface ICartContext {
    items: ICartItem[],
    summ: number,
    addItem: (item: ICartItem) => void,
    removeItem: (id: number) => void,
    removeAll: () => void,
    setCount: (id: number, count: number) => void
    
}

export const CartContext = createContext<ICartContext>({
    items: [],
    addItem: () => { },
    removeItem: (id) => { },
    removeAll: () => { },
    summ: 0,
    setCount: () => { }
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
    const removeItem = (id:number) => {
        // console.log('Remove from contex', id)
        // const tmp = items.filter(el => el.id !== id)
        setItems((prev) => {
            return prev.filter(el => el.id !== id)
        })
    }

    const setCount = (id: number, count: number) => {
        setItems((prev) => {
            return prev.map(el => {
                if(el.id === id) {
                    el.count = count
                }
                return el
            })
        })
    }

    const removeAll = () => {
        // TODO: make remove all
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, removeAll, summ, setCount }}>
            {children}
        </CartContext.Provider>
    )
}