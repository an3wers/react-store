const CartEmptyState = () => {
    return (
        <div className=" py-6 px-6 text-center space-y-4 rounded-3xl bg-gray-200">
            <div className=" text-2xl font-semibold">
                Your cart is empty!
            </div>
            <div>Add something to make me happy</div>
        </div>
    )
}

export default CartEmptyState