"use client"
import React, {useEffect, useState} from 'react';
import styles from "./home-banner.module.css";
import Container from "@/app/shared/Container/Container";
import BannerCard from "@/app/home/home-banner/home-banner-cart/home-banner-cart";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/pagination';
import gsap from "gsap";
import {TextPlugin} from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);
gsap.registerPlugin(TextPlugin);

function HomeBanner() {

    const [hoverIndex, setHoverIndex] = useState<number>(0);

    useEffect(() => {

        gsap.to(".titleRef", {
            scrollTrigger: {
                trigger: ".titleRef",
                start: "top 80%",
            },

            ease: "linear",

            text: {
                value: "ما خدمات زیادی را برای مشتریان ارائه می‌دهیم .",
            },

            duration: 2,
            color: "white",
        });

        gsap.fromTo(
            ".DecAnim",
            {
                x: 50,
                opacity: 0,
            },
            {
                scrollTrigger: {
                    trigger: ".DecAnim",
                    start: "top 80%",
                },

                opacity: 1,
                x: 0,
                ease: "linear",
                duration: 1,
            }
        );

        gsap.fromTo(
            ".titleBtn",
            {
                y: 50,
                opacity: 0,
            },
            {
                scrollTrigger: {
                    trigger: ".titleBtn",
                    start: "top 85%",
                },

                opacity: 1,
                y: 0,
                ease: "linear",
                duration: 1,
            }
        );

    }, []);


    return (
        <>

            <Container>

                <div className="row mt-lg-5 mt-3  d-flex align-items-center">

                    <div className=" col-12 col-xl-5 mt-0 px-0 mt-lg-5 px-lg-5  ">
                        <div className="mx-5">
                            <h1 className={`${styles['titleBanner']} titleRef fw-lighter fw-bold`}>

                            </h1>
                            <p

                                className={` ${styles['descriptionBanner']} DecAnim `}>
                                ما خدمات زیادی را
                                برای هیچ زمان عاقلانه باردار تا زمانی که برای خودش درست درب به طرح بزرگ است.</p>

                            <button className={`titleBtn fs-16px fs-lg-20px border-0 ${styles['btnBanner']}`}>
                                همین حالا شروع کنید

                            </button>
                        </div>
                    </div>
                    <div className=" col-12 col-xl-7 mt-5">
                        <div className="d-flex justify-content-end    d-none d-lg-block">
                            <div className={`position-relative  d-lg-flex         gap-2 ${styles['card']}`}>
                                <BannerCard
                                    index={0}
                                    img1="/img/0001.png"
                                    img2="/img/0001.png"
                                    link="/"
                                    hoverIndex={hoverIndex}
                                    SetHoverIndex={setHoverIndex}
                                    text={'فرشته احمدی'}
                                    description={"کارمندی متعهد و مسئولیت‌پذیر که با دقت و نظم وظایف محوله را انجام می‌دهد." +
                                        "دارای روحیه‌ی همکاری بالا و توانمند در کار تیمی و حل مسئله." +
                                        "همیشه در مسیر یادگیری و پیشرفت فردی و سازمانی قدم برمی‌دارد."}

                                />
                                <BannerCard

                                    index={1}
                                    img1="/img/0002.png"
                                    img2="/img/0002.png"
                                    link="/"
                                    hoverIndex={hoverIndex}
                                    SetHoverIndex={setHoverIndex}
                                    text={'مجتبی جباری'}
                                    description={"کارمندی پرتلاش که با انگیزه‌ی بالا در راستای اهداف شرکت فعالیت می‌کند." +
                                        "منظم، خوش‌برخورد و دقیق در انجام امور روزمره و مسئولیت‌ها." +
                                        "با نگرش مثبت، نقش مؤثری در پیشرفت تیم و سازمان دارد."}

                                />
                                <BannerCard

                                    index={2}
                                    img1="/img/0003.png"
                                    img2="/img/0003.png"
                                    link="/"
                                    hoverIndex={hoverIndex}
                                    SetHoverIndex={setHoverIndex}
                                    text={'تیـــم بزرگ'}
                                    description={"تیمی منسجم و حرفه‌ای که با همکاری و همدلی به اهداف مشترک دست پیدا می‌کند." +
                                        "هر عضو تیم با تخصص خود، نقشی کلیدی در موفقیت مجموعه دارد." +
                                        "محیطی پویا که رشد فردی و گروهی را همزمان رقم می‌زند."}

                                />
                            </div>
                        </div>


                        <div className={`  d-lg-none `}>

                            <div className={`row  `}>

                                <div className="col-12 col-sm-6 py-2 d-flex justify-content-center ">
                                    <BannerCard
                                        index={0}
                                        img1="/img/deneme-3--9416-.jpg"
                                        img2="/img/womacccn-cccc300x300.webp"
                                        link="/"
                                        hoverIndex={hoverIndex}
                                        SetHoverIndex={setHoverIndex}
                                        text={'فرشته احمدی'}
                                        description={"کارمندی متعهد و مسئولیت‌پذیر که با دقت و نظم وظایف محوله را انجام می‌دهد." +
                                            "دارای روحیه‌ی همکاری بالا و توانمند در کار تیمی و حل مسئله." +
                                            "همیشه در مسیر یادگیری و پیشرفت فردی و سازمانی قدم برمی‌دارد."}

                                    />
                                </div>
                                <div className="col-12 col-sm-6 py-2 d-flex justify-content-center ">
                                    <BannerCard

                                        index={1}
                                        img1="/img/img22.jpg"
                                        img2="/img/34550.jpg"
                                        link="/"
                                        hoverIndex={hoverIndex}
                                        SetHoverIndex={setHoverIndex}
                                        text={'مجتبی جباری'}
                                        description={"کارمندی پرتلاش که با انگیزه‌ی بالا در راستای اهداف شرکت فعالیت می‌کند." +
                                            "منظم، خوش‌برخورد و دقیق در انجام امور روزمره و مسئولیت‌ها." +
                                            "با نگرش مثبت، نقش مؤثری در پیشرفت تیم و سازمان دارد."}

                                    />
                                </div>
                                <div className="col-12 py-2 d-flex justify-content-center ">
                                    <BannerCard

                                        index={2}
                                        img1="/img/img23.png"
                                        img2="/img/blog-img-1.png"
                                        link="/"
                                        hoverIndex={hoverIndex}
                                        SetHoverIndex={setHoverIndex}
                                        text={'تیـــم بزرگ'}
                                        description={"تیمی منسجم و حرفه‌ای که با همکاری و همدلی به اهداف مشترک دست پیدا می‌کند." +
                                            "هر عضو تیم با تخصص خود، نقشی کلیدی در موفقیت مجموعه دارد." +
                                            "محیطی پویا که رشد فردی و گروهی را همزمان رقم می‌زند."}

                                    />
                                </div>


                            </div>
                        </div>


                    </div>
                </div>

            </Container>
        </>
    );
}

export default HomeBanner;