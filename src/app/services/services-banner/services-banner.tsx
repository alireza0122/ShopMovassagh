import React from 'react';
import Image from "next/image";
import styles from './services-banner.module.css'

function ServicesBanner() {
    return (
        <>
            <div className={`container my-5`}>
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-lg-6">
                        <h1 className={`fw-bold first-color`}>طراحی سایت</h1>
                        <h5 className={`text-color text-justify`}>طراحی و راه اندازی انواع سایت شرکتی، فروشگاهی، دولتی
                            با تیمی قدرتمند تخصص ماست. طراحی وبسایت باتوجه به نیاز و سلیقه شما انجام میشود. طراحی سایت
                            خود را با خیالی آسوده به ما بسپارید.</h5>
                        <p className={`text-color`}>مشاوره رایگان "2268 935 0914"</p>
                    </div>
                    <div className="col-12 col-lg-6 ">
                        <div className={`d-flex justify-content-lg-end justify-content-center`}>
                            <Image className={` ${styles['ServicesBanner-img']}`} src={`/img/528-1682416422.webp`}
                                   alt={`ServicesBanner-img`} height={400} width={10000}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container my-4`}>
               <div className="row">
                   <div className="col-12">
                       <div className="">
                           <h1 className={`first-color fw-bold fs-lg-30px fs-24px`}>خدماتی که برای مشتریان طراحی سایت ارائه میدهیم</h1>
                           <p className={`text-color text-justify`}>
                               آی بولود همیشه در تلاش بوده تا بتواند بهترین خدمات را به مشتریات خود ارائه دهد. و در همین راستا خدمات رایگان بسیاری برای مشتریان خود ارائه میدهد تا مشتریان ما بتوانند بهره بیشتری از خدمات ما داشته باشند.
                           </p>
                       </div>
                   </div>
                   <div className="col-12 my-3">
                       <div className="">
                            <h1 className={`first-color fw-bold fs-lg-30px fs-24px`}>
                                طراحی واکنش گرا
                            </h1>

                            <p className={`text-color `}>
                                سایت شما با هر دستگاهی قابل مشاهده هست. این یعنی کاربر با هر دستگاهی مثل موبایل تبلت یا کامپیوتر به آن سر بزند، باز هم  سایت شما به درستی نمایش داده می‌شود.
                            </p>

                       </div>
                   </div>

               </div>
                <div className="row my-5">
                    <div className="col-12 col-lg-6 order-1 oreder-lg-0 ">
                        <h1 className={`first-color fw-bold fs-lg-30px fs-24px`}>
                            بهینه سازی برای موتور جستجو
                        </h1>
                        <p className={`text-color text-justify
                        `}>
                            یکی دیگر از خدمات ارائه شده توسط ما ارتقا سایت در گوگل است که سایت شما را به ازا عبارت مورد
                            نظر در صفحه اول گوگل خواهیم آورد. البته این کار مستلزم داشتنیک سایت بهینه سازی شده از طرف
                            شماست و در اولین مرحله باید سایت شما توسط کارشناسان ما مورد بازبینی قرار گیرد.
                        </p>
                    </div>
                    <div className="col-12 col-lg-6 order-0 oreder-lg-1 ">
                        <div className="d-flex justify-content-lg-end justify-content-center">
                            <Image className={` ${styles['ServicesImgTahlil']}`} src={`/img/تحلیل-سایت-در-ارومیه.png`} alt={`تحلیل-سایت-در-ارومیه.`} width={10000}
                                   height={300}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ServicesBanner;