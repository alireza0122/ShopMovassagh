"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "next/navigation";
import Image from "next/image";
import styles from './product-id.module.css';
import Link from "next/link";

type Product = {
    id: number;
    urlImg: string;
    title: string;
    description: string;
    "qty": number,
    "price": number
};

export default function Page() {
    const {id} = useParams<{ id: string }>();
    const [Product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) return;

        axios
            .get("/data/db.json")
            .then(res => {
                const filtered = res.data.Product.filter(
                    (p: Product) =>
                        p.id.toString().trim() === id.toString().trim()
                );

                setProduct(filtered[0] || null);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!Product) return <p>در حال بارگذاری...</p>;

    return (
        <div className="container my-lg-5 pt-3 pb-5">
            <div className={`row ${styles['product']}`}>
                <div className="col-12  col-lg-6 d-flex justify-content-center  mb-2 my-lg-0 ">
                    <div className={` ${styles['img-box']}`}>
                        <Image className={`text-end ${styles['img']}`} src={Product.urlImg} alt={Product.title} width={500}
                               height={500}/>
                    </div>
                </div>
                <div className="col-12  col-lg-6">
                    <div className="d-flex justify-content-between flex-column h-100">
                        <h1 className={`fw-bold first-color fs-20px`}>{Product.title}</h1>
                        <p className={`text-justify text-color`}>{Product.description}</p>
                        <div className="">
                            <p className={`${styles['border-bottom']} `}>
                                هشتگ ها
                            </p>
                            <div className={` d-flex gap-3  `}>

                                <div className="">
                                    <Link className={` ps-2 ${styles['weblog']}`} href={`/product`}>
                                        محصـــولات
                                    </Link>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}
