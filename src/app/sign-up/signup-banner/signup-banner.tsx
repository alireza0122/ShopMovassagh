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

        const apiUrl = "/data/db.json/user";

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
        <div className={`my-5 pt-5`}>
            <div className={`container ${styles['LoginHeader']}`}>
                <div className={`row px-4 py-3`}>
                    <div className="col-12">
                        <div className="  pt-3 pb-0 d-flex flex-column gap-3">
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


                            </div>
                        </div>
                    </div>
                    <div className="col-6 ">
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

                    <div className="col-6 py-3">
                        <div className=" d-flex  flex-column justify-content-between">
                                <button
                                    onClick={handleSignup}
                                    className={` ${styles['btnLogin']} my-2`}>
                                    ثبت نام
                                </button>
                                {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
                                <button onClick={delField} className={` ${styles['btnSignup']} my-2`}>
                                    حذف فیلد ها
                                </button>
                                <div className="w-100">
                                    <Link href={`/`}  className={`my-2 d-block text-center ${styles['btnLogin']} `}>
                                        صفحه ورود
                                    </Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupBanner;
