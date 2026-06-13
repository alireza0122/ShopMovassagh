"use client"
import React from 'react';
import styles from '../Footer/Footeer.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faBars, faEllipsis, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LogoSite from "@/app/shared/LogoSite/LogoSite";
import {usePathname} from "next/navigation";
import Image from "next/image";

function Footer() {

    const pathname = usePathname();

    const isAdminPanel =
        pathname?.startsWith("/adminPanel") ||
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/sign-up") ||
        pathname?.startsWith("/shopping") ||
        pathname?.startsWith("/product/") ||
        pathname?.startsWith("/profile");

    const OurLinks = [
        {
            title: "خانه",
            href: "/",
        },
        {
            title: "درباره ما",
            href: "/",
        },
        {
            title: "خدمات",
            href: "/",
        },
        {
            title: "تیم",
            href: "/",
        },
        {
            title: "وبلاگ",
            href: "/",
        },
    ]

    const OurServices = [
        {
            title: "استراتژی و تحقیق",
            href: "/",
        },
        {
            title: "توسعه وب",
            href: "/",
        },
        {
            title: "راه حل وب",
            href: "/",
        },
        {
            title: "دیجیتال مارکتینگ",
            href: "/",
        },
        {
            title: "طراحی اپلیکیشن",
            href: "/",
        },
    ]
    const OthersLinks = [
        {
            title: "سوالات متداول",
            href: "/",
        },
        {
            title: "نمونه کارها",
            href: "/",
        },
        {
            title: "پلوسی حریم خصوصی",
            href: "/",
        },
        {
            title: "لرزش و وضعیت",
            href: "/",
        },
        {
            title: "پشتیبانی کنید",
            href: "/",
        },
    ]


    return (
        <>
            {!isAdminPanel && (
                <div className={`py-0 py-lg-4 ${styles['Footer']} position-relative`}>
                    <div className="container">
                        <div className="row align-items-center pt-3 pt-xxl-0lg-5">
                            <div className="col-12 col-lg-4 ">
                                <LogoSite/>
                                <div className="mt-4">
                                    <p className={`text-justify text-color`}>
                                        ما در شرکت خود با تکیه بر تخصص فنی و تجربه‌ی عملی، راهکارهای نرم‌افزاری هوشمند و
                                        مقیاس‌پذیر ارائه می‌دهیم.
                                        تیم ما متشکل از برنامه‌نویسان حرفه‌ای است که به جدیدترین فناوری‌های روز دنیا
                                        مسلط هستند.
                                        از طراحی و توسعه وب‌سایت و اپلیکیشن تا پیاده‌سازی سیستم‌های اختصاصی، همراه شما
                                        هستیم.
                                    </p>
                                </div>
                                <div className={`d-flex gap-lg-3 gap-3 mt-4`}>
                                    <FontAwesomeIcon icon={faInstagram} className={` ${styles['icon']}`}/>
                                    <FontAwesomeIcon icon={faYoutube} className={` ${styles['icon']}`}/>
                                    <FontAwesomeIcon icon={faBars} className={` ${styles['icon']}`}/>
                                </div>
                            </div>
                            <div className="col-12 col-lg-2 mt-3 mt-lg-0">
                                <h1 className={`fw-bold  fs-20px`}>
                                    پیوندهای ما
                                </h1>
                                <div className="d-flex flex-column gap-lg-2 ">
                                    {OurLinks.map((item, index) => (
                                        <Link className={`text-color ${styles['OurLinks']}`} href={item.href}
                                              key={index}>
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-lg-2 mt-3 mt-lg-0">
                                <h1 className={`fw-bold  fs-20px`}>
                                    خدمات ما
                                </h1>
                                <div className="d-flex flex-column gap-lg-2 ">

                                    {OurServices.map((item, index) => (
                                        <Link className={`text-color ${styles['OurLinks']}`} href={item.href}
                                              key={index}>
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-lg-2">
                                <h1 className={`fw-bold  fs-20px`}>
                                    پیوندهای دیگران
                                </h1>
                                <div className="d-flex flex-column gap-lg-2 ">

                                    {OurServices.map((item, index) => (
                                        <Link className={`text-color ${styles['OurLinks']}`} href={item.href}
                                              key={index}>
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-2 d-flex justify-content-center align-items-center ">
                                <a href="https://enamad.ir/"><Image className={`d-flex justify-content-center ${styles['LogoSite']}`}  src={'/img/enamad.png'} alt="scs" width={500} height={500} /></a>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-6">
                                <h1 className={`fs-18px`}>شرایط و ضوابط</h1>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h3 className={`fs-18px`}>
                                    تمامی حقوق این وب سایت متعلق به شرکت توسعه و طراحی وب سایت <span className="text-color fw-bold">وبــ آرا</span> میباشد.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>

    );
}

export default Footer;