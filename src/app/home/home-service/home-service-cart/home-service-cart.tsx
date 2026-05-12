import React from 'react';
import styles from './home-service-cart.module.css'
import Image from "next/image";
import Link from "next/link";

type ServiceCartData = {
    id: number,
    srcImg: string,
    title: string,
    description: string,
    LinkTitle: string,

}


function HomeServiceCart({id,srcImg,description,LinkTitle,title}: (ServiceCartData)) {
    return (
        <div className={` ${styles['HomeServiceCart']}`}>
            <Image className={` ${styles['CartImg']}`} src={srcImg} alt={id.toString()} width={1000} height={1000}/>
            <div className={` ${styles['ServiceCartBoxText']}`}>
                <h1 className={`fs-18px pt-2 ps-0 ${styles['CartTitle']}`}>
                    {title}
                </h1>
                <p className={` ${styles['CartDescription']}`}>
                    {description}
                </p>
                <Link className={` ${styles['CartLink']}`} href={'/'}>
                    {LinkTitle}
                </Link>

            </div>

        </div>
    );
}

export default HomeServiceCart;