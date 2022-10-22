export const useFormatterPrice = (num: number): string => {

    // округление + форматирование
    num = +num.toFixed(2)

    return num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}