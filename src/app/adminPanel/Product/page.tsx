'use client';

import React, { useEffect, useState } from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import axios from "axios";
import styles from './Product.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Product = {
    id: string;
    title: string;
    description: string;
    urlImg: string;
    qty: number;
    price: number;
};

function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/api/product");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteProduct = async (id: string, title: string) => {
        const confirmDelete = window.confirm(`آیا از حذف ${title} مطمئن هستی؟`);
        if (!confirmDelete) return;
        try {
            await axios.delete(`/api/product/${id}`);
            setProducts((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container-fluid p-0" style={{ direction: 'rtl' }}>
            <div className="d-flex min-vh-100">

                {/* Sidebar */}
                <aside className={styles['sidebar-wrap']}>
                    <AdminPanelSidebar />
                </aside>

                {/* Main */}
                <main className={`flex-grow-1 p-4 ${styles.main}`}>

                    {/* Page header */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h2 className={`mb-0 ${styles.pageTitle}`}>محصولات</h2>
                            {!loading && (
                                <small className="text-muted">{filteredProducts.length} محصول</small>
                            )}
                        </div>
                        <Link href="/adminPanel/Product/Add" className={styles.productBtnAdd}>
                            <span className={styles.plusIcon}>+</span>
                            افزودن محصول
                        </Link>
                    </div>

                    {/* Search */}
                    <div className={`mb-4 ${styles['search-box']}`}>
                        <FontAwesomeIcon icon={faSearch} className={styles['product-search-icon']} />
                        <input
                            type="text"
                            placeholder="جست‌وجو در محصولات..."
                            className={styles['product-search']}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
                            <div className={`mb-3 ${styles.spinner}`} />
                            <span>در حال بارگذاری...</span>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
                            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 36, marginBottom: 12, opacity: 0.3 }} />
                            <span>محصولی پیدا نشد</span>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className={`d-flex align-items-center gap-3 p-3 ${styles.itemBox}`}>

                                    {/* Image */}
                                    <div className={`flex-shrink-0 ${styles.imgWrap}`}>
                                        <img
                                            src={item.urlImg?.trim() ? item.urlImg : "/placeholder.png"}
                                            alt={item.title}
                                            className={`w-100 h-100 ${styles.itemImg}`}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h3 className={`mb-1 ${styles.itemTitle}`}>{item.title}</h3>
                                        <p className={`mb-2 ${styles.itemDesc}`}>{item.description}</p>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className={styles.itemPrice}>
                                                {item.price.toLocaleString()} تومان
                                            </span>
                                            <span className={`${styles.itemQty} ${item.qty === 0 ? styles.outOfStock : ''}`}>
                                                موجودی: {item.qty}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="d-flex flex-column gap-2 flex-shrink-0">
                                        <Link
                                            href={`/adminPanel/Product/edit/${item.id}`}
                                            className={`${styles.btnDel} ${styles.btnEdit}`}
                                            title="ویرایش"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} className={styles['btnDel-icon']} />
                                        </Link>
                                        <Link
                                            href={`/adminPanel/Product/${item.id}`}
                                            className={`${styles.btnDel} ${styles.btnView}`}
                                            title="مشاهده"
                                        >
                                            <FontAwesomeIcon icon={faEye} className={styles['btnDel-icon']} />
                                        </Link>
                                        <button
                                            className={`${styles.btnDel} ${styles.btnDelete}`}
                                            onClick={() => handleDeleteProduct(item.id, item.title)}
                                            title="حذف"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className={styles['btnDel-icon']} />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Product;