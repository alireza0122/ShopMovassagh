"use client"
import React, {useState} from 'react';
import styles from "./signup-banner.module.css";
import LogoSite from "@/app/shared/LogoSite/LogoSite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/store/usePaginationStore";
import axios from "axios";
import Link from "next/link";

function SignupBanner() {

    const login = useUserStore((state) => state.login);


    const router = useRouter();

    const [userName, setUsername] = useState("");

    const [number, setNumber] = useState("");







    const [showPassword, setShowPassword] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [rules, setRules] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
    });

    const checkPasswordStrength = (password: string) => {
        if (password.length === 0) {
            setPasswordStrength("رمز عبور خود را وارد کنید ");
        } else if (password.length < 8) {
            setPasswordStrength("ضعیف (حداقل 8 کاراکتر لازم است)");
        } else if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            setPasswordStrength("عالی ");
        } else {
            setPasswordStrength("متوسط ");
        }

        const newRules = {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        };
        setRules(newRules);
    };

    const [responseMessage, setResponseMessage] = useState("");

    const handleSignup = async () => {

        if (!userName || !number ) {
            setResponseMessage("لطفاً تمام فیلدهای الزامی (نام کاربری، رمز عبور) را پر کنید.");
            return;
        }

        if (!rules.length ||  !rules.lower || !rules.number) {
            setResponseMessage("رمز عبور استانداردهای لازم (حداقل 8 کاراکتر، شامل حروف بزرگ/کوچک و عدد) را ندارد.");
            return;
        }

        const apiUrl = "http://localhost:3001/user";

        const userData = {
            username: userName,
            password: number,
        };


        try {
            await axios.post(apiUrl, userData);
            login({ userName, number });
            router.push("/profile");
        } catch (error) {
            console.error(error);
        }


        login({
            userName: userName,
            number: number,
            biography: "",
            activity: "",
            favorites: "",
            urlImg: "",
        });


    };




    const delField = () => {
        setNumber("");
        setUsername("");

        setResponseMessage("");
        setPasswordStrength("");
        setRules({ length: false, upper: false, lower: false, number: false });
    }


    return (
        <div className={`my-5`}>
            <div className={`container ${styles['LoginHeader']}`}>
                <div className={`row `}>
                    <div className="col-12">
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
                                    placeholder={`الــــزامــی...`} className={` ${styles['inp']}`}
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
                                            checkPasswordStrength(e.target.value);
                                        }}
                                        value={number}
                                        maxLength={20}
                                        placeholder={`الــــزامــی...`} className={` ${styles['inp']}`}
                                        type={showPassword ? "text" : "password"}
                                        name="phone" id="phone"
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        className={`d-flex position-absolute  ${styles.icon}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                                <p
                                    className={` ${
                                        passwordStrength === "ضعیف "
                                            ? "text-danger"
                                            : passwordStrength === "متوسط "
                                                ? "text-warning"
                                                : "text-success"
                                    }`}
                                >
                                    {passwordStrength}
                                </p>
                                <p>
                                    تمام قوانین زیر را خوانده و آن ها را رعایت نمایید .
                                </p>
                                <ul>
                                    <li className={rules.length ? "text-success" : "text-danger"}>
                                        حداقل ۸ کاراکتر باشد
                                    </li>
                                    <li className={rules.upper ? "text-success" : "text-danger"}>
                                        شامل حداقل یک حرف بزرگ انگلیسی (A-Z)
                                    </li>
                                    <li className={rules.lower ? "text-success" : "text-danger"}>
                                        شامل حداقل یک حرف کوچک انگلیسی (a-z)
                                    </li>
                                    <li className={rules.number ? "text-success" : "text-danger"}>
                                        شامل حداقل یک عدد (0-9)
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 p-5 pb-2 pt-0">
                            <div className="row">
                                <div className="col-4">
                                    <button
                                        onClick={handleSignup}
                                        className={` ${styles['btnLogin']} `}>
                                        ثبت نام
                                    </button>
                                    {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
                                </div>
                                <div className="col-4">
                                    <button onClick={delField} className={` ${styles['btnSignup']} `}>
                                        حذف فیلد ها
                                    </button>
                                </div>
                                <div className="col-4">
                                    <div className="">
                                        <Link href={`/login`}  className={` d-block text-center ${styles['btnLogin']} `}>
                                            صفحه ورود
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupBanner;
