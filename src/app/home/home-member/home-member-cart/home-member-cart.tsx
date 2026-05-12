import React from 'react';
import styles from './home-member-cart.module.css'
import Image from "next/image";

type HomeMemberCart = {
    imgUrl: string,
    name: string,
    job: string,
}

function MemberCart({ imgUrl, name, job}: HomeMemberCart) {
    return (
        <div className={` ${styles['MemberCart']}`}>
            <Image className={` mt-3 ${styles['MemberCartImg']}`} src={imgUrl} alt={name} width={500} height={500} />
            <div className=" mb-4 mt-3">
                <h1 className={` ${styles['MemberCartTitle']}`}>
                    {name}
                </h1>
                <p className={`text-color `}>
                    {job}
                </p>
            </div>

        </div>
    );
}

export default MemberCart;