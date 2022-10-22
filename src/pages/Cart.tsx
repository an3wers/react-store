const Cart: React.FC = () => {
    return (
        <div className=" container">
            <div className=" grid grid-cols-12">
                <div className="col-start-1 col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                    <h1 className="text-center text-4xl font-bold my-8">Корзина</h1>
                    {/* empty state */}
                    <div className=" py-6 px-6 text-center space-y-4 rounded-3xl bg-gray-200">
                        <div className=" text-2xl font-semibold">
                            Your cart is empty!
                        </div>
                        <div>Add something to make me happy</div>
                    </div>
                    {/*  # empty state */}
                </div>
            </div>
        </div>
    )
}

export default Cart