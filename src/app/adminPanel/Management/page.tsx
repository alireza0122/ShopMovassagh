"use client"

import React, { useState } from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import styles from "./Management.module.css";
import { useOrderStore } from "@/store/usePaginationStore";
type Product = {
    id: string;
    title: string;
    price: number;
    qty: number;
    description: string;
    urlImg: string;
};

type OrderType = {
    id: number;
    totalPrice: string;
    userName: string;
    products: Product[];
};

function getInitials(name: string): string {
    return name.slice(0, 2).toUpperCase();
}

function Page() {
    const orders = useOrderStore((state) => state.orders) as OrderType[];
    const [confirmed, setConfirmed] = useState<Set<number>>(new Set());



    const handleConfirm = (id: number) => {
        setConfirmed(prev => new Set(prev).add(id));
    };

    return (
        <div className="container-fluid">
            <div className="row g-0">

                <div className="col-lg-2">
                    <AdminPanelSidebar/>
                </div>

                <div className={`col-lg-10 col-12 ${styles['main-col']}`}>
                    <div className={styles['page-header']}>
                        <h5 className={styles['page-title']}>مدیریت سفارش‌ها</h5>
                        <span className={styles['order-count-badge']}>{orders.length} سفارش</span>
                    </div>

                    <div className={styles['orders-list']}>
                        {orders.map((item) => (
                            <div key={item.id} className={`${styles['order-card']} ${confirmed.has(item.id) ? styles['order-confirmed'] : ''}`}>

                                {/* Header کارت */}
                                <div className={styles['order-head']}>
                                    <div className={styles['order-user']}>
                                        <div className={styles['avatar']}>
                                            {getInitials(item.userName)}
                                        </div>
                                        <div>
                                            <p className={styles['order-username']}>{item.userName}</p>
                                            <p className={styles['order-id']}>سفارش #{item.id}</p>
                                        </div>
                                    </div>
                                    <div className={styles['total-badge']}>
                                        جمع: {Number(item.totalPrice).toLocaleString()} ت
                                    </div>
                                </div>

                                {/* لیست محصولات */}
                                <div className={styles['products-list']}>
                                    {item.products?.map((product, index) => (
                                        <div key={index} className={styles['product-row']}>
                                            <img
                                                src={product.urlImg}
                                                alt={product.title}
                                                className={styles['product-img']}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                            <div className={styles['product-info']}>
                                                <p className={styles['product-title']}>{product.title}</p>
                                                <div className={styles['product-meta']}>
                                                    <span className={styles['meta-item']}>
                                                        قیمت واحد:
                                                        <span className={styles['meta-val']}>
                                                            {product.price.toLocaleString()} ت
                                                        </span>
                                                    </span>
                                                    <span className={styles['meta-item']}>
                                                        تعداد:
                                                        <span className={styles['meta-val']}>{product.qty}</span>
                                                    </span>
                                                </div>
                                                {product.description && (
                                                    <p className={styles['product-desc']}>{product.description}</p>
                                                )}
                                            </div>
                                            <div className={styles['product-total']}>
                                                {(product.qty * product.price).toLocaleString()} ت
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer کارت */}
                                <div className={styles['order-footer']}>
                                    <button
                                        className={`${styles['btn-confirm']} ${confirmed.has(item.id) ? styles['btn-confirmed'] : ''}`}
                                        onClick={() => handleConfirm(item.id)}
                                        disabled={confirmed.has(item.id)}
                                    >
                                        {confirmed.has(item.id) ? '✓ تایید شد' : `تایید سفارش ${item.userName}`}
                                    </button>
                                    <div className={styles['total-row']}>
                                        <span className={styles['total-label']}>جمع کل:</span>
                                        <span className={styles['total-val']}>
                                            {Number(item.totalPrice).toLocaleString()} تومان
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))}

                        {orders.length === 0 && (
                            <div className={styles['empty-state']}>
                                <p>سفارشی موجود نیست</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Page;