"use client"
import React from 'react';
import styles from './adminPanel-sidebar.module.css'
import LogoSite from "@/app/shared/LogoSite/LogoSite";
import Link from "next/link";
import {usePathname} from "next/navigation";

function AdminPanelSidebar() {

    const pathname = usePathname();

    return (
        <div className={` ${styles['AdminPanelSidebar-box']} p-4    `}>
            <div className={`  ${styles['AdminPanelSidebar-Logo']} d-flex justify-content-around align-items-center`}>

                <p className={`m-0`}>
                    مدیریت سایت
                </p>
                <div className="fs-14px">
                    <LogoSite/>
                </div>

            </div>

            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className={`text-center  `}>

                    <Link
                        className={`${styles['AdminPanelSidebar-Link']} 
                            ${pathname === "/" ? styles.active : ""}`}
                         href={`/`}>
                        خـــانه
                    </Link>
                    <Link
                        className={`${styles['AdminPanelSidebar-Link']} ${
                            pathname === "/adminPanel/Product" ? styles.active : ""
                        }`}
                         href={`/adminPanel/Product`}>
                        محصــــولات
                    </Link>

                    <Link
                        className={`${styles['AdminPanelSidebar-Link']} ${
                            pathname === "/adminPanel/User" ? styles.active : ""
                        }`}
                         href={`/adminPanel/User`}>
                        کـاربــران
                    </Link>
                    <Link
                        className={`${styles['AdminPanelSidebar-Link']} ${
                            pathname === "/adminPanel/Management" ? styles.active : ""
                        }`}
                         href={`/adminPanel/Management`}>
                        مدیریت سفـــــارش
                    </Link>



                </div>

            </div>


        </div>
    );
}

export default AdminPanelSidebar;
