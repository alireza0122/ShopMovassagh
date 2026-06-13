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

interface CartItem {
    id: number;
    qty: number;
    title: string;
    description: string;
    urlImg: string;
    price: number;
}

function Navbar() {

    const pathname = usePathname();
    const isAdminPanel =
        pathname?.startsWith("/adminPanel")




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
        },
        // {
        //     id: 6,
        //     href: "/",
        //     title: "  مدیریت ",
        //     dropdown: [
        //         {
        //             title: "پیگیری سفارشات",
        //             href: "/contact",
        //         },
        //         {
        //             title: "انتقادات و پیشنهادات",
        //             href: "/contact",
        //         }, {
        //             title: "طراحی اپلیکیشن",
        //             href: "/contact",
        //         }
        //     ]
        // }
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
    const {userName, role, isLoggedIn} = useUserStore();
    console.log(role)

    // const clearFields = useUserStore((state) => state.clearFields);
    const cart = useSimpleStore((state) => state.cart);
    const totalItemCount = cart.reduce(
        (total: number, item: any) => total + item.qty,
        0
    );
    // const setCount = useUserStore((state) => state.setCount);

    return (
        <div className={`${
            styles.bgHeader +
            (isSticky ? " " + styles.sticky : "")}
            p-lg-0
            
        `}>


            <div className="container">
                {!isAdminPanel && (
                    <div className="row d-flex align-items-center">
                        <div className="col-6 col-lg-1 p-0">
                            <div className="d-flex align-items-center gap-3">
                                <LogoSite/>
                            </div>


                        </div>


                        <div className="col-6 d-flex justify-content-end d-lg-none">
                            <button
                                className={styles.hamburgerBtn}
                                onClick={() => setOpen(!open)}
                            >
                                <FontAwesomeIcon icon={open ? faXmark : faBars}/>
                            </button>
                        </div>


                        <div className="col-lg-5 d-none d-lg-block">
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
                                    navbarLink.map((item, index) => (
                                        <li key={index} className={`${styles['liNav']}`}>
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
                                                        `
                                                           ${styles.iconLink +
                                                        (activeDropdown === item.id ? " " + styles.rotate : "")}`}
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


                        <div className="col-6 d-none d-lg-block">


                            <div className="d-flex justify-content-end align-items-center gap-2">
                                {!isAdminPanel && (
                                    <Link className={`first-color`} href={`/profile`}>
                                        {isLoggedIn && (
                                            <span> سلام {userName} 👋</span>
                                        )}
                                    </Link>
                                )}
                                {!isAdminPanel && (
                                    isLoggedIn ? (
                                        <Link href="/profile">
                                            <button className={styles.btnLogin}>
                                                <Image src={`/img/Logo.png`} alt={`profile`} width={20}
                                                       height={20}/>
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link href="/login">
                                            <button className={styles.btnLogin}>
                                                ورود / ثبت نام
                                            </button>
                                        </Link>
                                    )
                                )}
                                {!isAdminPanel && (
                                    <Link id="cart-icon" className={`d-flex align-items-center ${styles['btnLogin']}`}
                                          href={`/shopping`}>
                                        <FontAwesomeIcon className={styles['iconShop']} icon={faShoppingCart}/>
                                        سبد خرید
                                        {totalItemCount > 0 && (
                                            <p className={`fw-bold mx-1 ${styles['qtyShop']}`}>
                                                {totalItemCount}
                                            </p>
                                        )}
                                    </Link>
                                )}
                                {!isAdminPanel && (
                                    isLoggedIn && role === "admin" && (
                                        <Link
                                            className={`${styles['linkAdmin']} fs-14px fw-bold`}
                                            href={`/adminPanel`}
                                        >
                                            پنل مدیریت
                                        </Link>
                                    )
                                )}

                            </div>

                        </div>
                    </div>
                )}

                {open && (
                    <div className={`${styles.mobileMenu} ${open ? styles.open : ''}`}>
                        <ul className={`mt-5`}>
                            <li className={`mb-4 ${styles['List']}`}>

                                <div
                                    className={`d-flex justify-content-between align-items-center  ${styles['LogoSite']}`}>
                                    <Image src={`/img/Logo.png`} alt={`logo-site`} width={70} height={70}/>
                                    <h1 className={`m-0 fs-20px fw-bold  ${styles['hLogo']}`}>وبــــ آرا </h1>
                                </div>
                            </li>
                            {navbarLink.map((item, index) => (
                                <>
                                    <li key={index}
                                        className={` d-flex justify-content-between  align-items-center ${styles['List']} `}>
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

                                </>

                            ))}


                            <div className={` mb-4 ${styles['mobileButtons']}`}>
                                <button className={`mt-5 border-0  ${styles['mobileButtons']}`}>ورود</button>
                                <button className={`mt-5 border-0  ${styles['mobileButtons']}`}>ثبت نام</button>
                            </div>
                            <li className={`${styles['List']} `}>
                                {!isAdminPanel && (
                                    isLoggedIn && role === "admin" && (
                                        <Link
                                            className={`${styles['linkAdminT']} fs-14px fw-bold`}
                                            href={`/adminPanel`}
                                        >
                                            پنل مدیریت
                                        </Link>
                                    )
                                )}

                            </li>
                        </ul>

                    </div>
                )}
            </div>

        </div>
    );
}

export default Navbar;