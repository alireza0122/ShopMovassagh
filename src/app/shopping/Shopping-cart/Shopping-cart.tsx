"use client";
import React, { useEffect } from 'react';
import { useSimpleStore, useUserStore, useOrderStore } from "@/store/usePaginationStore";
import styles from './Shopping-cart.module.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';

type Product = {
    id: string;
    title: string;
    description: string;
    urlImg: string;
    qty: number;
    price: number;
}

// ✅ خارج از ShoppingCart تعریف شده
const CartItemDisplay = ({ item }: { item: Product }) => {
    const removeFromCart = useSimpleStore((state) => state.removeFromCart);
    const setCount = useSimpleStore((state) => state.setCount);

    return (
        <div key={item.id} className={`d-flex ${styles['CartItemDisplay-item']}`}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="d-flex justify-content-between h-100 flex-column">
                            <h2 className="first-color fw-bold">{item.title}</h2>
                            <p className="text-justify text-over">توضیحات: {item.description}...</p>
                            <p className="first-color">قیمت تکی: {item.price.toLocaleString()}</p>
                            {item.qty > 1 && (
                                <p className="first-color">قیمت کل: {(item.price * item.qty).toLocaleString()}</p>
                            )}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-baseline gap-2">
                                    <p>تعداد:</p>
                                    <button
                                        onClick={() => useSimpleStore.getState().decreaseCount(item.id)}
                                        className={styles['CartItemDisplay-btn']}
                                    >-</button>
                                    <p className="first-color fs-20px fw-bold">{item.qty}</p>
                                    <button
                                        onClick={() => setCount(item)}
                                        className={styles['CartItemDisplay-btn']}
                                    >+</button>
                                </div>
                                <button
                                    className={styles['CartItemDisplay-btn']}
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    حذف از سبد خرید
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-0 m-0">
                        {item.urlImg && (
                            <Image
                                className={styles['CartItemDisplay-img']}
                                src={item.urlImg}
                                width={500}
                                height={500}
                                alt={item.title}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function ShoppingCart() {
    const router = useRouter();
    const cart = useSimpleStore((state) => state.cart);
    const addOrder = useOrderStore((state) => state.addOrder);
    const userName = useUserStore((state) => state.userName);
    const number = useUserStore((state) => state.number);

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/product');
        }
    }, [cart, router]);

    const totalPrice = cart.reduce((total: number, item: Product) => {
        return total + item.price * item.qty;
    }, 0);

    const handleSubmitOrder = () => {
        const newOrder = {
            id: Date.now(),
            userName,
            number,
            products: cart,
            totalPrice,
        };

        // ✅ مستقیم توی store ذخیره میشه - روی Vercel کار میکنه
        addOrder(newOrder);
        alert("سفارش ثبت شد");
        router.push('/product');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>سبد خرید شما</h2>
                    {cart.length === 0 ? (
                        <p>سبد خرید خالی است.</p>
                    ) : (
                        cart.map((item: Product) => (
                            <CartItemDisplay key={item.id} item={item} />
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="col-12 my-3">
                        <div className={styles['box-price']}>
                            <div className="d-flex justify-content-between align-items-center p-3">
                                <h4 className="fw-bold">جمع کل سبد خرید:</h4>
                                <h4 className="fw-bold first-color">{totalPrice.toLocaleString()} تومان</h4>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={handleSubmitOrder}
                                    className={`col-6 fw-bold ${styles['btn-price']}`}
                                >
                                    ثبت نهــایی
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShoppingCart;