"use client"
import React, {useEffect} from 'react';

import Link from "next/link";
import styles from '../Navbar/Navbar.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronDown, faShoppingCart, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import Image from "next/image";
import {usePathname} from "next/navigation";
import LogoSite from "@/app/shared/LogoSite/LogoSite";
import {useSimpleStore, useUserStore} from "@/store/usePaginationStore";


function Navbar() {

    const pathname = usePathname()

    const navbarLink = [

        {
            id: 1,
            href: "/",
            title: "خانه",
            dropdown: [
                {
                    title: "استراتژی و تحقیق",
                    href: "/",
                },
                {
                    title: "استراتژی و تحقیق",
                    href: "/",
                }
            ]
        },
        {
            id: 2,
            href: "/about",
            title: "درباره ما",
            dropdown: [
                {
                    title: "توسعه وب",
                    href: "/about",
                },
                {
                    href: "/contact",
                    title: "تماس با ما",
                }
            ]
        },
        {
            id: 3,
            href: "/services",
            title: "خدمات",
            dropdown: [
                {
                    title: "راه حل وب",
                    href: "/services",
                }
                , {
                    title: "طراحی اپلیکیشن",
                    href: "/services",
                }
            ]
        },
        {
            id: 4,
            href: "/blog",
            title: "وبلاگ",
            dropdown: [
                {
                    title: "دیجیتال مارکتینگ",
                    href: "/blog",
                },
                {
                    title: "انتقادات و پیشنهادات",
                    href: "/blog",
                }
            ]
        },

        {
            id: 5,
            href: "/product",
            title: "محصولات",
            dropdown: [
                {
                    title: "پیگیری سفارشات",
                    href: "/contact",
                },
                {
                    title: "انتقادات و پیشنهادات",
                    href: "/contact",
                }, {
                    title: "طراحی اپلیکیشن",
                    href: "/contact",
                }
            ]
        }
    ]


    const [open, setOpen] = useState(false);

    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const toggleDropdown = (id: number) => {
        if (activeDropdown === id) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(id);
        }
    };


    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 991) {
                setIsSticky(window.scrollY > 50);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    //
    const {userName , isLoggedIn} = useUserStore();



    // const clearFields = useUserStore((state) => state.clearFields);
    const cart = useSimpleStore((state) => state.cart);
    const totalItemCount = cart.reduce((total, item) => total + item.qty, 0);
    // const setCount = useUserStore((state) => state.setCount);

    return (
        <div className={
            styles.bgHeader +
            (isSticky ? " " + styles.sticky : "")
        }>
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-6 col-lg-2">
                        <LogoSite/>
                    </div>


                    <div className="col-6 d-flex justify-content-end d-lg-none">
                        <button
                            className={styles.hamburgerBtn}
                            onClick={() => setOpen(!open)}
                        >
                            <FontAwesomeIcon icon={open ? faXmark : faBars}/>
                        </button>
                    </div>


                    <div className="col-lg-6 d-none d-lg-block">
                        <ul
                            className={
                                styles['navUl'] +
                                ' justify-content-around p-0 d-lg-flex ' +
                                (open ? styles.open : '')
                            }
                        >


                            <li className={styles['menuBtnZabdar']}>
                                <button
                                    className={styles.menuBtnZabdar}
                                    onClick={() => setOpen(!open)}
                                >
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </li>


                            {
                                navbarLink.map((item) => (
                                    <li key={item.id} className={`${styles['liNav']}`}>
                                        <Link
                                            onClick={(e) => {
                                                if (window.innerWidth <= 991) {
                                                    e.preventDefault();
                                                    toggleDropdown(item.id);
                                                }
                                            }}
                                            className={` d-flex  justify-content-between  ${styles['linkNav']}  
                                                `}
                                            href={item.href}>
                                            {item.title}
                                            <FontAwesomeIcon
                                                className={
                                                    styles.iconLink +
                                                    (activeDropdown === item.id ? " " + styles.rotate : "")}
                                                icon={faChevronDown}/>
                                        </Link>


                                        {item.dropdown && item.dropdown.length > 0 && (
                                            <ul
                                                className={
                                                    styles.dropdown +
                                                    (activeDropdown === item.id ? " " + styles.active : "")
                                                }
                                            >
                                                {item.dropdown.map((link, index) => (
                                                    <li key={index} className={styles.LiDropdown}>
                                                        <Link href={link.href} className={styles.LiDropdownLink}>
                                                            {link.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}


                                    </li>

                                ))

                            }

                        </ul>
                    </div>


                    <div className="col-4 d-none d-lg-block">


                        <div className="d-flex justify-content-end align-items-center gap-2">
                            <Link className={`first-color`} href={`/profile`}>
                                {isLoggedIn && (
                                    <span> سلام {userName} 👋</span>
                                )}
                            </Link>
                            {isLoggedIn ? (
                                <>
                                    <Link href="/profile">
                                        <button className={styles.btnLogin}>
                                            <Image src={`/img/logosite.png`} alt={`profile`} width={20} height={20}/>
                                        </button>
                                    </Link>

                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <button className={styles.btnLogin}>
                                            ورود / ثبت نام
                                        </button>
                                    </Link>

                                </>
                            )}
                            <Link id="cart-icon" className={` d-flex align-items-center  ${styles['btnLogin']}`} href={`/shopping`}>
                                <FontAwesomeIcon
                                    className={`  ${styles['iconShop']}`}
                                    icon={faShoppingCart}
                                />
                                سبد خرید
                                {totalItemCount > 0 && (
                                    <p className={`fw-bold mx-1 ${styles['qtyShop']}`}>
                                        {totalItemCount}
                                    </p>
                                )}
                            </Link>


                        </div>

                    </div>
                </div>
                {open && (
                    <div className={`${styles.mobileMenu} ${open ? styles.open : ''}`}>
                        <ul className={`mt-5`}>
                            <li className={`mb-4`}>

                                <div
                                    className={`d-flex justify-content-between align-items-center  ${styles['LogoSite']}`}>
                                    <Image src={`/img/logosite.png`} alt={`logo-site`} width={50} height={40}/>
                                    <h1 className={`m-0 fs-16px fw-bold  ${styles['hLogo']}`}>استار </h1>
                                </div>
                            </li>
                            {navbarLink.map(item => (
                                <li className={` d-flex justify-content-between  align-items-center `}
                                    key={item.id}>
                                    <Link
                                        className={`text-white py-3 px-3 `}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.title}

                                    </Link>
                                    <FontAwesomeIcon icon={faChevronDown}
                                                     className={`d-flex text-white ${styles['iconLink']}`}/>

                                </li>
                            ))}
                        </ul>

                        <div className={` ${styles['mobileButtons']}`}>
                            <button className={`mt-5 border-0 ${styles['mobileButtons']}`}>ورود</button>
                            <button className={`mt-5 border-0 ${styles['mobileButtons']}`}>ثبت نام</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Navbar;