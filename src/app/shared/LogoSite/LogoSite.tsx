import React from 'react';
import styles from '../LogoSite/LogoSite.module.css'
import Image from "next/image";

function LogoSite() {
    return (

        <div className={`d-flex  align-items-center ${styles['LogoSite']}`}>
            <Image src={`/img/logosite.png`} alt={`logo-site`} width={30} height={30}/>
            <h1 className={`m-0 fs-18px fw-bold  ${styles['hLogo']}`}>استار </h1>
        </div>

    );
}

export default LogoSite;