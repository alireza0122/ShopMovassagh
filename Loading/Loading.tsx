"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import styles from  '../Loading/Loading.module.css'

interface InitialLoadingProps {
    children: ReactNode;
}

export default function InitialLoading({
                                           children,
                                       }: InitialLoadingProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);
    
    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className={` d-flex flex-column justify-content-center align-items-center ${styles['boxImg']}`}>
                    <Image className={` ${styles['Img']}`} alt={'site_logo'} src={"/img/site_logo_mobile.png"}  width={1500}  height={1500} />
                    <p className={`fw-bold ${styles['TagP']}`}>
                        vidamotors
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
