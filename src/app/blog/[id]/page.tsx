"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "next/navigation";
import Image from "next/image";
import styles from './blog-id.module.css';
import Link from "next/link";

type Post = {
    id: string;
    img: string;
    title: string;
    category: string[];
    description: string;
};

export default function Page() {
    const {id} = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        axios.get("http://localhost:4000/posts")
            .then(res => {
                const filtered = res.data.filter(
                    (p: Post) => p.id.toString().trim() === id.trim()
                );
                setPost(filtered[0] || null);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!post) return <p>در حال بارگذاری...</p>;

    return (
        <div className="container my-lg-5 pt-3 pb-5">
            <div className="row">
                <div className="col-12  col-lg-6 d-flex justify-content-center  mb-2 my-lg-0 ">
                    <div className={` ${styles['img-box']}`}>
                        <Image className={`text-end ${styles['img']}`} src={post.img} alt={post.title} width={480}
                               height={320}/>
                    </div>
                </div>
                <div className="col-12  col-lg-6">
                    <div className="d-flex justify-content-between flex-column h-100">
                        <h1 className={`fw-bold first-color fs-20px`}>{post.title}</h1>
                        <p className={`text-justify text-color`}>{post.description}</p>
                        <div className="">
                            <p className={`${styles['border-bottom']} `}>
                                 هشتگ ها
                            </p>
                            <div className={` d-flex gap-3  `}>
                                {Array.isArray(post.category) &&
                                    post.category.map((item, index) => (
                                        <div key={index}>
                                            <Link href={`/blog`} className={`  ${styles['category']}`}>
                                                # {item}
                                            </Link>
                                        </div>
                                    ))}
                                <div className="">
                                    <Link className={` ps-2 ${styles['weblog']}`} href={`/blog`}>
                                        وبــــلاگ
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
