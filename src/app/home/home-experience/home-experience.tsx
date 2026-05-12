"use client"
import styles from "./home-experience.module.css";
import React from 'react';
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode} from "swiper/modules";

function HomeExperience() {
    return (
        <div className={` ${styles['HomeExperience']} my-5`}>
            <div className="container  ">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className={` ${styles['BoxExperience']}`}>
                            <div className={` ${styles['BoxExperience']}`}>
                                <h1 className={`fs-30px fw-bold ${styles['ExperienceTitle']}`}>
                                    ما در این زمینه 6
                                    سال سابقه داریم
                                </h1>
                                <p className={` ${styles['ExperienceDescription']}`}>
                                    گاهی تشخیص راه صحیح در دلِ پیچیدگی‌ها دشوار است،
                                    <br/>
                                    اما قلبِ آرام همیشه راهِ درست را پیدا می‌کند.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className={` ${styles['HappyCustomer']}`}>
                            <h1 className={` ${styles['HappyCustomerH']}`}>15K</h1>
                            <p className={` ${styles['HappyCustomerP']}`}>مشتری خوشحال</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">

                    <div className="col-12 col-lg-7 mt-1 mb-1 mt-lg-auto mt-lg-auto mt-lg-auto">
                        <div className={` ${styles['CompleteWorkTo']}`}>

                            <Swiper
                                modules={[Autoplay, FreeMode]}
                                slidesPerView={6}
                                spaceBetween={5}
                                loop
                                speed={3000}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 0,
                                }}
                                className={` d-flex justify-content-center`}

                            >
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo1.png`} alt={'1logo'}
                                           width={300} height={300}/>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo22.png`} alt={'2logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo3.png`} alt={'3logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo44.png`} alt={'4logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo55.png`} alt={'5logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo30.jpg`} alt={'5logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo20.jpg`} alt={'5logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo19.jpg`} alt={'5logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo66.jpg`} alt={'5logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image className={styles['imgSlider']} src={`/img/logo10.jpg`} alt={'5logo'}
                                           width={300} height={300}/>

                                </SwiperSlide>

                            </Swiper>

                        </div>
                    </div>
                    <div className="col-12 col-lg-5 mt-3 mt-lg-auto">
                        <div className={` ${styles['CompleteWork']}`}>
                            <h1 className={` ${styles['CompleteWorkH']}`}>
                                400+
                            </h1>
                            <p className={` ${styles['CompleteWorkP']}`}>
                                کار کامل
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default HomeExperience;