"use client"
import React from 'react';
import styles from './adminPanel-sidebar.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
    {
        href: "/",
        label: "خانه",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
        ),
    },
    {
        href: "/adminPanel/Product",
        label: "محصولات",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
        ),
    },
    {
        href: "/adminPanel/User",
        label: "کاربران",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ),
    },
    {
        href: "/adminPanel/Management",
        label: "مدیریت سفارش",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <line x1="9" y1="12" x2="15" y2="12"/>
                <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
        ),
    },
];

function AdminPanelSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            {/* Logo / Brand */}
            <Link
                href="/adminPanel"
                className={`${styles.brand} ${pathname === "/adminPanel" ? styles.brandActive : ""}`}
            >
                <div className={styles.logoWrap}>
                    <Image
                        src="/img/Logo.png"
                        alt="لوگو سایت"
                        width={36}
                        height={36}
                        className={styles.logo}
                    />
                </div>
                <span className={styles.brandLabel}>پنل مدیریت</span>
            </Link>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Nav */}
            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                            {isActive && <span className={styles.activeDot} />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className={styles.sidebarFooter}>
                <div className={styles.footerAvatar}>A</div>
                <div className={styles.footerInfo}>
                    <p className={styles.footerName}>ادمین</p>
                    <p className={styles.footerRole}>مدیر سیستم</p>
                </div>
            </div>
        </aside>
    );
}

export default AdminPanelSidebar;