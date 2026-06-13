    "use client"
    import React, {useEffect, useState} from 'react';
    import Image from "next/image";
    import styles from './login-header.module.css'
    import Link from "next/link";
    import {useUserStore} from "@/store/usePaginationStore";
    import {useRouter} from "next/navigation";
    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
    import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
    import axios from "axios";
    import Popup from "@/app/shared/Popup/Popup";


    export type User = {
        id: number;
        username: string;
        password: string;
        urlImg: string;
        biography: string;
        activity: string;
        favorites: string;
        role: "admin" | "user";
    }

    type PopupType = "success" | "error";

    type PopupState = {
        message: string;
        type: PopupType;
    };
    function LoginHeader() {




        const router = useRouter();
        const [userName, setUsername] = useState("");
        const [number, setNumber] = useState("");
    
        const login = useUserStore((state) => state.login);




        const [popup, setPopup] = useState<PopupState>({
            message: "",
            type: "success",
        });
        const [showPassword, setShowPassword] = useState(true);

        const [Text, setText] = useState(true);



    
        const [responseMessage, setResponseMessage] = useState("");
    
        const [users, setUsers] = useState<User[] | null>(null);

        useEffect(() => {
            axios.get("/data/db.json")
                .then((res) => {
                    setUsers(res.data.user || []);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, []);


        const handleLogin = () => {
            if (!users) {
                setResponseMessage("لطفاً صبر کنید تا اطلاعات کاربر بارگذاری شود.");
                return;
            }

            if (users.length === 0) {
                setResponseMessage("هیچ کاربری یافت نشد.");
                return;
            }

            const foundUser = users.find(user =>
                user.username === userName && user.password === number
            );

            if (foundUser) {

                document.cookie = `userId=${foundUser.id}; path=/`;
                document.cookie = `role=${foundUser.role}; path=/`;

                login({
                    id: foundUser.id,
                    userName: foundUser.username,
                    biography: foundUser.biography,
                    activity: foundUser.activity,
                    favorites: foundUser.favorites,
                    urlImg: foundUser.urlImg,
                    role: foundUser.role,
                });

                setPopup({
                    message: "محصول با موفقیت ثبت شد",
                    type: "success"
                });

                router.push("/");

            } else {
                const isUsernameValid = users.some(user => user.username === userName);
                if (!isUsernameValid) {
                    setResponseMessage("نام کاربری یا ایمیل وارد شده صحیح نیست.");
                } else {
                    setResponseMessage("رمز عبور وارد شده صحیح نیست.");
                }
                setPopup({
                    message: "خطا در ثبت محصول",
                    type: "error"
                });
            }
        };


        return (
            <div className={`my-5`}>

                <div className={`container`}>
                    <div className={`row  ${styles['LoginHeader']}`}>
                        <div className={`col-6  p-0`}>
                            <div className={` d-flex justify-content-end p-2 align-items-end ${styles['bg-logo']} `}>

                                <Image className={` ${styles['logo']}`} src={`/img/Logo.png`} alt={`logosite.png`}
                                       width={150} height={150}/>
                            </div>
                        </div>

    
                        <div className="col-6 pt-5">
                            <div className="p-5  pt-4 pb-0 d-flex flex-column gap-3">


                                <div className="my-4">
                                    <label
                                        className={` ${styles['lbl']}`} htmlFor={"name"}>
                                        نام کاربری یا ایمیل را وارد کنید
                                    </label>
                                    <input
                                        maxLength={20}
                                        value={userName}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder={`الـــزامی..`} className={` ${styles['inp']}`}
                                        type="text" name="name" id="name"/>
                                </div>
    
                                <div className="mb-5 mt-2">
                                    <label className={` ${styles['lbl']}`} htmlFor={"phone"}>
                                        رمز عبور خود را وارد کنید
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            onChange={(e) => {
                                                setNumber(e.target.value);

                                            }}
                                            value={number}
                                            maxLength={20}
    
                                            placeholder={`الـــزامی..`} className={` ${styles['inp']}`}
                                            type={showPassword ? "text" : "password"}
                                            name="phone" id="phone"
                                        />
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            className={`d-flex position-absolute  ${styles.icon}`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 px-5 mt-5 mb-3">
                                <div className="row d-flex align-items-center">
                                    <div className="col-6">
                                        <button
                                            onClick={handleLogin}
                                            className={` ${styles['btnLogin']} `}>
                                            ورود
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <Link href={`/sign-up`} className={`d-block text-center ${styles['btnSignup']} `}>
                                            ثبت نام
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center my-1">
                                <span>آیا حساب کاربری باز نکرده اید؟ </span>
                                <span><Link href="/sign-up"> ثبت نام</Link></span>
                            </div>

                        </div>
                    </div>
                </div>
                <Popup
                    message={popup.message}
                    type={popup.type}
                    onClose={() => setPopup({ message: "", type: "success" })}
                />
            </div>
    
        );
    }
    
    export default LoginHeader;
