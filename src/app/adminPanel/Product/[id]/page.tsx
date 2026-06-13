"use client"

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import styles from "./ProductId.module.css";
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";

type Product = {
    id: number;
    urlImg: string;
    title: string;
    description: string;
    qty: number;
    price: number;
};

export default function Page() {
    type Params = { id?: string };

    const {id} = useParams<Params>();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        axios
            .get("/data/db.json")
            .then(res => {
                const found = res.data.Product.find(
                    (p: Product) => p.id.toString().trim() === id.toString().trim()
                );
                setProduct(found || null);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-lg-2"><AdminPanelSidebar/></div>
                    <div className={`col-lg-10 ${styles['loading-state']}`}>
                        <div className={styles['loading-pulse']}/>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-lg-2"><AdminPanelSidebar/></div>
                    <div className={`col-lg-10 ${styles['empty-state']}`}>
                        <p>محصولی با این شناسه یافت نشد.</p>
                        <button className={styles['btn-back']} onClick={() => router.back()}>
                            بازگشت
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid pb-5">
            <div className="row g-0">

                <div className="col-lg-2">
                    <AdminPanelSidebar/>
                </div>

                <div className={`col-lg-10 col-12 ${styles['main-col']}`}>

                    {/* Breadcrumb */}
                    <div className={styles['breadcrumb-row']}>
                        <span className={styles['breadcrumb-link']} onClick={() => router.push('/adminPanel')}>
                            پنل مدیریت
                        </span>
                        <span className={styles['breadcrumb-sep']}>/</span>
                        <span className={styles['breadcrumb-link']} onClick={() => router.back()}>
                            محصولات
                        </span>
                        <span className={styles['breadcrumb-sep']}>/</span>
                        <span className={styles['breadcrumb-current']}>{product.title}</span>
                        <span className={styles['id-badge']}>#{product.id}</span>
                    </div>

                    {/* محتوای اصلی */}
                    <div className={styles['content-grid']}>

                        {/* تصویر */}
                        <div className={styles['img-box']}>
                            <img
                                src={product.urlImg}
                                alt={product.title}
                                className={styles['img']}
                            />
                        </div>

                        {/* اطلاعات */}
                        <div className={styles['info-col']}>

                            <h1 className={styles['product-title']}>{product.title}</h1>

                            <p className={styles['product-desc']}>{product.description}</p>

                            <div className={styles['divider']}/>

                            <div className={styles['meta-grid']}>
                                <div className={styles['meta-card']}>
                                    <span className={styles['meta-label']}>قیمت</span>
                                    <span className={styles['meta-val']}>
                                        {product.price?.toLocaleString()} تومان
                                    </span>
                                </div>
                                <div className={styles['meta-card']}>
                                    <span className={styles['meta-label']}>موجودی انبار</span>
                                    <span className={styles['meta-val']}>
                                        {product.qty} عدد
                                    </span>
                                </div>
                            </div>

                            <div className={styles['actions-row']}>
                                <button
                                    className={styles['btn-edit']}
                                    onClick={() => router.push(`/adminPanel/products/${product.id}/edit`)}
                                >
                                    ویرایش محصول
                                </button>
                                <button className={styles['btn-back']} onClick={() => router.back()}>
                                    بازگشت
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}