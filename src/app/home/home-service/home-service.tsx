import React from 'react';
import styles from './home-service.module.css'
import HomeServiceCart from "@/app/home/home-service/home-service-cart/home-service-cart";


function HomeService() {


    const ServiceCartData = [
        {
            id: 1,
            srcImg: "/img/imgcart1.png",
            title: "تجزیه و تحلیل و گزارش",
            description: "با رباتی که به سوالات مشتریان پاسخ می‌دهد و آنها را ثبت می‌کند، بهره‌وری تیم خود را افزایش داده و در زمان صرفه‌جویی کنید.",
            LinkTitle: "جزئیات را بخوانید..."
        },
        {
            id: 2,
            srcImg: "/img/imgcart2.png",
            title: "توسعه خلاق",
            description: "با رباتی که به سوالات مشتریان پاسخ می‌دهد و آنها را ثبت می‌کند، بهره‌وری تیم خود را افزایش داده و در زمان صرفه‌جویی کنید.",
            LinkTitle: "جزئیات را بخوانید..."
        },

        {
            id: 3,
            srcImg: "/img/imgcart3.png",
            title: "بازاریابی ایمیلی",
            description: "با رباتی که به سوالات مشتریان پاسخ می‌دهد و آنها را ثبت می‌کند، بهره‌وری تیم خود را افزایش داده و در زمان صرفه‌جویی کنید.",
            LinkTitle: "جزئیات را بخوانید..."
        },

        {
            id: 4,
            srcImg: "/img/imgcart4.png",
            title: "تجزیه و تحلیل کسب و کار",
            description: "با رباتی که به سوالات مشتریان پاسخ می‌دهد و آنها را ثبت می‌کند، بهره‌وری تیم خود را افزایش داده و در زمان صرفه‌جویی کنید.",
            LinkTitle: "جزئیات را بخوانید..."
        },

        {
            id: 5,
            srcImg: "/img/imgcart5.png",
            title: "بازاریابی ویدیویی",
            description: "با رباتی که به سوالات مشتریان پاسخ می‌دهد و آنها را ثبت می‌کند، بهره‌وری تیم خود را افزایش داده و در زمان صرفه‌جویی کنید.",
            LinkTitle: "جزئیات را بخوانید..."
        },

        {
            id: 6,
            srcImg: "/img/imgcart6.png",
            title: "فرآیند UX کسب و کار",
            description: "با رباتی که به سوالات مشتریان پاسخ می‌دهد و آنها را ثبت می‌کند، بهره‌وری تیم خود را افزایش داده و در زمان صرفه‌جویی کنید.",
            LinkTitle: "جزئیات را بخوانید..."
        },
    ]


    return (


        <>
            <div className="mt-5">

                <div className="pt-2">
                    <h1 className={`fw-bold  ${styles['Title']}  mt-5 text-center`}>
                        راهکار بهتر آژانس/سئو در دسترس شما
                    </h1>

                </div>
                <div className={` container`}>
                    <div className={` row ${styles['HomeService']}`}>

                        {ServiceCartData.map((item) => (
                            <div key={item.id} className="col-12 col-sm-6 col-lg-4 mt-3">
                                <HomeServiceCart id={item.id} srcImg={item.srcImg} title={item.title}
                                                 description={item.description} LinkTitle={item.LinkTitle}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>

    );
}

export default HomeService;