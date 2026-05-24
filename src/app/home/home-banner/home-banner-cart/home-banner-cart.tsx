import React from "react";
import Image from "next/image";
import styles from "./home-banner-cart.module.css";
import Link from "next/link";

type BannerCardProps = {
    index: number;
    img1: string;
    img2: string;
    link: string;
    text:string;
    description:string;
    hoverIndex: number | null;
    SetHoverIndex: React.Dispatch<React.SetStateAction<unknown | null>> ;
};






const BannerCard: React.FC<BannerCardProps> = ({index, img1, img2, link,text,description, hoverIndex, SetHoverIndex,}) => {

    const isActive = hoverIndex === index;


    return (
        <>

            <Link
                href={link}
                className={`position-relative  ${styles.card}`}
                onMouseEnter={() => SetHoverIndex(index)}
                // onMouseLeave={() => setHoverIndex(0)}
            >
                <Image
                    src={img1}
                    alt="banner"
                    width={1000}
                    height={1000}
                    className={` ${styles.imgBoxBanner} ${isActive ? styles.hide : ""}`}
                />

                <Image
                    src={img2}
                    alt="banner hover"
                    width={1000}
                    height={1000}
                    className={` ${styles.imgBoxBanner} ${styles.hoverImage} ${
                        isActive ? styles.show : ""
                    }`}

                />
                    <p  className={`${styles['textmain']} `}>


                        دربـــــاره
                        <span className={` ${styles['datA']}`}>.</span>
                        <span className={` ${styles['datB']}`}>.</span>
                        <span className={` ${styles['datC']}`}>.</span>
                    </p>

                <div className={`${styles.text} position-absolute bottom-0 text-white p-2`}>
                    <p>{text}</p>
                    <p>{description}</p>
                </div>

            </Link>

        </>

    );
};

export default BannerCard;
