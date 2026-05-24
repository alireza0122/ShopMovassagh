    "use client"
    import React, {useEffect, useState} from 'react';
    import Image from "next/image";
    import styles from './login-header.module.css'
    import Link from "next/link";
    import LogoSite from "@/app/shared/LogoSite/LogoSite";
    import {useUserStore} from "@/store/usePaginationStore";
    import {useRouter} from "next/navigation";
    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
    import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
    import axios from "axios";


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
    
    function LoginHeader() {


        const router = useRouter();
        const [userName, setUsername] = useState("");
        const [number, setNumber] = useState("");
    
        const login = useUserStore((state) => state.login);

    

    
    
        const [showPassword, setShowPassword] = useState(true);
    


    
        const [responseMessage, setResponseMessage] = useState("");
    
        const [users, setUsers] = useState<User[] | null>(null);
    
        useEffect(() => {
            axios.get("http://localhost:3001/user")
                .then((res) => {
                    console.log(res.data);
                    if (res.data && Array.isArray(res.data)) {
                        setUsers(res.data)
                        console.log(res.data)
                    } else {
                        setUsers([]);
                    }
                })

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

                router.push("/");
            } else {
                const isUsernameValid = users.some(user => user.username === userName);
                if (!isUsernameValid) {
                    setResponseMessage("نام کاربری یا ایمیل وارد شده صحیح نیست.");
                } else {
                    setResponseMessage("رمز عبور وارد شده صحیح نیست.");
                }
            }
        };

    
        return (
            <div className={`my-5`}>
                <div className={`container ${styles['LoginHeader']}`}>
                    <div className={`row `}>
    
                        <div className="col-7 py-4">
                            <div className="p-5  pt-3 pb-0 d-flex flex-column gap-3">

                                <div className="">
                                    <LogoSite/>
                                </div>
                                <div className="">
                                    <label
                                        className={` ${styles['lbl']}`} htmlFor={"name"}>
                                        نام کاربری یا ایمیل را وارد کنید
                                    </label>
                                    <input
                                        maxLength={20}
                                        value={userName}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder={`نام کاربری یا ایمیل را وارد کنید...`} className={` ${styles['inp']}`}
                                        type="text" name="name" id="name"/>
                                </div>
    
                                <div className="">
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
    
                                            placeholder={`رمز عبور خود را وارد کنید...`} className={` ${styles['inp']}`}
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
                            <div className="col-12 p-5 pb-5">
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
                            <div className="text-center">
                                <span>آیا حساب کاربری باز نکرده اید؟ </span>
                                <span><Link href="/sign-up"> ثبت نام</Link></span>
                            </div>
                        </div>
                        <div className={`col-5  p-0`}>
                            <div className={` d-flex justify-content-end p-2 align-items-end ${styles['bg-logo']} `}>
    
                                <Image className={` ${styles['logo']}`} src={`/img/logosite.png`} alt={`logosite.png`}
                                       width={100} height={100}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        );
    }
    
    export default LoginHeader;
