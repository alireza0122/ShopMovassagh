import React from 'react';
import styles from '../Footer/Footeer.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faBars, faEllipsis, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LogoSite from "@/app/shared/LogoSite/LogoSite";

function Footer() {



    const OurLinks =[
        {
            title:"خانه",
            href:"/",
        },
        {
            title:"درباره ما",
            href:"/",
        },
         {
            title:"خدمات",
            href:"/",
        },
         {
            title:"تیم",
            href:"/",
        },
         {
            title:"وبلاگ",
            href:"/",
        },
    ]

  const OurServices =[
        {
            title:"استراتژی و تحقیق",
            href:"/",
        },
        {
            title:"توسعه وب",
            href:"/",
        },
         {
            title:"راه حل وب",
            href:"/",
        },
         {
            title:"دیجیتال مارکتینگ",
            href:"/",
        },
         {
            title:"طراحی اپلیکیشن",
            href:"/",
        },
    ]
 const OthersLinks =[
        {
            title:"سوالات متداول",
            href:"/",
        },
        {
            title:"نمونه کارها",
            href:"/",
        },
         {
            title:"پلوسی حریم خصوصی",
            href:"/",
        },
         {
            title:"لرزش و وضعیت",
            href:"/",
        },
         {
            title:"پشتیبانی کنید",
            href:"/",
        },
    ]


    return (
        <div className={`py-0 py-lg-4 ${styles['Footer']} position-relative`}>
            <div className="container">
                <div className="row pt-3 pt-lg-5">
                    <div className="col-12 col-lg-4 ">
                        <LogoSite/>
                        <div className="mt-4">
                            <p className={`text-justify text-color`}>
                                ما در شرکت خود با تکیه بر تخصص فنی و تجربه‌ی عملی، راهکارهای نرم‌افزاری هوشمند و
                                مقیاس‌پذیر ارائه می‌دهیم.
                                تیم ما متشکل از برنامه‌نویسان حرفه‌ای است که به جدیدترین فناوری‌های روز دنیا مسلط هستند.
                                از طراحی و توسعه وب‌سایت و اپلیکیشن تا پیاده‌سازی سیستم‌های اختصاصی، همراه شما هستیم.
                            </p>
                        </div>
                        <div className={`d-flex gap-lg-3 gap-3 mt-4`}>
                            <FontAwesomeIcon icon={faInstagram} className={` ${styles['icon']}`}/>
                            <FontAwesomeIcon icon={faYoutube} className={` ${styles['icon']}`}/>
                            <FontAwesomeIcon icon={faBars} className={` ${styles['icon']}`}/>
                        </div>
                    </div>
                    <div className="col-lg-1">

                    </div>
                    <div className="col-12 col-lg-2 mt-3 mt-lg-0">
                        <h1 className={`fw-bold  fs-20px`}>
                            پیوندهای ما
                        </h1>
                    <div className="d-flex flex-column gap-lg-2 ">
                        {OurLinks.map((item ,index)=>(
                            <Link className={`text-color ${styles['OurLinks']}`} href={item.href} key={index}>
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
                                <Link className={`text-color ${styles['OurLinks']}`} href={item.href} key={index}>
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
                                <Link className={`text-color ${styles['OurLinks']}`} href={item.href} key={index}>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <h1 className={`fs-18px`}>شرایط و ضوابط</h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <h1 className={`fs-18px`}>

                            تمامی حقوق محفوظ است
                        </h1>
                            <Link href={`https://poyeshgaran.liara.run/`} >
                                    پویشگران عصر داده
                            </Link>

                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Footer;