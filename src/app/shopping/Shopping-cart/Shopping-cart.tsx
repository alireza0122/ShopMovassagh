"use client"
import React, {useEffect} from 'react';
import {useSimpleStore} from "@/store/usePaginationStore";
import styles from './Shopping-cart.module.css'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useUserStore } from "@/store/usePaginationStore";
import { useOrderStore } from "@/store/usePaginationStore";
import axios from "axios";
type Product = {
    id: string;
    title: string;
    description: string;
    urlImg: string;
    qty: number;
    price: number;
}


function ShoppingCart() {
    const router = useRouter();
    const cartto = useSimpleStore((state) => state.cart);
    const removeFromCart = useSimpleStore((state) => state.removeFromCart);

    useEffect(() => {
        if (cartto.length === 0) {
            router.push('/product');
        }
    }, [cartto, router]);

    const CartItemDisplay = ({item}: { item: Product }) => {

        const handleDelete = () => {
            removeFromCart(item.id);
        };

        const setCount = useSimpleStore((state) => state.setCount);

        const handelResProductAdd = (item: Product) => {
            setCount(item);
        };

        //


        return (
            <div key={item.id} className={`d-flex ${styles['CartItemDisplay-item']} `}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="d-flex justify-content-between h-100 flex-column">
                                <h2 className={`first-color fw-bold `}>{item.title}</h2>
                                <p className={` text-justify text-over `}>توضیحات: {item.description}...</p>
                                <p className={`first-color `}>
                                    قیمت تکی :
                                    {item.price.toLocaleString()}
                                </p>
                                <p className={`first-color `}>

                                    {item.qty > 1 && (
                                        <>
                                            قیمت کل: {(item.price * item.qty).toLocaleString()}
                                        </>
                                    )}
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-baseline gap-2">
                                        <p>تعداد : </p>
                                        <div className="d-flex align-items-baseline gap-2">
                                            <div className="">
                                                <button onClick={() => {
                                                    const storeState = useSimpleStore.getState();
                                                    storeState.decreaseCount(item.id);
                                                }}
                                                        className={` ${styles['CartItemDisplay-btn']}`}>
                                                    -
                                                </button>
                                            </div>
                                            <div className="">
                                                <p className={`first-color fs-20px fw-bold `}> {item.qty}</p>
                                            </div>
                                            <div className="">
                                                <button onClick={() => handelResProductAdd(item)}
                                                        className={` ${styles['CartItemDisplay-btn']}`}>
                                                    +
                                                </button>
                                            </div>


                                        </div>
                                    </div>


                                    <button className={` ${styles['CartItemDisplay-btn']}`} onClick={handleDelete}>
                                        حذف از سبد خرید
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div className="col-6 p-0 m-0">
                            {item.urlImg &&
                                <Image className={` ${styles['CartItemDisplay-img']}`} src={item.urlImg} width={500}
                                       height={500} alt={item.title}/>}

                        </div>

                    </div>
                </div>
            </div>
        );
    };

    const cart = useSimpleStore((state) => state.cart);

    const totalPrice = cart.reduce((total, item :Product) => {
        return total + (item.price * item.qty);
    }, 0);



    const addOrder = useOrderStore((state) => state.addOrder);

    const userName = useUserStore((state) => state.userName);
    const number = useUserStore((state) => state.number);

    const handleSubmitOrder = async () => {

        const newOrder = {
            id: Date.now(),
            userName,
            number,
            products: cart,
            totalPrice,
        };

        try {

            await axios.post(
                "http://localhost:3001/orders",
                newOrder
            );

            addOrder(newOrder);

            alert("سفارش ثبت شد");

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className={`container`}>
            <div className="row">
                <div className="col-12">

                    <div>
                        <h2>سبد خرید شما</h2>
                        {cart.length === 0 ? (
                            <p>سبد خرید خالی است.</p>

                        ) : (
                            cart.map((item: Product) => (
                                <CartItemDisplay key={item.id} item={item}/>
                            ))
                        )}
                    </div>
                </div>

                {cart.length > 0 && (
                    <>
                        <div className="col-12 my-3">
                            <div className={` ${styles['box-price']}`}>
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h4 className="fw-bold">
                                        جمع کل سبد خرید:
                                    </h4>
                                    <h4 className="fw-bold first-color">
                                        {totalPrice.toLocaleString()} تومان
                                    </h4>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button onClick={handleSubmitOrder} className={`col-6  fw-bold ${styles['btn-price']}`}>
                                        ثبت نهــایی
                                    </button>
                                </div>

                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default ShoppingCart;
