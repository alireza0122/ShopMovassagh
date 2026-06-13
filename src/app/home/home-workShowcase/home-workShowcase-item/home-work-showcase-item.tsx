"use client"
import React from 'react';
import styles from "./home-work-showcase-Item.module.css";
import Image from "next/image";


type WorkShowcaseItemData={
    imgUrl?: string,
    title?: string,
    description?: string,
    name?: string,
    Feature?: string,
    imgOne:string,
    imgToTwo:string,
    imgThree:string,
}


function HomeWorkShowcaseItem({ imgUrl, title,description ,name ,Feature,imgOne ,imgToTwo,imgThree}: (WorkShowcaseItemData)) {

    return (

        <>
            <div className="container">
                <div className={`row mt-5 d-flex justify-content-between mb-5 align-items-center ${styles['HomeWorkShowcaseItem']}`}>
                    <div className="text-end col-12 col-lg-8 order-1 order-lg-0 ">
                        <h1 className={`fw-bold color-Title `}>
                            {title}
                        </h1>
                        <p className={`text-color  fs-16px my-5`}>
                            {description}
                        </p>
                        <h3 className={`fw-bold color-Title fs-20px mt-5`}>
                            {name}
                        </h3>

                        <p  className={`text-color`}>
                            {Feature}
                        </p>

                    </div>
                    <div className={`col-12 col-lg-4  position-relative order-0 order-lg-1 mb-5 mb-lg-0`}>
                        <div className={` ${styles['ItemImgDivThree']}`}>
                            <Image className={` ${styles['ItemImgThree']}`} src={imgThree || '/'} alt={`scsc1`}
                                   width={100} height={100}/>
                        </div>


                        <div className="d-flex justify-content-center">
                            <Image className={` ${styles['ItemImg']}`} src={imgUrl || '/'} alt={`scsc1`} width={500}
                                   height={500}/>
                        </div>



                        <div className={` ${styles['ItemImgDivOne']}`}>
                            <Image className={` ${styles['ItemImgOne']}`} src={imgOne || '/'} alt={`scsc1`} width={100}
                                   height={100}/>
                        </div>
                        <div className={` ${styles['ItemImgDivTwo']}`}>
                            <Image className={` ${styles['ItemImgToTwo']}`} src={imgToTwo || '/'} alt={`scsc1`}
                                   width={100} height={100}/>
                        </div>

                    </div>
                </div>

            </div>


        </>

    );
}

export default HomeWorkShowcaseItem;