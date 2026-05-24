"use client"
import React, {useState} from 'react';
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import styles from './Add.module.css'
import Image from "next/image";
import axios from "axios";


function Page() {


    const [form, setForm] = useState({
        id: "",
        title: "",
        price: "",
        qty: "",
        description: "",
        urlImg: ""
    })

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }


    const handleFile = (e) => {
        const file = e.target.files[0];

        setForm(prev => ({
            ...prev,
            urlImg: file
        }));
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleSubmit = async () => {
        let imageBase64 = form.urlImg;

        if (form.urlImg instanceof File) {
            imageBase64 = await convertToBase64(form.urlImg);
        }
        console.log(imageBase64);

        const product = {
            ...form,
            urlImg: imageBase64
        };

        await axios.post("http://localhost:3001/Product", product);
    };

    return (
        <div>
            <AdminPanelSidebar/>
            <div className="container">
                <div className="row">


                    <AdminPanelSidebar/>

                    <div className="col-12  my-5 mx-5 px-4 text-center">
                        <input type="file" onChange={handleFile}/>
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

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default Page;
