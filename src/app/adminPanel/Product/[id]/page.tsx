"use client"

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductId.module.css";
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";

type Post = {
    id: number;
    title: string;
    "urlImg": string,
    "description": string,
    "qty": number,
    "price": number
};

export default function Page() {

    const { id } = useParams<{ id: string }>();

    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {

        axios.get(`http://localhost:3001/Product/${id}`)
            .then(res => {

                setPost(res.data);

            })
            .catch(err => console.error(err));

    }, [id]);

    if (!post) return <p>در حال بارگذاری...</p>;

    return (
        <div className="container   pb-5 ">

            <div className="row">
                <div className="col-1">
                    <AdminPanelSidebar />
                </div>

                <div className="col-8 col-lg-8 d-flex justify-content-end  my-lg-5 mx-auto">


                    <div className={styles['img-box']}>

                        <Image
                            className={`text-end ${styles['img']}`}
                            src={post.urlImg}
                            alt={post.title}
                            width={480}
                            height={320}
                        />

                    </div>

                </div>

                <div className="col-12 col-lg-8 mx-auto ">

                    <div className="d-flex justify-content-between flex-column w-100 ">

                        <h1 className="fw-bold first-color fs-24px">
                            {post.title}
                        </h1>

                        <p className="text-justify text-color">
                            {post.description}
                        </p>

                        <p>

                            قیــمت :
                            {post.price.toLocaleString()}
                        </p>
                        <p>
                            تـــعداد:
                            {post.qty}
                        </p>

                    </div>

                </div>

            </div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
        </div>
    );
}