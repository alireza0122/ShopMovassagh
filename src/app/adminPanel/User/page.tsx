'use client'
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./User.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faTrash} from "@fortawesome/free-solid-svg-icons";
type UserType = {
    id: number;
    username: string;
    password: string;
    role?: string;
};
function User() {

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3001/user")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({});

    const handleDeleteUser = async (id: number, username: string) => {

        const confirmDelete = window.confirm(
            `آیا از حذف کاربر ${username} مطمئن هستید؟`
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3001/user/${id}`);

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== id)
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`container  `}>
            <div className="row">
                <div className="col-2">
                    <AdminPanelSidebar/>
                </div>
                <div className="col-8 my-5">
                    {users
                        .filter(user => user.role !== "admin")
                        .map((user,index) => (
                                <div key={index} className={`row  p-3 m-2 align-items-end ${styles['btnDel-box']}`}>
                                    <div className="col-10">
                                        <div
                                            key={user.id}
                                            className="  mb-3 "
                                        >

                                            <p>👤 نام کاربری: {user.username}</p>
                                            <p className="d-flex align-items-center">
                                                رمز:
                                                {showPassword[user.id] ? user.password : "***"}
                                            </p>
                                            <p>نقش: {user.role || "کاربر عادی"}</p>


                                        </div>
                                    </div>
                                    <div className="col-2 d-flex justify-content-around">

                                        <button
                                            onClick={() => handleDeleteUser(user.id, user.username)}
                                            className={styles['btnDel']}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className={`fs-16px ${styles['btnDel-icon']}`}
                                            />
                                        </button>
                                        <button className={`  ${styles['btnDel']}`}
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    [user.id]: !prev[user.id],
                                                }))
                                            }
                                        >
                                            <FontAwesomeIcon
                                                title="نمایش / مخفی کردن رمز"
                                                className={`fs-16px  ${styles['btnDel-icon']}`}
                                                icon={showPassword[user.id] ? faEye : faEyeSlash}
                                            />
                                        </button>
                                    </div>
                                </div>


                        ))}

                </div>
            </div>
        </div>

    );
}

export default User;