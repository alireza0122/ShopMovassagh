"use client"
import React, {useEffect, useState} from 'react';
import styles from './product-banner.module.css'
import Image from "next/image";
import axios from "axios";
import {useSimpleStore} from "@/store/usePaginationStore";
import Link from "next/link";


type Product = {
    id: number;
    title: string;
    description: string;
    urlImg: string;
    qty: number;
    price: number;
}

function ProductBanner() {
    const [product, setproduct] = useState<Product[]>([]);
    const setCount = useSimpleStore((state) => state.setCount);
    const cart = useSimpleStore((state) => state.cart);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        const fetchProducts = axios.get("http://localhost:3001/Product");
        const delay = new Promise((resolve) =>
            setTimeout(resolve, 1000)
        );

        Promise.all([fetchProducts, delay])
            .then(([res]) => {
                setproduct(res.data);
            })
            .catch(() => {
                setError("خطا در دریافت محصولات");
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);



    const handelResProductAdd = (item: Product) => {
        setCount(item);
    };


    //
    const animateToCart = (img: HTMLImageElement) => {
        const cartIcon = document.getElementById("cart-icon");
        if (!cartIcon) return;

        const imgRect = img.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        const clone = img.cloneNode(true) as HTMLImageElement;

        clone.style.position = "fixed";
        clone.style.top = `${imgRect.top}px`;
        clone.style.left = `${imgRect.left}px`;
        clone.style.width = `100px`;
        clone.style.height = `100px`;
        clone.style.borderRadius = "50%";
        clone.style.transition = "all 0.9s cubic-bezier(0.65, 0, 0.35, 1)";
        clone.style.zIndex = "9999";

        document.body.appendChild(clone);

        requestAnimationFrame(() => {
            clone.style.top = `${cartRect.top}px`;
            clone.style.left = `${cartRect.left}px`;
            clone.style.width = "20px";
            clone.style.height = "20px";
            clone.style.opacity = "0";
        });

        setTimeout(() => {
            clone.remove();
        }, 900);
    };





    return (
        <div className={styles['product-banner-box']}>


            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3 mt-2  ">
                        <div className="d-flex ">
                            <h1 className={`text-color border-1 my-3 ${styles['product-border-bottom']}`}>
                                محــصولات ما
                            </h1>
                        </div>
                    </div>
                    {
                        loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="col-4">
                                    <div className={`my-3 p-2 ${styles['product-banner-item']}`}>

                                        <div className={styles.skeletonImage}></div>

                                        <div className="my-3">
                                            <div className={styles.skeletonTitle}></div>
                                            <div className={styles.skeletonText}></div>
                                            <div className={styles.skeletonText}></div>
                                            <div className={styles.skeletonPrice}></div>
                                            <div className={styles.skeletonButton}></div>
                                        </div>

                                    </div>
                                </div>
                            ))
                            :
                        product.map((item) => {
                        const cartItem = cart.find((cartItem) => cartItem.id === item.id);
                        return (
                            <div key={item.id} className="col-4 product-card">
                                <div className={`my-3 ${styles['product-banner-item']}`}>

                                    <Image
                                        className={`  ${styles['product-banner-img']} `}
                                        src={item.urlImg}
                                        alt={item.title}
                                        width={300}
                                        height={300}
                                    />


                                    <div className={`my-3 ${styles['product-banner-box']}`}>

                                        <h1 className={`first-color fs-22px  fw-bold text-over o1`}>
                                            {item.title}
                                        </h1>
                                        <p className={`text-color fs-16px text-justify text-over o2 `}>
                                            {item.description}
                                        </p>

                                        <p className={`text-color fs-14px text-justify text-over o2 `}>
                                            {item.qty}
                                            تعداد در انبار موجود است .
                                        </p>
                                        <p className={` ${styles['product-text']} fs-16px`}>
                                            {item.price.toLocaleString()}

                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex gap-1">
                                                {cartItem && cartItem.qty >= 1

                                                    ?
                                                    <Link
                                                        href={`/shopping`}>
                                                        <button
                                                            className={`${styles['btn-product-add']} fs-16px`}
                                                        >
                                                            مشاهده در سبد خرید
                                                        </button>
                                                    </Link>
                                                    :
                                                    <button
                                                        onClick={(e) => {
                                                            const card = e.currentTarget.closest(".product-card") as HTMLElement;
                                                            const img = card?.querySelector("img") as HTMLImageElement;

                                                            if (img) animateToCart(img);

                                                            handelResProductAdd(item);
                                                        }}

                                                            className={`${styles['btn-product-add']} fs-16px`}>
                                                        افزودن به سبد خرید
                                                    </button>

                                                }


                                                <Link href={`/product`}>
                                                    <button
                                                        className={`${styles['btn-product-add']} fs-16px`}
                                                    >
                                                        مشاهده
                                                    </button>

                                                </Link>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        )
                        })
                    }

                </div>
            </div>


        </div>
    );
}

export default ProductBanner;