import React from 'react';
import Image from "next/image";
import styles from './about-banner.module.css'
function AboutBanner() {
    return (
        <>

            <div className={`container mt-5`}>
                <div className="row d-flex align-items-center">
                    <div className="col-6">
                        <h1 className={`fw-bold first-color `}>
                            شرکت طراحی سایت وبــ آرا
                        </h1>
                    </div>
                    <div className="col-6">
                        <div className={` ${styles['box-img-AboutBanner']}`}>
                            <Image className={` ${styles['img-AboutBanner']}`}
                                   src={`/img/857c7776-6069-4980-a5f4-f350028867fb.webp`} alt={`AboutBanner-img`}
                                   width={400}
                                   height={250}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`container pt-5`}>
                <div className="row">
                    <div className="col-12">
                        <p className={`text-color text-justify`}>
                            این شرکت فعالیت خود را در سال 1395 در شهر ارومیه آغاز نمود. که بعد از گزشت مدت زمان بسیار کم
                            توانست توانمندیهای خود در زمینه های فعالیت خود بخصوص طراحی و برنامه نویسه سایت به مشتریان
                            ثابت کند وهمچنین از رقیبان خود پیشی بگیرد.
                            آی بولود در زمینه طراحی انواع وب سایتهای شرکتی وب سرویسها فروشگاههای اینترنتی فعالیت میکند.
                        </p>
                    </div>

                    <div className="col-12 col-lg-6 py-3">
                        <div className={` position-relative ${styles['box-img-moohit']} `}>
                            <div className="">
                                <Image className={` ${styles['img-moohit']}`} src={`/img/eq-in-workplace13..webp`}
                                       alt={`img`} height={800} width={1000}/>
                            </div>
                            <div className={`position-absolute bottom-0 ${styles['text-box']} `}>
                                <p className={`fw-bold text-color   ${styles['text']}`}>
                                    برای مشاهده نمونه کارهای طراحی سایت کلیک کنید...
                                </p>
                            </div>

                        </div>

                    </div>
                    <div className="col-12 col-lg-6 pt-5 ">
                        <p className={`text-color text-justify`}>
                            یک مجموعۀ موفق، تنها با تبلیغات و جایزه‌های میلیونی خلق نمی‌شود. موفقیت زمانی اتفاق خواهد افتاد که شما، مشتری‌های خود را به چشم انسان‌هایی واقعی ببینید. انسان‌هایی که فکر می‌کنند و تصمیم می‌گیرند. رشد یعنی شما فکر و انرژی خود را پای بهتر کردن زندگی این انسان‌ها بگذارید.

                            آی بولود قصد دارد همراه شما، فصلی نو در بازاریابی کسب و کارهای (دیجیتالی) ایران آغاز کند. رویکردی نو که از کسب و کارها می‌خواهد دیدی طولانی‌مدت داشته باشند. دیدی که درآمد امروز و راهکارهای کوتاه‌مدت تبلیغاتی را با کیفیت، شفافیت، آموزش و صمیمیت پیوند می‌زند. نگاهی که بر ایجاد روابط پایدار با مشتری‌ها تاکید دارد.

                            یک مجموعۀ موفق، تنها با تبلیغات و جایزه‌های میلیونی خلق نمی‌شود. موفقیت زمانی اتفاق خواهد افتاد که شما، مشتری‌های خود را به چشم انسان‌هایی واقعی ببینید. انسان‌هایی که فکر می‌کنند و تصمیم می‌گیرند. رشد یعنی شما فکر و انرژی خود را پای بهتر کردن زندگی این انسان‌ها بگذارید.

                            آی بولود قصد دارد همراه شما، فصلی نو در بازاریابی کسب و کارهای (دیجیتالی) ایران آغاز کند. رویکردی نو که از کسب و کارها می‌خواهد دیدی طولانی‌مدت داشته باشند. دیدی که درآمد امروز و راهکارهای کوتاه‌مدت تبلیغاتی را با کیفیت، شفافیت، آموزش و صمیمیت پیوند می‌زند. نگاهی که بر ایجاد روابط پایدار با مشتری‌ها تاکید دارد.
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AboutBanner;