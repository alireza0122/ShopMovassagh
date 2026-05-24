"use client";

import toast from "react-hot-toast";

const CustomToast = {

    success: (message) => {
        toast.success(message, {
            duration: 3000,
            style: {
                background: "#16a34a",
                color: "#fff",
                padding: "14px",
                borderRadius: "12px",
            },
        });
    },

    error: (message) => {
        toast.error(message, {
            duration: 3000,
            style: {
                background: "#dc2626",
                color: "#fff",
                padding: "14px",
                borderRadius: "12px",
            },
        });
    },

};

export default CustomToast;