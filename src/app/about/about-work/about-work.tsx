import React from 'react';
import Image from "next/image";

function AboutWork() {


    const data = [{

        "one": [
            {
                urlImg: "/img/html3232.png",
                title: "HTML5",
                description: "زبان نشانه گذاری ابرمتن که جهت طرح ریزی ساختار مبنای سایت شما مورد استفاده میگردد.",
            },
            {
                urlImg: "/img/js3232.png",
                title: " JavaScript",
                description: "با کاربرد javascript سایت شما از حالت استاتیک و بی روح به حالت پویا و متحرک تبدیل خواهد شد.\n",
            },
            {
                urlImg: "/img/css3232.png",
                title: " Css3",
                description: "زبان اختصاص ویژگی به عناصر موجود در سایت و زیباسازی ظاهر سایت.",
            },

        ],
        "tow": [
            {
                urlImg: "/img/laravel.png",
                title: " Laravel",
                description: "محبوبترین و پرقدرت ترین فریم ورک زبان php.",
            },
            {
                urlImg: "/img/vue-3232.png",
                title: " Vue.js",
                description: "یکی از فریم ورک‌های برتر جاوا اسکریپتی در حوزه توسعه رابطه کاربری یا UI است.",
            },
            {
                urlImg: "/img/redis3232.png",
                title: " Redis",
                description: "Redis یکی از رایجترین دیتابیس های Nosql است که اطلاعات در آن بصورت Key و Value، بر روی معماری داخلی سیستم ذخیره سازی میشود",
            },
        ],
    }]

    const mainData = data[0];


    return (
        <div className={`container mt-5`}>
            <div className="row">
                <div className="col-12 col-lg-4">
                    {
                        mainData.one.map((item, index) => (
                            <div key={index} className="col-12 ">
                                <ul>
                                    <li className={`list-style-none pt-3`}>
                                        <div className="d-flex align-items-center gap-2">
                                            <Image src={item.urlImg} alt={`logo-AboutWork`} height={50} width={50}/>
                                            <h2 className={`fs-18px fw-bold first-color`}> {item.title}</h2>
                                        </div>
                                        <p className={`text-color text-justify pt-2`}>
                                            {item.description}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                </div>


                <div className="col-12 col-lg-4">
                    <div className="d-flex justify-content-center">
                        <Image src={`/img/programingLangoage.png`} alt={`img-AboutWork`} height={500} width={300}/>
                    </div>
                </div>
                <div className="col-12 col-lg-4">

                    {
                        mainData.tow.map((item, index) => (
                            <div key={index} className="col-12">
                                <ul>
                                    <li className={`list-style-none pt-3`}>
                                        <div className="d-flex align-items-center gap-2">
                                            <Image src={item.urlImg} alt={`logo-AboutWork`} height={50} width={50}/>
                                            <h2 className={`fs-18px fw-bold first-color`}> {item.title}</h2>
                                        </div>
                                        <p className={`text-color text-justify pt-2`}>
                                            {item.description}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    );
}

export default AboutWork;