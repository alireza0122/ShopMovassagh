import React from 'react';
import styles from './contact-banner.module.css'
import Image from "next/image";

function ContactBanner() {
    return (
        <div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className={` ${styles['box-ContactBanner']}`}>
                            <div className="row">
                                <div className="col-7 py-5 px-5">
                                    <div className="d-flex flex-column  ">
                                        <label className={`first-color ${styles['lbl']}`} htmlFor="name">
                                            نام و نام خانوادگی
                                        </label>
                                        <input className={`my-2 ${styles['inp']}`} type="text" name="" id="name"/>
                                        <label className={`first-color ${styles['lbl']}`} htmlFor="phone">
                                            شماره تماس
                                        </label>
                                        <input className={`my-2 ${styles['inp']}`} type="text" name="" id="phone"/>
                                        <label className={`first-color ${styles['lbl']}`} htmlFor="title">
                                            موضوع
                                        </label>
                                        <input className={`my-2 ${styles['inp']}`} type="text" name="" id="title"/>
                                        <label className={`first-color ${styles['lbl']}`} htmlFor="text">
                                            پیــــام
                                        </label>
                                        <textarea className={`my-2 ${styles['inp-textarea']}`} name="" id="text"/>
                                        <div className=" ">
                                            <button className={` ${styles['btn-']}  p-2 border-0 first-color fw-bold`}>
                                                ارسال
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-5 ">
                                <div className="d-flex align-items-center">
                                    <iframe title="map-iframe" src="https://neshan.org/maps/iframe/places/65269b3194a31e3245e6d855d374fd36#c34.635-50.880-19z-0p/34.63549626832135/50.87929864680677" width="600" height="450" allowFullScreen loading="lazy" ></iframe>
                                    </div>
                                    <h1 className={`py-2 fs-26px first-color fw-bold`}>شرکت طراحی سایت وبــ آرا</h1>
                                    <ul className={` list-style-none text-color fs-18px p-0`}>
                                        <li>
                                            قم، بلوار جعفر طیار، جعفرطیار 3 (محله‌ی یخچال قاضی)
                                        </li>
                                        <li>
                                            شماره تماس: ۰۷۶۴ ۲۲۵ ۰۴۴۳
                                        </li>
                                        <li>
                                            شماره تماس: ۲۲۶۸ ۹۳۵ ۰۹۱۴
                                        </li>
                                        <li>
                                            شماره تماس: ۳۲۱۳ ۱۱۰ ۰۹۲۲
                                        </li>
                                        <li>
                                            ایمیل: info[at]ibulud.com
                                        </li>
                                    </ul>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactBanner;