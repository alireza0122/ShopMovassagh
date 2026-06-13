"use client"
import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import styles from './Add.module.css';
import { useRouter } from "next/navigation";
import axios from "axios";
import Popup from "@/app/shared/Popup/Popup";


type PopupType = "success" | "error";

type PopupState = {
    message: string;
    type: PopupType;
};

function Page() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const [popup, setPopup] = useState<PopupState>({
        message: "",
        type: "success",
    });

    const [form, setForm] = useState<{
        id: string;
        title: string;
        price: string;
        qty: string;
        description: string;
        urlImg: string | File;
    }>({
        id: "",
        title: "",
        price: "",
        qty: "",
        description: "",
        urlImg: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const applyFile = (file: File) => {
        setForm(prev => ({ ...prev, urlImg: file }));
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) applyFile(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) applyFile(file);
    };

    const convertToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
        });

    const handleSubmit = async () => {
        if (!form.title || !form.price || !form.qty) {
            setPopup({ message: "لطفاً فیلدهای الزامی را پر کنید", type: "error" });
            return;
        }

        let imageBase64: string | File = form.urlImg;
        if (form.urlImg instanceof File) {
            try {
                imageBase64 = await convertToBase64(form.urlImg);
            } catch {
                setPopup({ message: "خطا در پردازش تصویر", type: "error" });
                return;
            }
        }

        await axios.post("/api/product", { ...form, urlImg: imageBase64 });
        setPopup({ message: "محصول با موفقیت اضافه شد", type: "success" });
        setTimeout(() => router.push("/adminPanel/Product"), 1500);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <aside className={styles.sidebar}>
                            <AdminPanelSidebar />
                        </aside>
                    </div>
                    <div className="col-10 ">
                            <Popup
                                message={popup.message}
                                type={popup.type}
                                onClose={() => setPopup({ message: "", type: "success" })}
                            />



                                <main className={styles.main}>
                                    <div className={styles.pageHeader}>
                                        <div className={styles.headerIcon}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h1 className={styles.pageTitle}>افزودن محصول جدید</h1>
                                            <p className={styles.pageSubtitle}>اطلاعات محصول را با دقت وارد کنید</p>
                                        </div>
                                    </div>

                                    {/* Form card */}
                                    <div className={styles.card}>

                                        {/* Upload zone */}
                                        <section className={styles.section}>
                                            <label className={styles.fieldLabel}>
                                <span className={styles.labelIcon}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                </span>
                                                تصویر محصول
                                            </label>
                                            <div
                                                className={`${styles.dropZone} ${isDragging ? styles.dragging : ""} ${preview ? styles.hasPreview : ""}`}
                                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                                onDragLeave={() => setIsDragging(false)}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFile}
                                                    className={styles.hiddenInput}
                                                />
                                                {preview ? (
                                                    <div className={styles.previewRow}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={preview} alt="پیش‌نمایش" className={styles.previewThumb} />
                                                        <div>
                                                            <p className={styles.previewName}>{fileName}</p>
                                                            <p className={styles.previewHint}>برای تغییر کلیک کنید</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={styles.uploadPlaceholder}>
                                                        <div className={styles.uploadIconWrap}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                                                        </div>
                                                        <p className={styles.uploadTitle}>تصویر را اینجا رها کنید</p>
                                                        <p className={styles.uploadHint}>یا کلیک کنید · PNG, JPG, WEBP</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <div className={styles.divider} />

                                        {/* Title */}
                                        <section className={styles.section}>
                                            <label className={styles.fieldLabel} htmlFor="title">
                                                <span className={styles.required}>*</span>
                                                عنوان محصول
                                            </label>
                                            <input
                                                id="title"
                                                className={styles.inp}
                                                name="title"
                                                value={form.title}
                                                onChange={handleChange}
                                                placeholder="مثلاً: کفش اسپرت مردانه نایکی"
                                            />
                                        </section>

                                        {/* Price + Qty */}
                                        <div className={styles.row2}>
                                            <section className={styles.section}>
                                                <label className={styles.fieldLabel} htmlFor="price">
                                                    <span className={styles.required}>*</span>
                                                    قیمت (تومان)
                                                </label>
                                                <input
                                                    id="price"
                                                    className={styles.inp}
                                                    name="price"
                                                    type="number"
                                                    value={form.price}
                                                    onChange={handleChange}
                                                    placeholder="۱۵۰,۰۰۰"
                                                />
                                            </section>
                                            <section className={styles.section}>
                                                <label className={styles.fieldLabel} htmlFor="qty">
                                                    <span className={styles.required}>*</span>
                                                    تعداد موجودی
                                                </label>
                                                <input
                                                    id="qty"
                                                    className={styles.inp}
                                                    name="qty"
                                                    type="number"
                                                    value={form.qty}
                                                    onChange={handleChange}
                                                    placeholder="۱۰"
                                                />
                                            </section>
                                        </div>

                                        {/* Description */}
                                        <section className={styles.section}>
                                            <label className={styles.fieldLabel} htmlFor="description">توضیحات محصول</label>
                                            <textarea
                                                id="description"
                                                className={styles.textarea}
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                placeholder="ویژگی‌ها، جنس، ابعاد و سایر اطلاعات محصول را بنویسید..."
                                            />
                                        </section>

                                        <div className={styles.divider} />

                                        {/* Actions */}
                                        <div className={styles.btnGroup}>
                                            <button className={styles.btnSubmit} onClick={handleSubmit}>
                                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                                افزودن محصول
                                            </button>
                                            <button
                                                className={styles.btnCancel}
                                                onClick={() => router.push("/adminPanel/Product")}
                                            >
                                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                                انصراف
                                            </button>
                                        </div>

                                    </div>
                                </main>
                    </div>
                </div>
            </div>


        </>

    );
}

export default Page;