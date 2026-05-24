"use client"
import React, {useEffect, useState} from 'react';
import styles from './blog-banner.module.css'
import Image from "next/image";
import Link from "next/link";
import axios from "axios";


type posts = {
    id: number;
    img: string;
    title: string;
    category: string [];
    description: string;
}


function BlogBanner() {


    const [posts, setPosts] = useState<posts[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = ["همه", "طراحی", "برنامه نویسی", "بازاریابی"];

    const [activeCategory, setActiveCategory] = useState("همه");

    const filteredPosts =

        activeCategory === "همه"
            ? posts
            : posts.filter((post) => post.category.includes(activeCategory));

    useEffect(() => {

        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        axios
            .get("/api/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className={`container mb-5`}>
            <div className="row">
                <div className="col-12">
                    <div className={`d-flex gap-3 my-3`}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`${styles.btnLogin} ${
                                    activeCategory === cat ? styles.active : ""
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-12">
                    <div className={`row`}>
                        {loading
                            ?
                            Array.from({length: 7}).map((_, i) => (
                                <div
                                    key={i}
                                    className={`col-4 col-sm-6 col-lg-4 my-2 d-flex flex-column gap-2`}
                                >

                                    <div className={` ${styles['item-loading']}`}>

                                        <div>
                                            <h3 className={`  ${styles['item-loading-h3']} fw-bold  text-over o1 fs-18px mt-2`}></h3>
                                            <p className={` ${styles['item-loading-p']} text-justify text-over o2 text-color`}>
                                            </p>
                                            <p className={` ${styles['item-loading-p']} text-justify text-over o2 text-color`}>
                                            </p>
                                            <div className={styles.categories}>
                                                    <span className={` ${styles['item-loading-span']}`}></span>
                                                    <span className={` ${styles['item-loading-span']}`}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                            :
                            filteredPosts.map((post) => (
                                <div className={`col-12 col-sm-6 col-lg-4 my-2`} key={post.id}>
                                    <Link href={`/blog/${post.id}`} className={styles.linkItem}>

                                        <div className={` ${styles['item']}`}>
                                            <div className={` ${styles['item-box-img']}`}>
                                                <Image className={styles.imgItem} src={post.img} alt={`img-item`}
                                                       width={500}
                                                       height={500}/>
                                            </div>

                                            <div>
                                                <h3 className={`fw-bold  text-over o1 fs-18px mt-2`}>{post.title}</h3>
                                                <p className={` text-justify text-over o2 text-color`}>
                                                    {post.description}
                                                </p>
                                                <div className={styles.categories}>
                                                    {post.category.map((cat, index) => (
                                        <span key={index} className={styles.category}>#{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
                ))}
            </div>

        </div>
</div>

</div>
)
    ;
}

export default BlogBanner;