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
                                        <Image className={` ${styles['img-location']}`} src={`/img/location.jpg`}
                                               alt={`img`} height={9000} width={9000}/>
                                    </div>
                                    <h1 className={`py-2 fs-26px first-color fw-bold`}>شرکت طراحی سایت استار</h1>
                                    <ul className={` list-style-none text-color fs-18px p-0`}>
                                        <li>
                                             ارومیه خیابان امینی(پنج راه)-جنب فروشگاه کوروش-ساختمان امیر طبقه 5 واحد 2
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