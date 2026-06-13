import React from 'react';
import styles from '../LogoSite/LogoSite.module.css'
import Image from "next/image";
import Link from "next/link";

function LogoSite() {
    return (

        <>
            <Link href={'/'}  >
                <div className={`d-flex  align-items-center ${styles['LogoSite']}`}>
                    <Image src={`/img/Logo.png`} alt={`logo-site`} width={70} height={70}/>
                    {/*<h1 className={`m-0 fs-18px fw-bold  ${styles['hLogo']}`}>وبـ آر ا</h1>*/}
                </div>

            </Link>
        </>


    );
}

export default LogoSite;