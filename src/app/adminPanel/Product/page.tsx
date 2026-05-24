'use client';

import React, { useEffect, useState } from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import axios from "axios";
import Image from "next/image";
import styles from './Product.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Product = {
    id: number  ;
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
                const res = await axios.get("http://localhost:3001/Product");
                setProducts(res.data);
            } catch (err) {
                console.error("خطا در دریافت محصولات:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );



    const handleDeleteProduct = async (id: number, title: string) => {

        const confirmDelete = window.confirm(
            `آیا از حذف محصول ${title} مطمئن هستید؟`
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`http://localhost:3001/Product/${id}`);

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
            );

        } catch (error) {

            console.log(error);

        }
    };



    return (
        <div className="container">
            <div className="row">

                <div className="col   ">
                    <AdminPanelSidebar />
                </div>
                <div className="col-11 mt-5">
                    <h2 className="font-bold mb-4">محصولات</h2>
                </div>
                <div className="col-8 mx-auto ">
                    <div className="d-flex justify-content-between ">
                        <div className={styles['search-box']}>
                            <input
                                type="text"
                                placeholder="فـــارسی جست و جو کنید ... "
                                className={styles['product-search']}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <FontAwesomeIcon
                                icon={faSearch}
                                className={styles['product-search-icon']}
                            />

                        </div>
                        <Link href={`/adminPanel/Product/Add`} className={` fs-20px  p-2 ${styles['productBtnAdd']}`}>
                            افزودن محصــول +
                        </Link>
                    </div>


                </div>

                <div className="col-8  mx-auto  ">
                    <div className="d-flex justify-content-start">



                            {loading ? (
                                <p>در حال بارگذاری...</p>
                            ) : (
                                <div>

                                    {filteredProducts.length === 0 ? (
                                        <p>محصولی پیدا نشد </p>
                                    ) : (

                                        filteredProducts.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`my-4 p-3 ${styles['itemBox']}`}
                                            >

                                                <div className="d-flex justify-content-between p-1 rounded align-items-center">

                                                    <img
                                                        src={item.urlImg}
                                                        alt={item.title}
                                                        width={200}
                                                        height={120}
                                                        className="object-cover rounded"
                                                    />

                                                    <div className="mx-4 ">
                                                        <h3 className="font-bold fs-20px mt-2">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-color fs-16px text-over o1">
                                                            {item.description}
                                                        </p>

                                                        <p>{item.price.toLocaleString()} تومان</p>
                                                        <p>موجودی: {item.qty}</p>

                                                    </div>
                                                    <div className="d-flex flex-column justify-content-end gap-2 mt-3 ">

                                                        <Link href={`/adminPanel/Product/edit/${item.id}`} className={styles['btnDel']}>
                                                            <FontAwesomeIcon icon={faPenToSquare}
                                                                             className={`fs-16px ${styles['btnDel-icon']}`}
                                                            />
                                                        </Link>

                                                        <Link href={`/adminPanel/Product/${item.id}`} className={styles['btnDel']}>
                                                            <FontAwesomeIcon icon={faEye}
                                                                             className={`fs-16px ${styles['btnDel-icon']}`}
                                                            />
                                                        </Link>
                                                        <button
                                                            className={styles['btnDel']}
                                                            onClick={() => handleDeleteProduct(item.id, item.title)}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className={`fs-16px ${styles['btnDel-icon']}`}
                                                            />
                                                        </button>
                                                    </div>



                                                </div>


                                            </div>
                                        ))
                                    )}

                                </div>
                            )}


                    </div>
                </div>

            </div>
        </div>
    );
}

export default Product;