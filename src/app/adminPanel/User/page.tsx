'use client'
import AdminPanelSidebar from "@/app/adminPanel/adminPanel-sidebar/adminPanel-sidebar";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "./User.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faSearch, faTrash, faUser, faShield} from "@fortawesome/free-solid-svg-icons";

type UserType = {
    id: string;
    username: string;
    password: string;
    role?: string;
};

function getInitials(username: string): string {
    return username.slice(0, 2).toUpperCase();
}

function User() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    useEffect(() => {
        axios.get("/api/user")
            .then((res) => setUsers(res.data.user))
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteUser = async (id: string, username: string) => {
        const confirmDelete = window.confirm(`آیا از حذف کاربر ${username} مطمئن هستید؟`);
        if (!confirmDelete) return;
        try {
            await axios.delete(`/api/user/${id}`);
            setUsers(prev => prev.filter(user => user.id !== id));
            if (selectedUser?.id === id) setSelectedUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredUsers = users.filter((item) =>
        item.username.toLowerCase().includes(search.toLowerCase())
    );

    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === "admin").length;

    const detailUsers = selectedUser
        ? users.filter(user => user.id === selectedUser.id)
        : users.filter(user => user.role !== "admin");

    return (
        <div className={`container-fluid`}>
            <div className="row g-0">

                {/* Sidebar */}
                <div className="col-lg-2">
                    <AdminPanelSidebar/>
                </div>

                {/* User List */}
                <div className={`col-lg-3 col-12 ${styles['list-col']}`}>
                    <div className={styles['list-header']}>
                        <h6 className={styles['list-title']}>فهرست کاربران</h6>
                        <div className={styles['search-box']}>
                            <input
                                type="text"
                                placeholder="جستجوی نام کاربری..."
                                className={styles['product-search']}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faSearch} className={styles['product-search-icon']}/>
                        </div>
                    </div>

                    <div className={styles['user-list']}>
                        {filteredUsers.length === 0 && (
                            <div className={styles['empty-state']}>
                                <FontAwesomeIcon icon={faUser} className={styles['empty-icon']}/>
                                <p>کاربری یافت نشد</p>
                            </div>
                        )}
                        {filteredUsers.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedUser(item)}
                                className={`${styles['user-row']} ${selectedUser?.id === item.id ? styles['user-row-active'] : ''}`}
                            >
                                <div className={`${styles['avatar']} ${item.role === 'admin' ? styles['avatar-admin'] : ''}`}>
                                    {getInitials(item.username)}
                                </div>
                                <div className={styles['user-row-info']}>
                                    <span className={styles['user-row-name']}>{item.username}</span>
                                    <span className={styles['user-row-role']}>
                                        {item.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی'}
                                    </span>
                                </div>
                                <span className={`${styles['badge']} ${item.role === 'admin' ? styles['badge-admin'] : styles['badge-user']}`}>
                                    {item.role === 'admin' ? 'ادمین' : 'کاربر'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail Cards */}
                <div className={`col-lg-4 col-12 ${styles['detail-col']}`}>
                    <div className={styles['detail-col-header']}>
                        <h6 className={styles['list-title']}>جزئیات کاربران</h6>
                        <button
                            onClick={() => { setSelectedUser(null); setSearch(""); }}
                            className={styles['btn-show-all']}
                        >
                            نمایش همه
                        </button>
                    </div>

                    <div className={styles['cards-list']}>
                        {detailUsers.map((user) => (
                            <div key={user.id} className={styles['detail-card']}>
                                <div className={styles['detail-card-header']}>
                                    <div className={`${styles['avatar']} ${styles['avatar-lg']} ${user.role === 'admin' ? styles['avatar-admin'] : ''}`}>
                                        {getInitials(user.username)}
                                    </div>
                                    <div>
                                        <p className={styles['detail-username']}>{user.username}</p>
                                        <p className={styles['detail-role-label']}>
                                            {user.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی'}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles['detail-card-body']}>
                                    <div className={styles['detail-row']}>
                                        <span className={styles['detail-label']}>
                                            <FontAwesomeIcon icon={faShield} className={styles['detail-icon']}/>
                                            نقش
                                        </span>
                                        <span className={`${styles['badge']} ${user.role === 'admin' ? styles['badge-admin'] : styles['badge-user']}`}>
                                            {user.role === 'admin' ? 'ادمین' : 'کاربر'}
                                        </span>
                                    </div>

                                    <div className={styles['detail-row']}>
                                        <span className={styles['detail-label']}>
                                            <FontAwesomeIcon icon={faEye} className={styles['detail-icon']}/>
                                            رمز عبور
                                        </span>
                                        <span className={styles['detail-value']}>
                                            {showPassword[user.id]
                                                ? <code className={styles['pass-text']}>{user.password}</code>
                                                : <span className={styles['pass-dots']}>••••••••</span>
                                            }
                                        </span>
                                    </div>

                                    <div className={styles['actions-row']}>
                                        <button
                                            onClick={() => handleDeleteUser(user.id, user.username)}
                                            className={styles['btn-del']}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className={styles['btn-del-icon']}/>
                                            حذف
                                        </button>
                                        <button
                                            className={styles['btn-eye']}
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    [user.id]: !prev[user.id],
                                                }))
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={showPassword[user.id] ? faEyeSlash : faEye}
                                                className={styles['btn-eye-icon']}
                                            />
                                            {showPassword[user.id] ? 'مخفی' : 'نمایش رمز'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats + Selected */}
                <div className={`col-lg-2 col-12 ${styles['side-col']}`}>
                    <div className={styles['stats-grid']}>
                        <div className={styles['stat-card']}>
                            <span className={styles['stat-num']}>{totalUsers}</span>
                            <span className={styles['stat-label']}>کل کاربران</span>
                        </div>
                        <div className={styles['stat-card']}>
                            <span className={styles['stat-num']}>{adminCount}</span>
                            <span className={styles['stat-label']}>مدیران</span>
                        </div>
                    </div>

                    {selectedUser && (
                        <div className={styles['selected-card']}>
                            <p className={styles['selected-title']}>کاربر انتخاب‌شده</p>
                            <div className={`${styles['avatar']} ${styles['avatar-lg']} ${styles['avatar-center']} ${selectedUser.role === 'admin' ? styles['avatar-admin'] : ''}`}>
                                {getInitials(selectedUser.username)}
                            </div>
                            <div className={styles['selected-info']}>
                                <div className={styles['selected-row']}>
                                    <span className={styles['detail-label']}>👤 نام کاربری</span>
                                    <span className={styles['detail-value']}>{selectedUser.username}</span>
                                </div>
                                <div className={styles['selected-row']}>
                                    <span className={styles['detail-label']}>🔑 رمز</span>
                                    <code className={styles['pass-text']}>{selectedUser.password}</code>
                                </div>
                                <div className={styles['selected-row']}>
                                    <span className={styles['detail-label']}>🎭 نقش</span>
                                    <span className={`${styles['badge']} ${selectedUser.role === 'admin' ? styles['badge-admin'] : styles['badge-user']}`}>
                                        {selectedUser.role === 'admin' ? 'ادمین' : 'کاربر'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default User;