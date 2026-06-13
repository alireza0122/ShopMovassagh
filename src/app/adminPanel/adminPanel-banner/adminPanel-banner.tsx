"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import styles from "./adminPanel-banner.module.css";
import Image from "next/image";

export default function AdminWelcome() {
    const [clock, setClock] = useState("--:--");
    const [greeting, setGreeting] = useState("خوش اومدی");
    const [stats, setStats] = useState({products: 0, orders: 0, users: 0, sales: 0});

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, "0");
            const m = String(now.getMinutes()).padStart(2, "0");
            setClock(`${h}:${m}`);
            const hour = now.getHours();
            setGreeting(hour < 12 ? "صبح بخیر ☀️" : hour < 17 ? "ظهر بخیر 🌤" : "عصر بخیر 🌙");
        };
        update();
        const t = setInterval(update, 10000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/stats");
                const data = await res.json();
                setStats({
                    products: data.products,
                    orders: data.orders,
                    users: data.users,
                    sales: data.sales,
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchStats();
    }, []);
    const actions = [
        {
            href: "/adminPanel/Product/Add",
            icon: "➕",
            label: "افزودن محصول",
            sub: "محصول جدید ثبت کن",
            color: "#EEEDFE",
            iconColor: "#534AB7"
        },
        {
            href: "/adminPanel/Product",
            icon: "📋",
            label: "لیست محصولات",
            sub: "مدیریت محصولات",
            color: "#E1F5EE",
            iconColor: "#0F6E56"
        },
        {
            href: "/adminPanel/Management",
            icon: "🧾",
            label: "سفارش‌ها",
            sub: "بررسی سفارش‌ها",
            color: "#FAECE7",
            iconColor: "#993C1D"
        },
        {
            href: "/adminPanel/Settings",
            icon: "⚙️",
            label: "تنظیمات",
            sub: "پیکربندی سایت",
            color: "#E6F1FB",
            iconColor: "#185FA5"
        },
    ];

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-10">
                        <div className={styles.wrap}>

                            <div className={styles.timeBar}>
                                <span className={styles.timeTxt}>{greeting}</span>
                                <span className={styles.timeDate}>{clock}</span>
                            </div>

                            {/* hero */}
                            <div className={styles.hero}>
                                <div className={styles.heroText}>
                                    <p className={styles.heroGreeting}>پنل مدیریت
                                        فروشگاه</p>
                                    <h1 className={styles.heroName}>خوش اومدی، مدیر 👋</h1>
                                    <p className={styles.heroSub}>
                                        امروز چه کاری می‌خوای انجام بدی؟<br/>همه چیز
                                        آماده‌ست.
                                    </p>
                                    <Link href="/adminPanel/Product"
                                          className={styles.heroBtn}>
                                        مشاهده محصولات ←
                                    </Link>
                                </div>
                                <div>
                                        <Image className={styles.heroAvatar} src={`/img/logo.png`} alt={`logo`} width={400}
                                           height={400}/>
                                </div>
                            </div>

                            {/* stats */}
                            <div className={styles.statsGrid}>
                                {[
                                    {
                                        icon: "📦",
                                        num: stats.products,
                                        label: "محصول ثبت‌ شده"
                                    },
                                    {icon: "🛒", num: stats.orders, label: "سفارش امروز"},
                                    {icon: "👥", num: stats.users, label: "کاربر فعال"},
                                    {
                                        icon: "💰",
                                        num: stats.sales.toLocaleString("fa-IR"),
                                        label: "فروش (تومان)"
                                    },
                                ].map((s, i) => (
                                    <div key={i} className={styles.statCard}>
                                        <span className={styles.statIcon}>{s.icon}</span>
                                        <span className={styles.statNum}>{s.num}</span>
                                        <span className={styles.statLabel}>{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* quick actions */}
                            <p className={styles.sectionTitle}>دسترسی سریع</p>
                            <div className={styles.actionsGrid}>
                                {actions.map((a, i) => (
                                    <Link key={i} href={a.href} className={styles.actionCard}>
                                        <div className={styles.actionIcon}
                                             style={{background: a.color}}>
                                            <span>{a.icon}</span>
                                        </div>
                                        <div>
                                            <p className={styles.actionTitle}>{a.label}</p>
                                            <p className={styles.actionSub}>{a.sub}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
