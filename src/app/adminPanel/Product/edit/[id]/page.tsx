"use client"
import React, {useEffect, useState} from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import styles from './edit.module.css';
import {useParams, useRouter} from "next/navigation";
import axios from "axios";

type FormState = {
    title: string;
    price: string;
    qty: string;
    description: string;
    urlImg: string;
};

function Edit() {
    const [form, setForm] = useState<FormState>({
        title: "",
        price: "",
        qty: "",
        description: "",
        urlImg: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [imgError, setImgError] = useState(false);

    const {id} = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/product/${id}`);
                const data = res.data;
                setForm({
                    title: data.title || "",
                    price: data.price || "",
                    qty: data.qty || "",
                    urlImg: data.urlImg || "",
                    description: data.description || "",
                });
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
        if (e.target.name === "urlImg") setImgError(false);
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await axios.patch(`/api/product/${id}`, form);
            alert("محصول با موفقیت ویرایش شد");
            router.push("/adminPanel/Product");
        } catch (err) {
            console.log(err);
            alert("خطا در ویرایش محصول");
        } finally {
            setSubmitting(false);
        }
    };

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

    return (
        <div className="container-fluid">
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
                        <span className={styles['breadcrumb-link']} onClick={() => router.push('/adminPanel/Product')}>
                            محصولات
                        </span>
                        <span className={styles['breadcrumb-sep']}>/</span>
                        <span className={styles['breadcrumb-current']}>ویرایش</span>
                        <span className={styles['id-badge']}>#{id}</span>
                    </div>

                    {/* کارت فرم */}
                    <div className={styles['form-card']}>

                        {/* هدر کارت */}
                        <div className={styles['card-header']}>
                            <div>
                                <p className={styles['card-title']}>
                                    {form.title || "ویرایش محصول"}
                                </p>
                                <p className={styles['card-subtitle']}>در حال ویرایش اطلاعات محصول</p>
                            </div>
                        </div>

                        {/* پیش‌نمایش تصویر */}
                        {form.urlImg && !imgError ? (
                            <img
                                src={form.urlImg}
                                alt={form.title || "product"}
                                className={styles['img-preview']}
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className={styles['img-placeholder']}>
                                <span className={styles['img-placeholder-text']}>پیش‌نمایش تصویر</span>
                            </div>
                        )}

                        {/* بدنه فرم */}
                        <div className={styles['form-body']}>

                            <div className={styles['field']}>
                                <label className={styles['label']}>عنوان محصول</label>
                                <input
                                    className={styles['inp']}
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="نام محصول را وارد کنید"
                                />
                            </div>

                            <div className={styles['field']}>
                                <label className={styles['label']}>لینک تصویر</label>
                                <input
                                    className={styles['inp']}
                                    name="urlImg"
                                    value={form.urlImg}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className={styles['field-row']}>
                                <div className={styles['field']}>
                                    <label className={styles['label']}>قیمت (تومان)</label>
                                    <input
                                        className={styles['inp']}
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="مثلاً: 1200000"
                                        type="number"
                                    />
                                </div>
                                <div className={styles['field']}>
                                    <label className={styles['label']}>تعداد موجودی</label>
                                    <input
                                        className={styles['inp']}
                                        name="qty"
                                        value={form.qty}
                                        onChange={handleChange}
                                        placeholder="مثلاً: 10"
                                        type="number"
                                    />
                                </div>
                            </div>

                            <div className={styles['field']}>
                                <label className={styles['label']}>توضیحات</label>
                                <textarea
                                    className={styles['inp-textarea']}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="توضیحات محصول را بنویسید..."
                                />
                            </div>

                            <div className={styles['divider']}/>

                            <div className={styles['actions']}>
                                <button
                                    onClick={handleSubmit}
                                    className={styles['btn-submit']}
                                    disabled={submitting}
                                >
                                    {submitting ? "در حال ذخیره..." : "ثبت تغییرات"}
                                </button>
                                <button
                                    onClick={() => router.push("/adminPanel/Product")}
                                    className={styles['btn-cancel']}
                                >
                                    انصراف
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;