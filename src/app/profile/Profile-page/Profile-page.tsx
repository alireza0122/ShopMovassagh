"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styles from './Profile-page.module.css' ;
import {useUserStore} from "@/store/usePaginationStore";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";


function ProfilePage() {

    const router = useRouter();
    const {
        userName,
        biography: storedBio,
        activity: storedAct,
        favorites: storedFav,
        urlImg,
        login,
        logout,
        isLoggedIn
    } =
        useUserStore();
    const [biography, setBiography] = useState(storedBio);
    const [activity, setActivity] = useState(storedAct);
    const [favorites, setFavorites] = useState(storedFav);
    const [userImage, setUserImage] = useState<File | null>(null);
    const [responseMessage, setResponseMessage] = useState("");


    useEffect(() => {
        setBiography(storedBio);
        setActivity(storedAct);
        setFavorites(storedFav);
    }, [storedBio, storedAct, storedFav]);


    const locolStorStat = () => {


        if (!isLoggedIn) {
            alert("شما قبلاً از حساب خارج شده‌اید ");
            return;
        }

        useUserStore.getState().logout();
        useUserStore.persist.clearStorage();
        alert("با موفقیت از حساب کاربری خارج شدید ");
    }

    //

    const [showForm, setShowForm] = useState(true);


    const handleProfile = async () => {


        if (!biography || !activity || !favorites) {
            setResponseMessage("تمام فیلدها را پر کنید");
            return;
        }
        const apiUrl = "http://localhost:4000/user";


        const newUserData = {
            biography,
            activity,
            favorites,
            urlImg: userImage
                ? URL.createObjectURL(userImage)
                : urlImg || "",


        };
        login(newUserData)


        try {
            const response = await axios.post(apiUrl, newUserData);

            console.log("Registration Successful:", response.data);
            setResponseMessage("ثبت نام با موفقیت انجام شد! ");


        } catch (error) {
            console.error("Registration Error:", error);
            if (axios.isAxiosError(error) && error.response) {

                setResponseMessage(`خطا در ثبت نام: ${error.response.data.message || JSON.stringify(error.response.data) || error.message}`);
            } else {
                setResponseMessage("خطا ");
            }
        }

        login(newUserData);


        login({
            isLoggedIn: "",

            biography,
            activity,
            favorites,

        });

        setShowForm(false);

    };



    //
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setUserImage(file);

        // ذخیره در استور
        login({
            urlImg: imageUrl
        });
    };

    return (
        <div className={`container py-5`}>
            <div className="row">


                <div className="col-9">

                    {!showForm && (
                        <>
                            <div className="">
                                <h1 className={`fs-30px first-color ${styles['title']}`}>
                                    بیو گرافی
                                </h1>
                                {
                                    isLoggedIn && (
                                        <h1 className={`text-color fs-20px `}>
                                            {biography}
                                        </h1>
                                    )}
                            </div>
                            <div className="">
                                <h1 className={`fs-30px first-color ${styles['title']}`}>
                                    حوزه ی فعالیت
                                </h1>
                                {
                                    isLoggedIn && (
                                        <h1 className={`text-color fs-20px `}>
                                            {activity}
                                        </h1>
                                    )}
                            </div>
                            <div className="">
                                <h1 className={`fs-30px first-color ${styles['title']}`}>
                                    علاقه مندی ها
                                </h1>
                                {
                                    isLoggedIn && (
                                        <h1 className={`text-color fs-20px `}>
                                            {favorites}
                                        </h1>
                                    )}
                            </div>

                        </>
                    )}


                    {showForm && (
                        <>
                            <div className="d-flex flex-column mt-2 ">
                                <label
                                    className={` ${styles['lbl']}`} htmlFor={"bio"}>
                                    بیو گرافی
                                </label>
                                <input
                                    value={biography}
                                    onChange={(e) => setBiography(e.target.value)}
                                    placeholder={`بیو گرافی  را وارد کنید...`} className={` ${styles['inp']}`}
                                    type="text" name="bio" id="bio"/>
                            </div>

                            <div className="d-flex flex-column mt-2 ">
                                <label
                                    className={` ${styles['lbl']}`} htmlFor={"activity"}>
                                    حوزه ی فعالیت
                                </label>
                                <input
                                    value={activity}
                                    onChange={(e) => setActivity(e.target.value)}
                                    placeholder={` حوزه ی فعالیت  را وارد کنید...`} className={` ${styles['inp']}`}
                                    type="text" name="activity" id="activity"/>
                            </div>

                            <div className="d-flex flex-column mt-2 ">
                                <label
                                    className={` ${styles['lbl']}`} htmlFor={"favorites"}>
                                    علاقه مندی ها
                                </label>
                                <input
                                    value={favorites}
                                    onChange={(e) => setFavorites(e.target.value)}
                                    placeholder={` علاقه مندی های خود را وارد کنید...`} className={` ${styles['inp']}`}
                                    type="text" name="favorites" id="favorites"/>
                            </div>


                            <div className="col-12 mt-3">
                                <button
                                    onClick={handleProfile}
                                    className={` ${styles['btnSabtData']} `}>
                                    ثبت پروفایل
                                </button>
                                {responseMessage && <p style={{color: 'green'}}>{responseMessage}</p>}
                            </div>
                        </>


                    )}

                </div>

                <div className="col-3">
                    <div
                        className={`d-flex flex-column justify-content-center align-items-center ${styles['box-profile']}`}>
                        <div className={`text-center ${styles['bg-profile']}`}>
                            <Image
                                src={urlImg || "/img/logosite.png"}
                                className={styles['imgProfile']}
                                alt="Profile"
                                width={200}
                                height={200}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles['fileInput']}
                            />
                            <label htmlFor="profileImage" className={styles['uploadBtn']}>
                                انتخاب عکس
                            </label>
                        </div>
                        <div className={`pt-4`}>
                            {
                            isLoggedIn && (
                                    <h1 className={`text-white`}>
                                    {userName}
                                    </h1>
                                )}
                        </div>

                        <p className={`text-color`}>
                            {activity}
                        </p>
                        <div className="container pt-2">
                            <div className="row">
                                <div className="col-12 ">

                                    <Link href={`/`}>
                                        <button
                                            className={` fs-18px ${styles['btnLogin']} `}>
                                            صفحه اصلی
                                        </button>
                                    </Link>
                                </div>

                                <div className="col-12 my-2">
                                    <Link href={`/`}>
                                        <button onClick={locolStorStat} className={` ${styles['btnSignup']} `}>
                                            خروج از حساب کاربری
                                        </button>
                                    </Link>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;