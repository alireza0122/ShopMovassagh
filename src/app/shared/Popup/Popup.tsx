"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./popup.module.css";

type PopupProps = {
    message: string;
    type: "success" | "error";
    onClose: () => void;
};

export default function Popup({ message, type, onClose }: PopupProps) {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (message) {
            gsap.fromTo(
                overlayRef.current,
                { x: 200, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );

            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div ref={overlayRef} className={styles.overlay}>
            <div
                className={`${styles.box} ${
                    type === "success" ? styles.success : styles.error
                }`}
            >
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}