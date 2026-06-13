"use client"
import React from 'react';
import styles from './home-work-showcase.module.css'
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import HomeWorkShowcaseItem from "./home-workShowcase-item/home-work-showcase-item";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from "next/image";


interface WorkShowCasevDataInterFace {
    id: number,
    imgUrl: string,
    title: string,
    description: string,
    name: string,
    Feature: string,
    imgOne: string,
    imgToTwo: string,
    imgThree: string,
}

function HomeWorkShowcase() {

    const WorkShowCasevData:WorkShowCasevDataInterFace[] = [
        {
            id: 1,
            imgUrl: "/img/mr1.png",
            title: "داستان های موفقیت ما را ببینید",
            description: "فرانت‌گ با کاهش زمان توسعه اولیه، ورود ما به بازار را به طرز چشمگیری سرعت بخشید.",
            name: "حمید بابایی",
            Feature: "طراح خلاق",
            imgOne:"/img/mr2.jpg",
            imgToTwo:"/img/mr55.jpg",
            imgThree:"/img/mr333.png",
        },
        {
            id: 2,
            imgUrl: "/img/mr2.jpg",
            title: "داستان های موفقیت ما را ببینید",
            description: "فرانت‌گ با کاهش زمان توسعه اولیه، ورود ما به بازار را به طرز چشمگیری سرعت بخشید.",
            name: "حمید بابایی",
            Feature: "طراح خلاق",
            imgOne:"/img/mr1.png",
            imgToTwo:"/img/mr55.jpg",
            imgThree:"/img/mr333.png",
        },

        {
            id: 3,
            imgUrl: "/img/mr55.jpg",
            title: "داستان های موفقیت ما را ببینید",
            description: "فرانت‌گ با کاهش زمان توسعه اولیه، ورود ما به بازار را به طرز چشمگیری سرعت بخشید.",
            name: "حمید بابایی",
            Feature: "طراح خلاق",
            imgOne:"/img/mr1.png",
            imgToTwo:"/img/mr2.jpg",
            imgThree:"/img/mr333.png",
        },
        {
            id: 4,
            imgUrl: "/img/mr333.png",
            title: "داستان های موفقیت ما را ببینید",
            description: "فرانت‌گ با کاهش زمان توسعه اولیه، ورود ما به بازار را به طرز چشمگیری سرعت بخشید.",
            name: "حمید بابایی",
            Feature: "طراح خلاق",
            imgOne:"/img/mr1.png",
            imgToTwo:"/img/mr2.jpg",
            imgThree:"/img/mr55.jpg",
        },


    ]

    return (
        <>
            <div className={` mb-5 mt-5`}>
                <div className={`  ${styles['HomeWorkShowcase']}`}>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={3}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        autoplay={{delay:10000}}
                        loop
                    >

                        {
                            WorkShowCasevData.map((item, index) => {
                                return (
                                    <SwiperSlide className={` ${styles['slide']}`} key={index}>
                                                <HomeWorkShowcaseItem
                                                    imgUrl={item.imgUrl}
                                                    title={item.title}
                                                    description={item.description}
                                                    imgOne={item.imgOne}
                                                    imgToTwo={item.imgToTwo}
                                                    imgThree={item.imgThree}
                                                    name={item.name}

                                                />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
            </div>
        </>
    );
}

export default HomeWorkShowcase;