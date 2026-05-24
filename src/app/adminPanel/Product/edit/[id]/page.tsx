"use client"
import React, {useEffect, useState} from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import Image from "next/image";
import styles from './edit.module.css'
import {useParams, useRouter} from "next/navigation";


function Edit() {


    const [form, setForm] = useState({
        title: "",
        price: "",
        qty: "",
        description: "",
    });

    const {id} = useParams();


    useEffect(() => {

        fetch(`http://localhost:3001/Product/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    title: data.title || "",
                    price: data.price || "",
                    qty: data.qty || "",
                    description: data.description || "",
                    urlImg: data.urlImg || ""
                })
            })

    }, [id])

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async () => {

        await fetch(`http://localhost:3001/Product/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

    }

    return (
        <div>

            <div className="container px-5">
                <div className="row">


                    <AdminPanelSidebar/>

                    <div className="col-12  my-5 mx-5 px-4 text-center">
                        <Image src={form.urlImg} alt={'679-1739360990.webp'} width={400} height={190}/>

                    </div>

                    <div className="col-12 ">
                        <div className={` ${styles['inp-box']} `}>
                            <div className={``}>
                                <div className={`fs-lg-22px d-flex align-items-center my-1`}>
                                    عنــوان
                                    <span className={`${styles['inp-span']} fw-bold text-color `}>(محصول)</span>
                                </div>
                                <input
                                    className={styles.inp}
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`d-flex my-3 gap-5 align-items-center    my-1`}>
                                <div className={`fs-lg-22px d-flex align-items-center`}>
                                    قیـــمت
                                    <span className={`${styles['inp-span']} fw-bold text-color `}>(محصول)</span>
                                </div>
                                <input
                                    className={styles.inp}
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                />

                                <div className={`fs-lg-22px d-flex align-items-center my-1`}>
                                    تعـــداد
                                    <span className={`${styles['inp-span']} fw-bold text-color `}>(محصول)</span>
                                </div>
                                <input
                                    className={styles.inp}
                                    name="qty"
                                    value={form.qty}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className={``}>
                                <div className={`fs-lg-22px d-flex align-items-center my-1`}>
                                    توضیحات
                                    <span className={`${styles['inp-span']} fw-bold text-color `}>(محصول)</span>
                                </div>
                                <textarea
                                    className={styles.inpTextarea}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                />

                            </div>
                            <br/><br/><br/>
                            <div className="d-flex  gap-4 ">
                                <button onClick={handleSubmit} className={`w-100 ${styles['BtnEdit']}`}>
                                    ثبت تغیرات
                                </button>
                                <button className={`w-100 ${styles['BtnEdit']}`}>
                                    انصراف
                                </button>
                            </div>
                        </div>


                    </div>
                    <div className="col-6">

                    </div>


                </div>
            </div>
            <br/><br/><br/>

        </div>
    );
}

export default Edit;